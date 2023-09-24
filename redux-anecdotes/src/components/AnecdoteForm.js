import React from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification, setNotification } from '../reducers/notificationReducer'
export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  
  
    

    // const removeNotificationAction = removeNotification()
    // console.log('removeNotificationAction', removeNotificationAction)
    // setTimeout(() => dispatch(removeNotificationAction), 5000) 

  

  const handleAnecdotecreation = async (event) => {
    event.preventDefault()
    const content = event.target.inputAnecdote.value
    event.target.inputAnecdote.value = ''
    
    dispatch(createAnecdote(content)) // dispatching thunk action

    dispatch(setNotification(`Anedote ${content} added!`, ))
    
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAnecdotecreation}>
        <div> <input name='inputAnecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}
