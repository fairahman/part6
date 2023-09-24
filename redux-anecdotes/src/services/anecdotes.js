import axios from 'axios'
const baseUrl = 'http://localhost:3001'
const getAll = async () => {
  try {
    const url = `${baseUrl}/anecdotes`
    const {data} = await axios.get(url)
    return data
  }
  catch(error) {
    console.log('error at anecdotes/getAll():', error)
  }
}
const saveAnecdoteToDb = async (content) => {
  try {
    const url = `${baseUrl}/anecdotes`
    const anecdote = {content, votes: 0}
  const {data} = await axios.post(url, anecdote)
  // console.log('savedAnecdote:', savedAnecdote)
  return data
  }
  catch(error) {
    console.log('error at anecdotes/savedAnecdoteToDb():', error)
      
  } 
}
const voteAnecdote = async (anecdote) => {
  const url = baseUrl + '/anecdotes/' + anecdote.id
  console.log('anecdote param at voteAnecdote:', anecdote)
  const {data} = await axios.put(url, {...anecdote, votes: anecdote.votes + 1})
  return data

}
 

export default  { getAll, saveAnecdoteToDb, voteAnecdote }