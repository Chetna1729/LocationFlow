// frontend/src/App.js
import React, { useState } from 'react';
import LocationSelector from './LocationSelector';
import AddressForm from './AddressForm';
import AddressManagement from './AddressManagement';

const App = () => {
  const [location, setLocation] = useState(null);

  return (
    <div>
      <h1>Location/Address Flow</h1>
      {!location ? (
        <LocationSelector onLocationSelect={setLocation} />
      ) : (
        <>
          <AddressForm location={location} />
          <AddressManagement />
        </>
      )}
    </div>
  );
};

export default App;
