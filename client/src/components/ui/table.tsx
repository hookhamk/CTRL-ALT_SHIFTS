import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TABLES } from '../../services/queries';


interface Fields {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  rows?: number;
}

interface Props {
  tableId: string;
}

const Table: React.FC<Props> = ({ tableId }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { data, loading, error } = useQuery(GET_TABLES, {
    variables: { id: tableId },
    context: {
      headers: {
        authorization: user.token ? `Bearer ${user.token}` : '',
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const table = data.table;
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">{table.title}</h1>
            <p className="mt-2 text-sm text-gray-700">{table.description}</p>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          {table.fields.map((field: Fields) => (
            <div key={field.id} className="mt-4">
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  rows={field.rows || 3}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              ) : (
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Table;