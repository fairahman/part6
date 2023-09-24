import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilterVal } from '../reducers/filterReducer'
// import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    const val = event.target.value
    console.log('inputVal:', val)
    console.log(val === '')
    const filterAction = setFilterVal(val)
    console.log('filterAction:', filterAction)
    dispatch(filterAction)
    //i expect that the reducers will be invoked now to update state
  }
  const style = {
    marginBottom: 10
  }
  return (
    <input style={style} type='text' onChange={handleChange} />
  )
    
}
export default Filter