import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    axios.get(`/members/${id}`)
      .then(res => { setMember(res.data); setLoading(false); })
      .catch(() => { setErr('Member not found.'); setLoading(false); });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Remove ${member.name} from the team?`)) return;
    try {
      await axios.delete(`/members/${id}`);
      navigate('/view');
    } catch {
      alert('Failed to delete member.');
    }
  };

  if (loading) return <div className="loading">🌿 Loading...</div>;
  if (err) return <div className="page-container"><div className="alert-error">{err}</div></div>;

  const hobbies = member.hobbies ? member.hobbies.split(',').map(h => h.trim()).filter(Boolean) : [];

  return (
    <div className="page-container" style={{ maxWidth: 700 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Link to="/view" className="back-btn">← Back to Members</Link>
        <button onClick={handleDelete} className="delete-btn">🗑️ Remove Member</button>
      </div>

      <div className="detail-card">
        <div className="detail-hero">
          {member.image
            ? <img className="detail-img" src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} />
            : <div className="detail-img-placeholder">🌿</div>
          }
          <div className="detail-name">{member.name}</div>
          <div className="detail-degree-year">{member.degree} · {member.year}</div>
        </div>

        <div className="detail-body">
          <div className="detail-grid">
            <div className="detail-field">
              <div className="detail-field-label">Register Number</div>
              <div className="detail-field-value">{member.regNo}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Section</div>
              <div className="detail-field-value">{member.section}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Role</div>
              <div className="detail-field-value">{member.role}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Email</div>
              <div className="detail-field-value">{member.email}</div>
            </div>
            {member.project && (
              <div className="detail-field full-width">
                <div className="detail-field-label">Project</div>
                <div className="detail-field-value">{member.project}</div>
              </div>
            )}
            {member.certificate && (
              <div className="detail-field">
                <div className="detail-field-label">Certificate</div>
                <div className="detail-field-value">{member.certificate}</div>
              </div>
            )}
            {member.internship && (
              <div className="detail-field">
                <div className="detail-field-label">Internship</div>
                <div className="detail-field-value">{member.internship}</div>
              </div>
            )}
            {member.aboutYourAim && (
              <div className="detail-field full-width">
                <div className="detail-field-label">About Your Aim</div>
                <div className="detail-field-value">{member.aboutYourAim}</div>
              </div>
            )}
            {hobbies.length > 0 && (
              <div className="detail-field full-width">
                <div className="detail-field-label">Hobbies</div>
                <div className="hobbies-tags">
                  {hobbies.map((h, i) => <span key={i} className="hobby-tag">{h}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;
