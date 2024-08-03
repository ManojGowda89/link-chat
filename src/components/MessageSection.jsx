// src/components/MessageSection.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import MessageList from './MessageList';
import UserForm from './UserForm';
import MessageForm from './MessageForm';
import axios from 'axios';
const MessageSection = ({
  messages,
  darkMode,
  from,
  to,
  setFrom,
  setTo,
  message,
  setMessage,
  handleSendMessage,
  setPolling,
  clearmessages,
  handleAddUser,
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" gutterBottom>
      Messages
    </Typography>
    <MessageList messages={messages} darkMode={darkMode} />
    <UserForm
      from={from}
      to={to}
      setFrom={setFrom}
      setTo={setTo}
      darkMode={darkMode}
      emailErrors={{}}
      validateEmail={() => {}}
      inputsDisabled={false}
    />
    <MessageForm
      message={message}
      setMessage={setMessage}
      handleSendMessage={handleSendMessage}
      darkMode={darkMode}
      from={from}
      to={to}
    />
    <Button
      variant="outlined"
      color="primary"
      onClick={() => setPolling(true)}
      disabled={from.length === 0 || to.length === 0}
      sx={{ ml: 2 }}
    >
      Pull Messages
    </Button>
    <Button
      variant="outlined"
      color="error"
      onClick={clearmessages}
      disabled={messages.length === 0}
      sx={{ ml: 2 }}
    >
      Clear Messages
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleAddUser}
      disabled={from.length === 0 || to.length === 0}
      sx={{ ml: 2 }}
    >
      Add User
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      onClick={async () => {
        console.log("sdh")
       await axios.post('https://link-chat-server.onrender.com/deleteuser', { from, to });
        setFrom('');
        setTo('');
        window.location.reload();
      }}
      disabled={from.length === 0 || to.length === 0}
      sx={{ ml: 2 }}
    >
      Delete User
    </Button>
  </Box>
);

export default MessageSection;
