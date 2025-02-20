import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Admin credentials
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  // Handle login
  const handleLogin = () => {
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('auth', 'true'); // Store session in local storage
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: '#000',
        color: '#FFA500',
        padding: '32px',
        borderRadius: '12px',
        marginTop: '100px',
        boxShadow: '0px 4px 10px rgba(255, 165, 0, 0.5)',
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '24px' }}>
        Admin Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          marginBottom: '16px',
          input: { color: '#FFA500' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FFA500', // Border color for normal state
            },
            '&:hover fieldset': {
              borderColor: '#FFA500', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFA500', // Border color when focused
            },
          },
        }}
        InputLabelProps={{
          style: { color: '#FFA500' }, // Label text color
        }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          marginBottom: '24px',
          input: { color: '#FFA500' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FFA500',
            },
            '&:hover fieldset': {
              borderColor: '#FFA500',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFA500',
            },
          },
        }}
        InputLabelProps={{
          style: { color: '#FFA500' },
        }}
      />
      <Button fullWidth variant="contained" color="warning" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
