import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import Header from './components/Header';
import Dialogs from './components/Dialogs';
import MessageSection from './components/MessageSection';
import { fetchMessages, sendMessage, clearMessages } from './api/messageApi';
import { addUser, deleteUser } from './api/userApi';
import { pingServer } from './api/serverApi';

const App = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [polling, setPolling] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [getabout, setabout] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailErrors, setEmailErrors] = useState({ from: '', to: '' });
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedMessages = sessionStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    const checkServer = async () => {
      const isServerUp = await pingServer();
      if (isServerUp) {
        setLoading(false);
      }
    };
    checkServer();
  }, []);

  useEffect(() => {
    if (polling) {
      const getMessages = async () => {
        const newMessages = await fetchMessages(from, to);
        setMessages(newMessages);
        sessionStorage.setItem('messages', JSON.stringify(newMessages));
        if (newMessages.length > 0) {
          setPolling(false);
        }
      };
      getMessages();
    }
  }, [polling, from, to]);

  const handleSendMessage = async () => {
    await sendMessage(from, to, message);
    setMessage('');
    const newMessages = await fetchMessages(from, to);
    setMessages(newMessages);
  };

  const clearmessages = async () => {
    await clearMessages(from, to);
    setMessage('');
    setMessages([]);
    sessionStorage.clear();
  };

  const handleAddUser = async () => {
    try {
      await addUser(from, to);
      setErrorMessage('Users added successfully');
      setErrorDialogOpen(true);
    } catch (error) {
      setErrorMessage(error.message);
      setErrorDialogOpen(true);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(from, to);
      setFrom('');
      setTo('');
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      setErrorDialogOpen(true);
    }
  };

  const handleDrawerToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email, type) => {
    const isValid = emailRegex.test(email);
    setEmailErrors((prevErrors) => ({
      ...prevErrors,
      [type]: isValid ? '' : 'Invalid email address',
    }));
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: darkMode ? '#333333' : '#eeeeee',
        color: darkMode ? '#ffffff' : '#000000',
        padding: 3,
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Header handleDrawerToggle={handleDrawerToggle} />
          <Dialogs
            dialogOpen={dialogOpen}
            handleCloseDialog={handleCloseDialog}
            darkMode={darkMode}
            errorDialogOpen={errorDialogOpen}
            errorMessage={errorMessage}
            setErrorDialogOpen={setErrorDialogOpen}
          />
          {getabout ? (
            <About />
          ) : (
            <MessageSection
              messages={messages}
              darkMode={darkMode}
              from={from}
              to={to}
              setFrom={setFrom}
              setTo={setTo}
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
              setPolling={setPolling}
              clearmessages={clearmessages}
              handleAddUser={handleAddUser}
              handleDeleteUser={handleDeleteUser}
            />
          )}
          <Box
            component="footer"
            sx={{
              mt: 'auto',
              bgcolor: '#1976D2',
              py: 2,
              textAlign: 'center',
              color: darkMode ? '#ffffff' : '#000000',
            }}
          >
            <Typography>Powered by mb64</Typography>
          </Box>
        </>
      )}
    </Container>
  );
};

export default App;
