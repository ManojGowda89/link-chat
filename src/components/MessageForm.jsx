// src/components/MessageForm.js
import React from 'react';
import { TextField, Button } from '@mui/material';

const MessageForm = ({ message, setMessage, handleSendMessage, darkMode,from,to}) => (
  <>
    <TextField
      label="Message"
      multiline
      rows={4}
      fullWidth
      margin="normal"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      sx={{ bgcolor: darkMode ? '#424242' : '#ffffff', color: darkMode ? '#ffffff' : '#000000' }}
    />
    <Button variant="outlined" color="primary" onClick={handleSendMessage} disabled={message.length === 0 ||from.length===0 || to.length===0 }>
      Send
    </Button>
  </>
);

export default MessageForm;
