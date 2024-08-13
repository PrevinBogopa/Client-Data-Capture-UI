import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LinkClientsToContact() {
    const [contacts, setContacts] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedClients, setSelectedClients] = useState([]);

    useEffect(() => {
        // Fetch contacts
        axios.get('http://localhost:8080/contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts:', error));

        // Fetch clients
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

        // Prepare the data for each client and send them one by one
        const requests = selectedClients.map(clientCode => {
            return axios.post('http://localhost:8080/link_contact_to_client', {
                client_code: clientCode,
                contact_email: selectedContact.email,
            });
        });

        // Execute all requests in parallel
        Promise.all(requests)
            .then(() => alert('Clients successfully linked!'))
            .catch(error => {
                console.error('Error linking clients:', error);
                alert('There was an error linking the clients. Please try again.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Link Contacts to Clients</h1>
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
                            {contact.name} {contact.surname} ({contact.email}) {/* Display contact name, surname, and email */}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Clients
                </label>
                {clients.map(client => (
                    <div key={client.client_code}>
                        <input
                            type="checkbox"
                            value={client.client_code}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setSelectedClients(prev =>
                                    checked ? [...prev, client.client_code] : prev.filter(code => code !== client.client_code)
                                );
                            }}
                        />
                        <span>{client.name} ({client.client_code})</span> {/* Display client name and code */}
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
    );
}

export default LinkClientsToContact;
