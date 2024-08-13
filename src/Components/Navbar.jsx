import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-lg font-semibold">
                    <Link to="/" className="mr-6">Clients</Link>
   
                    <Link to="/contacts" className="mr-6">Contacts</Link>
              
          
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
