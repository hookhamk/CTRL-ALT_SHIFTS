import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { GET_EMPLOYEE_SCHEDULES } from '../../services/queries';

interface Schedule {
  id: string;
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
  const employee_id = user.id;

  // Manage selected date
  const [selectedDate] = useState(new Date());
  const today = new Date().toISOString().split('T')[0];

  // Fetch schedule for the employee
  const { data, loading, error } = useQuery<{ employee: Employee }>(GET_EMPLOYEE_SCHEDULES, {
    variables: { employee_id, date: format(selectedDate, 'yyyy-MM-dd') }, // Ensure query includes date
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data?.employee;

  // Filter schedules for today and upcoming days
  const todaySchedule = employee?.schedule.filter(schedule => schedule.day === today) || [];
  const upcomingSchedules = employee?.schedule.filter(schedule => schedule.day !== today) || [];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Here is your schedule for today and the upcoming days.</h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Start Time
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      End Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {todaySchedule.map((shift) => (
                    <tr key={shift.id}>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {shift.job_title}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {shift.start_time}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {shift.end_time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Day
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Start Time
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      End Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {upcomingSchedules.map((shift) => (
                    <tr key={shift.id}>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {shift.day}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {shift.job_title}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {shift.start_time}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {shift.end_time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daily;