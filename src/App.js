import React from 'react';
import Layout from './components/Layout/Layout';
import Navbar from './components/NavBar/Navbar';
import MainContent from './components/MainContent/MainContent';
import SidePart from './components/SidePart/SidePart';

const App = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <MainContent />
        <SidePart />
      </Layout>
    </div>
  );
};

export default App;