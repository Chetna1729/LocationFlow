// frontend/src/AddressManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/addresses').then((response) => {
      setAddresses(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete-address/${id}`).then(() => {
      setAddresses(addresses.filter((address) => address.id !== id));
    });
  };

  return (
    <div>
      <h3>Saved Addresses</h3>
      {addresses.map((address) => (
        <div key={address.id}>
          <p>{address.houseNumber}, {address.area} ({address.category})</p>
          <button>Edit</button>
          <button onClick={() => handleDelete(address.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AddressManagement;
