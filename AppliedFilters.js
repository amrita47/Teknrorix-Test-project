import React from 'react';

const AppliedFilters = ({ filters, setFilters }) => {
  const removeFilter = filterKey => {
    const newFilters = { ...filters };
    delete newFilters[filterKey];
    setFilters(newFilters);
  };

  return (
    <div>
      {Object.keys(filters).map(key => (
        <span key={key}>
          {filters[key]} <button onClick={() => removeFilter(key)}>X</button>
        </span>
      ))}
    </div>
  );
};

export default AppliedFilters;
