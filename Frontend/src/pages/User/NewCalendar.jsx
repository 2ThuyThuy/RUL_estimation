import React, { useState } from "react";
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import events from "./events";
import moment from 'moment'
moment.locale("en-GB");
const localizer = momentLocalizer(moment)

function NewCalendar() {
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [username, setUsername] = useState("thuythuy")

  const [events, setEvents] = useState([
    {
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2023, 6, 1),
      end: new Date(2023, 6, 1)
    },
    {
      title: "Long Event",
      color : 'blue',
      start: new Date(2023, 4, 7),
      end: new Date(2023, 4, 7)
    },
    {
      title: "All Day Event very long title",
      allDay: true,
      color: "orange",
      start: new Date(2023, 4, 1),
      end: new Date(2023, 4, 1)
    },
    ]);
    // const [eventsData, setEventsData] = useState(events);
    return (
        <div style={{ height: 700 }}> 
        {/* <Calendar  /> */}
        <Calendar
            views={["day", "agenda", "work_week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            eventPropGetter={(events) => {
                const backgroundColor = events.color;
                return { style: { backgroundColor } }
              }}
            style={{ width: "60%"}}
        />
        </div>
    );
  }
  
  export default NewCalendar;
  