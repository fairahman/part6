import { createSlice } from "@reduxjs/toolkit"

// export const filterChange = (val) => {
//   return {type: 'SET_FILTER_VAL', payload: val}
// }
const initialState = null
// expected action obj -> {type: 'SET_FILTER_VAL', payload: filterVal(a variable)}
 const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterVal: (state, action) => {
      state = action.payload
      console.log('action.payload:', action.payload)
      return state
    }
  }
  // switch(action.type) {
  //   case 'SET_FILTER_VAL': {
  //     return action.payload
  //   }
  //   default: return state
  // }
})
export const  {setFilterVal} = filterSlice.actions
export default filterSlice.reducer