import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

// export const actionForAnecdoteCreation = (inputVal) => {
//   return {type: 'CREATE', payload: {content: inputVal}}
// }

// export const actionForVoting = (id) => {
//   return {type: 'VOTE', payload: {id}}
// }
// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   } 
// }



const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      return state.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1 } : anecdote)
    },
    append: (state, action) => {
      state.push(action.payload)
      return state
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
  // switch(action.type) {
  //   case 'VOTE': {
  //     return state.map(anecdote =>  {
  //       if (anecdote.id === action.payload.id) {
  //         return {...anecdote, votes: anecdote.votes + 1}
  //       }   
  //       return anecdote
  //     })
  //   }
  //   case 'CREATE': {
  //     return [...state, {...action.payload, id: getId(), votes: 0}]
  //   }
  //   default: 
  //     return state
  // }
})
export default anecdoteSlice.reducer
export const {vote, append, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => { //**  this is a redux thunk action/function
    // This allows for example implementations of asynchronous action creators, 
    //which first wait for the completion of a certain asynchronous operation and 
    //after that dispatch some action, which changes the store's state.
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.saveAnecdoteToDb(content)
    dispatch(append(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    console.log('updatedAnecdote:', updatedAnecdote)
    dispatch(vote(anecdote.id))
  }
}