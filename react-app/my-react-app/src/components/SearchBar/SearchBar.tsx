import { useState } from 'react';
import { TextField } from '@mui/material';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search chats..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}

export default SearchBar;
