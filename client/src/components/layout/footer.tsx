import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className='bg-stone-200 text-gray-950'>
            <div className='mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8'>
                <div className=''>
                    <a href='#' className=''>About</a>
                    <a href='#' className=''>Contact</a>
                    <a href='#' className=''>Github</a>
                </div>
                <div>
                    <p>© 2025 CTRL+ALT+SHIFTS</p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;