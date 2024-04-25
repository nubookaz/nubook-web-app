import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

import { router } from '@inertiajs/react'; 

const ClientContext = createContext();
export const useClients = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const { userData, loggedIn } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/clients', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });
      if (!response.ok) {
        const errMessage = await response.text();
        throw new Error(`Failed to fetch clients: ${errMessage}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  
  // Create a new client
  const createClient = useCallback(async (client) => {
    try {
      const response = await fetch('/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(client),
      });
      if (!response.ok) throw new Error('Failed to create client');
      const newClient = await response.json();
      setClients(prevClients => [...prevClients, newClient]);
    } catch (error) {
      console.error('Error creating client:', error);
      // Handle error as needed
    }
  }, []);

  // Update an existing client
  const updateClient = useCallback(async (id, updatedInfo) => {
    try {
      const response = await fetch(`/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedInfo),
      });
      if (!response.ok) throw new Error('Failed to update client');
      fetchClients(); // Optionally, you could update the client locally for efficiency
    } catch (error) {
      console.error('Error updating client:', error);
      // Handle error as needed
    }
  }, []);

  // Delete a client
  const deleteClient = useCallback(async (id) => {
    try {
      const response = await fetch(`/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete client');
      setClients(prevClients => prevClients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      // Handle error as needed
    }
  }, []);
 

  useEffect(() => {
    if (loggedIn) {
      fetchClients();
    }
  }, [loggedIn, fetchClients]);
  
  const value = { clients, fetchClients, createClient, updateClient, deleteClient, loading, error };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};
