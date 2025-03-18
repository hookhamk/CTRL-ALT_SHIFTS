import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Switch } from '@headlessui/react'
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
const [enabled, setEnabled] = useState(false);

const handleSwitchChange = () => {
    setEnabled(!enabled);
  };


console.log('isAdmin:', isAdmin);
console.log('toggleNavbar:', toggleNavbar);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-400 pr-4 flex justify-between items-center flex-row-reverse">
      {toggleNavbar && isLoggedIn && (
          <>
            {isAdmin && (
              <Switch
                checked={enabled}
                onChange={handleSwitchChange}
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:outline-hidden data-checked:bg-lime-500"
              >
                <span className="sr-only">Toggle Navbar</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out group-data-checked:translate-x-5"
                />
              </Switch>
            )}
            {enabled ? <EmployerNavbar /> : <EmployeeNavbar />}
          </>
        )}
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
