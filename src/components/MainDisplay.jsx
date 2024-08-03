import React from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import Header from './Header';
import Dialogs from './Dialogs';
import MessageSection from './MessageSection';
import About from './About';

const MainDisplay = ({
  darkMode,
  loading,
  drawerOpen,
  setDrawerOpen,
  dialogOpen,
  handleDrawerToggle,
  handleCloseDialog,
  errorDialogOpen,
  errorMessage,
  setErrorDialogOpen,
  getabout,
  messages,
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
  handleDeleteUser,
  setMessages
}) => {
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
          <Header handleDrawerToggle={() => handleDrawerToggle(drawerOpen, setDrawerOpen)} />
          <Dialogs
            dialogOpen={dialogOpen}
            handleCloseDialog={() => handleCloseDialog(setDialogOpen)}
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
              handleSendMessage={() => handleSendMessage(from, to, message, setMessage, setMessages)}
              setPolling={setPolling}
              clearmessages={() => clearmessages(from, to, setMessage, setMessages)}
              handleAddUser={() => handleAddUser(from, to, setErrorMessage, setErrorDialogOpen)}
              handleDeleteUser={() => handleDeleteUser(from, to, setFrom, setTo, setErrorMessage, setErrorDialogOpen)}
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

export default MainDisplay;
