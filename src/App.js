import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './Components/ClientList';
import ClientForm from './Components/ClientForm';


import ContactList from './Components/ContactList';
import ContactForm from './Components/ContactForm';
import LinkContactsToClient from './Components/LinkClientsToContacts';
import LinkClientsToContacts from './Components/LinkContactsToClient';
import Navbar from './Components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<ClientList />} />
                    <Route path="/create-client" element={<ClientForm />} />
                    <Route path="/contacts" element={<ContactList />} />
                    <Route path="/create-contact" element={<ContactForm />} />
                    <Route path="/link-contacts" element={<LinkContactsToClient />} />
                    <Route path="/link-clients" element={<LinkClientsToContacts />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;