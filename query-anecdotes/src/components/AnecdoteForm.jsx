import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "./NotificationContext"
import { useRef } from "react"
const AnecdoteForm = () => {
  const notificationTimerRef = useRef(null)
  const queryClient = useQueryClient()
  // console.log('queryData:',queryClient.getQueryData(['anecdotes']))
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      // console.log('newAnecdote at newAnecdoteCreation', newAnecdote)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current)
      }
      dispatch({type: 'CREATE', payload: newAnecdote})
      notificationTimerRef.current = setTimeout(() => dispatch({ type: 'REMOVENOTIFICATION' }), 5000)

    },
    onError: (error) => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current)
      }
      dispatch({type: 'ERROR'})
      notificationTimerRef.current = setTimeout(() => dispatch({type: 'REMOVENOTIFICATION' }), 5000)
      console.log('error at onError of anecdoteMutation', error)
      
    
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
