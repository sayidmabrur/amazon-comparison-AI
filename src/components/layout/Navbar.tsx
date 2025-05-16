'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from "../ui/ThemeToggle";
import Link from 'next/link';
import { FaBoxOpen } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi'; // hamburger & close icons

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close menu on navigation (optional)
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <header className={`w-full px-6 py-4 flex items-center bg-navbar transition-all duration-300 z-50
            ${isSticky ? 'sticky top-0 shadow-md backdrop-blur bg-navbar/80' : 'relative'}
        `}>
            {/* Left: Logo */}
            <div className="flex-1">
                <Link href="/" passHref>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <FaBoxOpen className="text-[var(--light-h1-text)] dark:text-blue-500" size={28} />
                        <h1 className="text-2xl tracking-wide text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)]">
                            ProductWise
                        </h1>
                    </div>
                </Link>
            </div>

            {/* Center: Navigation Menu (desktop) */}
            <nav className="flex-1 justify-center gap-8 hidden md:flex">
                <Link href="/" className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline">
                    Home
                </Link>
                {/* <Link href="/#" className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline">
                    Pro Features
                </Link> */}
                <Link href="/#" className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline">
                    Our Company
                </Link>
            </nav>

            {/* Right: Theme Toggle & Hamburger Menu */}
            <div className="flex-1 flex justify-end items-center gap-4">
                <ThemeToggle />

                {/* Hamburger Menu button (mobile only) */}
                <button
                    className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen && (
                <nav className="fixed top-[64px] left-0 right-0 bg-navbar dark:bg-gray-900 shadow-md flex flex-col items-center gap-6 py-6 md:hidden z-40">
                    <Link
                        href="/"
                        className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline text-lg"
                        onClick={handleLinkClick}
                    >
                        Home
                    </Link>
                    {/* <Link
                        href="/#"
                        className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline text-lg"
                        onClick={handleLinkClick}
                    >
                        Pro Features
                    </Link> */}
                    <Link
                        href="/#"
                        className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline text-lg"
                        onClick={handleLinkClick}
                    >
                        Our Company
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
