/* --- STEAM THEMED VERSION --- */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Deals = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const games = [
    { id: 1, name: 'Valorant', type: 'digital', platform: 'PC' },
    { id: 2, name: 'Mobile Legends', type: 'digital', platform: 'Mobile' },
    { id: 3, name: 'Genshin Impact', type: 'digital', platform: 'Cross-Platform' },
    { id: 4, name: 'Call of Duty', type: 'physical', platform: 'PlayStation/Xbox/PC' },
    { id: 5, name: 'Roblox', type: 'digital', platform: 'Cross-Platform' },
    { id: 6, name: 'Fortnite', type: 'digital', platform: 'Cross-Platform' },
  ];

  const allDeals = [
    {
      id: 1,
      game: 'Valorant',
      title: 'Valorant Points - 1000',
      originalPrice: 397.27,
      dealPrice: 357.54,
      discount: 10,
      seller: 'Official Store',
      rating: 5.0,
      delivery: 'Instant',
      trustScore: 'Excellent',
      badge: 'Best Deal'
    },
    // (all other deal objects unchanged)
  ];

  const findDeals = () => {
    if (!selectedGame) {
      alert('Please select a game first!');
      return;
    }

    setLoading(true);
    setShowResults(false);

    setTimeout(() => {
      const results = allDeals.filter(deal =>
        deal.game.toLowerCase().includes(selectedGame.toLowerCase())
      );
      setSearchResults(results);
      setLoading(false);
      setShowResults(true);
    }, 800);
  };

  const resetSearch = () => {
    setSelectedGame('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div style={{ padding: '2rem', minHeight: '80vh', background: '#171A21' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* HERO */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          background: 'linear-gradient(135deg, #1B2838 0%, #2A475E 100%)',
          borderRadius: '15px',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            color: '#66C0F4'
          }}>
            Smart Deal Finder
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#C7D5E0',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            Our AI-powered system scans multiple sellers to find the best prices!
          </p>
        </div>

        {/* TOOL */}
        <div style={{
          background: '#1B2838',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid #2A475E'
        }}>
          <h2 style={{ color: '#66C0F4', marginBottom: '1.5rem' }}>
            Find the Best Deals
          </h2>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <label style={{
                display: 'block',
                color: '#C7D5E0',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Select Game:
              </label>

              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #2A475E',
                  background: '#0E141B',
                  color: 'white',
                  fontSize: '1rem'
                }}>
                <option value="">-- Choose a game --</option>
                {games.map(game => (
                  <option key={game.id} value={game.name}>{game.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={findDeals}
              disabled={loading || !selectedGame}
              style={{
                background: !selectedGame ? '#2A475E' : '#66C0F4',
                color: !selectedGame ? '#777' : '#0E141B',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: selectedGame ? 'pointer' : 'not-allowed',
                minWidth: '150px'
              }}>
              {loading ? 'Scanning...' : 'Find Best Deals'}
            </button>

            {showResults && (
              <button
                onClick={resetSearch}
                style={{
                  background: 'transparent',
                  color: '#ff2b2bff',
                  border: '2px solid #ff2b2bff',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                New Search
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            {['Sellers Scanned', 'Average Savings', 'Delivery Time', 'Secure Transactions']
              .map((text, i) => (
                <div key={i} style={{
                  background: '#0E141B',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#66C0F4', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {i === 0 ? '8+' :
                     i === 1 ? '25%' :
                     i === 2 ? 'Instant' :
                               '100%'}
                  </div>
                  <div style={{ color: '#C7D5E0', fontSize: '0.9rem' }}>{text}</div>
                </div>
            ))}
          </div>
        </div>

        {/* RESULTS */}
        {showResults && (
          <div style={{
            background: '#1B2838',
            borderRadius: '15px',
            padding: '2rem',
            border: '1px solid #2A475E'
          }}>
            <h2 style={{ color: '#66C0F4' }}>
              Best Deals for <span style={{ color: '#cccccc' }}>{selectedGame}</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              {searchResults.map(deal => (
                <div key={deal.id} style={{
                  background: deal.badge === 'Best Deal'
                    ? 'linear-gradient(135deg, #1b2838ff 0%, #2a475e5b 100%)'
                    : '#0E141B',
                  border: deal.badge === 'Best Deal'
                    ? '2px solid #66c0f4a8'
                    : '1px solid #2A475E',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  position: 'relative'
                }}>

                  {deal.badge && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '20px',
                      background: deal.badge === 'Best Deal'
                        ? '#00ff88d7'
                        : '#2A475E',
                      color: '#0E141B',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>{deal.badge}</div>
                  )}

                  <h3 style={{ color: 'white' }}>{deal.title}</h3>

                  <div style={{ color: '#C7D5E0' }}>
                    Seller: <strong style={{ color: '#66C0F4' }}>{deal.seller}</strong>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ color: '#00ff8890', textDecoration: 'line-through' }}>
                      ₱{deal.originalPrice}
                    </div>
                    <div style={{ color: '#00ff88', fontSize: '1.8rem', fontWeight: 'bold' }}>
                      ₱{deal.dealPrice}
                    </div>
                  </div>

                  <button style={{
                    marginTop: '1rem',
                    background: '#00ff88d7',
                    color: '#0E141B',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    {deal.badge === 'Best Deal' ? 'Get This Deal!' : 'Add to Cart'}
                  </button>

                  {deal.badge === 'Best Deal' && (
                    <div style={{ color: '#C7D5E0', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      <FaStar /> Recommended by AI
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          marginTop: '3rem',
          background: 'linear-gradient(135deg, #1B2838 0%, #2A475E 100%)',
          borderRadius: '15px'
        }}>
          <h2 style={{ color: '#66C0F4' }}>Ready to Find Amazing Deals?</h2>
          <p style={{ color: '#C7D5E0', marginTop: '1rem' }}>
            Start saving now with our AI-powered tool.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/products" style={{
              background: '#00ff88b4',
              color: '#0E141B',
              padding: '12px 30px',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: 'bold'
            }}>
              Browse All Products
            </Link>

            <Link to="/cart" style={{
              background: 'transparent',
              color: '#66C0F4',
              padding: '12px 30px',
              borderRadius: '25px',
              border: '2px solid #66C0F4',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              View Your Cart
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Deals;
