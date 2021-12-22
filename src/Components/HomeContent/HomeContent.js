import React, { useEffect, useState, useContext } from 'react';
import './HomeContent.css';

import AuthContext from '../../store/auth-context';
import Nav from '../../components/Nav/Nav';
import UserInfo from '../../components/UserInfo/UserInfo';
import Feed from '../../components/Feed/Feed';
import EventInfo from '../../components/EventInfo/EventInfo';


const HomeContent = (props) => {
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const handleEventClick = (event) => {
    console.log(event);
    setSelectedEvent(event);
  }

  const makeApiCall = async () => {
    setIsLoading(true);

    const res = await fetch('http://localhost:4000/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authContext.token
      },
      body: JSON.stringify(),
    });
    const data = await res.json();

    setIsLoading(false);

    if(data.errors) {
      const errors = data.errors[0] || data.errors;
      console.log('Your errors variable = ', errors);
    } else {
      setEventList(data.events);
      setSelectedEvent(data.events[0]);
    }
  };

  useEffect(() => {
    makeApiCall();
  }, []);

  // console.log('Your eventList: ', eventList);
  // console.log('Your selectedEvent: ', selectedEvent);

  return (
    <div className='home-content'>
        <Nav />
        <main className='home-content-container'>
          <UserInfo />
          <Feed isLoading={isLoading} eventList={eventList} handleEventClick={handleEventClick} />
          <EventInfo isLoading={isLoading} selectedEvent={selectedEvent} />
        </main>
    </div>
  )
}

export default HomeContent;
