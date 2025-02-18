import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const urlSlice = createSlice({
  name: 'url',
  //배포묭 IPv4 주소
  initialState:"https://54.180.66.23/api/",
  //로컬용 url
  // initialState:"http://127.0.0.1:8000/api/",
  reducers: {
  }
})

export default configureStore({
  reducer: {
    url:urlSlice.reducer
  }
})



