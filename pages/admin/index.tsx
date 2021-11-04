import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import ToDoList from '../../components/ToDoList';
import { UserContext } from '../../lib/Context';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <TaskList />
        <CreateNewTask />
      </AuthCheck>
    </main>
  );
}

function TaskList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('tasks');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const tasks = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Tasks</h1>
      <ToDoList tasks={tasks} admin />
    </>
  );
}

function CreateNewTask() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [taskname, setTaskname] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(taskname));

  // Validate length
  const isValid = taskname.length < 100;

  // Create a new post in firestore
  const createTask = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('tasks').doc(slug);

    // Tip: give all fields a default value here
    const data = {
      taskname,
      slug,
      uid,
      username,
      startdate : 'never',
      duedate : 'never',
      finished: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      priority: 0,
    };

    await ref.set(data);

    toast.success('Post created!')

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);

  };

  return (
    <form onSubmit={createTask}>
      <input
        value={taskname}
        onChange={(e) => setTaskname(e.target.value)}
        placeholder="Fun Fun Task"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Task
      </button>
    </form>
  );
}
