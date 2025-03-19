import { Outlet } from "react-router-dom";

const Welcome = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const employee_name = user.first_name;
  
  return (
    <div>
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h1 className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-slate-950 sm:text-5xl">
        Welcome {employee_name}!</h1>
        <p className="pl-4 pb-6 text-pretty">We are happy to have you on the team! Please select a schedule view from your navigation bar to see your shifts.</p>
      </div>
      <div>
      <Outlet /> 
      </div>
    </div>
  );
};

export default Welcome;
