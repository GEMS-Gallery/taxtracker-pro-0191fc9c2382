import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

interface TaxPayerFormData {
  firstName: string;
  lastName: string;
  address: string;
}

interface TaxPayerFormProps {
  onSubmit: (data: TaxPayerFormData) => void;
}

const TaxPayerForm: React.FC<TaxPayerFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<TaxPayerFormData>();

  const onSubmitForm = (data: TaxPayerFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: 'Address is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Address"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Add TaxPayer
        </Button>
      </Box>
    </form>
  );
};

export default TaxPayerForm;
