import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RequestBlood = () => {
  const [formData, setFormData] = useState({ patientName: '', bloodGroup: 'A+', units: 1, hospital: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/user/request', formData);
      alert('Blood request submitted successfully!');
      navigate('/user-dashboard');
    } catch (err) {
      alert('Failed to submit request');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', background: '#f8fafc', minHeight: '90vh' }}>
      <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '24px' }}>Submit Blood Request</h2>
        <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '14px' }}>Fill out the medical requirement form accurately.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Patient Full Name</label>
            <input type="text" placeholder="Patient name" onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Required Blood Group</label>
            <select value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} style={inputStyle}>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Units Needed</label>
            <input type="number" min="1" placeholder="1" onChange={(e) => setFormData({ ...formData, units: e.target.value })} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Hospital / City Name</label>
            <input type="text" placeholder="Hospital name and location" onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} required style={inputStyle} />
          </div>
          
          <button type="submit" style={{
            marginTop: '10px',
            padding: '12px',
            background: '#e11d48',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(225, 29, 72, 0.2)'
          }}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' };
const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  background: '#f8fafc'
};

export default RequestBlood;