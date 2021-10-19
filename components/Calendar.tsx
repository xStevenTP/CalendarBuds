import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import eventList from "./Events";
import SweetAlert from "react-bootstrap-sweetalert";

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
  const [alert, setAlert] = React.useState(null);
  const selectedEvent = (event) => {
    window.alert(event.title);
  }
  const addNewEventAlert = (slotInfo) => {
    setAlert(
      <SweetAlert
        input
        showCancel
        title="Input something"
        onConfirm={(e) => addNewEvent(e, slotInfo)}
        onCancel={() => hideAlert()}
      />
    );
  };
  const addNewEvent = (e, slotInfo) => {
    var newEvents = events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setAlert(null);
    setEvents(newEvents);
  };
  const hideAlert = () => {
    setAlert(null);
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
      {alert}
        <BigCalendar
                selectable
                localizer={localizer}
                events={events}
                defaultView="month"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={(event) => selectedEvent(event)}
                onSelectSlot = {(slotInfo) => addNewEventAlert(slotInfo)}
                eventPropGetter={eventColors}
                resizeable
                style={{ height: "100vh" }}
        />        
    </>
  );
}

export default Calendar;
