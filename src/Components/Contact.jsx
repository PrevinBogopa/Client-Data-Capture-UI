import React, { useState } from 'react';
 
import LinkContacts from './Contacts/LinkContacts';
import ContactForm from './Contacts/ContactForm';
import LinkedClients from './Contacts/LinkedClients';
 
import ContactList from './Contacts/ContactList';
function Contact () {
    const [selectedComponent, setSelectedComponent] = useState('ContactForm');


    // Function to render the selected component
    const renderContent = () => {
        switch (selectedComponent) {
            case 'ContactForm':
                return <ContactForm />;
                case 'ContactList':
                    return <ContactList />;
            case 'LinkedContacts':
                return <LinkContacts />;

            case 'LinkedClients':
                return <LinkedClients/>;  
            default:
                return <ContactForm />;
        }
    };

    return (
        <div className="flex">

<div className="w-1/4 p-4 bg-gray-100">
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => setSelectedComponent('ContactForm')}
                            className={`w-full text-left p-2 ${selectedComponent === 'ContactForm' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                        >
                            Contact Form
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('ContactList')}
                            className={`w-full text-left p-2 ${selectedComponent === 'ContactList' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                        >
                            Contacts List
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('LinkedContacts')}
                            className={`w-full text-left p-2 ${selectedComponent === 'LinkedContacts' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                        >
                            Link a Contact
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('LinkedClients')}
                            className={`w-full text-left p-2 ${selectedComponent === 'LinkedClients' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                        >
                            Linked Clients
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

export default Contact ;
