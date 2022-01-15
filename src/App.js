import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navigation from './views/Navigation';
import Home from './views/Home';

import { Container } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Navigation />
      <Container maxWidth='md' style={{ marginTop: 8 }}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
