import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './Components/ClientList';
import ClientForm from './Components/ClientForm';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ClientList />} />
                    <Route path="/new-client" element={<ClientForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
