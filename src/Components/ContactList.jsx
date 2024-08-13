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

    return (
        <div className="container mx-auto p-4">
            <ContactForm />
            <div>
            <h1 className="text-2xl font-bold mb-4">Contacts</h1>
            {contacts.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                        <th className="text-left py-2 px-4 border-b">Surname</th>
                            <th className="text-left py-2 px-4 border-b">Name</th>
                       
                            <th className="text-left py-2 px-4 border-b">Email address</th>
                            <th className="text-center py-2 px-4 border-b">Linked Clients</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.id}>
                                      <td className="text-left py-2 px-4 border-b">  {contact.surname}</td>
                                <td className="text-left py-2 px-4 border-b">{contact.name} </td>
                          
                                <td className="text-left py-2 px-4 border-b">{contact.email}</td>
                                <td className="text-center py-2 px-4 border-b">{contact.linked_clients_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contacts found.</p>
            )}
            </div>

<LinkContacts  />
<LinkedClients contacts={contacts}/>



        </div>
    );
}

export default ContactList;
