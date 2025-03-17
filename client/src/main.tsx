//TO DO: Add in auth middleware to pull in id endpoints for employer and employee routes

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthService from './services/auth.tsx'

// add pages for the routes
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import About from './pages/About.tsx';
import Employer from './pages/Employer/Employer.tsx';
import Daily from './pages/Employee/Daily.tsx';
import Schedule from './pages/Employer/Schedule.tsx';
import Employees from './pages/Employer/Employees.tsx';
import Jobs from './pages/Employer/Jobs.tsx';
import Weekly from './pages/Employee/Weekly.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { 
        path: '/login', 
        element: <Login /> 
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/:company_id',
        element: <AdminRoute><Employer /></AdminRoute>,
        children: [
          {
            path: 'schedule',
            element: <Schedule />,
          },
          {
            path: 'employees',
            element: <Employees />,
          },
          {
            path: 'jobs',
            element: <Jobs />,
          },
        ]
      },
      {
        path: '/:company_id/:employee_id', // Fixed typo in 'company_id' (was 'compnay_id')
        element: <Weekly />,
        children: [
          {
            path: 'daily',
            element: <Daily />,
          },
        ]
      },
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
