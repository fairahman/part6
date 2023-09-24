import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
export const AnecdoteList = () => {
  
  const {anecdotes, filterVal} = useSelector(state => state)
  console.log('anecdotes:', anecdotes, 'filterVal:', filterVal)
  const dispatch = useDispatch()
  
  const handleVoting = (anecdote) => {
    // **
    // const action = vote(id)
    // dispatch(action)
    // //** */
    console.log('im here') 
    dispatch(voteAnecdote(anecdote))

    // NOTIFICATION CODE:

    //  const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    //  const notifCreatingAction = createNotification(`you voted '${anecdote.content}'!`)
    //  dispatch(notifCreatingAction)
    //  const notifRemovingAction = removeNotification()
    dispatch(setNotification(`you voted '${anecdote.content}'!`, 5000))
    // setTimeout(() => dispatch(notifRemovingAction), 5000)

    
  }
  let sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
  
  if (filterVal) {
    sortedAnecdotes = sortedAnecdotes.filter(({ content }) => {
      console.log(filterVal)
      for (let i = 0; i < filterVal.length ; i++) {
        console.log("anecdote.content:", content)
        if (filterVal[i].toLowerCase() !== content[i]?.toLowerCase()) {
          return false
        }
      }
      return true
    })
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVoting(anecdote)}>vote</button>
            </div>
          </div>)
      }
    </div>
  )
}
