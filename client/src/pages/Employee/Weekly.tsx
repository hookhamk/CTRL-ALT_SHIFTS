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

function Weekly() {
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
    console.log('Weekly component mounted');
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
      </header>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Welcome {employee_name}!</h1>
            <p className="mt-2 text-sm text-gray-700">Please see your weekly schedule below.</p>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8">
                      Job Assignment
                    </th>
                    {Object.keys(daysOrder).map((day) => (
                      <th
                        key={day}
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {Object.entries(groupedSchedule).map(([jobTitle, shifts]) => (
                    <tr key={jobTitle}>
                      <td className="whitespace-nowrap py-4 px-3 text-sm font-semibold text-gray-900">
                        {jobTitle}
                      </td>
                      {Object.keys(daysOrder).map((day) => {
                        const shift = shifts.find((s) => s.day === day);
                        return (
                          <td key={day} className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                            {shift ? `${shift.start_time} - ${shift.end_time}` : '-'}
                          </td>
                        );
                      })}
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

export default Weekly;
