import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, filter, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (filter !== 'all') {
      filtered = filtered.filter(product => product.category === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  if (loading) {
    return <div style={{
      textAlign: 'center',
      padding: '50px',
      fontSize: '1.2rem',
      color: '#cccccc'
    }}>Loading amazing deals...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>GamePoint Store</h1>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          margin: '2rem 0',
          maxWidth: '500px'
        }}>
          <input
            type="text"
            placeholder="Search games, credits, platforms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 50px 12px 20px',
              borderRadius: '25px',
              border: '2px solid #2a475e',
              background: '#1b2838',
              color: '#c7d5e0',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#cf2a2a',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          )}
          <span style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#c7d5e0',
            fontSize: '1.1rem',
          }}>
          </span>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          margin: '2rem 0',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => setFilter('all')}
            style={{
              background: filter === 'all' ? '#00adee' : '#2a475e',
              color: filter === 'all' ? '#171a21' : '#c7d5e0',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            All Products
          </button>
          <button 
            onClick={() => setFilter('physical')}
            style={{
              background: filter === 'physical' ? '#00adee' : '#2a475e',
              color: filter === 'physical' ? '#171a21' : '#c7d5e0',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Physical Games
          </button>
          <button 
            onClick={() => setFilter('digital')}
            style={{
              background: filter === 'digital' ? '#00adee' : '#2a475e',
              color: filter === 'digital' ? '#171a21' : '#c7d5e0',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Digital Credits
          </button>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div style={{
            color: '#00adee',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              Search results for: "<strong>{searchTerm}</strong>"
              <span style={{ color: '#c7d5e0', marginLeft: '1rem' }}>
                ({filteredProducts.length} products found)
              </span>
            </div>
            <button
              onClick={clearSearch}
              style={{
                background: 'transparent',
                color: '#cf2a2a',
                border: '1px solid #cf2a2a',
                padding: '5px 10px',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {filteredProducts.map(product => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
              style={{ 
                textDecoration: 'none',
                display: 'block'
              }}
            >
              <div style={{
                background: '#1b2838ff',
                borderRadius: '10px',
                padding: '1.5rem',
                border: '1px solid #1c2e3caf',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 174, 238, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              >
                <h3 style={{ 
                  color: '#c7d5e0', 
                  marginBottom: '0.5rem',
                  fontSize: '1.2rem'
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  color: '#c7d5e0', 
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  minHeight: '40px'
                }}>
                  {product.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{ 
                    background: product.category === 'digital' ? '#00aeee82' : '#00ff889c',
                    color: '#171a21',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {product.category.toUpperCase()}
                  </span>
                  <span style={{ 
                    color: '#00ff88', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    ₱{product.price}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#c7d5e0',
                  marginBottom: '1rem'
                }}>
                  <span>Platform: {product.platform}</span>
                  <span>Stock: {product.stock}</span>
                </div>

                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  style={{
                    background: 'linear-gradient(45deg, #00ff88, #00ff888f)',
                    color: '#171a21',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '5px',
                    width: '100%',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.stopPropagation();
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.stopPropagation();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#c7d5e0'
          }}>
            {searchTerm ? (
              <div>
                <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                  No products found for "<strong>{searchTerm}</strong>"
                </p>
                <p>Try searching for different keywords like "valorant", "mobile", "playstation", etc.</p>
              </div>
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
