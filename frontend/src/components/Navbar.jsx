import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      padding: '0 40px',
      height: '70px',
      background: '#ffffff',
      color: '#0f172a',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Brand Logo / Name */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          background: '#fee2e2',
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          🩸
        </div>
        <span style={{ color: '#0f172a', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.3px' }}>
          Life<span style={{ color: '#e11d48' }}>Saver</span>
        </span>
      </Link>

      {/* Navigation Links & Actions */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {!user ? (
          <>
            <Link to="/" style={navLinkStyle(isActive('/'))}>Home</Link>
            <Link to="/login" style={navLinkStyle(isActive('/login'))}>Sign In</Link>
            <Link to="/register" style={{
              background: '#e11d48',
              color: '#fff',
              padding: '9px 18px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 2px 4px rgba(225, 29, 72, 0.2)',
              transition: 'background 0.2s'
            }}>
              Get Started
            </Link>
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <Link to="/admin-dashboard" style={navLinkStyle(isActive('/admin-dashboard'))}>Admin Dashboard</Link>
            )}
            {user.role === 'donor' && (
              <Link to="/donor-dashboard" style={navLinkStyle(isActive('/donor-dashboard'))}>Donor Portal</Link>
            )}
            {user.role === 'user' && (
              <>
                <Link to="/user-dashboard" style={navLinkStyle(isActive('/user-dashboard'))}>Dashboard</Link>
                <Link to="/request-blood" style={navLinkStyle(isActive('/request-blood'))}>Request Blood</Link>
              </>
            )}

            <div style={{ height: '24px', width: '1px', background: '#cbd5e1', margin: '0 4px' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{user.name}</span>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>{user.role}</span>
              </div>
              <button onClick={handleLogout} style={{
                padding: '8px 14px',
                background: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

const navLinkStyle = (active) => ({
  color: active ? '#e11d48' : '#475569',
  textDecoration: 'none',
  fontWeight: active ? '600' : '500',
  fontSize: '14px',
  transition: 'color 0.2s'
});

export default Navbar;