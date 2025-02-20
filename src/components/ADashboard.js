import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import Employee from './Employee';
import User from './User';
import Product from './Product';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Employee');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, padding: '20px' }}>
          {activeComponent === 'Employee' && <Employee />}
          {activeComponent === 'User' && <User />}
          {activeComponent === 'Product' && <Product />}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
