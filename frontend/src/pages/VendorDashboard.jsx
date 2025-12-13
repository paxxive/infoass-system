import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = ({ vendorId }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'physical',
    platform: '',
    price: '',
    stock: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/products?vendorId=${vendorId}`);
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:5001/api/products/${editingId}`, { ...formData, vendorId });
        alert('Product updated successfully!');
      } else {
        await axios.post('http://localhost:5001/api/products', { ...formData, vendorId });
        alert('Product added successfully!');
      }
      setFormData({ name: '', description: '', category: 'physical', platform: '', price: '', stock: '' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('Error saving product.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('Error deleting product.');
    }
  };

  return (
    <div style={{ minHeight: '90vh', padding: '2rem', background: '#1b2838', color: '#c7d5e0', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 'bold', color: '#66c0f4' }}>Vendor Dashboard</h2>

      {/* Product Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', background: '#2a475e95', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required
            style={{ padding: '10px', borderRadius: '5px', border: 'none', outline: 'none', background: '#1c2a38', color: 'white' }}
          />
          <input name="platform" placeholder="Platform" value={formData.platform} onChange={handleChange} required
            style={{ padding: '10px', borderRadius: '5px', border: 'none', outline: 'none', background: '#1c2a38', color: 'white' }}
          />
        </div>
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', outline: 'none', background: '#1c2a38', color: 'white', marginBottom: '1rem' }}
        />
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <select name="category" value={formData.category} onChange={handleChange}
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none', outline: 'none', background: '#1c2a38', color: 'white' }}
          >
            <option value="physical">Physical Game</option>
            <option value="digital">Digital Credit</option>
          </select>
          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none', outline: 'none', background: '#1c2a38', color: 'white' }}
          />
          <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} required
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none', outline: 'none', background: '#1c2a38', color: 'white' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{
          width: '100%',
          padding: '12px',
          borderRadius: '5px',
          border: 'none',
          background: loading ? '#3b5a72af' : 'linear-gradient(10deg, #66c0f49c, #1b2838f9)',
          color: 'white',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'transform 0.2s'
        }}
          onMouseOver={e => !loading && (e.target.style.transform = 'scale(1.02)')}
          onMouseOut={e => !loading && (e.target.style.transform = 'scale(1)')}
        >
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Products Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#2a475e96', borderRadius: '10px', overflow: 'hidden' }}>
        <thead style={{ background: '#1c2a38', color: '#66c0f4' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Platform</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Stock</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #3b5a72' }}>
              <td style={{ padding: '10px' }}>{p.name}</td>
              <td style={{ padding: '10px' }}>{p.category}</td>
              <td style={{ padding: '10px' }}>{p.platform}</td>
              <td style={{ padding: '10px' }}>{p.price}</td>
              <td style={{ padding: '10px' }}>{p.stock}</td>
              <td style={{ padding: '10px', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(p)} style={{ flex: 1, padding: '6px', borderRadius: '5px', border: 'none', background: '#66c0f4', color: '#1b2838', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ flex: 1, padding: '6px', borderRadius: '5px', border: 'none', background: '#ff4c4c', color: 'white', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>No products yet</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default VendorDashboard;
