import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LinkClients() {
    const [clients, setClients] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get('http://localhost:8080/clients'),
            axios.get('http://localhost:8080/contacts')
        ])
        .then(([clientsResponse, contactsResponse]) => {
            setClients(clientsResponse.data);
            setContacts(contactsResponse.data);
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => setLoading(false));
    }, []);

    const handleLink = () => {
        if (!selectedClient) {
            alert('Please select a client.');
            return;
        }
    
        if (selectedContacts.length === 0) {
            alert('Please select at least one contact.');
            return;
        }
    
        axios.post('http://localhost:8080/link_contact_to_client', {
            client_code: selectedClient.client_code,
            contact_email: selectedContacts.map(contactId => 
                contacts.find(contact => contact.id === contactId).email)
        })
        .then(response => alert('Clients successfully linked!'))
        .catch(error => {
            console.error('Error linking clients:', error);
            alert('There was an error linking the contacts. Please try again.');
        });
    };

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4 text-black">Link Client to Contacts</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2">
                            Select Client
                        </label>
                        <select
                            onChange={(e) => setSelectedClient(clients.find(client => client.id === parseInt(e.target.value)))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select a client...</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>
                                   {client.client_code}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="pb-4 bg-white">
                        <label htmlFor="contact-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                id="contact-search" 
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Search for contacts"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2">
                            Select Contacts
                        </label>
                        {filteredContacts.map(contact => (
                            <div key={contact.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    value={contact.id}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setSelectedContacts(prev =>
                                            checked ? [...prev, contact.id] : prev.filter(id => id !== contact.id)
                                        );
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="ml-2 text-gray-700">
                                    {contact.name} {contact.surname} ({contact.email})
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleLink}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Link Clients
                    </button>
                </>
            )}
        </div>
    );
}

export default LinkClients;
