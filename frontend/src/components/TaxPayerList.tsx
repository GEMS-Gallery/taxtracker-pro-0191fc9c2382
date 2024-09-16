import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface TaxPayer {
  tid?: bigint;
  firstName: string;
  lastName: string;
  address: string;
}

interface TaxPayerListProps {
  taxPayers: TaxPayer[];
}

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxPayers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>TID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taxPayers.map((taxPayer, index) => (
            <TableRow key={taxPayer.tid?.toString() ?? index}>
              <TableCell>{taxPayer.tid?.toString() ?? 'N/A'}</TableCell>
              <TableCell>{taxPayer.firstName}</TableCell>
              <TableCell>{taxPayer.lastName}</TableCell>
              <TableCell>{taxPayer.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxPayerList;
