import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section style={{
        textAlign: 'center',
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
      }}>
        <h1 style={{
          fontSize: '3.5rem', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(45deg, #00ff88, #ff6b6b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Your Ultimate Gaming Marketplace
        </h1>
        <p style={{
          fontSize: '1.3rem', 
          color: '#cccccc', 
          maxWidth: '600px', 
          margin: '0 auto 2rem'
        }}>
          Discover the best deals on physical games and in-game credits. All in one place, all at the best prices.
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
          <Link to="/products" style={{
            background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
            color: '#1a1a2e',
            padding: '12px 30px',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            Explore Deals
          </Link>
          <Link to="/register" style={{
            background: 'transparent',
            color: '#00ff88',
            padding: '12px 30px',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: '2px solid #00ff88'
          }}>
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;