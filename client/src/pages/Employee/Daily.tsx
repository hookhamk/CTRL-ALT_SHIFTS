import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { GET_SCHEDULE } from "../../services/queries";

interface Schedule {
  id: number;
  job_title: string;
  day: string;
  start_time: string;
  end_time: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  schedule: Schedule[];
}

// Days order mapping
const daysOrder: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

function Daily() {
  // Load user data once and memoize it
  const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);
  const employee_name = user.first_name;
  const employee_id = user.id;

  // Fetch employee schedule
  const { data, loading, error } = useQuery<{ employee: Employee }>(GET_SCHEDULE, {
    variables: { employee_id },
  });

  // Debugging logs
  useEffect(() => {
    console.log('Daily component mounted');
  }, []);

  const groupedSchedule = useMemo(() => {
    if (!data?.employee) return {};

    return data.employee.schedule.reduce<Record<string, Schedule[]>>((acc: Record<string, Schedule[]>, shift: Schedule) => {
      if (!acc[shift.job_title]) {
      acc[shift.job_title] = [];
      }
      acc[shift.job_title].push(shift);
      return acc;
    }, {});
  }, [data]);

  // Sort each job's shifts by day order
  useMemo(() => {
    Object.keys(groupedSchedule).forEach((job) => {
      groupedSchedule[job].sort((a, b) => daysOrder[a.day] - daysOrder[b.day]);
    });
  }, [groupedSchedule]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message}</p>;

  return (
    <div className="bg-stone-200 py-24 sm:py-32">
      <header className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-slate-950 sm:text-5xl">
        Welcome {employee_name}!
      </header>
      <h2 className="text-base font-semibold text-gray-900">Upcoming shifts</h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">January</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm ring-1 shadow-sm ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isCurrentMonth && !day.isToday ? 'text-gray-900' : '',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday ? 'text-gray-400' : '',
                  day.isToday && !day.isSelected ? 'text-indigo-600' : '',
                  dayIdx === 0 ? 'rounded-tl-lg' : '',
                  dayIdx === 6 ? 'rounded-tr-lg' : '',
                  dayIdx === days.length - 7 ? 'rounded-bl-lg' : '',
                  dayIdx === days.length - 1 ? 'rounded-br-lg' : '',
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex size-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                  )}
                >
                  {day.date?.split('-').pop()?.replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
          <ol className="mt-4 divide-y divide-gray-100 text-sm/6 lg:col-span-7 xl:col-span-8">
            {schedulesData.map((schedule: Schedule) => (
              <li key={schedule.schedule_id} className="relative flex gap-x-6 py-6 xl:static">
                <div className="flex-auto">
                  <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{schedule.job_title}</h3>
                  <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                    <div className="flex items-start gap-x-3">
                      <dt className="mt-0.5">
                        <span className="sr-only">Date</span>
                        <CalendarIcon className="size-5 text-gray-400" aria-hidden="true" />
                      </dt>
                      <dd>
                        <time dateTime={schedule.datetime}>
                          {schedule.date} at {schedule.start_time} - {schedule.end_time}
                        </time>
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )

}

export default Daily;