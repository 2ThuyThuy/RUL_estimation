import axios from 'axios';
import React, { useState, useEffect } from 'react';
//import Aside from '../../components/user/Aside/Aside';
import Calendar from '../../components/user/Calendar/Calendar';
//import Header from '../../components/Header/Header';
import { Eventcalendar, getJson } from '@mobiscroll/react';
import HeaderUser from '../../components/HeaderUser/HeaderUser'
import Aside from '../../components/admin/Aside/Aside';

import './calendarAdmin.scss';

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



  const handleChangeViewType = (type, typeSize) => {
    setViewType(type);
    setViewTypeSize(typeSize);
  };

  return (
    <div className="calendar-dashboard">
      <HeaderUser backgroundHeader='#3C6DCD' />
      <Aside />
      <div className="calendar">
        {/* <Calendar /> */}
        <div className="view-option">
          View:
          <div className="views">
            <span
              onClick={() => handleChangeViewType('month', 1)}
              className={viewType === 'month' ? 'active' : ''}
            >
              Month
            </span>
            <span
              className={
                viewType === 'week' && viewTypeSize === 1 ? 'active' : ''
              }
              onClick={() => handleChangeViewType('week', 1)}
            >
              1 week
            </span>
            <span
              className={
                viewType === 'week' && viewTypeSize === 2 ? 'active' : ''
              }
              onClick={() => handleChangeViewType('week', 2)}
            >
              2 week
            </span>
            <span
              className={
                viewType === 'week' && viewTypeSize === 3 ? 'active' : ''
              }
              onClick={() => handleChangeViewType('week', 3)}
            >
              3 week
            </span>
          </div>
        </div>
        <Eventcalendar
          view={{
            calendar: {
              labels: true,
              type: viewType,
              size: viewTypeSize,
            },
          }}
          theme="ios"
          themeVariant="light"
          data={events}
          defaultSelectedDate={defaultDate}
        />
      </div>
    </div>
  );
};

export default CalendarAdmin;
