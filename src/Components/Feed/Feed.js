import React, { useState } from 'react';
import './Feed.css';
import { FaPlus } from 'react-icons/fa';

import Event from '../Event/Event';
import NewEventForm from '../NewEventForm/NewEventForm';

const Feed = (props) => {
  // console.log('Your Feed props: ', props);

  const [showEventForm, setShowEventForm] = useState(false);
  const {isLoading, eventsData, setEventsData, setSelectedEvent, handleEventClick, currentUser} = props;

  const handleShowForm = () => {
    setShowEventForm(true);
  }
  
  const eventList = eventsData.map(event => {
    return (
      <Event
        key={event._id}
        event={event}
        handleEventClick={handleEventClick}
        currentUser={currentUser}
      />
    );
  });

  return (
    <section className="feed-section">

      <div className="feed-header">
        <h2>Upcoming Games &#38; Events</h2>
        <button
          className="form-open-btn"
          type="button"
          onClick={handleShowForm}
        >
          <FaPlus className="form-open-btn-icon" />
        </button>

        {/* <div className='filters'>
          <p><span>Filters: </span>Lol riiight...in v1??</p>
          <button className='filters-btn' type='button'>sport</button>
          <button className='filters-btn' type='button'>location</button>
          <button className='filters-btn' type='button'>skill level</button>
          <button className='filters-btn' type='button'>date</button>
        </div> */}
      </div>

      <NewEventForm
        showEventForm={showEventForm}
        setShowEventForm={setShowEventForm}
        eventsData={eventsData}
        setEventsData={setEventsData}
      />
      <div className="event-list">
        {isLoading ? <div>loading...</div> : <>{eventList}</>}
      </div>
    </section>
  );
}

export default Feed;
