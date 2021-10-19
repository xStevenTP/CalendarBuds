
import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminTaskEdit(props) {
  return (
    <AuthCheck>
        <TaskManager />
    </AuthCheck>
  );
}

function TaskManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;
  //fix slug issue
  const taskRef = firestore.collection('users').doc(auth.currentUser.uid).collection('tasks');
  const [task] = useDocumentData(taskRef);

  return (
    <main className={styles.container}>
      {task && (
        <>
          <section>
            <h1>{task.taskname}</h1>
            <p>ID: {task.slug}</p>

            <TaskForm taskRef={taskRef} defaultValues={task} preview={preview} />
          </section>

          <aside>
          <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${task.username}/${task.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function TaskForm({ defaultValues, taskRef, preview }) {
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

  const updateTask = async ({ duedate, content, priority, finished }) => {
    await taskRef.update({
      duedate,
      content,
      priority,
      finished,
      updatedAt: serverTimestamp(),
    });

    reset({ duedate, content, priority, finished });

    toast.success('Task updated successfully!')
  };

  return (
    <form onSubmit={handleSubmit(updateTask)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
  

        <fieldset>
          <label>Due Date</label>
          <input type = "text" name="duedate" {...register("duedate")} />
        </fieldset>

        <fieldset>
          <label>Description</label>
          <input type = "text" name="content" {...register("content")} />
        </fieldset>

        <fieldset>
          <label>Priority</label>
          <input type = "text" name="priority" {...register("priority")} />
        </fieldset>

        <fieldset>
          <input className={styles.checkbox} name="finished" type="checkbox" {...register("finished")} />
          <label>Finished</label>
        </fieldset>
       
        <button type="submit" className="btn-green">
          Save Changes
        </button>
      </div>
    </form>
  );
}
