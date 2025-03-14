import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //local 개발용 base
  base:'/',
  //배포시 base
  // base:'/static/dist/',
  plugins: [react()],
})
