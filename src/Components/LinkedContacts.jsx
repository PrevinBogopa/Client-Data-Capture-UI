import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LinkedContacts({ clients }) {
    const [linkedContacts, setLinkedContacts] = useState([]);

    useEffect(() => {
        if (clients.length > 0) {
            const fetchLinkedContacts = async () => {
                try {
                    const contactsData = await Promise.all(clients.map(client =>
                        axios.get(`http://localhost:8080/clients/${client.client_code}/contacts`)
                    ));

                    const allContacts = contactsData.map(response => response.data);
                    setLinkedContacts(allContacts.flat());
                } catch (error) {
                    console.error('Error fetching linked contacts:', error);
                }
            };

            fetchLinkedContacts();
        }
    }, [clients]);

    const unlinkContact = async (clientCode, contactEmail) => {
        try {
            await axios.delete(`http://localhost:8080/unlink_contact_from_client/${clientCode}/${contactEmail}`);

            // Remove unlinked contact from state
            setLinkedContacts(linkedContacts.filter(contact => contact.email !== contactEmail));
        } catch (error) {
            console.error('Error unlinking contact:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Linked Contacts</h2>
            {clients.map((client, clientIndex) => (
                <div key={client.client_code}>
                    <h3 className="text-lg font-semibold">{client.name} ({client.client_code})</h3>
                    <table className="min-w-full bg-white mb-4">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-4 border-b">Contact Name</th>
                                <th className="text-left py-2 px-4 border-b">Contact Email</th>
                                <th className="text-left py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linkedContacts
                                .filter(contact => contact.client_code === client.client_code)
                                .map((contact, index) => (
                                    <tr key={index}>
                                        <td className="text-left py-2 px-4 border-b">{contact.name}</td>
                                        <td className="text-left py-2 px-4 border-b">{contact.email}</td>
                                        <td className="text-left py-2 px-4 border-b">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => unlinkContact(client.client_code, contact.email)}
                                            >
                                                Unlink
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default LinkedContacts;
