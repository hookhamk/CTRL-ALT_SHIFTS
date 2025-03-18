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
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.accessLevel !== undefined) {
      setIsAdmin(user.accessLevel);
      console.log(user.accessLevel);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

const toggleNavbar = !hiddenNavbarRoutes.includes(location.pathname);

console.log('isAdmin:', isAdmin);
console.log('toggleNavbar:', toggleNavbar);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
      {toggleNavbar && isLoggedIn && (isAdmin ? <EmployerNavbar /> : <EmployeeNavbar isAdmin={isAdmin} />)}
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
