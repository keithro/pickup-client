import React, { useEffect, useState } from 'react';
import './EventInfo.css';

const EventInfo = (props) => {
  const event = props.selectedEvent;

  return (
    <section className='event-info-section'>
      <h2>Event Info Component</h2>
      {props.isLoading ? 
          <div>loading...</div>
        : 
          <>
            <h2>{event.title}</h2>
          </>
        }
    </section>
  )
}

export default EventInfo;
