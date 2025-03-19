
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@apollo/client';
import Client from '../../components/client';
import { GET_SCHEDULE } from "../../services/queries";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
function Daily() {
  interface Schedule {
    schedule_id: string;
    job_title: string;
    date: string;
    start_time: string;
    end_time: string;
    datetime: string;
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const employee_name = user.first_name;
  const employee_id = user.id;

  const { data: schedulesData } = useQuery(GET_SCHEDULE, {
    variables: { employee_id },
    client: Client(),
  });

  const days = Array.from({ length: 28 }, (_, i) => {
    const date = new Date(2025, 0, i + 1).toISOString().split('T')[0]
    const isCurrentMonth = date.startsWith('2025-03')
    const isToday = date === new Date().toISOString().split('T')[0]
    const isSelected = schedulesData?.schedules?.some((schedule: Schedule) => schedule.date === date) || false
    return { date, isCurrentMonth, isToday, isSelected }
  });

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