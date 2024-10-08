import React, { useState } from 'react';
 
import LinkClients from './Clients/LinkClients';
import ClientForm from './Clients/ClientForm';
import LinkedContacts from './Clients/LinkedContacts';
 
import ClientList from './Clients/ClientList';
function Client () {
    const [selectedComponent, setSelectedComponent] = useState('ClientForm');


    // Function to render the selected component
    const renderContent = () => {
        switch (selectedComponent) {
            case 'ClientForm':
                return <ClientForm />;
                case 'ClientList':
                    return <ClientList />;
            case 'LinkedClients':
                return <LinkClients />;

            case 'LinkedContacts':
                return <LinkedContacts  />;  
            default:
                return <ClientForm />;
        }
    };

    return (
        <div className="flex">

<div className="w-1/4 p-4 bg-gray-100">
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => setSelectedComponent('ClientForm')}
                            className={`w-full text-left p-2 ${selectedComponent === 'ClientForm' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                        >
                            Client Form
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('ClientList')}
                            className={`w-full text-left p-2 ${selectedComponent === 'ClientList' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                        >
                            Clients List
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('LinkedClients')}
                            className={`w-full text-left p-2 ${selectedComponent === 'LinkedClients' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                        >
                            Link a Client
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('LinkedContacts')}
                            className={`w-full text-left p-2 ${selectedComponent === 'LinkedContacts' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                        >
                            Linked Contacts
                        </button>
                    </li>
                </ul>
            </div>
   
            <div className="w-3/4 p-4">
                {renderContent()}
            </div>

    
   
        </div>
    );
}

export default Client ;
