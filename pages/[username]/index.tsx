import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import UserProfile from '../../components/UserProfile';
import ToDoList from '../../components/ToDoList';
import Metatags from '../../components/Metatags';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  // JSON serializable data
  let user = null;
  let tasks = null;

  if (userDoc) {
    user = userDoc.data();
    const tasksQuery = userDoc.ref
      .collection('tasks')
      //.where('published', '==', true)
      .orderBy('createdAt', 'desc');
      //.limit(5);
    tasks = (await tasksQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, tasks }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, tasks }) {
  return (
    <main>
      <Metatags title={user.username} description={`${user.username}'s public profile`} />
      <UserProfile user={user} />
      <ToDoList tasks={tasks} admin={user}  />
    </main>
  );
}