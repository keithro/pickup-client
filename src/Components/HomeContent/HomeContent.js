import React, { useEffect, useState, useContext } from 'react';
import './HomeContent.css';

import AuthContext from '../../store/auth-context';
import Nav from '../../components/Nav/Nav';
import UserInfo from '../../components/UserInfo/UserInfo';
import Feed from '../../components/Feed/Feed';
import EventInfo from '../../components/EventInfo/EventInfo';


const HomeContent = (props) => {
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    avatar: '',
    followers: [],
    following: [],
    invites: [],
    desc: '',
    location: '',
  })
  const [selectedEvent, setSelectedEvent] = useState({
    creatorID: '',
    title: '',
    details: '',
    eventDate: '',
    createdDate: '',
    location: '',
    sport: '',
    skillLevel: '',
    creatorName: '',
    creatorAvatar: '',
    comments: [],
    going: [],
    likes: [],
  });
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  }

  const makeApiCall = async () => {
    setIsLoading(true);

    const userRes = await fetch('http://localhost:4000/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authContext.token
      },
      body: JSON.stringify(),
    });
    const userData = await userRes.json();
    // console.log('USER DATA: ', userData)

    const eventRes = await fetch('http://localhost:4000/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authContext.token
      },
      body: JSON.stringify(),
    });
    const eventData = await eventRes.json();
    console.log('ALL EVENT DATA: ', eventData)

    if(eventData.errors) {
      const eventErrors = eventData.errors[0] || eventData.errors;
      console.log('Your errors variable = ', eventErrors);
    } else if (userData.errors) {
      const userErrors = eventData.errors[0] || eventData.errors;
      console.log('Your errors variable = ', userErrors);
    } else {
      // create function: 'updateStates' to update all at once
      setEventsData(eventData.events);
      setCurrentUser(userData);
      if (eventData.events[0]) {
        setSelectedEvent(eventData.events[0]);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    makeApiCall();
  }, []);

  // TODO: MOVE NAV TO HOME AND SHOW ONLY IF LOGGED IN.

  return (
    <div className="home-content">
      <Nav />
      <main className="home-content-container">
        <UserInfo isLoading={isLoading} currentUser={currentUser} />
        <Feed
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          eventsData={eventsData}
          setEventsData={setEventsData}
          setSelectedEvent={setSelectedEvent}
          handleEventClick={handleEventClick}
          token={authContext.token}
          currentUser={currentUser}
        />
        <EventInfo
          isLoading={isLoading}
          currentUser={currentUser}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </main>
    </div>
  );
}

export default HomeContent;
