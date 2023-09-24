import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filterVal: filterReducer,
    notification: notificationReducer
  }
})
console.log(store)

export default store