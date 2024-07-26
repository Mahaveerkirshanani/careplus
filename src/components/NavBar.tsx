'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="relative w-full py-4 lg:px-6 bg-[#fffffffa] shadow-2xl">
      <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="hover:text-teal-600 transition-colors duration-300">
            <Image src={'/logoipsum-237.svg'} width={1000} height={1000} alt='logo' className='w-[170px] h-[50px]' />
          </Link>
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-gray-700 hover:text-teal-600 font-semibold tracking-wide transition-colors duration-300 py-2 px-4 rounded-lg ${pathname === '/' ? 'bg-teal-100 text-teal-600' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-gray-700 hover:text-teal-600 font-semibold tracking-wide transition-colors duration-300 py-2 px-4 rounded-lg ${pathname === '/about' ? 'bg-teal-100 text-teal-600' : ''}`}
          >
            About Us
          </Link>
          <Link
            href="/services"
            className={`text-gray-700 hover:text-teal-600 font-semibold tracking-wide transition-colors duration-300 py-2 px-4 rounded-lg ${pathname === '/services' ? 'bg-teal-100 text-teal-600' : ''}`}
          >
            Our Services
          </Link>
          <Link
            href="/team"
            className={`text-gray-700 hover:text-teal-600 font-semibold tracking-wide transition-colors duration-300 py-2 px-4 rounded-lg ${pathname === '/team' ? 'bg-teal-100 text-teal-600' : ''}`}
          >
            Our Team
          </Link>
          <Link
            href="/contact"
            className={`text-gray-700 hover:text-teal-600 font-semibold tracking-wide transition-colors duration-300 py-2 px-4 rounded-lg ${pathname === '/contact' ? 'bg-teal-100 text-teal-600' : ''}`}
          >
            Contacts
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Let's Talk
          </Link>
        </nav>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
            <FaBars size={24} />
          </button>
        </div>
      </div>
      {isOpen && (
        <nav
          ref={dropdownRef}
          className="absolute top-16 right-6 bg-slate-200 text-gray-800 py-4 px-6 rounded-lg shadow-lg w-64 z-50"
        >
          <div className="mb-4 flex justify-end">
            <button onClick={closeMenu} className="text-gray-800 focus:outline-none">
              <FaTimes size={24} />
            </button>
          </div>
          <div className="space-y-4">
            <Link
              href="/"
              className={`block text-lg py-2 px-4 rounded-lg font-semibold tracking-wide hover:bg-teal-100 transition-colors duration-300 ${pathname === '/' ? 'bg-teal-100 text-teal-600' : 'text-gray-800'}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block text-lg py-2 px-4 rounded-lg font-semibold tracking-wide hover:bg-teal-100 transition-colors duration-300 ${pathname === '/about' ? 'bg-teal-100 text-teal-600' : 'text-gray-800'}`}
            >
              About Us
            </Link>
            <Link
              href="/services"
              className={`block text-lg py-2 px-4 rounded-lg font-semibold tracking-wide hover:bg-teal-100 transition-colors duration-300 ${pathname === '/services' ? 'bg-teal-100 text-teal-600' : 'text-gray-800'}`}
            >
              Our Services
            </Link>
            <Link
              href="/team"
              className={`block text-lg py-2 px-4 rounded-lg font-semibold tracking-wide hover:bg-teal-100 transition-colors duration-300 ${pathname === '/team' ? 'bg-teal-100 text-teal-600' : 'text-gray-800'}`}
            >
              Our Team
            </Link>
            <Link
              href="/contact"
              className={`block text-lg py-2 px-4 rounded-lg font-semibold tracking-wide hover:bg-teal-100 transition-colors duration-300 ${pathname === '/contact' ? 'bg-teal-100 text-teal-600' : 'text-gray-800'}`}
            >
              Contacts
            </Link>
            <Link
              href="/contact"
              className="block mt-4 text-center px-6 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300"
            >
              Let's Talk
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
