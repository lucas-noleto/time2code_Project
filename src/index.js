import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from "./Pages/Home"
import Contact from "./Pages/Contact"
import Company from "./Pages/Company"
import NewProject from "./Pages/NewProject"
import Project from './Pages/Project';

import  {createBrowserRouter, RouterProvider, Route} from "react-router-dom"
import Projects from './Pages/Projects';



const router = createBrowserRouter([
  {
      element: <App/>,
      children: [
          {
              path: "/",
              element: <Home />
          },
          {
              path:"/contact",
              element: <Contact/>
          },
          {
            path:"/company",
            element: <Company/>
          },
          {
            path:"/new_project",
            element: <NewProject/>
          },{
            path:"/projects",
            element: <Projects/>
          },{
            path:"/project/:id",
            element: <Project/>
          }
    ]
  }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
 