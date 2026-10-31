import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get('/admin/requests')
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.patch(`/admin/requests/${id}`, { status });
      setRequests(requests.map(r => r._id === id ? { ...r, status } : r));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', background: '#f8fafc', minHeight: '90vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '28px' }}>Admin Control Panel</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>Review emergency blood requests and manage system workflows.</p>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>Pending Blood Requests</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle}>Patient Name</th>
                <th style={thStyle}>Blood Group</th>
                <th style={thStyle}>Units</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>No requests found.</td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}><strong>{req.patientName}</strong></td>
                    <td style={tdStyle}>
                      <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '12px' }}>
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td style={tdStyle}>{req.units} Units</td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: req.status === 'Approved' ? '#dcfce7' : req.status === 'Rejected' ? '#fee2e2' : '#fef9c3',
                        color: req.status === 'Approved' ? '#16a34a' : req.status === 'Rejected' ? '#dc2626' : '#ca8a04'
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleStatusUpdate(req._id, 'Approved')} style={approveBtn}>Approve</button>
                        <button onClick={() => handleStatusUpdate(req._id, 'Rejected')} style={rejectBtn}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const thStyle = { padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#475569' };
const tdStyle = { padding: '16px 20px', fontSize: '14px', color: '#334155' };
const approveBtn = { padding: '6px 12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' };
const rejectBtn = { padding: '6px 12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' };

export default AdminDashboard;