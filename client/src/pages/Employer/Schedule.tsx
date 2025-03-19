
interface Schedule {
  id: number;
  employee_name: string;
  job_title: string;
  date: string;
  start_time: number;
  end_time: number;
}

const schedule: Schedule[] = [
  { id: 123, employee_name: 'Lindsay Walton', job_title: 'Front-end Developer', date: 'Monday', start_time: 9, end_time: 17 },
  // More scheudles...
];

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Schedule() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Team Schedule</h1>
          <p className="mt-2 text-sm text-gray-700">
          Please see this week's schedule below.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-slate-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
          >
          Edit Schedule
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
                    Job Assignment
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:table-cell"
                  >
                    Monday
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                  >
                    Tuesday
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                  >
                    Wednesday
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                  >
                    Thursday
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                  >
                    Friday
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                  >
                    Saturday
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                  >
                    Sunday
                  </th>
                </tr>
              </thead>
              {/* mutations go here. Reformat for weekly schdule by employee */}
              <tbody>
                {schedule.map((item, scheduleIdx) => (
                  <tr key={item.id}>
                    <td
                      className={classNames(
                        scheduleIdx !== schedule.length - 1 ? 'border-b border-gray-200' : '',
                        'py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8',
                      )}
                    >
                      {item.employee_name}
                    </td>
                    <td
                      className={classNames(
                        scheduleIdx !== schedule.length - 1 ? 'border-b border-gray-200' : '',
                        'hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell',
                      )}
                    >
                      {item.job_title}
                    </td>
                    <td
                      className={classNames(
                        scheduleIdx !== schedule.length - 1 ? 'border-b border-gray-200' : '',
                        'hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell',
                      )}
                    >
                      {item.date}
                    </td>
                    <td
                      className={classNames(
                        scheduleIdx !== schedule.length - 1 ? 'border-b border-gray-200' : '',
                        'px-3 py-4 text-sm whitespace-nowrap text-gray-500',
                      )}
                    >
                      {item.start_time} - {item.end_time}
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
