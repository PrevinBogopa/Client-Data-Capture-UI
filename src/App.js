import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './Components/ClientList';
import ClientForm from './Components/ClientForm';


import ContactList from './Components/ContactList';
 
import Navbar from './Components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<ClientList />} />
 
                    <Route path="/contacts" element={<ContactList />} />
                   
 
                </Routes>
            </div>
        </Router>
    );
}

export default App;