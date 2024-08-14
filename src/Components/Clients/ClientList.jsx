import React, { useState, useEffect } from 'react';
import axios from 'axios';

 



function ClientList() {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter clients based on search term
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.client_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
      
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Clients</h1>

                <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                />

                {filteredClients.length > 0 ? (
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left py-3 px-4 border-b-2 border-gray-300">Name</th>
                                    <th className="text-left py-3 px-4 border-b-2 border-gray-300">Client Code</th>
                                    <th className="text-center py-3 px-4 border-b-2 border-gray-300">No. of Contacts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients.map(client => (
                                    <tr key={client.id} className="hover:bg-gray-100 transition">
                                        <td className="text-left py-3 px-4 border-b">{client.name}</td>
                                        <td className="text-left py-3 px-4 border-b">{client.client_code}</td>
                                        <td className="text-center py-3 px-4 border-b">{client.contact_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No clients found.</p>
                )}
            </div>

 
        </div>
    );
}

export default ClientList;
