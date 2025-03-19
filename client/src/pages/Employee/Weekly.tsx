import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { GET_EMPLOYEE_SCHEDULES } from "../../services/queries";

// Interface for schedule data
interface Schedule {
  _id: string;
  job_id: number;
  job_title: string;
  employee_id: string;
  employee_name: string;
  date: string;
  start_time: string;
  end_time: string;
}

// Days order mapping
const daysOrder: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0,
};

function Weekly() {
  
  // Get user from localStorage
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      console.error('Failed to parse user data', e);
      return {};
    }
  }, []);
  
  const employee_id = user.id;
  const employee_name = user.first_name || 'Employee';

  // Fetch schedules data with employeeSchedules query
  const { data, loading, error } = useQuery(GET_EMPLOYEE_SCHEDULES, {
    variables: { employee_id },
    skip: !employee_id,
  });

  // Debug logging
  useEffect(() => {
    if (data) {
      console.log("Raw schedule data:", data);
    }
  }, [data]);

  // Process schedule data
  const groupedSchedule = useMemo(() => {
    if (!data?.employeeSchedules || !Array.isArray(data.employeeSchedules)) {
      console.log("No schedule data available");
      return {};
    }

    const scheduleMap: Record<string, any[]> = {};
    
    // Process each schedule item
    data.employeeSchedules.forEach((schedule: Schedule) => {
      try {
        // Parse the Unix timestamp (milliseconds) to a Date object
        const parseTimestamp = (timestamp: string): Date => {
          // First check if it's a large number (Unix timestamp)
          const num = Number(timestamp);
          if (!isNaN(num) && num > 1000000000000) {
            return new Date(num); // It's a timestamp in milliseconds
          }
          // Otherwise treat as a normal date string
          return new Date(timestamp);
        };
        
        // Format date
        const dateObj = parseTimestamp(schedule.date);
        console.log("Parsed date:", schedule.date, "->", dateObj);
        
        if (isNaN(dateObj.getTime())) {
          console.error("Invalid date:", schedule.date);
          return; // Skip this schedule
        }
        
        const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        
        // Format times
        const formatTime = (timeStr: string) => {
          try {
            const timeObj = parseTimestamp(timeStr);
            if (isNaN(timeObj.getTime())) {
              return "Invalid time";
            }
            return timeObj.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });
          } catch (e) {
            console.error("Error formatting time", e);
            return timeStr;
          }
        };
        
        // Create processed schedule item
        const processedSchedule = {
          id: schedule._id,
          job_title: schedule.job_title,
          day,
          start_time: formatTime(schedule.start_time),
          end_time: formatTime(schedule.end_time)
        };
        
        console.log("Processed schedule:", processedSchedule);
        
        // Add to schedule map by job title
        if (!scheduleMap[schedule.job_title]) {
          scheduleMap[schedule.job_title] = [];
        }
        
        scheduleMap[schedule.job_title].push(processedSchedule);
      } catch (e) {
        console.error("Error processing schedule", e, schedule);
      }
    });
    
    // Sort schedules by day
    Object.keys(scheduleMap).forEach(job => {
      scheduleMap[job].sort((a, b) => {
        const dayA = daysOrder[a.day] || 0;
        const dayB = daysOrder[b.day] || 0;
        return dayA - dayB;
      });
    });
    
    return scheduleMap;
  }, [data]);

  if (loading) return <p className="p-8">Loading your schedule...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error.message}</p>;

  return (
    <div className="bg-stone-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome {employee_name}!</h1>
          <h2 className="text-xl font-medium text-gray-700 mt-2">Weekly Schedule</h2>
        </header>

        {Object.keys(groupedSchedule).length === 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 text-center text-gray-500">
              No scheduled shifts found for this week.
            </div>
          </div>
        ) : (
          Object.entries(groupedSchedule).map(([jobTitle, schedules]) => (
            <div key={jobTitle} className="mt-8 overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{jobTitle}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Weekly schedule</p>
              </div>
              <div className="border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {schedules.map((schedule) => (
                      <tr key={schedule.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.day}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.start_time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.end_time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Weekly;
