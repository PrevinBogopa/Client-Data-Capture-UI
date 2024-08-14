import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkContacts  from './LinkContacts';
import ContactForm from './ContactForm';

function LinkedClients({ contacts }) {
    const [linkedClients, setLinkedClients] = useState({});

    useEffect(() => {
        if (contacts.length > 0) {
            const fetchLinkedClients = async () => {
                try {
                    const clientsData = await Promise.all(contacts.map(contact =>
                        axios.get(`http://localhost:8080/contacts/${contact.email}/clients`)
                    ));

                    const allClients = clientsData.reduce((acc, response, index) => {
                        acc[contacts[index].email] = response.data;
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
                            <React.Fragment key={contact.email}>
                                <tr>
                                    <td className="text-left py-2 px-4 border-b font-bold" colSpan="4">
                                        {contact.name} ({contact.email})
                                    </td>
                                </tr>
                                {linkedClients[contact.email].length > 0 ? (
                                    linkedClients[contact.email].map((client, index) => (
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
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-left py-2 px-4 border-b" colSpan="4">
                                            No clients found.
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No linked clients found.</p>
            )}
        </div>
    );
}
function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/contacts')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setContacts(response.data); // Ensure data is set correctly
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    // Filter contacts based on search term
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <ContactForm />

            <div className="mt-8">
                <h1 className="text-3xl font-bold mb-6">Contacts</h1>

                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                />

                {filteredContacts.length > 0 ? (
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left py-3 px-4 border-b-2 border-gray-300">Surname</th>
                                    <th className="text-left py-3 px-4 border-b-2 border-gray-300">Name</th>
                                    <th className="text-left py-3 px-4 border-b-2 border-gray-300">Email Address</th>
                                    <th className="text-center py-3 px-4 border-b-2 border-gray-300">Linked Clients</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map(contact => (
                                    <tr key={contact.id} className="hover:bg-gray-100 transition">
                                        <td className="text-left py-3 px-4 border-b">{contact.surname}</td>
                                        <td className="text-left py-3 px-4 border-b">{contact.name}</td>
                                        <td className="text-left py-3 px-4 border-b">{contact.email}</td>
                                        <td className="text-center py-3 px-4 border-b">{contact.linked_clients_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No contacts found.</p>
                )}
            </div>

            <LinkContacts />
            <LinkedClients contacts={contacts} />
        </div>
    );
}

export default ContactList;