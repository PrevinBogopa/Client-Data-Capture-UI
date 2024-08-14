import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LinkedContacts() {
    const [linkedContacts, setLinkedContacts] = useState({});
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Fetch clients first
        axios.get('http://localhost:8080/clients')
            .then(clientsResponse => {
                setClients(clientsResponse.data);
            })
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

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
            // Update the state after unlinking
            setLinkedContacts(prevState => ({
                ...prevState,
                [client_code]: prevState[client_code].filter(contact => contact.email !== contact_email)
            }));
        } catch (error) {
            console.error('Error unlinking contact:', error);
        }
    };

    const filteredClients = clients.filter(client => linkedContacts[client.client_code]?.length > 0);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Linked Contacts</h2>
            {filteredClients.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="text-left py-2 px-4 border-b">Client Name</th>
                            <th className="text-left py-2 px-4 border-b">Contact Name</th>
                            <th className="text-left py-2 px-4 border-b">Contact Email</th>
                            <th className="text-left py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <React.Fragment key={client.client_code}>
                                <tr>
                                    <td className="text-left py-2 px-4 border-b font-bold" colSpan="4">
                                        {client.name} ({client.client_code})
                                    </td>
                                </tr>
                                {linkedContacts[client.client_code].map((contact, index) => (
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
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contacts found.</p>
            )}
        </div>
    );
}

export default LinkedContacts;
