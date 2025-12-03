import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Deals = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample game data for deal finding
  const games = [
    { id: 1, name: 'Valorant', type: 'digital', platform: 'PC' },
    { id: 2, name: 'Mobile Legends', type: 'digital', platform: 'Mobile' },
    { id: 3, name: 'Genshin Impact', type: 'digital', platform: 'Cross-Platform' },
    { id: 4, name: 'Call of Duty', type: 'physical', platform: 'PlayStation/Xbox/PC' },
    { id: 5, name: 'Roblox', type: 'digital', platform: 'Cross-Platform' },
    { id: 6, name: 'Fortnite', type: 'digital', platform: 'Cross-Platform' },
  ];

  // Sample deal data
  const allDeals = [
    {
      id: 1,
      game: 'Valorant',
      title: 'Valorant Points - 1000',
      originalPrice: 9.99,
      dealPrice: 7.99,
      discount: 20,
      seller: 'Official Store',
      rating: 5.0,
      delivery: 'Instant',
      trustScore: 'Excellent',
      badge: 'Best Deal'
    },
    {
      id: 2,
      game: 'Valorant',
      title: 'Valorant Points - 1000',
      originalPrice: 9.99,
      dealPrice: 8.49,
      discount: 15,
      seller: 'GamingStoreX',
      rating: 4.5,
      delivery: '1-5 mins',
      trustScore: 'Good',
      badge: 'Verified Seller'
    },
    {
      id: 3,
      game: 'Valorant',
      title: 'Valorant Points - 2050',
      originalPrice: 19.99,
      dealPrice: 15.99,
      discount: 20,
      seller: 'GamePoint Exclusive',
      rating: 4.8,
      delivery: 'Instant',
      trustScore: 'Excellent',
      badge: 'Exclusive'
    },
    {
      id: 4,
      game: 'Mobile Legends',
      title: 'Mobile Legends Diamonds - 500',
      originalPrice: 7.99,
      dealPrice: 5.99,
      discount: 25,
      seller: 'Official Store',
      rating: 5.0,
      delivery: 'Instant',
      trustScore: 'Excellent',
      badge: 'Best Deal'
    },
    {
      id: 5,
      game: 'Mobile Legends',
      title: 'Mobile Legends Diamonds - 1000',
      originalPrice: 14.99,
      dealPrice: 11.99,
      discount: 20,
      seller: 'AsiaTopUp',
      rating: 4.3,
      delivery: '2-10 mins',
      trustScore: 'Good',
      badge: 'Popular'
    },
    {
      id: 6,
      game: 'Genshin Impact',
      title: 'Genesis Crystals - 6480',
      originalPrice: 99.99,
      dealPrice: 89.99,
      discount: 10,
      seller: 'Official Store',
      rating: 5.0,
      delivery: 'Instant',
      trustScore: 'Excellent',
      badge: 'Best Deal'
    },
    {
      id: 7,
      game: 'Genshin Impact',
      title: 'Blessing of the Welkin Moon',
      originalPrice: 4.99,
      dealPrice: 4.49,
      discount: 10,
      seller: 'GamePoint Exclusive',
      rating: 4.9,
      delivery: 'Instant',
      trustScore: 'Excellent',
      badge: 'Exclusive'
    },
    {
      id: 8,
      game: 'Call of Duty',
      title: 'Call of Duty: Modern Warfare (Physical)',
      originalPrice: 59.99,
      dealPrice: 39.99,
      discount: 33,
      seller: 'GameStop',
      rating: 4.7,
      delivery: '2-3 days',
      trustScore: 'Excellent',
      badge: 'Limited Time'
    },
  ];

  const findDeals = () => {
    if (!selectedGame) {
      alert('Please select a game first!');
      return;
    }

    setLoading(true);
    setShowResults(false);

    // Simulate API call delay
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

  const calculateSavings = (original, deal) => {
    return ((original - deal) / original * 100).toFixed(0);
  };

  return (
    <div style={{ padding: '2rem', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: '15px',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #00ff88, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Smart Deal Finder
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            Our AI-powered system scans multiple sellers to find you the best prices on games and in-game credits. Save time and money!
          </p>
        </div>

        {/* Deal Finder Tool */}
        <div style={{
          background: '#1a1a2e',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid #2d2d4d'
        }}>
          <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>
            Find the Best Deals
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <label style={{
                display: 'block',
                color: '#cccccc',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Select Game or Search:
              </label>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #2d2d4d',
                  background: '#0f0f23',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="">-- Choose a game --</option>
                {games.map(game => (
                  <option key={game.id} value={game.name}>
                    {game.name} ({game.type}) - {game.platform}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
              <button
                onClick={findDeals}
                disabled={loading || !selectedGame}
                style={{
                  background: !selectedGame ? '#2d2d4d' : 'linear-gradient(45deg, #00ff88, #00cc6a)',
                  color: !selectedGame ? '#666' : '#1a1a2e',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: selectedGame ? 'pointer' : 'not-allowed',
                  minWidth: '150px'
                }}
              >
                {loading ? 'Scanning for Deals...' : 'Find Best Deals'}
              </button>

              {showResults && (
                <button
                  onClick={resetSearch}
                  style={{
                    background: 'transparent',
                    color: '#ff6b6b',
                    border: '2px solid #ff6b6b',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  New Search
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <div style={{
              background: '#0f0f23',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#00ff88', fontSize: '1.5rem', fontWeight: 'bold' }}>8+</div>
              <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>Sellers Scanned</div>
            </div>
            <div style={{
              background: '#0f0f23',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#00ff88', fontSize: '1.5rem', fontWeight: 'bold' }}>25%</div>
              <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>Average Savings</div>
            </div>
            <div style={{
              background: '#0f0f23',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#00ff88', fontSize: '1.5rem', fontWeight: 'bold' }}>Instant</div>
              <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>Delivery Time</div>
            </div>
            <div style={{
              background: '#0f0f23',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#00ff88', fontSize: '1.5rem', fontWeight: 'bold' }}>100%</div>
              <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>Secure Transactions</div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div style={{
            background: '#1a1a2e',
            borderRadius: '15px',
            padding: '2rem',
            border: '1px solid #2d2d4d'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: '#00ff88' }}>
                Best Deals for <span style={{ color: '#ff6b6b' }}>{selectedGame}</span>
              </h2>
              <div style={{ color: '#cccccc' }}>
                Found <strong style={{ color: '#00ff88' }}>{searchResults.length}</strong> deals
              </div>
            </div>

            {searchResults.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#cccccc' }}>
                No deals found for {selectedGame}. Try another game!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {searchResults.map(deal => (
                  <div key={deal.id} style={{
                    background: deal.badge === 'Best Deal' 
                      ? 'linear-gradient(135deg, #1a1a2e 0%, #0f2a1a 100%)' 
                      : '#0f0f23',
                    border: deal.badge === 'Best Deal' 
                      ? '2px solid #00ff88' 
                      : '1px solid #2d2d4d',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    {/* Deal Badge */}
                    {deal.badge && (
                      <div style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '20px',
                        background: deal.badge === 'Best Deal' 
                          ? '#00ff88' 
                          : deal.badge === 'Exclusive' 
                          ? '#ff6b6b' 
                          : '#3498db',
                        color: '#1a1a2e',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {deal.badge}
                      </div>
                    )}

                    {/* Deal Info */}
                    <div style={{ flex: 3, minWidth: '300px' }}>
                      <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
                        {deal.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                          Seller: <strong style={{ color: '#00ff88' }}>{deal.seller}</strong>
                        </span>
                        <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                          Rating: ⭐ {deal.rating}/5.0
                        </span>
                        <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                          Delivery: {deal.delivery}
                        </span>
                        <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                          Trust: <strong style={{ color: '#00ff88' }}>{deal.trustScore}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Price Comparison */}
                    <div style={{ flex: 2, minWidth: '250px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                        <div>
                          <div style={{ color: '#ff6b6b', textDecoration: 'line-through', fontSize: '0.9rem' }}>
                            ${deal.originalPrice}
                          </div>
                          <div style={{ color: '#00ff88', fontSize: '1.8rem', fontWeight: 'bold' }}>
                            ${deal.dealPrice}
                          </div>
                        </div>
                        <div style={{
                          background: '#00ff88',
                          color: '#1a1a2e',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          Save {deal.discount}%
                        </div>
                      </div>
                      <div style={{ color: '#cccccc', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        You save: <strong>${(deal.originalPrice - deal.dealPrice).toFixed(2)}</strong>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div style={{ flex: 1, minWidth: '150px', textAlign: 'right' }}>
                      <button style={{
                        background: deal.badge === 'Best Deal' 
                          ? 'linear-gradient(45deg, #ff6b6b, #ff4757)' 
                          : 'linear-gradient(45deg, #00ff88, #00cc6a)',
                        color: '#1a1a2e',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%'
                      }}>
                        {deal.badge === 'Best Deal' ? 'Get This Deal!' : 'Add to Cart'}
                      </button>
                      {deal.badge === 'Best Deal' && (
                        <div style={{ color: '#ff6b6b', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                          ⚡ Recommended by our AI
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* How It Works Section */}
        {!showResults && (
          <div style={{
            background: '#1a1a2e',
            borderRadius: '15px',
            padding: '2rem',
            marginTop: '3rem',
            border: '1px solid #2d2d4d'
          }}>
            <h2 style={{ color: '#00ff88', textAlign: 'center', marginBottom: '2rem' }}>
              How Our Deal Finder Works
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: '#0f0f23',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem'
                }}>
                  1️⃣
                </div>
                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Select Game</h3>
                <p style={{ color: '#cccccc' }}>
                  Choose from popular games or search for any title
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: '#0f0f23',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem'
                }}>
                  2️⃣
                </div>
                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Scan Prices</h3>
                <p style={{ color: '#cccccc' }}>
                  Our system scans 8+ trusted sellers in real-time
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: '#0f0f23',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem'
                }}>
                  3️⃣
                </div>
                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Compare Deals</h3>
                <p style={{ color: '#cccccc' }}>
                  See all options with prices, ratings, and delivery times
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: '#0f0f23',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem'
                }}>
                  4️⃣
                </div>
                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Save Money</h3>
                <p style={{ color: '#cccccc' }}>
                  Get the best deal with our AI recommendation
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          marginTop: '3rem',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: '15px'
        }}>
          <h2 style={{ color: '#00ff88', marginBottom: '1rem' }}>
            Ready to Find Amazing Deals?
          </h2>
          <p style={{ color: '#cccccc', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Start searching now and join thousands of gamers who save money with GamePoint!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" style={{
              background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
              color: '#1a1a2e',
              padding: '12px 30px',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
              Browse All Products
            </Link>
            <Link to="/cart" style={{
              background: 'transparent',
              color: '#00ff88',
              padding: '12px 30px',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: '2px solid #00ff88'
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