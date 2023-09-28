import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await  axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) throw new Error('anecdote length must be atleast 5 characters long!');
  const response = await axios.post(baseUrl, newAnecdote)
  console.log('response at createAnecdote', response)
  return response.data
}

export const voteAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  console.log("response.data", response.data)
  return response.data
}