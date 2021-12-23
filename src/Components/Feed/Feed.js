import React, { useEffect, useState } from 'react';
import './Feed.css';

import Event from '../Event/Event';

const Feed = (props) => {
  const [showEventForm, setShowEventForm] = useState(false);
  // Probably need own loading state
  const {isLoading, setIsLoading, eventList, setEventList, setSelectedEvent, handleEventClick, currentUser, token} = props;

  const [input, setInput] = useState({
    // creator: '',
    title: '',
    details: '',
    eventDate: '',
    location: '',
    sport: '',
    skillLevel: '',
    // creatorName: '',
    // creatorAvatar: '',
  });

  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    
    const res = await fetch('http://localhost:4000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': props.token
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();

    // setIsLoading(false);

    console.log('EVENT DATA', data.event);

    setSelectedEvent(data.event);
    setEventList([data.event, ...eventList]);
    setShowEventForm(false);
    setInput({
      title: '',
      details: '',
      eventDate: '',
      location: '',
      sport: '',
      skillLevel: '',
    });

  }

  const handleToggleShowForm = () => {
    setShowEventForm(!showEventForm);
  }

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value});
  }
  
  const eventListJSX = eventList.map(event => {
    return <Event event={event} handleEventClick={handleEventClick} token={token} currentUser={currentUser} />
  })

  return (
    <section className='feed-section'>
      <div>
        <h2>Upcomeing Events:</h2>
        <button type='button' onClick={handleToggleShowForm}>Add</button>
        {showEventForm && 
          <form className='event-form' onSubmit={handleSubmitEvent}>
          
            <label for='title' className={input.title || 'placeholder-hidden'}>title (required)</label>
            <input type='text' name='title' placeholder='title' value={input.title} onChange={handleInputChange} className='title' />
          
            <label for='details' className={input.details || 'placeholder-hidden'}>details</label>
            <input type='text' name='details' placeholder='details' value={input.details} onChange={handleInputChange} className='details' />
          
            <label for='eventData' className={input.eventData || 'placeholder-hidden'}>game data</label>
            <input type='text' name='eventData' placeholder='game data' value={input.eventData} onChange={handleInputChange} className='eventData' />
          
          <label for='location' className={input.location || 'placeholder-hidden'}>location</label>
          <input type='text' name='location' placeholder='location' value={input.location} onChange={handleInputChange} className='location' />
          
          <label for='sport' className={input.sport || 'placeholder-hidden'}>sport (required)</label>
          <input type='text' name='sport' placeholder='sport' value={input.sport} onChange={handleInputChange} className='sport' />
          
          <label for='skillLevel' className={input.skillLevel || 'placeholder-hidden'}>skill level</label>
          <input type='text' name='skillLevel' placeholder='skill level' value={input.skillLevel} onChange={handleInputChange} className='skillLevel' />

          <button type='submit' disabled={isLoading}>Submit</button>
            
          </form>
        }
      </div>
      <div className='event-list'>
        {isLoading ? 
          <div>loading...</div>
        : 
          <>
            {eventListJSX}
          </>
        }
      </div>
    </section>
  )
}

export default Feed;
