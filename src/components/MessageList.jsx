// src/components/MessageList.js
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const MessageList = ({ messages, darkMode }) => (
  <Box sx={{ maxHeight: '100px', overflowY: 'scroll', mb: 3 }}>
    {messages.length > 0 ? (
      [...messages].reverse().map((msg, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            padding: 2,
            mb: 1,
            bgcolor: darkMode ? '#424242' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
          }}
        >
          <Typography variant="body1">{msg.text}</Typography>
          <Typography variant="caption" color={darkMode ? 'textSecondary' : 'textPrimary'}>
            {new Date(msg.timestamp).toLocaleString()}
          </Typography>
        </Paper>
      ))
    ) : (
      <Typography>No messages</Typography>
    )}
  </Box>
);

export default MessageList;
