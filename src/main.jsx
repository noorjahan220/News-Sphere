import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {

  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProvider from './Providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
   
      <QueryClientProvider client={queryClient}>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router} />
          <Toaster />
          
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
