import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LinkClients() {
    const [clients, setClients] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [loading, setLoading] = useState(true);

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
            client_code: selectedClient.client_code,  // Send the client code
            contact_email: selectedContacts.map(contactId => 
                contacts.find(contact => contact.id === contactId).email) // Convert IDs to emails
        })
        .then(response => alert('Clients successfully linked!'))
        .catch(error => {
            console.error('Error linking clients:', error);
            alert('There was an error linking the contacts. Please try again.');
        });
    };
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Link Client to Contacts </h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
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
                                <option key={client.id} value={client.id}>
                                   {client.client_code}
                                </option>
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
                                <span>{contact.name} {contact.surname} ({contact.email})</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleLink}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Link Clients
                    </button>
                </>
            )}
        </div>

        
    );
    
}

 

export default LinkClients ;   