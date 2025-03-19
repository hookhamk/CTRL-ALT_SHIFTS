import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminRoute from './components/admin.tsx'
import Client  from './components/client.tsx';

// add pages for the routes
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import About from './pages/About.tsx';
import Employer from './pages/Employer/Employer.tsx';
import Schedule from './pages/Employer/Schedule.tsx';
import Employees from './pages/Employer/Employees.tsx';
import Jobs from './pages/Employer/Jobs.tsx';
import Contact from './pages/Contact.tsx';
import Weekly from "./pages/Employee/Weekly.tsx";
import Daily from "./pages/Employee/Daily.tsx";


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
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/:company_id',
        element: (
          <AdminRoute>
            <Employer />
          </AdminRoute>
        )
      },
      {
        path: '/:company_id/jobs',
        element: (
          <AdminRoute>
            <Jobs />
          </AdminRoute>
        )
      },
      {
        path: '/:company_id/schedule',
        element: (
          <AdminRoute>
            <Schedule />
          </AdminRoute>
        )
      },
      {
        path: '/:company_id/employees',
        element: (
          <AdminRoute>
            <Employees />
          </AdminRoute>
        )
      },
      {
        path: '/:company_id/:employee_id',
        element: <Weekly />,
      },
      {
        path: '/:company_id/:employee_id/daily',
        element: <Daily />,
      },
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={Client()}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}