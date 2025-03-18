import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import EmployeeNavbar from './components/layout/employee_nav'
import EmployerNavbar from './components/layout/employer_nav'
import Footer from './components/layout/footer'
import './index.css';

function App() {
  const location = useLocation();
  const hiddenNavbarRoutes = ["/login", "/", "/about", "/contact"];
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('/api/employee');
        if (response.ok) {
          const employeeData = await response.json();
          setIsAdmin(employeeData.isAdmin);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setIsLoggedIn(false);
      }
    };

  fetchEmployeeData();
}, []);

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
