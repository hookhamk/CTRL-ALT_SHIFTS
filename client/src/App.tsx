//TO DO: confirm visiability of navbar toggle and that admin can switch back and forth
//while an employee never sees the toggle option
//TO DO: confirm how we are keeping track of the employee id - line 17

import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import EmployeeNavbar from './components/layout/EmployeeNavbar'
import EmployerNavbar from './components/layout/EmployerNavbar'
import Footer from './components/layout/footer'
import './App.css'

function App() {
  const location = useLocation();
  const hiddenNavbarRoutes = ["/login", "/", "/about"];
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeData = await fetch('/api/employee').then(res => res.json());
    setIsAdmin(employeeData.isAdmin);
  };

  fetchEmployeeData();
}, []);

const toggleNavbar = !hiddenNavbarRoutes.includes(location.pathname);

  return (
    <div>
      <header>
      {toggleNavbar && (isAdmin ? <EmployerNavbar /> : <EmployeeNavbar />)}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App;
