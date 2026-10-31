import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user', bloodGroup: 'A+', city: '', phone: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      margin: 0,
      padding: '30px 20px',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      overflowY: 'auto',
      zIndex: 9999
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '36px 32px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box',
        textAlign: 'left',
        margin: 'auto'
      }}>
        
        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            backgroundColor: '#dcfce7',
            color: '#16a34a',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            marginBottom: '10px'
          }}>
            📋
          </div>
          <h2 style={{ margin: '0 0 4px 0', color: '#0f172a', fontSize: '24px', fontWeight: '700' }}>
            Create Account
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
            Join the LifeSaver community today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              required 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>I want to register as:</label>
            <select 
              value={formData.role} 
              onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
              style={inputStyle}
            >
              <option value="user">User / Patient (Request Blood)</option>
              <option value="donor">Blood Donor (Donate Blood)</option>
              <option value="admin">System Admin</option>
            </select>
          </div>

          {formData.role === 'donor' && (
            <div style={{ 
              backgroundColor: '#fff1f2', 
              padding: '14px', 
              borderRadius: '10px', 
              border: '1px solid #fecdd3', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
            }}>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#be123c', textTransform: 'uppercase' }}>
                Donor Details Required
              </p>
              <div>
                <label style={labelStyle}>Blood Group</label>
                <select 
                  value={formData.bloodGroup} 
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} 
                  style={inputStyle}
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>City</label>
                <input 
                  type="text" 
                  placeholder="Enter your city" 
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                  required 
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input 
                  type="text" 
                  placeholder="Phone number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                  required 
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            style={{
              marginTop: '6px',
              width: '100%',
              padding: '12px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(22, 163, 74, 0.2)'
            }}
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#e11d48', fontWeight: '600', textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

const labelStyle = { 
  display: 'block', 
  fontSize: '12px', 
  fontWeight: '700', 
  color: '#334155', 
  marginBottom: '6px', 
  textTransform: 'uppercase', 
  letterSpacing: '0.5px' 
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '14px',
  color: '#0f172a',
  backgroundColor: '#f8fafc',
  outline: 'none',
  boxSizing: 'border-box'
};

export default Register;