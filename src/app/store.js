import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const urlSlice = createSlice({
  name: 'url',
  initialState:"http://127.0.0.1:8000/api",
  reducers: {
  }
})

export default configureStore({
  reducer: {
    url:urlSlice.reducer
  }
})



