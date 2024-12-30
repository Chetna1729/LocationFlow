// frontend/src/AddressForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = ({ location }) => {
  const [houseNumber, setHouseNumber] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('home');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressData = {
      houseNumber,
      area,
      category,
      lat: location.lat,
      lng: location.lng,
    };

    try {
      await axios.post('http://localhost:5000/save-address', addressData);
      alert('Address saved successfully!');
    } catch (error) {
      alert('Error saving address');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="House/Flat/Block No."
        value={houseNumber}
        onChange={(e) => setHouseNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apartment/Road/Area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="home">Home</option>
        <option value="office">Office</option>
        <option value="friendsFamily">Friends & Family</option>
      </select>
      <button type="submit">Save Address</button>
    </form>
  );
};

export default AddressForm;
