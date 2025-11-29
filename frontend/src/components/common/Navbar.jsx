import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      background: '#1a1a2e', 
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <Link to="/" style={{
        color: '#00ff88',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        textShadow: '0 0 10px #00ff88'
      }}>
        Game<span style={{color: '#ff6b6b'}}>Point</span>
      </Link>
      <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
        <Link to="/" style={{color: '#cccccc', textDecoration: 'none'}}>Home</Link>
        <Link to="/products" style={{color: '#cccccc', textDecoration: 'none'}}>Products</Link>
        <Link to="/login" style={{color: '#cccccc', textDecoration: 'none'}}>Login</Link>
        <Link to="/register" style={{
          background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
          color: '#1a1a2e',
          padding: '8px 20px',
          textDecoration: 'none',
          borderRadius: '20px',
          fontWeight: 'bold'
        }}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;