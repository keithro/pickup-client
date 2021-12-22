import React, { useEffect, useState } from 'react';
import './Feed.css';

import Event from '../Event/Event';

const Feed = (props) => {
  const {isLoading, eventList, handleEventClick} = props;

  
  const eventListJSX = eventList.map(event => {
    // console.log(event._id);
    // console.log(event.title);
    return <Event event={event} handleEventClick={handleEventClick} />
    // return <Event event={event} onClick={() => handleEventClick(event._id)} />
    
    // return <p onClick={() => handleEventClick(event._id)}>{event.title}</p>
  })

  return (
    <section className='feed-section'>
      <div>Add Event Form</div>
      <div>
        {isLoading ? 
          <div>loading...</div>
        : 
          <>
            <h2>Event list will go here</h2>
            {eventListJSX}
          </>
        }
      </div>
    </section>
  )
}

export default Feed;
