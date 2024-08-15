import React, { useState } from 'react';
import axios from 'axios';

function ClientForm() {
    const [name, setName] = useState('');
    const [contacts, setContacts] = useState([]);
    const [clientCode, setClientCode] = useState('');
    const [createdClient, setCreatedClient] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '') {
            setError('Please write a name');
            return;
        } else if (/\d/.test(name)) {
            setError('No numbers allowed');
            return;
        } else if (/[^a-zA-Z\s]/.test(name)) {
            setError('No special characters allowed');
            return;
        }

        axios.post('http://localhost:8080/clients', { name, contacts })
            .then(response => {
                const { client_code } = response.data;
                setClientCode(client_code);
                setCreatedClient(`Client ${name} created successfully with code ${client_code}!`);
                alert(`Client ${name} created successfully with code ${client_code}!`);
                setName('');
                setContacts([]);
                setError(null);
            })
            .catch(error => {
                console.error('Error creating client:', error);
                alert('Error creating client!');
                setError('Error creating client');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Client</h1>
            {createdClient && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 transition duration-300 ease-in-out">
                    <span className="text-lg font-bold">Success:</span> {createdClient}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            const newName = e.target.value;
                            setError(null);
                            setName(newName);
                        }}
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