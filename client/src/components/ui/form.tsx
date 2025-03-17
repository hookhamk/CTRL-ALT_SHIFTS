'use client';
import React from 'react';
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

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
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogBackdrop transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
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
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="text-sm/6 font-semibold text-gray-900"
                                >Cancel</button>
                                <button
                                    type="submit"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >Save</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
};

export default Form;