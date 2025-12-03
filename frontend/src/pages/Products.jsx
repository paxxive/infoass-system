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

    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(product => product.category === filter);
    }

    // Apply search filter
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
    e.preventDefault(); // Prevent navigation when clicking Add to Cart
    e.stopPropagation(); // Stop event from bubbling to the Link
    addToCart(product);
  };

  if (loading) {
    return <div style={{
      textAlign: 'center',
      padding: '50px',
      fontSize: '1.2rem',
      color: '#00ff88'
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
              border: '2px solid #2d2d4d',
              background: '#1a1a2e',
              color: 'white',
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
                color: '#ff6b6b',
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
            color: '#888'
          }}>
            🔍
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
              background: filter === 'all' ? '#00ff88' : '#2d2d4d',
              color: filter === 'all' ? '#1a1a2e' : 'white',
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
              background: filter === 'physical' ? '#00ff88' : '#2d2d4d',
              color: filter === 'physical' ? '#1a1a2e' : 'white',
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
              background: filter === 'digital' ? '#00ff88' : '#2d2d4d',
              color: filter === 'digital' ? '#1a1a2e' : 'white',
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
            color: '#00ff88',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              Search results for: "<strong>{searchTerm}</strong>"
              <span style={{ color: '#cccccc', marginLeft: '1rem' }}>
                ({filteredProducts.length} products found)
              </span>
            </div>
            <button
              onClick={clearSearch}
              style={{
                background: 'transparent',
                color: '#ff6b6b',
                border: '1px solid #ff6b6b',
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
                background: '#1a1a2e',
                borderRadius: '10px',
                padding: '1.5rem',
                border: '1px solid #2d2d4d',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 255, 136, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              >
                <h3 style={{ 
                  color: '#00ff88', 
                  marginBottom: '0.5rem',
                  fontSize: '1.2rem'
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  color: '#cccccc', 
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
                    background: product.category === 'digital' ? '#ff6b6b' : '#00ff88',
                    color: '#1a1a2e',
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
                    ${product.price}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#888',
                  marginBottom: '1rem'
                }}>
                  <span>Platform: {product.platform}</span>
                  <span>Stock: {product.stock}</span>
                </div>

                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  style={{
                    background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                    color: '#1a1a2e',
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
            color: '#cccccc'
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