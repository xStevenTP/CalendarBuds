import { useState } from "react";
import { firestore, postToJSON } from "../lib/firebase";



export default function eventList(props) {
    //const [tasks, setTasks] = useState(props.tasks);
    //const [loading, setLoading] = useState(false);
  
    //const [tasksEnd, setTasksEnd] = useState(false);
   /*
    firestore.collection('tasks').get().then(snap => {
      const size = snap.size // will return the collection size
    });
    
    const getMoreTasks = async () => {
      //setLoading(true);
      //const last = tasks[size - 1];
  
      //const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

      const query = firestore
        .collectionGroup('tasks')
        //.where('published', '==', true)
        .orderBy('createdAt', 'desc')
        //.startAfter(cursor)
        //.limit(LIMIT);
      
      const newTasks = (await query.get()).docs.map((doc) => doc.data());
      //const dates = newTasks.map((tasks) => tasks.duedate);
      //const all = dates.map((date) => date.split("/"));
      //const events = all.map((a) => {a[]})
      //setTasks(tasks.concat(newTasks));
      //setLoading(false);
  
      //if (newTasks.length < LIMIT) {
        //setTasksEnd(true);
      //}
      console.log(typeof newTasks);
      return newTasks;
    };

    async function getServerSideProps() {
      const tasksQuery = firestore
        .collectionGroup('tasks')
        //.where('published', '==', true)
        .orderBy('createdAt', 'desc')
        //.limit(LIMIT);
    
      const tasks = (await tasksQuery.get()).docs.map(postToJSON);
      return tasks
      return {
        props: { tasks }, // will be passed to the page component as props
      };
    }

    console.log(props)
    //const createEvents = async () => {
      var t = getServerSideProps()
      const events = new Array();
      console.log(typeof t);
      t.forEach((task) => {
        var date = task.duedate.split("/");
        var json = {
          title : task.taskname,
          start : new Date(date[0], date[1], date[2]),
          end : new Date(date[0], date[1], date[2])
        }
        events.push(json)
      });
      return events;
      
    //}

    //var array = createEvents()
*/
    //return array;
}