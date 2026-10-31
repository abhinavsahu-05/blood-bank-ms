import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', background: '#f8fafc', minHeight: '90vh' }}>
      <h1 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '28px' }}>User Dashboard</h1>
      <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '15px' }}>Need emergency blood donation? Create a secure request below.</p>

      <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🚨</div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>Emergency Blood Request</h3>
        <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '14px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
          Submit patient and hospital details to notify the administrator instantly.
        </p>
        <Link to="/request-blood" style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#e11d48',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '15px',
          boxShadow: '0 2px 4px rgba(225, 29, 72, 0.2)'
        }}>
          Request Blood Now
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;