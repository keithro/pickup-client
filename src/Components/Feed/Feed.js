import React, { useState } from 'react';
import './Feed.css';
import { FaPlus } from 'react-icons/fa';

import Event from '../Event/Event';

const Feed = (props) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://pick-up-api.herokuapp.com';
  const [showEventForm, setShowEventForm] = useState(false);
  const {isLoading, setIsLoading, eventsData, setEventsData, setSelectedEvent, handleEventClick, currentUser, token} = props;
  const initialFormVals = {
    title: '',
    details: '',
    eventDate: '',
    location: '',
    sport: '',
    skillLevel: '',
  }

  const [input, setInput] = useState(initialFormVals);

  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const res = await fetch(`${API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': props.token
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    console.log(data);

    // ORIGINAL
    // setEventsData([...eventsData, data.event]);
    // SECOND ITERATION
    // const newEventsArray = [...eventsData].unshift(data.event)
    // setEventsData(newEventsArray);
    // THIRD ITERATION
    // setEventsData((eventsData) => {
    //   return [...eventsData].unshift(data.event);
    // })
    // FOURTH ITERATION
    setEventsData((eventsData) => {
      return [...eventsData, data.event];
    })
    setSelectedEvent(data.event);
    setInput(initialFormVals);
    setShowEventForm(false);

    setIsLoading(false);
  }

  const handleShowForm = () => {
    setShowEventForm(true);
  }

  const handleCloseForm = () => {
    setShowEventForm(false);
  }

  const handleCancel = () => {
    setShowEventForm(false);
    setInput(initialFormVals);
  }

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value});
  }
  
  const eventList = eventsData.map(event => {
    return (
      <Event
        key={event._id}
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
          <h2>Upcoming Games &#38; Events</h2>
          <button className='form-open-btn' type='button' onClick={handleShowForm}>
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
            <input autoFocus type='text' name='title' placeholder='title' value={input.title} onChange={handleInputChange} className='title' />
          
            <label for='details' className={input.details || 'placeholder-hidden'}>details</label>
            <input type='text' name='details' placeholder='details' value={input.details} onChange={handleInputChange} className='details' />
          
            <label for='eventDate' className={input.eventDate || 'placeholder-hidden'}>game date</label>
            <input type='date' min='2020-01-01' name='eventDate' placeholder='game date' value={input.eventDate} onChange={handleInputChange} className='eventDate' />
          
            {/* <label for='eventTime' className={input.eventTime || 'placeholder-hidden'}>game time</label>
            <input type='time' min='2020-01-01' name='eventTime' placeholder='game time' value={input.eventTime} onChange={handleInputChange} className='eventTime' /> */}
          
            <label for='location' className={input.location || 'placeholder-hidden'}>location</label>
            <input type='text' name='location' placeholder='location' value={input.location} onChange={handleInputChange} className='location' />
            
            <label for='sport' className={input.sport || 'placeholder-hidden'}>sport (required)</label>
            <input type='text' name='sport' placeholder='sport' value={input.sport} onChange={handleInputChange} className='sport' />
            
            <label for='skillLevel' className={input.skillLevel || 'placeholder-hidden'}>skill level</label>
            <select name='skillLevel' id='skillLevel' value={input.skillLevel} onChange={handleInputChange} className='skillLevel' >
              <option value='Any'>Any</option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Advanced'>Advanced</option>
            </select>

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
            {eventList}
          </>
        }
      </div>
    </section>
  )
}

export default Feed;
