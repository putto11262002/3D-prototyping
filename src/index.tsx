import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RotatingCube from './RotatingCube';
import SolarSystem from './SolarSystem';
import StripBrush from './StripBrush';


const router = createBrowserRouter([
  {
    path: "/rotating-cube",
    element: <RotatingCube/>
  },
  {
    path: "/solar-system",
    element: <SolarSystem/>
  },
  {
    path: "/",
    element: <StripBrush/>
  },

])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


