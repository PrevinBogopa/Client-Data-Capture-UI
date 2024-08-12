import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LinkContactsToClient() {
    const [clients, setClients] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/clients')
            .then(response => setClients(response.data))
            .catch(error => console.error('Error fetching clients:', error));

        axios.get('http://localhost:8080/contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    const handleLink = () => {
        axios.post(`http://localhost:8080/clients/${selectedClient.id}/link_contacts`, { contacts: selectedContacts })
            .then(response => console.log('Contacts linked:', response.data))
            .catch(error => console.error('Error linking contacts:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Link Contacts to Client</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Client
                </label>
                <select
                    onChange={(e) => setSelectedClient(clients.find(client => client.id === parseInt(e.target.value)))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Select a client...</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Contacts
                </label>
                {contacts.map(contact => (
                    <div key={contact.id}>
                        <input
                            type="checkbox"
                            value={contact.id}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setSelectedContacts(prev =>
                                    checked ? [...prev, contact.id] : prev.filter(id => id !== contact.id)
                                );
                            }}
                        />
                        <span>{contact.name} {contact.surname}</span>
                    </div>
                ))}
            </div>
            <button
                onClick={handleLink}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Link Contacts
            </button>
        </div>
    );
}

export default LinkContactsToClient;
