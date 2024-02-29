import React, { createContext, useContext, useState, useEffect } from 'react';

const ClientContext = createContext();
export const useClients = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const response = await fetch('/api/clients');
    const data = await response.json();
    setClients(data);
  };

  const createClient = async (client) => {
    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    const newClient = await response.json();
    setClients([...clients, newClient]);
  };

  const updateClient = async (id, updatedInfo) => {
    await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInfo),
    });
    fetchClients(); // Re-fetch clients to update the local state
  };

  const deleteClient = async (id) => {
    await fetch(`/api/clients/${id}`, {
      method: 'DELETE',
    });
    setClients(clients.filter(client => client.id !== id));
  };

  const value = {
    clients,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};
