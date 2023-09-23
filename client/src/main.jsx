import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './LandingPage.jsx';
import PriorityList from './PriorityList.jsx';
import Chatbot from './Chatbot';

const router = createBrowserRouter([
  {
    path:"/",
    element: <LandingPage />
  },
  {
    path:"/priority-list",
    element:<PriorityList/>
  },
  {
    path:"/chatbot",
    element:<Chatbot/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
