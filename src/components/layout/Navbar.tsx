'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from "../ui/ThemeToggle";
import Link from 'next/link';
import { FaBoxOpen } from 'react-icons/fa';

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);

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

    return (
        <header className={`w-full px-6 py-4 flex items-center bg-navbar transition-all duration-300 z-50
            ${isSticky ? 'sticky top-0 shadow-md backdrop-blur bg-navbar/80' : 'relative'}
        `}>
            {/* Left: Logo */}
            <div className="flex-1">
                <Link href="/" passHref>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <FaBoxOpen className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)]" size={28} />
                        <h1 className="text-2xl tracking-wide text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)]">
                            ProductWise
                        </h1>
                    </div>
                </Link>
            </div>

            {/* Center: Navigation Menu */}
            <nav className="flex-1 flex justify-center gap-8">
                <Link href="/" className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline">
                    Home
                </Link>
                <Link href="/#" className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline">
                    Pro Features
                </Link>
                <Link href="/#" className="text-[var(--light-h1-text)] dark:text-[var(--dark-h1-text)] hover:underline">
                    Our Company
                </Link>
            </nav>

            {/* Right: Theme Toggle */}
            <div className="flex-1 flex justify-end">
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Navbar;
