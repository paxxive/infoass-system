import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Philippines'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'cod',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  const [billingSame, setBillingSame] = useState(true);
  const [billingInfo, setBillingInfo] = useState({
    address: '',
    city: '',
    postalCode: ''
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.12;
  const total = subtotal + shippingFee + tax;

  const generateOrderId = () => {
    return 'GP' + Date.now().toString().slice(-8);
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      setOrderPlaced(true);
      clearCart();
      setLoading(false);
      
      console.log('Order placed:', {
        orderId: newOrderId,
        shippingInfo,
        paymentInfo,
        billingSame,
        billingInfo: billingSame ? shippingInfo : billingInfo,
        items: cart.items,
        total
      });
    }, 2000);
  };

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1>Your Cart is Empty</h1>
          <p style={{ color: '#cccccc', margin: '2rem 0' }}>
            Add some amazing games to your cart first!
          </p>
          <Link to="/products" style={{
            background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
            color: '#1a1a2e',
            padding: '12px 30px',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ padding: '3rem', minHeight: '70vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            background: '#1a1a2e',
            borderRadius: '15px',
            padding: '3rem',
            border: '2px solid #00ff88'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#00ff88',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 2rem',
              color: '#1a1a2e'
            }}>
              ✓
            </div>
            
            <h1 style={{ color: '#00ff88', marginBottom: '1rem' }}>
              Order Confirmed!
            </h1>
            
            <p style={{ color: '#cccccc', fontSize: '1.2rem', marginBottom: '2rem' }}>
              Thank you for your purchase. Your order has been received.
            </p>
            
            <div style={{
              background: '#0f0f23',
              borderRadius: '10px',
              padding: '1.5rem',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Order Details</h3>
              <div style={{ color: '#cccccc' }}>
                <p><strong>Order ID:</strong> {orderId}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Total:</strong> ₱{total.toFixed(2)}</p>
                <p><strong>Payment Method:</strong> {paymentInfo.method === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</p>
              </div>
            </div>
            
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
                Continue Shopping
              </Link>
              
              <Link to="/orders" style={{
                background: 'transparent',
                color: '#00ff88',
                padding: '12px 30px',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '1rem',
                border: '2px solid #00ff88'
              }}>
                View Orders
              </Link>
            </div>
            
            <div style={{ marginTop: '3rem', color: '#888', fontSize: '0.9rem' }}>
              <p>A confirmation email has been sent to {shippingInfo.email}</p>
              <p>You will receive your order in 3-5 business days.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
        
        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: step >= 1 ? '#00ff88' : '#2d2d4d',
              color: step >= 1 ? '#1a1a2e' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              1
            </div>
            <span style={{ color: step >= 1 ? '#00ff88' : '#666', fontSize: '0.9rem' }}>
              Shipping
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: step >= 2 ? '#00ff88' : '#2d2d4d',
              color: step >= 2 ? '#1a1a2e' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              2
            </div>
            <span style={{ color: step >= 2 ? '#00ff88' : '#666', fontSize: '0.9rem' }}>
              Payment
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: step >= 3 ? '#00ff88' : '#2d2d4d',
              color: step >= 3 ? '#1a1a2e' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              3
            </div>
            <span style={{ color: step >= 3 ? '#00ff88' : '#666', fontSize: '0.9rem' }}>
              Review
            </span>
          </div>
          
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20%',
            right: '20%',
            height: '2px',
            background: '#2d2d4d',
            zIndex: 0
          }}></div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Left Column - Form */}
          <div style={{ flex: 2, minWidth: '300px' }}>
            {step === 1 && (
              <div style={{
                background: '#1a1a2e',
                borderRadius: '15px',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Shipping Information</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #2d2d4d',
                        background: '#0f0f23',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #2d2d4d',
                        background: '#0f0f23',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #2d2d4d',
                      background: '#0f0f23',
                      color: 'white'
                    }}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #2d2d4d',
                      background: '#0f0f23',
                      color: 'white'
                    }}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #2d2d4d',
                      background: '#0f0f23',
                      color: 'white',
                      resize: 'vertical'
                    }}
                    required
                  ></textarea>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #2d2d4d',
                        background: '#0f0f23',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #2d2d4d',
                        background: '#0f0f23',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                    Country
                  </label>
                  <select
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #2d2d4d',
                      background: '#0f0f23',
                      color: 'white'
                    }}
                  >
                    <option value="Philippines">Philippines</option>
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', color: '#cccccc' }}>
                  <input
                    type="checkbox"
                    id="billingSame"
                    checked={billingSame}
                    onChange={(e) => setBillingSame(e.target.checked)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <label htmlFor="billingSame" style={{ cursor: 'pointer' }}>
                    Billing address is the same as shipping address
                  </label>
                </div>
                
                <button
                  onClick={() => setStep(2)}
                  style={{
                    background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                    color: '#1a1a2e',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Continue to Payment
                </button>
              </div>
            )}
            
            {step === 2 && (
              <div style={{
                background: '#1a1a2e',
                borderRadius: '15px',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Payment Method</h2>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                    Select Payment Method *
                  </label>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentInfo(prev => ({ ...prev, method: 'cod' }))}
                      style={{
                        flex: 1,
                        background: paymentInfo.method === 'cod' ? '#00ff88' : '#2d2d4d',
                        color: paymentInfo.method === 'cod' ? '#1a1a2e' : 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        minWidth: '150px'
                      }}
                    >
                      💵 Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentInfo(prev => ({ ...prev, method: 'card' }))}
                      style={{
                        flex: 1,
                        background: paymentInfo.method === 'card' ? '#00ff88' : '#2d2d4d',
                        color: paymentInfo.method === 'card' ? '#1a1a2e' : 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        minWidth: '150px'
                      }}
                    >
                      💳 Credit/Debit Card
                    </button>
                  </div>
                </div>
                
                {paymentInfo.method === 'card' && (
                  <>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #2d2d4d',
                          background: '#0f0f23',
                          color: 'white'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        placeholder="John Doe"
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #2d2d4d',
                          background: '#0f0f23',
                          color: 'white'
                        }}
                      />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={paymentInfo.expiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #2d2d4d',
                            background: '#0f0f23',
                            color: 'white'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem' }}>
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #2d2d4d',
                            background: '#0f0f23',
                            color: 'white'
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#00ff88',
                      border: '2px solid #00ff88',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Back to Shipping
                  </button>
                  
                  <button
                    onClick={() => setStep(3)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                      color: '#1a1a2e',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div style={{
                background: '#1a1a2e',
                borderRadius: '15px',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Order Review</h2>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'white', marginBottom: '1rem' }}>Shipping Information</h3>
                  <div style={{ background: '#0f0f23', padding: '1rem', borderRadius: '8px', color: '#cccccc' }}>
                    <p><strong>{shippingInfo.firstName} {shippingInfo.lastName}</strong></p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
                    <p>{shippingInfo.country}</p>
                    <p>📧 {shippingInfo.email}</p>
                    <p>📞 {shippingInfo.phone}</p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'white', marginBottom: '1rem' }}>Payment Method</h3>
                  <div style={{ background: '#0f0f23', padding: '1rem', borderRadius: '8px', color: '#cccccc' }}>
                    <p><strong>
                      {paymentInfo.method === 'cod' 
                        ? 'Cash on Delivery' 
                        : 'Credit/Debit Card ****' + (paymentInfo.cardNumber.slice(-4) || '****')}
                    </strong></p>
                    {paymentInfo.method === 'card' && paymentInfo.cardName && (
                      <p>Cardholder: {paymentInfo.cardName}</p>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setStep(2)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#00ff88',
                      border: '2px solid #00ff88',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Back to Payment
                  </button>
                  
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{
                      flex: 1,
                      background: loading ? '#2d2d4d' : 'linear-gradient(45deg, #00ff88, #00cc6a)',
                      color: loading ? '#666' : '#1a1a2e',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Processing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Order Summary */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              padding: '2rem',
              position: 'sticky',
              top: '2rem'
            }}>
              <h2 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Order Summary</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Items ({cart.items.length})</h3>
                {cart.items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid #2d2d4d'
                  }}>
                    <div>
                      <div style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</div>
                      <div style={{ color: '#888', fontSize: '0.9rem' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ color: '#00ff88', fontWeight: 'bold' }}>
                        ₱{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#cccccc' }}>Subtotal</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}> ₱{subtotal.toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#cccccc' }}>Shipping</span>
                  <span style={{ color: shippingFee === 0 ? '#00ff88' : 'white', fontWeight: 'bold' }}>
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#cccccc' }}>Tax (12%)</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}> ₱{tax.toFixed(2)}</span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '2px solid #2d2d4d'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>Total</span>
                  <span style={{ color: '#00ff88', fontSize: '1.3rem', fontWeight: 'bold' }}>
                      ₱{total.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {shippingFee > 0 && subtotal < 50 && (
                <div style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}>
                  🚚 Spend  ₱{(50 - subtotal).toFixed(2)} more for FREE shipping!
                </div>
              )}
              
              <div style={{ color: '#888', fontSize: '0.9rem' }}>
                <p>By placing your order, you agree to our Terms of Service.</p>
                <p>Need help? <Link to="/contact" style={{ color: '#00ff88', textDecoration: 'none' }}>Contact Support</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;