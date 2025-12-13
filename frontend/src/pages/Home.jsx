import React from 'react';
import { Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa'; // import the tag icon

const Home = () => {
  return (
    <div>
      <section style={{
        textAlign: 'center',
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #171A21 0%, #1B2838 100%)'
      }}>
        <h1 style={{
          fontSize: '3.5rem', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(45deg, #66C0F4, #417a9b28)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Your Ultimate Gaming Marketplace
        </h1>

        <p style={{
          fontSize: '1.3rem', 
          color: '#C7D5E0', 
          maxWidth: '600px', 
          margin: '0 auto 2rem'
        }}>
          Discover the best deals on physical games and in-game credits. All in one place, all at the best prices.
        </p>

        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>

          <Link to="/products" style={{
            background: 'linear-gradient(45deg, #00ff88, #00ff888f)',
            color: '#171A21',
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
            color: '#66C0F4',
            padding: '12px 30px',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: '2px solid #07466aff'
          }}>
            Join Now
          </Link>

          <Link to="/deals" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent', 
            color: '#417A9B',
            padding: '12px 30px',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: '2px solid #7dc8f399'
          }}>
            Deal Finder <FaTag />
          </Link>

        </div>
      </section>
    </div>
  );
};

export default Home;
