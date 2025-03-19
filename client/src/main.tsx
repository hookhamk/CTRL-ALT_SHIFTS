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
import Welcome from "./pages/Employee/Welcome.tsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      {
        path: '/:company_id',
        element: (
          <AdminRoute>
            <Employer />
          </AdminRoute>
        ),
        children: [
          { path: 'jobs', element: <Jobs /> },
          { path: 'schedule', element: <Schedule /> },
          { path: 'employees', element: <Employees /> },
        ]
      },
      {
        path: '/:company_id/:employee_id',
        element: <Welcome />, // This acts as the parent for employee-related pages
        children: [
          { path: 'weekly', element: <Weekly /> },
          { path: 'daily', element: <Daily /> }
        ]
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={Client()}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}