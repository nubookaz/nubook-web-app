import React, { useState } from 'react';
import { useClients } from '@/Components/Contexts/ClientContext'; 

function CreateClient() {
  const { createClient } = useClients();

  const [clientData, setClientData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    title: '',
    company: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the createClient function from context
      await createClient(clientData);
      console.log('Client created successfully');
      // Reset form or handle success (e.g., showing a success message)
      setClientData({
        firstName: '',
        middleName: '',
        lastName: '',
        title: '',
        company: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={clientData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="middleName"
        placeholder="Middle Name"
        value={clientData.middleName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={clientData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={clientData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={clientData.company}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={clientData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={clientData.phone}
        onChange={handleChange}
      />
      <button type="submit">Create Client</button>
    </form>
  );
}

export default CreateClient;
