import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../services/mutations';
import AuthService from '../services/auth';
import logo from '../assets/logo.png';

export default function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, loading }] = useMutation(LOGIN);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      console.log('Attempting login with:', formState);
      const { data } = await login({
        variables: { ...formState },
      });

      console.log('Login response:', data);
      
      if (!data || !data.login || !data.login.token) {
        setLoginError('Invalid login response');
        return;
      }

      // Store token and user info
      AuthService.login(data.login.token);
      
      // Log the decoded token for debugging
      console.log('Token info:', AuthService.getProfile());
      
      // Redirect based on user role
      if (AuthService.isAdmin()) {
        console.log('Admin login - redirecting to:', `/${data.login.employee.company_id}`);
        navigate(`/${data.login.employee.company_id}`);
      } else {
        console.log('Employee login - redirecting to:', `/${data.login.employee.company_id}/${data.login.employee._id}`);
        navigate(`/${data.login.employee.company_id}/${data.login.employee._id}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Login failed. Please check your credentials.');
    }
  };

    return (
    <div className="bg-stone-200 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto flex flex-col items-center">
        <img
          alt="CTRL+ALT+SHIFTS"
          src={logo}
          className="w-24 h-auto object-contain"
        />
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-500 sm:text-sm/6"
                onChange={(e) => setFormState({...formState, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-slate-700 hover:text-cyan-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-500 sm:text-sm/6"
                onChange={(e) => setFormState({...formState, password: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
            >
              Sign in
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>GraphQL Error: {error.message}</p>
          </div>
        )}
        
        {loginError && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{loginError}</p>
          </div>
        )}
        
        {loading && (
          <div className="mt-4 text-center">
            <p>Loading...</p>
          </div>
        )}

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          No account? Check with your employer.
        </p>
      </div>
    </div>
  );
}