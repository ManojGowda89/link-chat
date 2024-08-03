// src/components/Dialogs.js
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import About from './About';

const Dialogs = ({
  dialogOpen,
  handleCloseDialog,
  darkMode,
  errorDialogOpen,
  errorMessage,
  setErrorDialogOpen,
}) => (
  <>
    <Dialog
      open={dialogOpen}
      onClose={handleCloseDialog}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: darkMode ? '#424242' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: '#1976D2',
          color: darkMode ? '#ffffff' : '#000000',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Link Chat
        <IconButton edge="end" color="inherit" aria-label="close" onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          bgcolor: darkMode ? '#424242' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      >
        <About />
      </DialogContent>
    </Dialog>

    <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <Typography>{errorMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setErrorDialogOpen(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </>
);

export default Dialogs;
