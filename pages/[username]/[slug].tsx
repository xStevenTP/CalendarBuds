import styles from '../../styles/Post.module.css';
import ToDoList from '../../components/ToDoList';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PostTasks from '../../components/PostTasks';



export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let task;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('tasks').doc(slug);
    task = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { task, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('tasks').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}


export default function Post(props) {
  const taskRef = firestore.doc(props.path);
  const [realtimeTask] = useDocumentData(taskRef);

  const task = realtimeTask || props.task;

  return (
    <main className={styles.container}>

      <section>
        <PostTasks task={task} />
      </section>
        
    </main>
  );
}