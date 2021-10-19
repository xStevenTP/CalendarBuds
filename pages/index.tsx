/*
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Loader from '../components/Loader'
import ToDoList from '../components/ToDoList';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';

import { useState } from 'react';

// Max post to query per page
const LIMIT = 5;

export async function getServerSideProps(context) {
  const tasksQuery = firestore
    .collectionGroup('tasks')
    //.where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const tasks = (await tasksQuery.get()).docs.map(postToJSON);

  return {
    props: { tasks }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [loading, setLoading] = useState(false);

  const [tasksEnd, setTasksEnd] = useState(false);

  const getMoreTasks = async () => {
    setLoading(true);
    const last = tasks[tasks.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('tasks')
      //.where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newTasks = (await query.get()).docs.map((doc) => doc.data());

    setTasks(tasks.concat(newTasks));
    setLoading(false);

    if (newTasks.length < LIMIT) {
      setTasksEnd(true);
    }
  };

  return (
      <main>
        <ToDoList tasks={tasks} admin={undefined} />

        {!loading && !tasksEnd && <button onClick={getMoreTasks}>Load more</button>}

        <Loader show={loading} />

        {tasksEnd && 'LETS GO! YOU DONE!'}
      </main>
  );
}


import React from "react";
import ReactDOM from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-beautiful-dnd";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import events from "../components/Events";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Loader from '../components/Loader'
import ToDoList from '../components/ToDoList';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import { useState } from 'react';

// Max post to query per page
//const LIMIT = 31;

moment.locale('en');

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events
    };

    this.moveEvent = this.moveEvent.bind(this);
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      events: nextEvents
    });
  };

  render() {
    return (
      <DragAndDropCalendar
        selectable
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        defaultView={BigCalendar.Views.MONTH}
        defaultDate={new Date(2015, 3, 12)}
      />
    );
  }
}

const Calendar = DragDropContext(HTML5Backend)(Dnd);
ReactDOM.render(<Calendar />, document.getElementById("root"));

export async function getServerSideProps(context) {
  const tasksQuery = firestore
    .collectionGroup('tasks')
    //.where('published', '==', true)
    .orderBy('createdAt', 'desc')
    //.limit(LIMIT);

  const tasks = (await tasksQuery.get()).docs.map(postToJSON);

  return {
    props: { tasks }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  
  const [tasks, setTasks] = useState(props.tasks);
  const [loading, setLoading] = useState(false);

  //const [tasksEnd, setTasksEnd] = useState(false);
 
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
    return newTasks;
  };

  const createEvents = async (newTasks) => {
    var events = []
    newTasks.forEach((task) => {
      var date = task.duedate.split("/");
      var json = {
        id : task.uid,
        title : task.taskname,
        start : new Date(date[0], date[1], date[2]),
        end : new Date(date[0], date[1], date[2])
      }
      events.push(json)
    });
    return events;
  }

  
  return (
      <main>
        
        
        <ToDoList tasks={tasks} admin={undefined} />

        {!loading  && <button onClick={getMoreTasks}>Load more</button>}

        <Loader show={loading} />

        {'LETS GO! YOU DONE!'}
      </main>
  );
}




import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from '../lib/App';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dnd from '../components/Dnd'
import { render } from 'react-dom'





export default function Home(props) {
  const a = App();
  return a;
}

const globalizeLocalizer = momentLocalizer(moment);

const EXAMPLES = {
  dnd: 'Addon: Drag and drop',
}

const DEFAULT_EXAMPLE = 'dnd'

class Example extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      selected: DEFAULT_EXAMPLE,
    }
  }

  select = selected => {
    this.setState({ selected })
  }

  componentDidMount() {
    const hash = (window.location.hash || '').slice(1)
    this.select(hash || DEFAULT_EXAMPLE)
  }

  render() {
    let selected = this.state.selected
    let Current = {
      dnd: Dnd,
    }[selected]

    return (
      <div className="app">
        
          <div className="example">
          <Current localizer={globalizeLocalizer} />
          </div>
      
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render(<Example />, document.getElementById('app'))
})


export default Example

*/

import Calendar from "../components/Calendar";

export default function Home() {
  return(
    Calendar()
  )
}