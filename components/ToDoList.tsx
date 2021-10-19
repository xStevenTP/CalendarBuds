import Link from 'next/link';
import { postToJSON } from '../lib/firebase';

export default function ToDoList({ tasks, admin }) {
  return tasks ? tasks.map((task) => <PostTask task={task} key={task.slug} admin={admin} />) : null;
}

function PostTask({ task, admin }) {
  return (
    <div className="card">
      <Link href={`/${task.username}`}>
        <a>
          <strong>{task.duedate}</strong>
        </a>
      </Link>

      <Link href={`/${task.username}/${task.slug}`}>
        <h2>
          <a>{task.taskname}</a>
        </h2>
      </Link>

      <footer>
        <span>
          Priority = {task.priority}
        </span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${task.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {task.finished ? <p className="text-success">Finished</p> : <p className="text-danger">Unfinished</p>}
        </>
      )}
    </div>
  );
}
