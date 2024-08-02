import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  Paper
} from '@mui/material';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const About = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom>
      About Link Chat
    </Typography>
    <Typography variant="body1">
    Link Chatis a simple messaging application that allows users to send and receive messages securely.
      This app supports communication between two email addresses and provides functionalities to manage messages efficiently.
    </Typography>
  </Box>
);

const App = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [polling, setPolling] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [getabout, setabout] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [emailErrors, setEmailErrors] = useState({ from: '', to: '' });
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedMessages = sessionStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const fetchMessages = async () => {
    if (!from || !to) return;

    try {
      const response = await axios.get('https://link-chat-server.onrender.com/receive', {
        params: { from, to },
      });
      const newMessages = response.data.messages || [];
      setMessages(newMessages);
      sessionStorage.setItem('messages', JSON.stringify(newMessages));
      if (newMessages.length > 0) {
        setPolling(false);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (polling) {
      fetchMessages();
    }
  }, [polling, from, to]);

  const handleSendMessage = async () => {
    try {
      await axios.post('https://link-chat-server.onrender.com/send', { from, to, message });
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if(window.location.reload){
  sessionStorage.clear()
  }
  const clearmessages = async () => {
    try {
      await axios.post('https://link-chat-server.onrender.com/clear', { from, to });
      setMessage('');
      setMessages([]);
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('https://link-chat-server.onrender.com/addUser', { from, to });
      setErrorMessage('Users added successfully');
      setErrorDialogOpen(true);
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

  const validateEmail = (email, field) => {
    if (!emailRegex.test(email)) {
      setEmailErrors(prevErrors => ({ ...prevErrors, [field]: 'Invalid email address' }));
    } else {
      setEmailErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        justifyContent: 'center',
        bgcolor: darkMode ? '#121212' : '#fafafa',
        color: darkMode ? '#ffffff' : '#000000',
        padding: 0,
        margin: 0
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: darkMode ? '#333333' : '#eeeeee',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Link Chat
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Toolbar>
      </AppBar>

      {/* Dialog for Drawer */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} sx={{ '& .MuiDialog-paper': { bgcolor: darkMode ? '#424242' : '#ffffff', color: darkMode ? '#ffffff' : '#000000' } }}>
        <DialogTitle
          sx={{
            bgcolor: darkMode ? '#333333' : '#f5f5f5',
            color: darkMode ? '#ffffff' : '#000000',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
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
          <Button
            onClick={() => {
              setabout(false);
              handleCloseDialog();
            }}
            sx={{
              width: '100%',
              textAlign: 'left',
              color: darkMode ? '#ffffff' : '#000000',
              '&:hover': {
                bgcolor: darkMode ? '#616161' : '#eeeeee',
              }
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => {
              setabout(true);
              handleCloseDialog();
            }}
            sx={{
              width: '100%',
              textAlign: 'left',
              color: darkMode ? '#ffffff' : '#000000',
              '&:hover': {
                bgcolor: darkMode ? '#616161' : '#eeeeee',
              }
            }}
          >
            About
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
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

      {
        getabout ? <About /> : (
          <>
          
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Messages
              </Typography>
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
              <Button variant="outlined" color="primary" onClick={handleSendMessage} disabled={message.length === 0}>
                Send
              </Button>
              <Button variant="outlined" color="primary" onClick={() => setPolling(true)} disabled={from.length === 0 || to.length === 0} sx={{ ml: 2 }}>
                Pull Messages
              </Button>
              <Button variant="outlined" color="error" onClick={clearmessages} disabled={messages.length === 0} sx={{ ml: 2 }}>
                Clear Messages
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleAddUser} disabled={from.length === 0 || to.length===0}  sx={{ ml: 2 }}>
                Add User
              </Button>
              <Button variant="outlined" color="secondary" onClick={async()=>{
               await axios.post("https://link-chat-server.onrender.com/deleteuser",{ from, to })
               setFrom('') 
               setTo('')
              window.location.reload()
              }} disabled={from.length === 0 || to.length===0}  sx={{ ml: 2 }}>
                delete user
              </Button>
            </Box>
          </>
        )
      }

      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 2,
          textAlign: 'center',
          bgcolor: darkMode ? '#333333' : '#eeeeee',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      >
        <Typography variant="body2">Powered by mb64</Typography>
      </Box>
    </Container>
  );
};

export default App;
