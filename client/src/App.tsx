import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { Outlet, useLocation } from 'react-router-dom'
import EmployeeNavbar from './components/layout/employee_nav'
import EmployerNavbar from './components/layout/employer_nav'
import Footer from './components/layout/footer'
import { GET_ME } from './services/queries';
import './index.css';

function App() {
  const location = useLocation();
  const hiddenNavbarRoutes = ["/login", "/", "/about", "/contact"];
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data, loading, error } = useQuery(GET_ME);

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error('Error fetching employee data:', error);
      setIsLoggedIn(false);
      return;
    }
    if (data && data.employee) {
      setIsAdmin(data.employee.access_level);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data, loading, error]);

const toggleNavbar = !hiddenNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
      {toggleNavbar && isLoggedIn && (isAdmin ? <EmployerNavbar /> : <EmployeeNavbar />)}
      </header>
      <main className="bg-stone-200 flex-grow flex items-center justify-center">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App;
