
import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { GET_JOBS } from "../../services/queries";

interface Job {
  id: number;
  job_title: string;
  employee_count: number;
}

interface Company {
  id: string;
  company_name: string;
  jobs: Job[];
}
export default function Job() {
    // Load user data once and memoize it
    const user = useMemo(() => {
      try {
        return JSON.parse(localStorage.getItem('user') || '{}');
      } catch {
        return {};
      }
    }, []);

    const company_id = user?.id ? String(user.companyId) : null;
  
    // Fetch employee schedule
    const { data, loading, error } = useQuery<{ company: Company }>(GET_JOBS, {
      variables: { id: company_id }, // ✅ Ensure correct variable name
      skip: !company_id, // ✅ Prevent query if employee_id is missing
    });
  
    // Debugging logs
    useEffect(() => {
      console.log('Jobs component mounted');
      console.log('Company ID:', company_id);
    }, [company_id]);
  
    const groupedJobs = useMemo(() => {
      if (!data?.company?.jobs) return {};
  
      // Return a table of jobs with employee counts
      return data.company.jobs.reduce<Record<string, Job[]>>((acc, job) => {
        if (!acc[job.job_title]) acc[job.job_title] = [];
        acc[job.job_title].push(job);
        return acc;
      }, {});
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error?.message}</p>;
  
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
                <th className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8">
                      Job Id
                    </th>
                    <th className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8">
                      Job Title
                    </th>
                    <th className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8">
                      Employee Count
                    </th>
                </tr>
              </thead>
              {/* mutations go here. Reformat for jobs per user company  */}
              <tbody>
              {Object.entries(groupedJobs).map(([jobTitle, employees]) => (
                    <tr key={jobTitle}>
                      <td className="whitespace-nowrap py-4 px-3 text-sm font-semibold text-gray-900">
                        {jobTitle}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {employees.map((employee) => (
                          <div key={employee.id}>
                            {employee.job_title} - {employee.employee_count}
                          </div>
                        ))}
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
