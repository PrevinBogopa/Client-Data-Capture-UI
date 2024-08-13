import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-lg font-semibold">
                    <Link to="/" className="mr-6">Clients</Link>
                    <Link to="/create-client" className="mr-6">Create Client</Link>
                    <Link to="/contacts" className="mr-6">Contacts</Link>
                    <Link to="/create-contact" className="mr-6">Create Contact</Link>
                    <Link to="/link-contacts" className="mr-6">Link  Contacts</Link>
                    <Link to="/link-clients" className="mr-6">Link Clients</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
