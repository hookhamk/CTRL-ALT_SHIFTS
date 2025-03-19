import auth from '../../services/auth';
import logo from '../../assets/logo.png';

export default function EmployerNavbar() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const company_id = user.companyId;
    return (
        <div className=" bg-slate-400">
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
                        <div className="flex flex-wrap space-x-4">
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <a href={`/${company_id}/schedule`} className="rounded-md px-3 py-2 text-sm font-medium text-yellow-50 hover:bg-slate-700 hover:text-white">
                                Schedule
                            </a>
                            <a
                                href={`/${company_id}/employees`} 
                                className="rounded-md px-3 py-2 text-sm font-medium text-yellow-50 hover:bg-slate-700 hover:text-white"
                            >
                                Employees
                            </a>
                            <a
                                href={`/${company_id}/jobs`} 
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
            </div>
        </div>
    )
}