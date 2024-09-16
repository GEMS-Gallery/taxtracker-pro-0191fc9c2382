import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerForm from './components/TaxPayerForm';
import SearchBar from './components/SearchBar';

interface TaxPayer {
  tid?: bigint;
  firstName: string;
  lastName: string;
  address: string;
}

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      setLoading(true);
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tax payers');
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: Omit<TaxPayer, 'tid'>) => {
    try {
      setLoading(true);
      const tid = BigInt(Date.now());
      const result = await backend.addTaxPayer(tid, newTaxPayer.firstName, newTaxPayer.lastName, newTaxPayer.address);
      if ('ok' in result) {
        await fetchTaxPayers();
      } else {
        setError(result.err);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to add tax payer');
      setLoading(false);
    }
  };

  const handleSearch = async (tid: bigint) => {
    try {
      setLoading(true);
      const result = await backend.searchTaxPayerByTID(tid);
      if (result) {
        setTaxPayers([result]);
      } else {
        setTaxPayers([]);
        setError('No tax payer found with the given TID');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to search tax payer');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        TaxPayer Management System
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SearchBar onSearch={handleSearch} />
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TaxPayerList taxPayers={taxPayers} />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TaxPayerForm onSubmit={handleAddTaxPayer} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
