import React, { useEffect, useState } from 'react';
import './Event.css';

const Event = (props) => {
  // console.log('Your Event props: ', props);

  // [ creator, title, sport, eventDate, likes, going] = props

  return (
    <div className='event-card' onClick={() => props.handleEventClick(props.event)}>
      <h1>This is the Event component</h1>
      <p>{props.event.title}</p>

    </div>
  )
}

export default Event;
