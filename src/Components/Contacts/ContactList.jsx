import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
 
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

     
        </div>
    );
}

export default ContactList;