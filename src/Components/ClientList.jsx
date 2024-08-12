import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientList() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/clients')
            .then(response => setClients(response.data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    return (
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
                                <td className="text-center py-2 px-4 border-b">{client.contacts_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No clients found.</p>
            )}
        </div>
    );
}

export default ClientList;
