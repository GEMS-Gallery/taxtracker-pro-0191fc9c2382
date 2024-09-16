import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SearchBarProps {
  onSearch: (tid: bigint) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTid, setSearchTid] = useState('');

  const handleSearch = () => {
    const tid = BigInt(searchTid);
    onSearch(tid);
  };

  return (
    <Box display="flex" gap={2} marginBottom={2}>
      <TextField
        label="Search by TID"
        variant="outlined"
        value={searchTid}
        onChange={(e) => setSearchTid(e.target.value)}
        type="number"
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
