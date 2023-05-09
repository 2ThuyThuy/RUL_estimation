import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Aside from '../../components/user/Aside/Aside';
// import Calendar from '../../components/user/Calendar/Calendar';
import { useNavigate } from 'react-router-dom';
//import Header from '../../components/Header/Header';
// import { Eventcalendar, getJson } from '@mobiscroll/react';
import HeaderUser from '../../components/HeaderUser/HeaderUser'
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
// import './userCalendar.scss';



moment.locale("en-GB");
const localizer = momentLocalizer(moment)


const CalendarAdmin = () => {
  // const [viewType, setViewType] = useState('month');
  // const [viewTypeSize, setViewTypeSize] = useState(1);
  const navigate = useNavigate();
  const [defaultDate, setDefaultDate] = useState(null);
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
    // {
    //   start: new Date("2020-05-18"),
    //   end: new Date("2020-05-18"),
    //   title: 'test',
    //   color: 'back',
    // },
    // {
    //   title: "All Day Event very long title",
    //   allDay: true,
    //   start: new Date(2023, 6, 1),
    //   end: new Date(2023, 6, 1)
    // },

  ]);
  let userToken = null

  userToken = sessionStorage.getItem('token');


  const get_events = async () => {

    if(userToken === null) {
      console.log("errrrr")
      navigate('/')
      
    }else {
      setUsername(sessionStorage.getItem('user_name').replaceAll('"',''));
      userToken = userToken.replaceAll('"','')
    }

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_client/calendar_client`,
      headers: {
        'Authorization': `Bearer ${userToken}`
       }
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
            new_events.push({
              start: new Date(res.date_now),
               end: new Date(res.date_now),
               title: "day now",
               color: "green",
           })
            new_events.push(new_element)
          }
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
    <HeaderUser backgroundHeader='#3C6DCD' nameUser={username} />
    <Aside />

    <div className="calendar" style={{ height: 800,width:"auto", paddingTop:"100px"  }}>
      {defaultDate&& <Calendar
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
           paddingRight: "100px",
           background:"white"}}
        />}
      </div>
    </div>
  );
};

export default CalendarAdmin;
