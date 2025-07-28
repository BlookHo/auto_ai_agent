import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './components/Home';
import NewDiagnosis from './components/NewDiagnosis';

const App = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} disableGutters sx={{ height: 'calc(100vh - 60px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewDiagnosis />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
