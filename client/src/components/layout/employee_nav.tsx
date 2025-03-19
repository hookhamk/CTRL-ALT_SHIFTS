import logo from '../../assets/logo.png';
import auth from '../../services/auth';


const EmployeeNavbar = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const employee_id = user.id;
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
                        <div className="sm:ml-6 sm:block">
                            <div className="flex flex-wrap space-x-4 basis-1/4 md:basis-1/3">
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <a href={`/${company_id}/${employee_id}/daily`} className="rounded-md px-3 py-2 text-sm font-medium text-yellow-50 hover:bg-slate-700 hover:text-white">
                                Daily Schedule
                            </a>
                            <a
                                href={`/${company_id}/${employee_id}/weekly`}
                                className="rounded-md px-3 py-2 text-sm font-medium text-yellow-50 hover:bg-slate-700 hover:text-white"
                            >
                                Weekly Schedule
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
                    </div>
                </div>
            </div>
    )
}

export default EmployeeNavbar;