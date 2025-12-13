import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState({
    username: 'gamerpro123',
    email: 'gamer@gamepoint.com',
    fullName: 'Alex Johnson',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-01-15',
    userType: 'Premium Member',
    avatar: '👤',
    walletBalance: 245.50,
    rewardPoints: 1250
  });

  const [orders, setOrders] = useState([
    {
      id: 'GP20241128001',
      date: '2024-11-28',
      items: ['Valorant Points - 1000', 'Mobile Legends Diamonds'],
      total: 17.98,
      status: 'Delivered',
      tracking: 'TRK789012345'
    },
    {
      id: 'GP20241125002',
      date: '2024-11-25',
      items: ['Call of Duty: Modern Warfare'],
      total: 59.99,
      status: 'Shipped',
      tracking: 'TRK123456789'
    },
    {
      id: 'GP20241120003',
      date: '2024-11-20',
      items: ['Genshin Impact Crystals'],
      total: 89.99,
      status: 'Processing',
      tracking: ''
    }
  ]);

  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Cyberpunk 2077', price: 1200, platform: 'PC', added: '2024-11-27' },
    { id: 2, name: 'Nintendo Switch Pro', price: 15000, platform: 'Nintendo', added: '2024-11-25' },
    { id: 3, name: 'FIFA 24', price: 1500, platform: 'PlayStation', added: '2024-11-22' },
    { id: 4, name: '2000 Robux', price: 1380, platform: 'Roblox', added: '2024-11-20' }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: '🎮 Purchased', item: 'Valorant Points', time: '2 hours ago', points: '+50' },
    { id: 2, action: '⭐ Reviewed', item: 'Mobile Legends', time: '1 day ago', points: '+25' },
    { id: 3, action: '💾 Wishlisted', item: 'Cyberpunk 2077', time: '2 days ago', points: '+10' },
    { id: 4, action: '👤 Profile Updated', item: '', time: '3 days ago', points: '+5' },
    { id: 5, action: '🎯 Deal Found', item: 'Genshin Impact', time: '1 week ago', points: '+30' }
  ]);

  const handleRemoveWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const handleReorder = (orderId) => {
    alert(`Re-ordering items from order ${orderId}`);
  };

  const handleTopUpWallet = () => {
    const amount = prompt('Enter amount to add to wallet:');
    if (amount && !isNaN(amount)) {
      setUserData(prev => ({
        ...prev,
        walletBalance: prev.walletBalance + parseFloat(amount)
      }));
      alert(`Successfully added $${amount} to your wallet!`);
    }
  };

  const handleEditProfile = () => {
    const newName = prompt('Enter your full name:', userData.fullName);
    const newEmail = prompt('Enter your email:', userData.email);
    const newPhone = prompt('Enter your phone:', userData.phone);
    
    if (newName) setUserData(prev => ({ ...prev, fullName: newName }));
    if (newEmail) setUserData(prev => ({ ...prev, email: newEmail }));
    if (newPhone) setUserData(prev => ({ ...prev, phone: newPhone }));
    
    if (newName || newEmail || newPhone) {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div style={{ padding: '2rem', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Dashboard Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>My Dashboard</h1>
            <p style={{ color: '#cccccc' }}>Welcome back, {userData.fullName}! 👋</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleTopUpWallet}
              style={{
                background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                color: '#1a1a2e',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              💰 Add Funds
            </button>
            <Link to="/products" style={{
              background: 'transparent',
              color: '#00ff88',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              border: '2px solid #00ff88',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🛍️ Shop Now
            </Link>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Left Sidebar */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            {/* User Profile Card */}
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              padding: '2rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              border: '1px solid #2d2d4d'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                {userData.avatar}
              </div>
              <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>
                {userData.fullName}
              </h2>
              <div style={{
                background: '#00ff88',
                color: '#1a1a2e',
                padding: '4px 12px',
                borderRadius: '20px',
                fontWeight: 'bold',
                display: 'inline-block',
                marginBottom: '1rem'
              }}>
                {userData.userType}
              </div>
              <p style={{ color: '#cccccc', marginBottom: '0.5rem' }}>
                @{userData.username}
              </p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>
                Member since {new Date(userData.joinDate).toLocaleDateString()}
              </p>
              <button
                onClick={handleEditProfile}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: '#00ff88',
                  border: '2px solid #00ff88',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Edit Profile
              </button>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1px solid #2d2d4d'
            }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { id: 'overview', label: '📊 Overview', icon: '📊' },
                  { id: 'orders', label: '📦 Orders', icon: '📦' },
                  { id: 'wishlist', label: '💖 Wishlist', icon: '💖' },
                  { id: 'wallet', label: '💰 Wallet', icon: '💰' },
                  { id: 'activity', label: '📈 Activity', icon: '📈' },
                  { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: activeTab === tab.id ? '#00ff88' : 'transparent',
                      color: activeTab === tab.id ? '#1a1a2e' : '#cccccc',
                      border: 'none',
                      padding: '12px 15px',
                      borderRadius: '8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontWeight: 'bold',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 3, minWidth: '300px' }}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: '1px solid #2d2d4d'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        background: '#00ff88',
                        color: '#1a1a2e',
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        💰
                      </div>
                      <div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Wallet Balance</div>
                        <div style={{ color: '#00ff88', fontSize: '1.8rem', fontWeight: 'bold' }}>
                           ₱{userData.walletBalance.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleTopUpWallet}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        color: '#00ff88',
                        border: '1px solid #00ff88',
                        padding: '8px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Add Funds
                    </button>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: '1px solid #2d2d4d'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        background: '#ff6b6b',
                        color: 'white',
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        ⭐
                      </div>
                      <div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Reward Points</div>
                        <div style={{ color: '#ff6b6b', fontSize: '1.8rem', fontWeight: 'bold' }}>
                          {userData.rewardPoints}
                        </div>
                      </div>
                    </div>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>
                      Redeem for discounts
                    </div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: '1px solid #2d2d4d'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        background: '#3498db',
                        color: 'white',
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        📦
                      </div>
                      <div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Total Orders</div>
                        <div style={{ color: '#3498db', fontSize: '1.8rem', fontWeight: 'bold' }}>
                          {orders.length}
                        </div>
                      </div>
                    </div>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>
                      {orders.filter(o => o.status === 'Delivered').length} delivered
                    </div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: '1px solid #2d2d4d'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        background: '#9b59b6',
                        color: 'white',
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        💖
                      </div>
                      <div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Wishlist</div>
                        <div style={{ color: '#9b59b6', fontSize: '1.8rem', fontWeight: 'bold' }}>
                          {wishlist.length}
                        </div>
                      </div>
                    </div>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>
                      Items saved for later
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div style={{
                  background: '#1a1a2e',
                  borderRadius: '15px',
                  padding: '2rem',
                  marginBottom: '2rem',
                  border: '1px solid #2d2d4d'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#00ff88' }}>Recent Orders</h2>
                    <Link to="/orders" style={{
                      color: '#00ff88',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}>
                      View All →
                    </Link>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.slice(0, 3).map(order => (
                      <div key={order.id} style={{
                        background: '#0f0f23',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}>
                        <div>
                          <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Order #{order.id}
                          </div>
                          <div style={{ color: '#888', fontSize: '0.9rem' }}>
                            {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            background: order.status === 'Delivered' ? '#00ff88' : 
                                       order.status === 'Shipped' ? '#3498db' : '#f39c12',
                            color: order.status === 'Delivered' ? '#1a1a2e' : 'white',
                            padding: '5px 10px',
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            display: 'inline-block'
                          }}>
                            {order.status}
                          </div>
                          <div style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '1.2rem' }}>
                             ₱{order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={{
                  background: '#1a1a2e',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '1px solid #2d2d4d'
                }}>
                  <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Recent Activity</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {recentActivity.map(activity => (
                      <div key={activity.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        background: '#0f0f23',
                        borderRadius: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            background: '#2d2d4d',
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem'
                          }}>
                            {activity.action.split(' ')[0]}
                          </div>
                          <div>
                            <div style={{ color: 'white', fontWeight: 'bold' }}>
                              {activity.action} {activity.item && <span style={{ color: '#00ff88' }}>{activity.item}</span>}
                            </div>
                            <div style={{ color: '#888', fontSize: '0.9rem' }}>
                              {activity.time}
                            </div>
                          </div>
                        </div>
                        <div style={{
                          color: '#00ff88',
                          fontWeight: 'bold',
                          background: '#0f2a1a',
                          padding: '5px 10px',
                          borderRadius: '15px'
                        }}>
                          {activity.points} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div style={{
                background: '#1a1a2e',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid #2d2d4d'
              }}>
                <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Order History</h2>
                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#cccccc' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/products" style={{
                      display: 'inline-block',
                      marginTop: '1rem',
                      background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                      color: '#1a1a2e',
                      padding: '10px 20px',
                      textDecoration: 'none',
                      borderRadius: '25px',
                      fontWeight: 'bold'
                    }}>
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.map(order => (
                      <div key={order.id} style={{
                        background: '#0f0f23',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        border: '1px solid #2d2d4d'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                          <div>
                            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                              Order #{order.id}
                            </div>
                            <div style={{ color: '#888', marginBottom: '0.5rem' }}>
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </div>
                            <div>
                              <span style={{ color: '#cccccc', fontWeight: 'bold' }}>Items:</span>{' '}
                              <span style={{ color: '#888' }}>{order.items.join(', ')}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{
                              background: order.status === 'Delivered' ? '#00ff88' : 
                                        order.status === 'Shipped' ? '#3498db' : '#f39c12',
                              color: order.status === 'Delivered' ? '#1a1a2e' : 'white',
                              padding: '5px 15px',
                              borderRadius: '20px',
                              fontWeight: 'bold',
                              marginBottom: '0.5rem',
                              display: 'inline-block'
                            }}>
                              {order.status}
                            </div>
                            <div style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '1.5rem' }}>
                               ₱{order.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => handleReorder(order.id)}
                            style={{
                              background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                              color: '#1a1a2e',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                              cursor: 'pointer'
                            }}
                          >
                            Buy Again
                          </button>
                          {order.tracking && (
                            <button style={{
                              background: 'transparent',
                              color: '#3498db',
                              border: '1px solid #3498db',
                              padding: '8px 16px',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                              cursor: 'pointer'
                            }}>
                              Track Order
                            </button>
                          )}
                          <button style={{
                            background: 'transparent',
                            color: '#cccccc',
                            border: '1px solid #2d2d4d',
                            padding: '8px 16px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}>
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div style={{
                background: '#1a1a2e',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid #2d2d4d'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ color: '#00ff88' }}>My Wishlist</h2>
                  <div style={{ color: '#cccccc' }}>
                    {wishlist.length} items
                  </div>
                </div>
                {wishlist.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#cccccc' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💖</div>
                    <p>Your wishlist is empty.</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      Save items you like for later!
                    </p>
                  </div>
                ) : (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                    gap: '1.5rem' 
                  }}>
                    {wishlist.map(item => (
                      <div key={item.id} style={{
                        background: '#0f0f23',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        border: '1px solid #2d2d4d',
                        position: 'relative'
                      }}>
                        <button
                          onClick={() => handleRemoveWishlist(item.id)}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.2rem'
                          }}
                        >
                          ×
                        </button>
                        <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
                          {item.name}
                        </h3>
                        <div style={{ 
                          background: '#2d2d4d',
                          color: '#00ff88',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          display: 'inline-block',
                          marginBottom: '1rem'
                        }}>
                          {item.platform}
                        </div>
                        <div style={{ color: '#00ff88', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                           ₱{item.price}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button style={{
                            flex: 1,
                            background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                            color: '#1a1a2e',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}>
                            Add to Cart
                          </button>
                          <button style={{
                            background: 'transparent',
                            color: '#cccccc',
                            border: '1px solid #2d2d4d',
                            padding: '8px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}>
                            ...
                          </button>
                        </div>
                        <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '1rem' }}>
                          Added {new Date(item.added).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wallet Tab */}
            {activeTab === 'wallet' && (
              <div style={{
                background: '#1a1a2e',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid #2d2d4d'
              }}>
                <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>My Wallet</h2>
                <div style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f2a1a 100%)',
                  borderRadius: '15px',
                  padding: '2rem',
                  marginBottom: '2rem',
                  border: '2px solid #00ff88',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#888', marginBottom: '0.5rem' }}>Current Balance</div>
                  <div style={{ color: '#00ff88', fontSize: '3rem', fontWeight: 'bold' }}>
                     ₱{userData.walletBalance.toFixed(2)}
                  </div>
                  <div style={{ color: '#888', marginTop: '1rem' }}>
                    Available for purchases on GamePoint
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'white', marginBottom: '1rem' }}>Quick Actions</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleTopUpWallet}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                        color: '#1a1a2e',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        minWidth: '150px'
                      }}
                    >
                      💰 Add Funds
                    </button>
                    <button style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#3498db',
                      border: '2px solid #3498db',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      minWidth: '150px'
                    }}>
                      📤 Withdraw
                    </button>
                    <button style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#9b59b6',
                      border: '2px solid #9b59b6',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      minWidth: '150px'
                    }}>
                      📄 History
                    </button>
                  </div>
                </div>

                <div>
                  <h3 style={{ color: 'white', marginBottom: '1rem' }}>Transaction History</h3>
                  <div style={{ background: '#0f0f23', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #2d2d4d' }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: 'bold' }}>Added Funds</div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Today • Credit Card</div>
                      </div>
                      <div style={{ color: '#00ff88', fontWeight: 'bold' }}>+₱50.00</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #2d2d4d' }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: 'bold' }}>Game Purchase</div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Yesterday • Valorant Points</div>
                      </div>
                      <div style={{ color: '#ff6b6b', fontWeight: 'bold' }}>- ₱9.99</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: 'bold' }}>Added Funds</div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Nov 25 • GCash</div>
                      </div>
                      <div style={{ color: '#00ff88', fontWeight: 'bold' }}>+₱100.00</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div style={{
                background: '#1a1a2e',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid #2d2d4d'
              }}>
                <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Activity Timeline</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {recentActivity.map(activity => (
                    <div key={activity.id} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.5rem',
                      background: '#0f0f23',
                      borderRadius: '10px',
                      borderLeft: '4px solid #00ff88'
                    }}>
                      <div style={{
                        background: '#2d2d4d',
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0
                      }}>
                        {activity.action.split(' ')[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                          {activity.action} {activity.item && <span style={{ color: '#00ff88' }}>{activity.item}</span>}
                        </div>
                        <div style={{ color: '#888', marginBottom: '0.5rem' }}>
                          {activity.time}
                        </div>
                      </div>
                      <div style={{
                        color: '#00ff88',
                        fontWeight: 'bold',
                        background: '#0f2a1a',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                      }}>
                        {activity.points} points
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div style={{
                background: '#1a1a2e',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid #2d2d4d'
              }}>
                <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Account Settings</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Personal Info */}
                  <div>
                    <h3 style={{ color: 'white', marginBottom: '1rem' }}>Personal Information</h3>
                    <div style={{
                      background: '#0f0f23',
                      borderRadius: '10px',
                      padding: '1.5rem'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem' }}>Full Name</label>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>{userData.fullName}</div>
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem' }}>Email</label>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>{userData.email}</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem' }}>Phone</label>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>{userData.phone}</div>
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem' }}>Member Since</label>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>
                            {new Date(userData.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleEditProfile}
                        style={{
                          marginTop: '1.5rem',
                          background: 'transparent',
                          color: '#00ff88',
                          border: '2px solid #00ff88',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h3 style={{ color: 'white', marginBottom: '1rem' }}>Preferences</h3>
                    <div style={{
                      background: '#0f0f23',
                      borderRadius: '10px',
                      padding: '1.5rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>Email Notifications</div>
                          <div style={{ color: '#888', fontSize: '0.9rem' }}>Receive updates about deals and offers</div>
                        </div>
                        <div style={{
                          background: '#00ff88',
                          width: '50px',
                          height: '25px',
                          borderRadius: '25px',
                          position: 'relative',
                          cursor: 'pointer'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            background: 'white',
                            width: '21px',
                            height: '21px',
                            borderRadius: '50%'
                          }}></div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>SMS Notifications</div>
                          <div style={{ color: '#888', fontSize: '0.9rem' }}>Receive text message alerts</div>
                        </div>
                        <div style={{
                          background: '#2d2d4d',
                          width: '50px',
                          height: '25px',
                          borderRadius: '25px',
                          position: 'relative',
                          cursor: 'pointer'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            left: '2px',
                            background: '#888',
                            width: '21px',
                            height: '21px',
                            borderRadius: '50%'
                          }}></div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>Two-Factor Authentication</div>
                          <div style={{ color: '#888', fontSize: '0.9rem' }}>Add extra security to your account</div>
                        </div>
                        <button style={{
                          background: 'transparent',
                          color: '#00ff88',
                          border: '1px solid #00ff88',
                          padding: '5px 15px',
                          borderRadius: '5px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}>
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div>
                    <h3 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>Account Actions</h3>
                    <div style={{
                      background: '#0f0f23',
                      borderRadius: '10px',
                      padding: '1.5rem',
                      border: '1px solid #ff6b6b'
                    }}>
                      <div style={{ color: '#ff6b6b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        ⚠️ Danger Zone
                      </div>
                      <div style={{ color: '#888', marginBottom: '1.5rem' }}>
                        These actions are permanent and cannot be undone.
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button style={{
                          background: 'transparent',
                          color: '#ff6b6b',
                          border: '1px solid #ff6b6b',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}>
                          Delete Account
                        </button>
                        <button style={{
                          background: 'transparent',
                          color: '#f39c12',
                          border: '1px solid #f39c12',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}>
                          Request Data
                        </button>
                        <button style={{
                          background: 'transparent',
                          color: '#3498db',
                          border: '1px solid #3498db',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}>
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;