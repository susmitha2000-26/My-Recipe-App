import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/recipesSlice'; // Import action

function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(''); // Local state for search input

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission (e.g., pressing Enter or clicking search button)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      dispatch(setSearchQuery(searchTerm)); // Dispatch search query to Redux store
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <form onSubmit={handleSearchSubmit} className="d-flex w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary ms-2">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
