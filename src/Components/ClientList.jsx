import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkClients from './LinkClients';
import ClientForm from './ClientForm';

function LinkedContacts({ clients }) {
    const [linkedContacts, setLinkedContacts] = useState({});

    useEffect(() => {
        if (clients.length > 0) {
            const fetchLinkedContacts = async () => {
                try {
                    const contactsData = await Promise.all(clients.map(client =>
                        axios.get(`http://localhost:8080/clients/${client.client_code}/contacts`)
                    ));

                    const allContacts = contactsData.reduce((acc, response, index) => {
                        acc[clients[index].client_code] = response.data;
                        return acc;
                    }, {});
                    
                    setLinkedContacts(allContacts);
                } catch (error) {
                    console.error('Error fetching linked contacts:', error);
                }
            };

            fetchLinkedContacts();
        }
    }, [clients]);

    const handleUnlinkContact = async (client_code, contact_email) => {
        try {
            await axios.delete(`http://localhost:8080/unlink_contact_from_client/${client_code}/${contact_email}`);
        // Refresh linked contacts or update the UI as needed
            // Update the state after unlinking
            setLinkedContacts(prevState => ({
                ...prevState,
                [client_code]: prevState[client_code].filter(contact => contact.email !== contact_email)
            }));
        } catch (error) {
            console.error('Error unlinking contact:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Linked Contacts</h2>
            {Object.keys(linkedContacts).length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="text-left py-2 px-4 border-b">Client Name</th>
                            <th className="text-left py-2 px-4 border-b">Contact Name</th>
                            <th className="text-left py-2 px-4 border-b">Contact Email</th>
                            <th className="text-left py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <React.Fragment key={client.client_code}>
                                <tr>
                                    <td className="text-left py-2 px-4 border-b font-bold" colSpan="4">
                                        {client.name} ({client.client_code})
                                    </td>
                                </tr>
                                {linkedContacts[client.client_code].length > 0 ? (
                                    linkedContacts[client.client_code].map((contact, index) => (
                                        <tr key={index}>
                                            <td className="text-left py-2 px-4 border-b"></td>
                                            <td className="text-left py-2 px-4 border-b">{contact.name}</td>
                                            <td className="text-left py-2 px-4 border-b">{contact.email}</td>
                                            <td className="text-left py-2 px-4 border-b">
                                                <button
                                                    onClick={() => handleUnlinkContact(client.client_code, contact.email)}
                                                    className="text-red-500"
                                                >
                                                    Unlink
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-left py-2 px-4 border-b" colSpan="4">
                                            No contacts found.
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No linked contacts found.</p>
            )}
        </div>
    );
}

function ClientList() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/clients')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setClients(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    return (
        <div>
            <ClientForm />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Clients</h1>
                {clients.length > 0 ? (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-4 border-b">Name</th>
                                <th className="text-left py-2 px-4 border-b">Client Code</th>
                                <th className="text-center py-2 px-4 border-b">No. of Contacts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td className="text-left py-2 px-4 border-b">{client.name}</td>
                                    <td className="text-left py-2 px-4 border-b">{client.client_code}</td>
                                    <td className="text-center py-2 px-4 border-b">{client.contact_count}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No clients found.</p>
                )}
            </div>
            <LinkClients />
            {/* Linked Contacts Table */}
            <LinkedContacts clients={clients} />
        </div>
    );
}

export default ClientList;
