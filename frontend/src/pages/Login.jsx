import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGamepad, FaStore, FaBolt, FaExclamationTriangle, FaLock } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      console.log('Login attempt:', { 
        email: formData.email, 
        rememberMe 
      });
      
      alert('Login successful! (Demo mode - no actual authentication)');
      navigate('/');
      setLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (type) => {
    const demoAccounts = {
      customer: { email: 'customer@gamepoint.com', password: 'demo123' },
      vendor: { email: 'vendor@gamepoint.com', password: 'demo123' },
      admin: { email: 'admin@gamepoint.com', password: 'demo123' }
    };

    const demo = demoAccounts[type];
    setFormData(demo);
    
    //Added Vendor Dashboard navigation
    setTimeout(() => {
      alert(`Demo ${type} login successful!`);
      if(type === 'vendor') {
        navigate('/vendor-dashboard');
      } else {
      navigate('/');
      }
    }, 500);
  };

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '500px', 
        width: '100%',
        background: '#1a1a2e',
        borderRadius: '15px',
        padding: '3rem',
        border: '1px solid #2d2d4d',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{
            color: '#66C0F4',
            fontSize: '2rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '0.5rem'
          }}>
            Game<span style={{ color: '#66c0f47d' }}>Point</span>
          </Link>
          <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: '#cccccc' }}>Sign in to your account to continue</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#888', textAlign: 'center', marginBottom: '1rem' }}>
            Try demo accounts:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleDemoLogin('customer')}
              style={{
                flex: 1,
                background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                color: '#1a1a2e',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem'
              }}
            >
              <FaGamepad /> Customer
            </button>
            <button
              onClick={() => handleDemoLogin('vendor')}
              style={{
                flex: 1,
                background: 'linear-gradient(45deg, #3498db, #2980b9)',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem'
              }}
            >
              <FaStore /> Vendor
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              style={{
                flex: 1,
                background: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem'
              }}
            >
              <FaBolt /> Admin
            </button>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '2rem 0',
          color: '#666'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#2d2d4d' }}></div>
          <span style={{ padding: '0 1rem' }}>Or sign in manually</span>
          <div style={{ flex: 1, height: '1px', background: '#2d2d4d' }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#cccccc',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '8px',
                border: errors.email ? '2px solid #ff6b6b' : '2px solid #2d2d4d',
                background: '#0f0f23',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            />
            {errors.email && (
              <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FaExclamationTriangle /> {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{
                color: '#cccccc',
                fontWeight: 'bold'
              }}>
                Password
              </label>
              <Link to="/forgot-password" style={{
                color: '#cccccc',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}>
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '8px',
                border: errors.password ? '2px solid #ff6b6b' : '2px solid #2d2d4d',
                background: '#0f0f23',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            />
            {errors.password && (
              <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FaExclamationTriangle /> {errors.password}
              </p>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '2rem',
            color: '#cccccc'
          }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                marginRight: '0.5rem',
                width: '18px',
                height: '18px',
                cursor: 'pointer'
              }}
            />
            <label htmlFor="rememberMe" style={{ cursor: 'pointer' }}>
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#2d2d4d' : 'linear-gradient(45deg, #66C0F4, #66c0f470)',
              color: loading ? '#666' : '#1a1a2e',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
              marginBottom: '1.5rem'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'scale(1)')}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div style={{ textAlign: 'center', color: '#cccccc' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#cccccc',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              Sign up now
            </Link>
          </div>
        </form>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#0f0f23',
          borderRadius: '8px',
          border: '1px solid #2d2d4d',
          fontSize: '0.8rem',
          color: '#888'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <FaLock />
            <strong>Secure Login</strong>
          </div>
          <p>Your data is protected with 256-bit SSL encryption.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
