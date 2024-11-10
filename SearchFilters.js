import React, { useState } from 'react';

const SearchFilters = ({ setFilters }) => {
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');

  const handleFilterChange = () => {
    setFilters({
      department,
      location,
    });
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Department" 
        value={department} 
        onChange={e => setDepartment(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Location" 
        value={location} 
        onChange={e => setLocation(e.target.value)} 
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default SearchFilters;
