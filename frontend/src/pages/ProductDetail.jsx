import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5001/api/products/${id}/details`);
      setProduct(response.data.data.product);
      setReviews(response.data.data.reviews);
      setSimilarProducts(response.data.data.similarProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = { ...product, quantity };
      addToCart(productToAdd);
      alert(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const productToAdd = { ...product, quantity };
      addToCart(productToAdd);
      navigate('/cart');
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} style={{ color: star <= rating ? '#FFD700' : '#ccc', fontSize: '1.2rem' }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', color: '#00ff88', marginBottom: '1rem' }}>🎮</div>
        <div style={{ color: '#00ff88', fontSize: '1.2rem' }}>Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', color: '#ff6b6b', marginBottom: '1rem' }}>😕</div>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Product Not Found</h2>
        <p style={{ color: '#cccccc', marginBottom: '2rem' }}>
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products" style={{
          background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
          color: '#1a1a2e',
          padding: '12px 30px',
          textDecoration: 'none',
          borderRadius: '25px',
          fontWeight: 'bold'
        }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '2rem', color: '#888' }}>
          <Link to="/" style={{ color: '#00ff88', textDecoration: 'none' }}>Home</Link>
          {' > '}
          <Link to="/products" style={{ color: '#00ff88', textDecoration: 'none' }}>Products</Link>
          {' > '}
          <span style={{ color: 'white' }}>{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {/* Left Column - Product Image & Info */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              padding: '2rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              border: '1px solid #2d2d4d'
            }}>
              <div style={{
                fontSize: '5rem',
                marginBottom: '1rem',
                background: '#0f0f23',
                borderRadius: '10px',
                padding: '2rem'
              }}>
                {product.category === 'digital' ? '💎' : '🎮'}
              </div>
              <div style={{
                display: 'inline-block',
                background: product.category === 'digital' ? '#ff6b6b' : '#00ff88',
                color: '#1a1a2e',
                padding: '5px 15px',
                borderRadius: '20px',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                {product.category.toUpperCase()}
              </div>
              <div style={{ color: '#888', marginBottom: '0.5rem' }}>
                Platform: <span style={{ color: 'white', fontWeight: 'bold' }}>{product.platform}</span>
              </div>
              <div style={{ color: '#888' }}>
                Stock: <span style={{ color: product.stock > 5 ? '#00ff88' : '#ff6b6b', fontWeight: 'bold' }}>
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1px solid #2d2d4d'
            }}>
              <h3 style={{ color: '#00ff88', marginBottom: '1rem' }}>📊 Product Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#cccccc' }}>Delivery</span>
                  <span style={{ color: '#00ff88', fontWeight: 'bold' }}>
                    {product.category === 'digital' ? 'INSTANT' : '3-5 DAYS'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#cccccc' }}>Platform</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>{product.platform}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#cccccc' }}>Category</span>
                  <span style={{ 
                    color: product.category === 'digital' ? '#ff6b6b' : '#00ff88',
                    fontWeight: 'bold' 
                  }}>
                    {product.category === 'digital' ? 'Digital Credit' : 'Physical Game'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#cccccc' }}>Rating</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {renderStars(4.3)}
                    <span style={{ color: 'white', fontWeight: 'bold' }}>4.3/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Product Details */}
          <div style={{ flex: 2, minWidth: '300px' }}>
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              padding: '2rem',
              marginBottom: '1.5rem',
              border: '1px solid #2d2d4d'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>{product.name}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {renderStars(4.3)}
                      <span style={{ color: '#888' }}>({reviews.length} reviews)</span>
                    </div>
                    <div style={{
                      background: '#00ff88',
                      color: '#1a1a2e',
                      padding: '3px 10px',
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      🔥 Popular
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#888', fontSize: '1rem', textDecoration: 'line-through', marginBottom: '0.25rem' }}>
                    ${(product.price * 1.2).toFixed(2)}
                  </div>
                  <div style={{ color: '#00ff88', fontSize: '2.5rem', fontWeight: 'bold' }}>
                    ${product.price}
                  </div>
                  <div style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                    Save 20%
                  </div>
                </div>
              </div>

              <p style={{ color: '#cccccc', lineHeight: '1.6', marginBottom: '2rem' }}>
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ color: '#cccccc', marginBottom: '0.5rem', fontWeight: 'bold' }}>Quantity</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #2d2d4d', borderRadius: '8px' }}>
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      style={{
                        background: '#0f0f23',
                        color: 'white',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        fontSize: '1.2rem',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <div style={{
                      width: '60px',
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      style={{
                        background: '#0f0f23',
                        color: 'white',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        fontSize: '1.2rem',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ color: '#888', fontSize: '0.9rem' }}>
                    Max: {product.stock} units
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                    color: '#1a1a2e',
                    border: 'none',
                    padding: '15px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    minWidth: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  🛒 Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
                    color: 'white',
                    border: 'none',
                    padding: '15px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    minWidth: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  ⚡ Buy Now
                </button>
                <button
                  style={{
                    background: 'transparent',
                    color: '#00ff88',
                    border: '2px solid #00ff88',
                    padding: '15px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    minWidth: '60px'
                  }}
                >
                  💖
                </button>
              </div>
            </div>

            {/* Product Tabs */}
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              border: '1px solid #2d2d4d'
            }}>
              {/* Tab Headers */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #2d2d4d',
                padding: '0 1rem'
              }}>
                {['description', 'reviews', 'specs', 'support'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    style={{
                      padding: '1rem 1.5rem',
                      background: 'transparent',
                      color: selectedTab === tab ? '#00ff88' : '#cccccc',
                      border: 'none',
                      borderBottom: selectedTab === tab ? '3px solid #00ff88' : 'none',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab === 'description' && '📝 Description'}
                    {tab === 'reviews' && '⭐ Reviews'}
                    {tab === 'specs' && '⚙️ Specifications'}
                    {tab === 'support' && '🛟 Support'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: '2rem' }}>
                {selectedTab === 'description' && (
                  <div>
                    <h3 style={{ color: '#00ff88', marginBottom: '1rem' }}>Product Description</h3>
                    <p style={{ color: '#cccccc', lineHeight: '1.6', marginBottom: '1rem' }}>
                      {product.description}
                    </p>
                    <div style={{
                      background: '#0f0f23',
                      borderRadius: '10px',
                      padding: '1.5rem',
                      marginTop: '1.5rem'
                    }}>
                      <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Key Features:</h4>
                      <ul style={{ color: '#cccccc', paddingLeft: '1.5rem' }}>
                        <li>Instant delivery for digital products</li>
                        <li>Secure payment processing</li>
                        <li>24/7 customer support</li>
                        <li>30-day refund policy</li>
                        <li>Best price guarantee</li>
                      </ul>
                    </div>
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3 style={{ color: '#00ff88' }}>Customer Reviews</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '2.5rem', color: '#00ff88', fontWeight: 'bold' }}>4.3</div>
                          <div>{renderStars(4.3)}</div>
                          <div style={{ color: '#888', fontSize: '0.9rem' }}>{reviews.length} reviews</div>
                        </div>
                        <button style={{
                          background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                          color: '#1a1a2e',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}>
                          Write a Review
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {reviews.map(review => (
                        <div key={review.id} style={{
                          background: '#0f0f23',
                          borderRadius: '10px',
                          padding: '1.5rem',
                          border: '1px solid #2d2d4d'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                              <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                {review.user}
                              </div>
                              <div style={{ color: '#888', fontSize: '0.9rem' }}>
                                {new Date(review.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p style={{ color: '#cccccc', lineHeight: '1.6', marginBottom: '1rem' }}>
                            {review.comment}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button style={{
                              background: 'transparent',
                              color: '#888',
                              border: '1px solid #2d2d4d',
                              padding: '5px 15px',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}>
                              👍 Helpful ({review.helpful})
                            </button>
                            <button style={{
                              background: 'transparent',
                              color: '#888',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}>
                              Report
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'specs' && (
                  <div>
                    <h3 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Specifications</h3>
                    <div style={{
                      background: '#0f0f23',
                      borderRadius: '10px',
                      padding: '1.5rem'
                    }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid #2d2d4d' }}>
                            <td style={{ padding: '12px', color: '#888', width: '30%' }}>Product Type</td>
                            <td style={{ padding: '12px', color: 'white', fontWeight: 'bold' }}>
                              {product.category === 'digital' ? 'Digital Game Credit' : 'Physical Game'}
                            </td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #2d2d4d' }}>
                            <td style={{ padding: '12px', color: '#888' }}>Platform</td>
                            <td style={{ padding: '12px', color: 'white', fontWeight: 'bold' }}>{product.platform}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #2d2d4d' }}>
                            <td style={{ padding: '12px', color: '#888' }}>Delivery Time</td>
                            <td style={{ padding: '12px', color: '#00ff88', fontWeight: 'bold' }}>
                              {product.category === 'digital' ? 'Instant' : '3-5 Business Days'}
                            </td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #2d2d4d' }}>
                            <td style={{ padding: '12px', color: '#888' }}>Region</td>
                            <td style={{ padding: '12px', color: 'white', fontWeight: 'bold' }}>Global</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '12px', color: '#888' }}>Support</td>
                            <td style={{ padding: '12px', color: 'white', fontWeight: 'bold' }}>24/7 Email & Chat</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {selectedTab === 'support' && (
                  <div>
                    <h3 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>Customer Support</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                      <div style={{
                        background: '#0f0f23',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
                        <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Email Support</h4>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>support@gamepoint.com</p>
                        <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>Response time: 2-4 hours</p>
                      </div>
                      <div style={{
                        background: '#0f0f23',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
                        <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Live Chat</h4>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>Available 24/7</p>
                        <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>Instant response</p>
                      </div>
                      <div style={{
                        background: '#0f0f23',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📞</div>
                        <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Phone Support</h4>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>1-800-GAMEPOINT</p>
                        <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>Mon-Fri: 9AM-6PM</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Similar Products */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{
              background: '#1a1a2e',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1px solid #2d2d4d',
              position: 'sticky',
              top: '2rem'
            }}>
              <h3 style={{ color: '#00ff88', marginBottom: '1rem' }}>Similar Products</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {similarProducts.map(similar => (
                  <Link
                    key={similar.id}
                    to={`/product/${similar.id}`}
                    style={{
                      background: '#0f0f23',
                      borderRadius: '10px',
                      padding: '1rem',
                      textDecoration: 'none',
                      border: '1px solid #2d2d4d',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{
                        background: '#1a1a2e',
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        {similar.category === 'digital' ? '💎' : '🎮'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                          {similar.name}
                        </div>
                        <div style={{ color: '#00ff88', fontWeight: 'bold' }}>
                          ${similar.price}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Deal Finder CTA */}
              <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                borderRadius: '10px',
                padding: '1.5rem',
                marginTop: '1.5rem',
                border: '1px solid #2d2d4d',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <h4 style={{ color: '#00ff88', marginBottom: '0.5rem' }}>Find Better Deals?</h4>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Use our Deal Finder to compare prices
                </p>
                <Link to="/deals" style={{
                  display: 'inline-block',
                  background: 'transparent',
                  color: '#00ff88',
                  border: '2px solid #00ff88',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Find Deals
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: '#1a1a2e',
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'center',
            border: '1px solid #2d2d4d'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
            <div style={{ color: 'white', fontWeight: 'bold' }}>Secure Payment</div>
          </div>
          <div style={{
            background: '#1a1a2e',
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'center',
            border: '1px solid #2d2d4d'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚚</div>
            <div style={{ color: 'white', fontWeight: 'bold' }}>Fast Delivery</div>
          </div>
          <div style={{
            background: '#1a1a2e',
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'center',
            border: '1px solid #2d2d4d'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔄</div>
            <div style={{ color: 'white', fontWeight: 'bold' }}>30-Day Return</div>
          </div>
          <div style={{
            background: '#1a1a2e',
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'center',
            border: '1px solid #2d2d4d'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👑</div>
            <div style={{ color: 'white', fontWeight: 'bold' }}>Best Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;