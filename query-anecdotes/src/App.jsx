import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './components/NotificationContext'
import { getAll, voteAnecdote } from './requests'
import { useRef } from 'react'

const App = () => {

  const notificationTimerRef = useRef(null)

  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log('anecdotes at voteAnecdoteMutation:', anecdotes)
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes )
    }
  })

  const dispatch = useNotificationDispatch()
  
  const handleVote = (anecdote) => {
    console.log('anecdoteee:', anecdote)
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current)
    }
    dispatch({type:'VOTE', payload: anecdote.content})  
    notificationTimerRef.current = setTimeout(() => {
      console.log('kemne print hoy na ai baal?')
      dispatch({type: 'REMOVENOTIFICATON'})
    }, 5000)
  }


  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]
  const queryResult = useQuery(
    {
    queryKey: ['anecdotes'], 
    queryFn: getAll,
    refetchOnWindowFocus: false
  })
  console.log('queryResult:', queryResult)

  if (queryResult.isLoading) {
    return <div>Loading data...</div>
  }
  if (queryResult.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />

      {queryResult.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
