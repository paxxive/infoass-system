import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change to false for demo

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out successfully!');
  };

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
        <Link to="/deals" style={{
          color: '#ff6b6b',
          textDecoration: 'none',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Deal Finder 🔍
        </Link>
        <Link to="/cart" style={{color: '#cccccc', textDecoration: 'none', position: 'relative'}}>
          Cart
          {cartItemsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#ff6b6b',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartItemsCount}
            </span>
          )}
        </Link>
        
        {isLoggedIn ? (
          <div style={{position: 'relative'}}>
            <button style={{
              background: 'linear-gradient(45deg, #3498db, #2980b9)',
              color: 'white',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              👤 User
              <span>▼</span>
            </button>
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: '#1a1a2e',
              border: '1px solid #2d2d4d',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '0.5rem',
              minWidth: '200px',
              display: 'none'
            }}>
              <div style={{padding: '0.5rem 0', borderBottom: '1px solid #2d2d4d'}}>
                <div style={{color: 'white', fontWeight: 'bold'}}>Demo User</div>
                <div style={{color: '#00ff88', fontSize: '0.9rem'}}>demo@gamepoint.com</div>
              </div>
              <Link to="/profile" style={{
                display: 'block',
                color: '#cccccc',
                padding: '0.5rem 0',
                textDecoration: 'none'
              }}>
                👤 My Profile
              </Link>
              <Link to="/orders" style={{
                display: 'block',
                color: '#cccccc',
                padding: '0.5rem 0',
                textDecoration: 'none'
              }}>
                📦 My Orders
              </Link>
              <Link to="/wallet" style={{
                display: 'block',
                color: '#cccccc',
                padding: '0.5rem 0',
                textDecoration: 'none'
              }}>
                💰 Wallet
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '5px',
                  marginTop: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;