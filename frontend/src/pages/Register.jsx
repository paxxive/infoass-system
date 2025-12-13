import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGamepad, FaStore, FaHandshake, FaExclamationTriangle, FaEye, FaEyeSlash, FaLock, FaShieldAlt, FaCrown } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
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
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
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
      console.log('Registration attempt:', { 
        ...formData,
        password: '[HIDDEN]',
        confirmPassword: '[HIDDEN]'
      });
      alert(`Registration successful! Welcome to GamePoint, ${formData.username}!`);
      navigate('/');
      setLoading(false);
    }, 2000);
  };

  const passwordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '#666' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    const strength = {
      0: { label: 'Very Weak', color: '#ff6b6b' },
      1: { label: 'Weak', color: '#ff6b6b' },
      2: { label: 'Fair', color: '#f39c12' },
      3: { label: 'Good', color: '#3498db' },
      4: { label: 'Strong', color: '#00ff88' },
      5: { label: 'Very Strong', color: '#00ff88' },
      6: { label: 'Excellent', color: '#00ff88' }
    };
    return strength[Math.min(score, 6)];
  };

  const strength = passwordStrength(formData.password);

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', background: '#1a1a2e', borderRadius: '15px', padding: '3rem', border: '1px solid #2d2d4d', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: '#66C0F4', fontSize: '2rem', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginBottom: '0.5rem' }}>
            Game<span style={{ color: '#3498db6d' }}>Point</span>
          </Link>
          <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Create Your Account</h1>
          <p style={{ color: '#cccccc' }}>Join thousands of gamers on GamePoint</p>
        </div>


<div style={{ marginBottom: '2rem' }}>
  <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem', fontWeight: 'bold' }}>I want to join as:</label>
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    {['customer', 'vendor'].map(type => (
      <button
        key={type}
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, userType: type }))}
        style={{
          flex: 1,
          background: formData.userType === type 
            ? type === 'customer' 
              ? 'linear-gradient(45deg, #00ff88, #00cc6a)' 
              : 'linear-gradient(45deg, #3498db, #2980b9)'
            : '#2d2d4d',
          color: formData.userType === type ? (type === 'customer' ? '#1a1a2e' : 'white') : '#cccccc',
          border: 'none',
          padding: '12px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '0.9rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <span>
          {type === 'customer' ? <FaGamepad /> : <FaStore />}
        </span>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    ))}
  </div>

  <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.5rem' }}>
    {formData.userType === 'customer' && 'Buy games and credits at the best prices'}
    {formData.userType === 'vendor' && 'Sell your products on our marketplace'}
  </div>
</div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem', fontWeight: 'bold' }}>Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username"
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: errors.username ? '2px solid #ff6b6b' : '2px solid #2d2d4d', background: '#0f0f23', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
              />
              {errors.username && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem' }}><FaExclamationTriangle /> {errors.username}</p>}
            </div>

            <div>
              <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: errors.email ? '2px solid #ff6b6b' : '2px solid #2d2d4d', background: '#0f0f23', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
              />
              {errors.email && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem' }}><FaExclamationTriangle /> {errors.email}</p>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Create a password"
                  style={{ width: '100%', padding: '12px 40px 12px 15px', borderRadius: '8px', border: errors.password ? '2px solid #ff6b6b' : '2px solid #2d2d4d', background: '#0f0f23', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {formData.password && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ height: '4px', background: '#2d2d4d', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${(strength.score / 6) * 100}%`, height: '100%', background: strength.color, transition: 'width 0.3s' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.25rem', color: strength.color }}>
                    <span>Password Strength:</span>
                    <span>{strength.label}</span>
                  </div>
                </div>
              )}
              {errors.password && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem' }}><FaExclamationTriangle /> {errors.password}</p>}
            </div>

            <div>
              <label style={{ display: 'block', color: '#cccccc', marginBottom: '0.5rem', fontWeight: 'bold' }}>Confirm Password</label>
              <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password"
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: errors.confirmPassword ? '2px solid #ff6b6b' : '2px solid #2d2d4d', background: '#0f0f23', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
              />
              {errors.confirmPassword && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem' }}><FaExclamationTriangle /> {errors.confirmPassword}</p>}
              {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p style={{ color: '#00ff88', fontSize: '0.9rem', marginTop: '0.5rem' }}>✓ Passwords match</p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div style={{ background: '#0f0f23', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: errors.terms ? '1px solid #ff6b6b' : '1px solid #2d2d4d' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#cccccc' }}>
              <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} style={{ marginTop: '0.25rem', width: '18px', height: '18px', cursor: 'pointer' }} />
              <div>
                <label htmlFor="terms" style={{ cursor: 'pointer', fontWeight: 'bold' }}>I agree to the GamePoint Terms and Conditions</label>
                <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>By creating an account, you agree to our Terms of Service, Privacy Policy, and confirm that you are at least 13 years old.</p>
              </div>
            </div>
            {errors.terms && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem' }}><FaExclamationTriangle /> {errors.terms}</p>}
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#2d2d4d' : 'linear-gradient(45deg, #66C0F4, #66c0f46d)', color: loading ? '#666' : '#1a1a2e', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', transition: 'transform 0.2s', marginBottom: '1.5rem' }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'scale(1)')}
          >
            {loading ? 'Creating Account...' : `Create ${formData.userType} Account`}
          </button>

          {/* Benefits */}
          <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#66C0F4', marginBottom: '1rem' }}><FaGamepad /> Why Join GamePoint?</h4>
            <ul style={{ color: '#cccccc', paddingLeft: '1.5rem', margin: 0 }}>
              <li>Get exclusive deals and discounts</li>
              <li>Track your orders and delivery</li>
              <li>Earn reward points on every purchase</li>
              <li>Access to member-only flash sales</li>
              <li>Safe and secure transactions</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center', color: '#cccccc' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#cccccc', fontWeight: 'bold', textDecoration: 'none' }}>Sign in here</Link>
          </div>
        </form>

        {/* Security Badge */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#0f0f23', borderRadius: '8px', border: '1px solid #2d2d4d', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <span style={{ color: '#cccccc' }}><FaLock /> 256-bit SSL</span>
            <span style={{ color: '#cccccc' }}><FaShieldAlt /> Secure Payments</span>
            <span style={{ color: '#cccccc' }}><FaCrown /> Trusted by Gamers</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Your information is protected with enterprise-grade security</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
