import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav className="bg-gray-800 dark:bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-semibold">
                    <Link to="/" className="mr-6">Clients</Link>
                    <Link to="/contacts" className="mr-6">Contacts</Link>
                </div>
                <button
                    onClick={toggleDarkMode}
                    className="text-white bg-gray-700 dark:bg-gray-600 px-3 py-1 rounded-md"
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
