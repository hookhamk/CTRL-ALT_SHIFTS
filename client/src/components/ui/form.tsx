import React from 'react';

interface Fields {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    rows?: number;
}

interface Props {
    title: string;
    description: string;
    fields: Fields[];
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<Props> = ({ title, description, fields, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-12">
                <div className="border-b border-stale-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-slate-900">{title}</h2>
                    <p className="mt-1 text-sm/6 text-slate-600">{description}</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {fields.map((field: Fields) => (
                            <div key={field.id} className={field.type === 'textarea' ? 'col-span-full' : 'sm:col-span-4'}>
                                <label htmlFor={field.id} className="block text-sm/6 font-medium text-gray-900">{field.label}</label>
                                <div className="mt-2">
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.id}
                                            name={field.id}
                                            rows={field.rows}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm" />
                                    ) : (
                                        <input
                                            id={field.id}
                                            name={field.id}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">Cancel</button>
                    <button type="submit"
                        className="rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    > Save </button>
                </div>
            </div>
        </form>
    )
};

export default Form;