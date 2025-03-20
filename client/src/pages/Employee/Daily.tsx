import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@apollo/client';
import { useState, useEffect, useMemo } from 'react';
import { GET_EMPLOYEE_SCHEDULES } from "../../services/queries";

// Utility function for className conditionals
function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// Updated interface to match our GraphQL schema
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

// Day interface for calendar
interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasSchedule?: boolean;
}

function Daily() {
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Load user data once and memoize it
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return {};
    }
  }, []);

  const employee_id = user.id;

  // Fetch employee schedules
  const { data, loading, error } = useQuery(GET_EMPLOYEE_SCHEDULES, {
    variables: { employee_id },
    skip: !employee_id,
    fetchPolicy: 'cache-and-network' // Changed from network-only for better performance
  });

  // Effect to select today's date initially
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Generate calendar days
  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Calculate first and last day of month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get day of week for first day (0 = Sunday, 1 = Monday, etc)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    
    const daysInMonth = lastDayOfMonth.getDate();
    const today = new Date().toISOString().split('T')[0];
    
    const calendarDays: CalendarDay[] = [];
    
    // Add days from previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek; i > 0; i--) {
      const day = daysInPrevMonth - i + 1;
      
      // Use local date strings instead of ISO strings
      const prevDate = new Date(year, month - 1, day);
      const date = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;
      
      calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: date === today,
        isSelected: date === selectedDate
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i).toISOString().split('T')[0];
      calendarDays.push({
        date,
        isCurrentMonth: true,
        isToday: date === today,
        isSelected: date === selectedDate
      });
    }
    
    // Add days from next month to fill out the grid
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i).toISOString().split('T')[0];
      calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: date === today,
        isSelected: date === selectedDate
      });
    }
    
    return calendarDays;
  }, [currentMonth, selectedDate]);

  // Safely parse date strings with timezone compensation
  const parseDate = (dateString: string): string => {
    try {
      // Check if it's a numeric timestamp
      const timestamp = Number(dateString);
      if (!isNaN(timestamp) && timestamp > 1000000000000) {
        // It's a Unix timestamp in milliseconds, convert to date string
        const date = new Date(timestamp);
        
        // Create date using local timezone to avoid UTC conversion issues
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }
      
      // Otherwise handle ISO strings or date-only strings
      if (dateString.includes('T')) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }
      
      return dateString.split('T')[0];
    } catch (e) {
      console.error('Error parsing date:', dateString, e);
      return '';
    }
  };

// Interface for formatted schedule data
interface FormattedSchedule {
  schedule_id: string;
  job_title: string;
  date: string;
  start_time: string;
  end_time: string;
  datetime: string;
}

// Format schedules for display
const schedulesData = useMemo<FormattedSchedule[]>(() => {
  if (!data?.employeeSchedules || !Array.isArray(data.employeeSchedules)) return [];
  
  // Mark days that have schedules
  days.forEach(day => {
    day.hasSchedule = data.employeeSchedules.some(
      (s: Schedule) => s.date.split('T')[0] === day.date
    );
  });
    
    // Filter schedules for the selected date
    return data.employeeSchedules
      .filter((s: Schedule) => parseDate(s.date) === selectedDate)
      .map((schedule: Schedule) => {
        // Format schedule data for display
        let formattedDate = "Unknown date";
        try {
          const scheduleDate = new Date(schedule.date);
          formattedDate = scheduleDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          });
        } catch (e) {
          console.error('Error formatting date:', schedule.date, e);
        }
        
        // Format times safely
        const formatTime = (timeStr: string) => {
          try {
            // Handle both full ISO strings and time-only strings
            const timestamp = Number(timeStr);
            const date = new Date(timestamp);
            
            if (isNaN(date.getTime())) {
              return timeStr; // Fall back to original string if parsing fails
            }
            
            return date.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });
          } catch (e) {
            console.error('Error formatting time:', timeStr, e);
            return timeStr; // Return original if parsing fails
          }
        };
        
        return {
          schedule_id: schedule._id,
          job_title: schedule.job_title || 'Unknown Job',
          date: formattedDate,
          start_time: formatTime(schedule.start_time),
          end_time: formatTime(schedule.end_time),
          datetime: schedule.date
        };
      });
  }, [data, selectedDate, days]);

  // Format a date string for display without timezone issues
  const formatDateString = (dateStr: string): string => {
    try {
      // Parse the date string parts directly to avoid timezone conversion
      const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
      
      // Create a date object using local components
      const date = new Date(year, month - 1, day);
      
      // Format the date for display
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      console.error('Error formatting date string:', dateStr, e);
      return dateStr; // Fallback to the original string
    }
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  if (loading && !data) return <p className="p-8 text-center">Loading your schedule...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Error: {error.message}</p>;

  // Calculate whether each day has a schedule
  const daysWithSchedules = days.map(day => ({
    ...day,
    hasSchedule: data?.employeeSchedules?.some(
      (s: Schedule) => parseDate(s.date) === day.date
    )
  }));

  return (
    <div className="bg-stone-200 py-8 px-4 sm:py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Upcoming Shifts
        </h1>
      </header>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="mt-6 text-center lg:col-span-5">
          <div className="flex items-center justify-center text-gray-900 mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="-m-1.5 p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold mx-4">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button
              type="button"
              onClick={goToNextMonth}
              className="-m-1.5 p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 text-xs text-gray-500 mb-1 overflow-auto">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200 text-sm rounded-lg ring-1 ring-gray-200">
            {daysWithSchedules.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                onClick={() => setSelectedDate(day.date)}
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
                  dayIdx === daysWithSchedules.length - 7 ? 'rounded-bl-lg' : '',
                  dayIdx === daysWithSchedules.length - 1 ? 'rounded-br-lg' : ''
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                    day.hasSchedule && !day.isSelected && 'bg-green-50 ring-1 ring-green-600'
                  )}
                >
                  {day.date?.split('-').pop()?.replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-10 lg:mt-6 lg:col-span-7">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {selectedDate ? (
              <>Shifts for {formatDateString(selectedDate)}</>
            ) : (
              <>Select a date to view shifts</>
            )}
          </h3>
          
          <div className="bg-white shadow rounded-lg">
            <ol className="divide-y divide-gray-100">
              {schedulesData.length > 0 ? schedulesData.map((schedule) => (
                <li key={schedule.schedule_id} className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-base font-semibold text-gray-900">{schedule.job_title}</h4>
                    <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      <span>{schedule.start_time} - {schedule.end_time}</span>
                    </div>
                  </div>
                </li>
              )) : (
                <li className="p-8 text-center text-gray-500">No shifts scheduled for this day</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daily;