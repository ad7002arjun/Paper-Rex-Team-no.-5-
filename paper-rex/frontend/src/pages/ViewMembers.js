import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    axios.get('/members')
      .then(res => { setMembers(res.data); setLoading(false); })
      .catch(() => { setErr('Failed to load members. Ensure the backend is running.'); setLoading(false); });
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the team?`)) return;
    try {
      await axios.delete(`/members/${id}`);
      setMembers(prev => prev.filter(m => m._id !== id));
    } catch {
      alert('Failed to delete member.');
    }
  };

  if (loading) return <div className="loading">🌿 Loading members...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Meet Our Amazing Team</h1>
        <p>{members.length} member{members.length !== 1 ? 's' : ''} in Paper Rex</p>
      </div>

      {err && <div className="alert-error">{err}</div>}

      {members.length === 0 && !err ? (
        <div className="empty-state">
          <span>🌱</span>
          <p>No members yet. <Link to="/add" style={{ color: 'var(--green-accent)' }}>Add the first one!</Link></p>
        </div>
      ) : (
        <div className="members-grid">
          {members.map(m => (
            <div className="member-card" key={m._id}>
              {m.image
                ? <img className="member-card-img" src={`http://localhost:5000/uploads/${m.image}`} alt={m.name} />
                : <div className="member-card-img-placeholder">🌿</div>
              }
              <div className="member-card-body">
                <div className="member-card-name">{m.name}</div>
                <div className="member-card-role">{m.role}</div>
                <div className="member-card-reg">Roll: {m.regNo}</div>
                <Link to={`/member/${m._id}`} className="view-details-btn">VIEW DETAILS</Link>
                <button onClick={() => handleDelete(m._id, m.name)} className="delete-btn">🗑️ Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMembers;
