import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TierList from './components/TierList';
import BrandList from './components/BrandList';

function App() {
  return (
    <Router basename="/matcha-tier-list">
      <div className="App">
        <nav>
          <Link to="/matcha-tier-list">Tier List</Link>
          <Link to="/brands">Brands</Link>
        </nav>
        
        <Routes>
          <Route path="/matcha-tier-list" element={<TierList />} />
          <Route path="/brands" element={<BrandList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
