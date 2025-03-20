import { Link } from 'react-router-dom';
import Modal from '../../components/ui/modal';
import { useState } from 'react';
import { UsersIcon, BriefcaseIcon, ClockIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'

function Employer() {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const employee_name = user.first_name;
  const company_id = user.company_id;

  return (
    <div className="bg-stone-200 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p className="pb-7 mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-slate-950 sm:text-5xl">
          Welcome {employee_name}!
        </p>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow-sm sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
          <div className="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset">
            <div>
              <span className="inline-flex rounded-lg p-3 ring-4 ring-white">
                <ClockIcon className="h-6 w-6 text-green-700 bg-green-50" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold text-gray-900">Schedules</h3>
              <span className="isolate inline-flex rounded-md shadow-xs">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-lime-500 focus:z-10"
                >
                  Create
                </button>
                <Link to={`/${company_id}/schedule`}
                  className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-cyan-500 focus:z-10"
                >
                  View
                </Link>
              </span>
            </div>
          </div>
          <div className="sm:rounded-tr-lg group relative bg-white p-6 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset">
            <div>
              <span className="inline-flex rounded-lg p-3 ring-4 ring-white">
                <UsersIcon className="h-6 w-6 text-cyan-700 bg-cyan-50" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold text-gray-900">Employees</h3>
              <span className="isolate inline-flex rounded-md shadow-xs">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-lime-500 focus:z-10"
                >
                  Create
                </button>
                <Link to={`/${company_id}/employees`}
                  className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-cyan-500 focus:z-10"
                >
                  View
                </Link>
              </span>
            </div>
          </div>

          <div className="sm:rounded-bl-lg group relative bg-white p-6 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset">
            <div>
              <span className="inline-flex rounded-lg p-3 ring-4 ring-white">
                <BriefcaseIcon className="h-6 w-6 text-amber-700 bg-amber-50" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold text-gray-900">Jobs</h3>
              <span className="isolate inline-flex rounded-md shadow-xs">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-lime-500 focus:z-10"
                >
                  Create
                </button>
                <Link to={`/${company_id}/jobs`}
                  className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-cyan-500 focus:z-10"
                >
                  View
                </Link>
              </span>
            </div>
          </div>

          <div className="rounded-br-lg rounded-bl-lg sm:rounded-bl-none group relative bg-white p-6 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset">
            <div>
              <span className="inline-flex rounded-lg p-3 ring-4 ring-white">
                <BuildingOffice2Icon className="h-6 w-6 text-purple-700 bg-purple-50" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold text-gray-900">Company Profile</h3>
              <span className="isolate inline-flex rounded-md shadow-xs">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-lime-500 focus:z-10"
                >
                  Edit
                </button>
                <Link to={`/${company_id}/profile`}
                  className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-cyan-500 focus:z-10"
                >
                  View
                </Link>
              </span>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5" />
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <div></div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Employer;