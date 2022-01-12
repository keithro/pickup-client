import React, { useEffect, useState } from 'react';
import './Feed.css';
import { FaPlus } from 'react-icons/fa';

import Event from '../Event/Event';

const Feed = (props) => {
  const [showEventForm, setShowEventForm] = useState(false);
  // Probably need own loading state
  const {isLoading, setIsLoading, eventList, setEventList, setSelectedEvent, handleEventClick, currentUser, token} = props;

  const [input, setInput] = useState({
    title: '',
    details: '',
    eventDate: '',
    location: '',
    sport: '',
    skillLevel: '',
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

    setSelectedEvent(data.event);
    setEventList([data.event, ...eventList]);
    setInput({
      title: '',
      details: '',
      eventDate: '',
      location: '',
      sport: '',
      skillLevel: '',
    });
    setShowEventForm(false);

  }

  const handleShowForm = () => {
    setShowEventForm(true);
  }

  const handleCloseForm = () => {
    setShowEventForm(false);
  }

  const handleCancel = () => {
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

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value});
  }
  
  const eventListJSX = eventList.map(event => {
    return (
      <Event
        key={event.id}
        event={event}
        handleEventClick={handleEventClick}
        token={token}
        currentUser={currentUser}
      />
    );
  });

  const modalBGClasses = ['modal-bg', showEventForm ? 'modal-open' : 'modal-closed'].join(' ');
  const formClasses = ['event-form', showEventForm ? 'modal-open' : 'modal-closed'].join(' ');

  return (
    <section className='feed-section'>
      <div className='form-container'>
        <div className='feed-header'>
          <h2>Upcomeing Events</h2>
          <button className='form-open-btn' type='button' onClick={handleShowForm}>
            {/* <FaPlus style={{color: 'black', fontSize: '20px'}}/> */}
            <FaPlus className='form-open-btn-icon'/>
          </button>
        </div>
        
        {/* <div className='filters'>
          <p><span>Filters: </span>Lol riiight...in v1??</p>
          <button className='filters-btn' type='button'>sport</button>
          <button className='filters-btn' type='button'>location</button>
          <button className='filters-btn' type='button'>skill level</button>
          <button className='filters-btn' type='button'>date</button>
        </div> */}

        <div className={modalBGClasses} onClick={handleCloseForm} >
        </div>
          <form className={formClasses} onSubmit={handleSubmitEvent}>
            <h2 className='form-header'>New Game</h2>
            
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

            <div className='button-container'>
              <button type='submit' disabled={isLoading}>Submit</button>
              <button className='form-toggle-btn' type='button' onClick={handleCancel}>Cancel</button>
            </div>
            
          </form>
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
