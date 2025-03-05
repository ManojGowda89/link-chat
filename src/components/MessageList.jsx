// src/components/MessageList.js
import React from 'react';
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const MessageList = ({ messages, darkMode }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ maxHeight: '100px', overflowY: 'scroll', mb: 3 }}>
      {messages.length > 0 ? (
        [...messages].reverse().map((msg, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
              mb: 1,
              bgcolor: darkMode ? '#424242' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
            }}
          >
            <Box>
              <Typography variant="body1">{msg.text}</Typography>
              <Typography variant="caption" color={darkMode ? 'textSecondary' : 'textPrimary'}>
                {new Date(msg.timestamp).toLocaleString()}
              </Typography>
            </Box>
            <Tooltip title="Copy">
              <IconButton onClick={() => handleCopy(msg.text)} color="primary">
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        ))
      ) : (
        <Typography>No messages</Typography>
      )}
    </Box>
  );
};

export default MessageList;
