import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [createdContact, setCreatedContact] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Reset errors

        axios.post('http://localhost:8080/contacts', { name, surname, email })
            .then(response => {
                const { message } = response.data;
                setCreatedContact(message);
                alert('Contact created successfully!');  

                setName('');
                setSurname('');
                setEmail('');
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setError('Email already exists');
                } else {
                    setError('Error creating contact');
                }
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Contact</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 transition duration-300 ease-in-out">
                    <span className="text-lg font-bold">Error:</span> {error}
                </div>
            )}
            {createdContact && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 transition duration-300 ease-in-out">
                    <span className="text-lg font-bold">Success:</span> {createdContact}
                </div>
            )}
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                        Surname
                    </label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Create Contact
                </button>
            </form>
        </div>
    );
}

export default ContactForm;