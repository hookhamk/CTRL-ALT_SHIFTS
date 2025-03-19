import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SCHEDULE } from "../../services/queries";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { format, addDays, subDays, isToday } from 'date-fns';

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

function Daily() {
  // Load user data once and memoize it
  const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);
  const employee_name = user.first_name;
  const employee_id = user.id;

  // Manage selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch schedule for the employee
  const { data, loading, error } = useQuery<{ employee: Employee }>(GET_SCHEDULE, {
    variables: { employee_id, date: format(selectedDate, 'yyyy-MM-dd') }, // Ensure query includes date
  });

  // Debugging logs
  useEffect(() => {
    console.log('Daily component mounted');
  }, []);

  // Filter schedules for the selected date
  const filteredSchedules = useMemo(() => {
    if (!data?.employee) return [];
    return data.employee.schedule.filter(shift => shift.day === format(selectedDate, 'EEEE')); // Match weekday
  }, [data, selectedDate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message}</p>;

  return (
    <div className="bg-stone-200 py-16 sm:py-24 lg:py-32">
      <header className="max-w-lg text-4xl font-semibold tracking-tight text-pretty text-slate-950 sm:text-5xl">
        Welcome {employee_name}!
      </header>

      <div className="grid lg:grid-cols-12 gap-x-16 mt-10">
        {/* Left Side: Shifts for Selected Date */}
        <div className="lg:col-span-7">
          <h2 className="text-lg font-semibold text-gray-900">Shifts for {format(selectedDate, 'EEEE, MMMM d')}</h2>
          
          {/* Show message if no shifts are found */}
          {filteredSchedules.length === 0 ? (
            <p className="mt-4 text-red-600 font-medium">
              No future dated shifts for selected date. Please wait for your employer to upload your schedule. 
              For questions reach out to <a href="mailto:hr@yourcompany.com" className="underline text-blue-600">hr@yourcompany.com</a>.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {filteredSchedules.map((shift) => (
                <li key={shift.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-900">{shift.job_title}</h3>
                  <p className="text-gray-700">{shift.start_time} - {shift.end_time}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side: Date Picker */}
        <div className="lg:col-span-5 text-center">
          <div className="flex items-center justify-center space-x-4 text-gray-900">
            <button
              onClick={() => setSelectedDate(subDays(selectedDate, 1))}
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <div className="text-lg font-semibold">{format(selectedDate, 'MMMM d, yyyy')}</div>
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Calendar Representation */}
          <div className="mt-6 grid grid-cols-7 text-xs text-gray-500">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1 text-sm">
            {[...Array(30)].map((_, i) => {
              const dayDate = addDays(new Date(), i);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dayDate)}
                  className={`p-2 rounded-full ${
                    isToday(dayDate) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {format(dayDate, 'd')}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daily;
