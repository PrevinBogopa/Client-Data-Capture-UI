import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactList() {
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Contacts</h1>
            {contacts.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="text-left py-2 px-4 border-b">Name</th>
                            <th className="text-left py-2 px-4 border-b">Surname</th>
                            <th className="text-left py-2 px-4 border-b">Email</th>
                            <th className="text-center py-2 px-4 border-b">No. of Clients</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.id}>
                                <td className="text-left py-2 px-4 border-b">{contact.name}</td>
                                <td className="text-left py-2 px-4 border-b">{contact.surname}</td>
                                <td className="text-left py-2 px-4 border-b">{contact.email}</td>
                                <td className="text-center py-2 px-4 border-b">0</td> {/* Assuming 0 clients for now */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contacts found.</p>
            )}
        </div>
    );
}

export default ContactList;