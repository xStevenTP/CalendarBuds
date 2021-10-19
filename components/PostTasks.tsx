import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// UI component for main post content
export default function PostTasks({ task }) {
  const createdAt = typeof task?.createdAt === 'number' ? new Date(task.createdAt) : task.createdAt.toDate();

  return (
    <div className="card">
      <h1>{task?.duedate}</h1>    
      <ReactMarkdown>{task?.content}</ReactMarkdown>
      <h1>Priority :{task?.priority}</h1>
      <p>{task?.finished}</p>
    </div>
  );
}