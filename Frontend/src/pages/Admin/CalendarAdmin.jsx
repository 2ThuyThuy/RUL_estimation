import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Aside from '../../components/admin/Aside/Aside';
import HeaderUser from '../../components/HeaderUser/HeaderUser'
import './calendarAdmin.scss';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
// import './userCalendar.scss';



moment.locale("en-GB");
const localizer = momentLocalizer(moment)

const CalendarAdmin = () => {
  const [viewType, setViewType] = useState('month');
  const [viewTypeSize, setViewTypeSize] = useState(1);

  const [defaultDate, setDefaultDate] = useState(null);

  const [events, setEvents] = useState([
    {
      start: new Date("2020-05-18"),
      end: new Date("2020-05-18"),
      title: 'test',
      color: 'back',
    }
  ]);
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   getJson('https://example.com/events/', (events) => {
  //     setEvents(events);
  //   });
  // }, []);

  

  const get_events = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_admin/calendar_admin`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      const res = response.data.data
      console.log(res)
      setDefaultDate(new Date(res.date_now))
      console.log(res.date_now)
      if (res.data_events.length > 0)
        {
          console.log(res.data_events.length)
          const new_events = []
          for (const element of res.data_events) {
            const new_element = {
              start: new Date(element.start),
              end: new Date(element.end),
              title: element.title,
              color: element.color,
            }
            
            new_events.push(new_element)
          }
          new_events.push({
             start: new Date(res.date_now),
              end: new Date(res.date_now),
              title: "day now",
              color: "green",
          })
          setEvents(new_events)

        }

  
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    get_events()
  },[])





  return (
    <div className="calendar-dashboard">
      <HeaderUser backgroundHeader='#3C6DCD' />
      <Aside />
      <div className="calendar" style={{ height: 800,width:"auto", paddingTop:"100px"  }}>
      { defaultDate&&  <Calendar
            selectable
            localizer={localizer}
            defaultDate={defaultDate}
            defaultView="month"
            events={events}
            eventPropGetter={(events) => {
                const backgroundColor = events.color;
                return { style: { backgroundColor } }
              }}
            style={{ width:"80%",
            paddingTop:"50px",
           paddingLeft:"100px",
           paddingRight:"100px",
           background:"white"}}
        />}
      </div>
    </div>
  );
};

export default CalendarAdmin;
