import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LinkContact() {
    const [contacts, setContacts] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedClients, setSelectedClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts:', error));

        axios.get('http://localhost:8080/clients')
            .then(response => setClients(response.data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    const handleLink = () => {
        if (!selectedContact) {
            alert('Please select a contact.');
            return;
        }

        if (selectedClients.length === 0) {
            alert('Please select at least one client.');
            return;
        }

        const requests = selectedClients.map(clientCode => {
            return axios.post('http://localhost:8080/link_contact_to_client', {
                client_code: clientCode,
                contact_email: selectedContact.email,
            });
        });

        Promise.all(requests)
            .then(() => alert('Clients successfully linked!'))
            .catch(error => {
                console.error('Error linking clients:', error);
                alert('There was an error linking the clients. Please try again.');
            });
    };

    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.client_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Link Contacts to Clients</h1>
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Contact
                    </label>
                    <select
                        onChange={(e) => setSelectedContact(contacts.find(contact => contact.id === parseInt(e.target.value)))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a contact...</option>
                        {contacts.map(contact => (
                            <option key={contact.id} value={contact.id}>
                                {contact.name} {contact.surname} ({contact.email})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="pb-4 bg-white">
                    <label htmlFor="client-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            id="client-search" 
                            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Search for clients"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Clients
                    </label>
                    {filteredClients.map(client => (
                        <div key={client.client_code} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                value={client.client_code}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setSelectedClients(prev =>
                                        checked ? [...prev, client.client_code] : prev.filter(code => code !== client.client_code)
                                    );
                                }}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-gray-700">
                                {client.name} ({client.client_code})
                            </span>
                        </div>
                    ))}
                </div>
                
                <button
                    onClick={handleLink}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Link Clients
                </button>
            </div>
        </div>
    );
}

export default LinkContact;
