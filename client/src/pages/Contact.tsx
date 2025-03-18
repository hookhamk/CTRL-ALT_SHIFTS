import logo from '../assets/logo.png';


export default function Contact() {
    return (
        <div className="bg-stone-200 w-full">
            <header className="fixed top-0 grid h-20 grid-cols-4 content-start gap-4  text-base/7 font-semibold text-gray-900">
                <a href="/about" className="m-3 flex items-end col-span-1">
                    <img
                        alt="CTRL+ALT+SHIFTS Logo"
                        src={logo}
                        className="w-24 h-auto object-contain"
                    />
                </a>
                <h2 className="flex items-center col-span-3 mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">CTRL+ALT+SHIFTS</h2>
            </header>
            <div className="bg-stone-200 flex min-h-full min-w-screen flex-col justify-center ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl divide-y divide-stone-400 lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
                            <div className="content-center">
                                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900">Contact the Developers</h2>
                                <p className="mt-4 text-base/7 text-slate-600">
                                    CTRL+ALT+SHIFTS is a team of developers who are passionate about creating software that helps people. While this was desgined as our final project for our Programming Bootcamp, we are excited for new projects and continued personal development. If you have any questions or feedback, please don't hesitate to reach out to us.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base/7 font-semibold text-gray-900">Kelly Hookham</h3>
                                    <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:hookhamk8@gmail.com" className="font-semibold text-cyan-600">
                                                    hookhamk8@gmail.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Github</dt>
                                            <dd>
                                                <a href="https://github.com/hookhamk" className="font-semibold text-lime-500">
                                                    Github: hookhamk
                                                </a>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base/7 font-semibold text-gray-900">Tristan Persaud</h3>
                                    <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:collaborate@example.com" className="font-semibold text-cyan-600">
                                                    collaborate@example.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Github</dt>
                                            <dd>
                                                <a href="https://github.com/TristanPPersaud" className="font-semibold text-lime-500">
                                                    Github: TristanPPersaud
                                                </a>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base/7 font-semibold text-gray-900">Jake Ringate</h3>
                                    <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:collaborate@example.com" className="font-semibold text-cyan-600">
                                                    collaborate@example.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Github</dt>
                                            <dd>
                                                <a href="https://github.com/jakes-cloud-space" className="font-semibold text-lime-500">
                                                    Github: JAKES-CLOUD-SPACE
                                                </a>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base/7 font-semibold text-gray-900">Lindsey Vigesaa</h3>
                                    <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:collaborate@example.com" className="font-semibold text-cyan-600">
                                                    collaborate@example.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Github</dt>
                                            <dd>
                                                <a href="https://github.com/lindsey078" className="font-semibold text-lime-500">
                                                    Github: lindsey078
                                                </a>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    );
}  