import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cart.items.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1>Your Cart</h1>
          <p style={{ color: '#cccccc', margin: '2rem 0' }}>Your cart is empty</p>
          <Link to="/products" style={{
            background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
            color: '#1a1a2e',
            padding: '12px 30px',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: 'bold'
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Your Cart</h1>
          <button 
            onClick={clearCart}
            style={{
              background: 'transparent',
              color: '#ff6b6b',
              border: '1px solid #ff6b6b',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Clear Cart
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Cart Items */}
          <div style={{ flex: 2, minWidth: '300px' }}>
            <div style={{ marginBottom: '2rem' }}>
              {cart.items.map(item => (
                <div key={item.id} style={{
                  background: '#1a1a2e',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 2, minWidth: '200px' }}>
                    <h3 style={{ color: '#00ff88', margin: '0 0 0.5rem 0' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#cccccc', margin: '0 0 0.5rem 0' }}>
                      ${item.price} each
                    </p>
                    <div style={{ 
                      display: 'inline-block',
                      background: item.category === 'digital' ? '#ff6b6b' : '#00ff88',
                      color: '#1a1a2e',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {item.category === 'digital' ? 'DIGITAL' : 'PHYSICAL'}
                    </div>
                  </div>
                  
                  <div style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        style={{
                          background: '#2d2d4d',
                          color: 'white',
                          border: 'none',
                          width: '30px',
                          height: '30px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        -
                      </button>
                      <span style={{ 
                        color: 'white', 
                        minWidth: '30px', 
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          background: '#2d2d4d',
                          color: 'white',
                          border: 'none',
                          width: '30px',
                          height: '30px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    <span style={{ 
                      color: '#00ff88', 
                      fontWeight: 'bold', 
                      minWidth: '80px',
                      fontSize: '1.1rem'
                    }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <div style={{ flex: 1, minWidth: '100px', textAlign: 'right' }}>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              padding: '2rem',
              position: 'sticky',
              top: '2rem'
            }}>
              <h2 style={{ color: '#00ff88', marginBottom: '1.5rem', textAlign: 'center' }}>
                Order Summary
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid #2d2d4d'
                }}>
                  <span style={{ color: '#cccccc' }}>Subtotal</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid #2d2d4d'
                }}>
                  <span style={{ color: '#cccccc' }}>Shipping</span>
                  <span style={{ 
                    color: getCartTotal() > 50 ? '#00ff88' : 'white', 
                    fontWeight: 'bold' 
                  }}>
                    {getCartTotal() > 50 ? 'FREE' : '$5.99'}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid #2d2d4d'
                }}>
                  <span style={{ color: '#cccccc' }}>Tax (12%)</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>
                    ${(getCartTotal() * 0.12).toFixed(2)}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '2px solid #2d2d4d'
                }}>
                  <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Total
                  </span>
                  <span style={{ 
                    color: '#00ff88', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold' 
                  }}>
                    ${(getCartTotal() + (getCartTotal() > 50 ? 0 : 5.99) + (getCartTotal() * 0.12)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              {getCartTotal() < 50 && (
                <div style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  🚚 Spend ${(50 - getCartTotal()).toFixed(2)} more for FREE shipping!
                </div>
              )}
              
              <Link 
                to="/checkout" 
                style={{
                  display: 'block',
                  background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                  color: '#1a1a2e',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                🛒 Proceed to Checkout
              </Link>
              
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Link to="/products" style={{
                  color: '#00ff88',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  ← Continue Shopping
                </Link>
              </div>
              
              <div style={{ 
                marginTop: '1.5rem', 
                padding: '1rem',
                background: '#0f0f23',
                borderRadius: '8px',
                border: '1px solid #2d2d4d'
              }}>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span>🔒</span>
                    <span>Secure checkout</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span>🔄</span>
                    <span>30-day return policy</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📦</span>
                    <span>Fast delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cart Tips */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: '#1a1a2e',
          borderRadius: '10px',
          border: '1px solid #2d2d4d'
        }}>
          <h3 style={{ color: '#00ff88', marginBottom: '1rem' }}>🎮 Shopping Tips</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            color: '#cccccc'
          }}>
            <div>
              <div style={{ color: '#00ff88', fontWeight: 'bold', marginBottom: '0.25rem' }}>Free Shipping</div>
              <div style={{ fontSize: '0.9rem' }}>Get free shipping on orders over $50</div>
            </div>
            <div>
              <div style={{ color: '#00ff88', fontWeight: 'bold', marginBottom: '0.25rem' }}>Digital Credits</div>
              <div style={{ fontSize: '0.9rem' }}>Digital items are delivered instantly</div>
            </div>
            <div>
              <div style={{ color: '#00ff88', fontWeight: 'bold', marginBottom: '0.25rem' }}>Save More</div>
              <div style={{ fontSize: '0.9rem' }}>Check our Deal Finder for best prices</div>
            </div>
            <div>
              <div style={{ color: '#00ff88', fontWeight: 'bold', marginBottom: '0.25rem' }}>Need Help?</div>
              <div style={{ fontSize: '0.9rem' }}>Contact support 24/7 for assistance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;