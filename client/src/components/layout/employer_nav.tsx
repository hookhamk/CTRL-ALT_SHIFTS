import auth from '../../services/auth';
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import logo from '../../assets/logo.png';

export default function EmployerNavbar() {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className=" bg-slate-400 mx-auto sm:px-6 lg:px-8">
            <div className="flex h-30 items-center justify-between">
                <div className="flex items-center">
                    <div className="shrink-0">
                        <img
                            alt="CRTL+ALT+SHIFTS"
                            src={logo}
                            className="w-24 h-auto object-contain"
                        />
                    </div>
                     <div className="hidden sm:ml-6 sm:block">
                         <div className="flex space-x-4">
                             {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                             <a href="/daily" className="rounded-md px-3 py-2 text-sm font-medium text-yellow-50 hover:bg-slate-700 hover:text-white">
                                 Schedule
                             </a>
                             <a
                                 href='/:company_id/:employee_id'
                                 className="rounded-md bg-slate-950 px-3 py-2 text-sm font-medium text-white"
                             >
                                 Employees
                             </a>
                             <a
                                 href='/'
                                 className="rounded-md px-3 py-2 text-sm font-medium text-yellow-50 hover:bg-slate-700 hover:text-white"
                             >
                                 Jobs
                             </a>
                             <a
                                 onClick={() => auth.logout()}
                                 href='/'
                                 className="rounded-md px-3 py-2 text-sm font-medium text-yellow-50 hover:bg-slate-700 hover:text-white"
                             >
                                 Logout
                             </a>
                         </div>
                     </div>
                 </div>
                 <div className="hidden sm:ml-6 sm:block">
                     <div className="flex items-center">
                         <div>
                             <Switch
                                 checked={enabled}
                                 onChange={setEnabled}
                                 className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:outline-hidden data-checked:bg-lime-500"
                             >
                                 <span className="sr-only">Access toggle</span>
                                 <span
                                     aria-hidden="true"
                                     className="pointer-events-none inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out group-data-checked:translate-x-5"
                                 />
                             </Switch>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
        )
    }