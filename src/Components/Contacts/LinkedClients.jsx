import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LinkedClients() {
    const [linkedClients, setLinkedClients] = useState({});
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/contacts')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setContacts(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    useEffect(() => {
        if (contacts.length > 0) {
            const fetchLinkedClients = async () => {
                try {
                    const clientsData = await Promise.all(contacts.map(contact =>
                        axios.get(`http://localhost:8080/contacts/${contact.email}/clients`)
                    ));

                    const allClients = clientsData.reduce((acc, response, index) => {
                        if (response.data.length > 0) {
                            acc[contacts[index].email] = response.data;
                        }
                        return acc;
                    }, {});

                    setLinkedClients(allClients);
                } catch (error) {
                    console.error('Error fetching linked clients:', error);
                }
            };

            fetchLinkedClients();
        }
    }, [contacts]);

    const handleUnlinkClient = async (contact_email, client_code) => {
        try {
            await axios.delete(`http://localhost:8080/unlink_client_from_contact/${contact_email}/${client_code}`);
            setLinkedClients(prevState => ({
                ...prevState,
                [contact_email]: prevState[contact_email].filter(client => client.client_code !== client_code)
            }));
        } catch (error) {
            console.error('Error unlinking client:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Linked Clients</h2>
            {Object.keys(linkedClients).length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="text-left py-2 px-4 border-b">Contact Name</th>
                            <th className="text-left py-2 px-4 border-b">Client Name</th>
                            <th className="text-left py-2 px-4 border-b">Client Code</th>
                            <th className="text-left py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            linkedClients[contact.email]?.length > 0 && (
                                <React.Fragment key={contact.email}>
                                    <tr>
                                        <td className="text-left py-2 px-4 border-b font-bold" colSpan="4">
                                            {contact.name} ({contact.email})
                                        </td>
                                    </tr>
                                    {linkedClients[contact.email].map((client, index) => (
                                        <tr key={index}>
                                            <td className="text-left py-2 px-4 border-b"></td>
                                            <td className="text-left py-2 px-4 border-b">{client.name}</td>
                                            <td className="text-left py-2 px-4 border-b">{client.client_code}</td>
                                            <td className="text-left py-2 px-4 border-b">
                                                <button
                                                    onClick={() => handleUnlinkClient(contact.email, client.client_code)}
                                                    className="text-red-500"
                                                >
                                                    Unlink
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            )
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No linked clients found.</p>
            )}
        </div>
    );
}

export default LinkedClients;
