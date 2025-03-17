import logo from '../assets/logo.png';
import landingPage from '../assets/landing-page.png';


const Home = () => {
    return (
        <>
        <div className="grid min-h-full grid-cols-2 gap-4 grid-rows-[1fr_auto_1fr] bg-stone-200 lg:grid-cols-[max(50%,36rem)_1fr]">
            <header className="grid h-56 grid-cols-4 content-start gap-4  text-base/7 font-semibold text-gray-900">
                <a href="/about" className="m-3 flex items-end col-span-1">
                    <img
                        alt="CTRL+ALT+SHIFTS Logo"
                        src={logo}
                        className="object-contain md:object-cover"
                    />
                </a>
                <h2 className="flex items-center col-span-3 mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">CTRL+ALT+SHIFTS</h2>
            </header>
            <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
                <div className="max-w-lg">
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">
                    Scheduling hourly shifts has never been easier.
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                        With CTRL+ALT+SHIFTS, you can easily manage your employees' schedules and shifts. Sign up today to get started.
                    </p>
                    <button
                        type="button"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base/8 font-medium rounded-md shadow-sm text-yellow-50 bg-slate-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                        Learn More</button>
                </div>
                <div>
                    <p className="mt-6 text-base/8 font-medium text-gray-500">Already have an account?</p>
                    <button type="button" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base/8 font-medium rounded-md shadow-sm text-white bg-stone-600 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                        Login</button>
                </div>
            </main>
            <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
                <img
                    alt="graphic for sorting out shift confusion"
                    src={landingPage}
                    className="absolute inset-0 size-full object-contain"
                />
            </div>
        </div>
        </>
    )
}

export default Home;