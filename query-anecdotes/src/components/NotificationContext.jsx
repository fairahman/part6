import { createContext, useReducer, useContext } from "react";

export const notificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `anecdote '${action.payload.content}' voted`
    case 'CREATE':
      return `anecdote '${action.payload.content}' created`  
    case 'REMOVENOTIFICATION':
      return null
    case 'ERROR':
      return 'too short anecdote, must have length 5 or more'
    default: 
     return state
  }

}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(notificationContext)
  return notificationAndDispatch[0]
}
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(notificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </notificationContext.Provider>
  )
}
export default NotificationContextProvider