import React, { useEffect, useState } from 'react';
import './EventInfo.css';

const EventInfo = (props) => {
  console.log('Your Event Info Props: ', props);
  const { title, creatorAvatar, details, eventDate, location, skillLevel, sport} = props.selectedEvent;

  return (
    <section className='event-info-section'>
      <h2>Event Info</h2>
      {props.isLoading ? 
          <div>loading...</div>
        : 
          <>
            <h3 className='title'>{title}</h3>
            <p className='eventDate'><span>Date:</span>{eventDate}</p>
            <p className='location'><span>Location:</span>{location}</p>
            <p className='sport'><span>Sport:</span>{sport}</p>
            <p className='skillLevel'><span>Skill Level:</span>{skillLevel}</p>
            <p className='details'><span>Additional Info:</span>{details}</p>
          </>
        }
    </section>
  )
}

export default EventInfo;
