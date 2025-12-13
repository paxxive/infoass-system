import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaUser, FaBox, FaWallet, FaSearch, FaCaretDown, FaTag } from 'react-icons/fa';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out successfully!');
  };

  return (
    <nav style={{
      background: '#171A21', 
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.4)'
    }}>
      <Link to="/" style={{
        color: '#66C0F4',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textDecoration: 'none',
      }}>
        Game<span style={{color: '#417A9B'}}>Point</span>
      </Link>

      <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
        <Link to="/" style={{color: '#C7D5E0', textDecoration: 'none'}}>Home</Link>
        <Link to="/products" style={{color: '#C7D5E0', textDecoration: 'none'}}>Products</Link>

        <Link to="/deals" style={{
          color: '#66C0F4',
          textDecoration: 'none',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #66C0F4, #417A9B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          Deal Finder <FaTag />
        </Link>

        <Link to="/cart" style={{color: '#C7D5E0', textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
          <FaShoppingCart /> Cart
          {cartItemsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#417A9B',
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
              background: 'linear-gradient(45deg, #1B2838, #171A21)',
              color: '#66C0F4',
              border: '1px solid #417A9B',
              padding: '8px 20px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaUser /> User <FaCaretDown />
            </button>

            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: '#1B2838',
              border: '1px solid #2d2d4d',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '0.5rem',
              minWidth: '200px',
              display: 'none'
            }}>
              <div style={{padding: '0.5rem 0', borderBottom: '1px solid #2d2d4d'}}>
                <div style={{color: '#C7D5E0', fontWeight: 'bold'}}>Demo User</div>
                <div style={{color: '#66C0F4', fontSize: '0.9rem'}}>demo@gamepoint.com</div>
              </div>

              <Link to="/profile" style={{display: 'block', color: '#C7D5E0', padding: '0.5rem 0', textDecoration: 'none'}}>
                <FaUser /> My Profile
              </Link>

              <Link to="/orders" style={{display: 'block', color: '#C7D5E0', padding: '0.5rem 0', textDecoration: 'none'}}>
                <FaBox /> My Orders
              </Link>

              <Link to="/wallet" style={{display: 'block', color: '#C7D5E0', padding: '0.5rem 0', textDecoration: 'none'}}>
                <FaWallet /> Wallet
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  background: '#417A9B',
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
            <Link to="/login" style={{color: '#C7D5E0', textDecoration: 'none'}}>Login</Link>

            <Link to="/register" style={{
              background: 'linear-gradient(45deg, #66C0F4, #417A9B)',
              color: '#171A21',
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
