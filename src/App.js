import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Client from './Components/Client';


import Contact from './Components/Contact';
 
import Navbar from './Components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Client />} />
 
                    <Route path="/contacts" element={<Contact  />} />
                   
 
                </Routes>
            </div>
        </Router>
    );
}

export default App;