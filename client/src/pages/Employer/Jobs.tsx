
interface Job {
  id: number;
  job_title: string;
  employee_count: number;
}

const jobs: Job[] = [
  { id: 1, job_title: 'Front-end Developer', employee_count: 4},
  // More people...
];

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Jobs() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">View Jobs</h1>
          <p className="mt-2 text-sm text-gray-700">
          Please current jobs in your company.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-slate-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
          >
          Create Job
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Job Id
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:table-cell"
                  >
                    Job Title
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                  >
                    Employee Count
                  </th>
                </tr>
              </thead>
              {/* mutations go here. Reformat for weekly schdule by employee */}
              <tbody>
                {jobs.map((job, jobIdx) => (
                  <tr key={job.id}>
                    <td
                      className={classNames(
                        jobIdx !== jobs.length - 1 ? 'border-b border-gray-200' : '',
                        'py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8',
                      )}
                    >
                      {job.id}
                    </td>
                    <td
                      className={classNames(
                        jobIdx !== jobs.length - 1 ? 'border-b border-gray-200' : '',
                        'hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell',
                      )}
                    >
                      {job.job_title}
                    </td>
                    <td
                      className={classNames(
                        jobIdx !== jobs.length - 1 ? 'border-b border-gray-200' : '',
                        'hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell',
                      )}
                    >
                      {job.employee_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
