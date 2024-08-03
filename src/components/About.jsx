// src/components/About.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const About = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom>
      About Link Chat
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1">
          LinkChat is a streamlined web application designed for end-to-end communication without the need for a database. Instead, it leverages local machine storage to manage and forward messages between users, ensuring a lightweight and efficient chatting experience.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Key Features:</Typography>
        <ul>
          <li>
            <Typography variant="body1"><b>Session-Based Messaging:</b> Messages are stored in local sessions, making the application fast and reducing server load. Messages are deleted automatically when the user closes the window, maintaining privacy and security.</Typography>
          </li>
          <li>
            <Typography variant="body1"><b>User-Controlled Data:</b> Users have full control over their messages, with the ability to clear message history and delete their accounts at any time.</Typography>
          </li>
          <li>
            <Typography variant="body1"><b>Direct Communication:</b> Messages are forwarded directly from User1 to the server and then to User2. If the recipient is not available, messages are stored locally until they can be pulled from the sender's local storage when the recipient becomes available.</Typography>
          </li>
          <li>
            <Typography variant="body1"><b>Local Storage:</b> The application uses localStorage for storing messages, ensuring quick access and management of message data without the need for a central database.</Typography>
          </li>
          <li>
            <Typography variant="body1"><b>Real-Time Updates:</b> LinkChat supports real-time message forwarding and retrieval, offering a seamless chat experience.</Typography>
          </li>
        </ul>
      </Grid>
    </Grid>
  </Box>
);

export default About;
