// src/components/UserForm.js
import React from 'react';
import { TextField } from '@mui/material';

const UserForm = ({ from, to, setFrom, setTo, darkMode, emailErrors, validateEmail, inputsDisabled }) => (
  <>
    <TextField
      label="From Email"
      type="email"
      fullWidth
      margin="normal"
      value={from}
      error={!!emailErrors.from}
      onBlur={() => validateEmail(from, 'from')}
      onChange={(e) => setFrom(e.target.value)}
      helperText={emailErrors.from}
      disabled={inputsDisabled}
      sx={{ bgcolor: darkMode ? '#424242' : '#ffffff', color: darkMode ? '#ffffff' : '#000000' }}
    />
    <TextField
      label="To Email"
      type="email"
      fullWidth
      margin="normal"
      value={to}
      onBlur={() => validateEmail(to, 'to')}
      error={!!emailErrors.to}
      helperText={emailErrors.to}
      onChange={(e) => setTo(e.target.value)}
      disabled={inputsDisabled}
      sx={{ bgcolor: darkMode ? '#424242' : '#ffffff', color: darkMode ? '#ffffff' : '#000000' }}
    />
  </>
);

export default UserForm;
