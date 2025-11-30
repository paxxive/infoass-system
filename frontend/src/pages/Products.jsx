import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data.data);
      setLoading(false);
      console.log('Products loaded:', response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

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

        {/* Products Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              background: '#1a1a2e',
              borderRadius: '10px',
              padding: '1.5rem',
              border: '1px solid #2d2d4d',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
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
                onClick={() => addToCart(product)}
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
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#cccccc'
          }}>
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;