// This component is a calendar view, edit, and delete a schedule for a current day
// It displays the current month, so that the admin can jump to the date they want to schedule
// The calendar displays the days of the week and highlights the current day
// Once the admin clicks the "Submit to Staff" button, the schedule will be sent to the employees

// TO DO: path for the Schedule data for the client side
// TO DO: confirm best how to get company_id from the URL or if there is a token we will be storing in localStorage


'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useState } from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Schedule } from '../../../../server/src/models/schedule';
// Confirm the path to the Schedule data for the client side
// Figure out how to get company_id from the URL
const { company_id } = req.params;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function EECal() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const response = await fetch(`api/${company_id}/schedule/day`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage - edit if it's stored elsewhere
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch schedule');
        }

        const data = await response.json();
        setSchedules(data);
      } catch (err) {
        console.error('Error fetching schedules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const days = Array.from({ length: 28 }, (_, i) => {
    const date = new Date(2025, 0, i + 1).toISOString().split('T')[0]
    const isCurrentMonth = date.startsWith('2025-03')
    const isToday = date === new Date().toISOString().split('T')[0]
    const isSelected = schedules.some((schedule) => schedule.date === date)
    return { date, isCurrentMonth, isToday, isSelected }
  });

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">{new Date().toLocaleDateString()}</h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                    !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                    !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                    day.isToday && !day.isSelected && 'text-indigo-600',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg',
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
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="mt-8 w-full rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Submit to Staff
            </button>
            <ol className="mt-4 divide-y divide-gray-100 text-sm/6 lg:col-span-7 xl:col-span-8">
              {/* possibly need an interface or function to house the unqiue employee data */}
              {schedules.map((schedule: Schedule) => (
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
                  <Menu as="div" className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center">
                    <div>
                      <MenuButton className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                          >
                            Edit
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                          >
                            Cancel
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}