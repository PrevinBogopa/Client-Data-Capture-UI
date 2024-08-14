import React, { useState } from 'react';
import axios from 'axios';

function ClientForm() {
    const [name, setName] = useState('');
    const [contacts, setContacts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/clients', { name, contacts })
            .then(response => {
                alert('Client created successfully!'); // Pop-up alert ->iput if successful 
       
                setName('');
                setContacts([]);
            })
            .catch(error => {
                console.error('Error creating client:', error);
                alert('Error creating client!'); // Pop-up alert 
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Client</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
          
                <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Create Client
                </button>
            </form>
        </div>
    );
}

export default ClientForm;
