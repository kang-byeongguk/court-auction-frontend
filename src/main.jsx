import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import store from './app/store'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
     <Provider store={store}>
     <BrowserRouter>
    <App />
    </BrowserRouter>
     </Provider>
     </QueryClientProvider>
  </StrictMode>,
)
