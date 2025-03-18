//TO DO: Add routes to database with needed documents - do we need to have the tablesData or adjust it to make this work?
//TO DO: Correct issue with row loop

//import React from 'react'

const tablesData = [
    {
        title: 'Employees',
        description: 'A list of all the employees in your account including their name, title, email and role.',
        button: 'Add employee',
        columns: ['Name', 'Title', 'Email', 'Role'],
        rows: [
            { name: 'John Doe', title: 'Back-end Developer', email: 'john.doe@example.com', role: 'Admin' },
            // More people...
        ]
    },
    {
        title: 'Jobs',
        description: 'A list of all the jobs in your account including their name, title, email and role.',
        button: 'Add job',
        columns: ['Name', 'Title', 'Email', 'Role'],
        rows: [
            { title: 'Back-end Developer', id: '1' },
            // More jobs...
        ]
    },
    {
        title: 'Schedule',
        description: 'A weekly schedule of all employees',
        button: 'Edit schedule',
        columns: ['Employee Name', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        rows: [
            { Name: 'John Doe', Monday: '8:00 AM - 5:00 PM', Tuesday: '8:00 AM - 5:00 PM', Wednesday: '8:00 AM - 5:00 PM', Thursday: '8:00 AM - 5:00 PM', Friday: '8:00 AM - 5:00 PM', Saturday: '', Sunday: '' },
                // more schedule...
        ]
    }];


export default function Table() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {tablesData.map((table, tableIndex) => (
                <div key={tableIndex} className="mb-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold text-gray-900">{table.title}</h1>
                            <p className="mt-2 text-sm text-gray-700">{table.description}</p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-cyan-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                            >Add {table.title.toLowerCase().slice(0, -1)}
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <table className="min-w-full border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            {table.columns.map((column, columnIndex) => (
                                                <th key={columnIndex} scope="col"
                                                    className="border-b border-slate-300 bg-slate-50 px-6 py-3 text-left text-sm font-semibold text-slate-900"
                                                >{column}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {table.rows.map((_row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {table.columns.map((_column, columnIndex) => (
                                                    <td key={columnIndex}
                                                        className="whitespace-nowrap border-b border-slate-200 px-6 py-4 text-sm text-slate-900">
                                                     {/* {row[column.toLowerCase()]} */}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
