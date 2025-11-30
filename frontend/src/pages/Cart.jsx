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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Your Cart</h1>
          <button 
            onClick={clearCart}
            style={{
              background: 'transparent',
              color: '#ff6b6b',
              border: '1px solid #ff6b6b',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Clear Cart
          </button>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          {cart.items.map(item => (
            <div key={item.id} style={{
              background: '#1a1a2e',
              borderRadius: '10px',
              padding: '1.5rem',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ color: '#00ff88', margin: '0 0 0.5rem 0' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#cccccc', margin: '0' }}>${item.price}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ color: 'white', minWidth: '30px', textAlign: 'center' }}>
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
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                
                <span style={{ color: '#00ff88', fontWeight: 'bold', minWidth: '80px' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          background: '#1a1a2e',
          borderRadius: '10px',
          padding: '1.5rem',
          marginTop: '2rem',
          textAlign: 'right'
        }}>
          <h2 style={{ color: '#00ff88', margin: '0 0 1rem 0' }}>
            Total: ${getCartTotal().toFixed(2)}
          </h2>
          <button style={{
            background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
            color: '#1a1a2e',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;