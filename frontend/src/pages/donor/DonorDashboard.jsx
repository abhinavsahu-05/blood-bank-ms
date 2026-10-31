import React, { useState } from 'react';

const DonorDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', background: '#f8fafc', minHeight: '90vh' }}>
      <h1 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '28px' }}>Donor Portal</h1>
      <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '15px' }}>Manage your donor availability status and records.</p>

      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1e293b' }}>Donation Status</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
            Current Status: <strong style={{ color: isAvailable ? '#16a34a' : '#dc2626' }}>{isAvailable ? 'Available to Donate' : 'Unavailable'}</strong>
          </p>
        </div>
        <button onClick={() => setIsAvailable(!isAvailable)} style={{
          padding: '10px 18px',
          background: isAvailable ? '#fee2e2' : '#dcfce7',
          color: isAvailable ? '#dc2626' : '#16a34a',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          {isAvailable ? 'Set Unavailable' : 'Set Available'}
        </button>
      </div>

      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#1e293b' }}>Donation History</h3>
        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>No past donation logs found in the database.</p>
      </div>
    </div>
  );
};

export default DonorDashboard;