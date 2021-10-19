import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import eventList from "./Events";

//console.log(typeof eventList())
const calendarEvents = [
    {
        title : "cs project",
        start: new Date(2021, 9, 21),
        end : new Date(2021, 9, 22)
    },
    {
        title : "essay",
        start: new Date(2021, 9, 28),
        end : new Date(2021, 9, 28)
    }

]

const localizer = momentLocalizer(moment);

import "react-big-calendar/lib/css/react-big-calendar.css";

function Calendar() {
  const [events, setEvents] = React.useState(calendarEvents);
  const selectedEvent = (event) => {
    window.alert(event.title);
  }
  const addNewEvent = (e, slotInfo) => {
    var newEvents = events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setEvents(newEvents);
  };
  const eventColors = (event) => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor,
    };
  };
  return (
    <>
        <BigCalendar
                selectable
                localizer={localizer}
                events={events}
                defaultView="month"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={(event) => selectedEvent(event)}
                eventPropGetter={eventColors}
                resizeable
                style={{ height: "100vh" }}
        />        
    </>
  );
}

export default Calendar;