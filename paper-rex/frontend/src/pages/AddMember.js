import React, { useState } from 'react';
import axios from 'axios';

const INITIAL = {
  name: '', regNo: '', year: '', degree: '', section: '',
  role: '', email: '', project: '', hobbies: '',
  certificate: '', internship: '', aboutYourAim: '',
};

function AddMember() {
  const [form, setForm] = useState(INITIAL);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const required = ['name', 'regNo', 'year', 'degree', 'section', 'role', 'email'];
    for (let f of required) {
      if (!form[f].trim()) return `Please fill in: ${f}`;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr('');
    const error = validate();
    if (error) { setErr(error); return; }

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (image) data.append('image', image);

    try {
      setLoading(true);
      await axios.post('/members', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('✅ Member added successfully!');
      setForm(INITIAL);
      setImage(null);
      setImagePreview(null);
    } catch (e) {
      setErr('❌ Failed to add member. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add Team Member</h1>
        <p>Fill in the details to register a new Paper Rex member</p>
      </div>

      <div className="form-card">
        {msg && <div className="alert-success">{msg}</div>}
        {err && <div className="alert-error">{err}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Arjun Dogra" />
            </div>
            <div className="form-group">
              <label>Register Number *</label>
              <input name="regNo" value={form.regNo} onChange={handleChange} placeholder="e.g. RA2311056010243" />
            </div>
            <div className="form-group">
              <label>Year *</label>
              <input name="year" value={form.year} onChange={handleChange} placeholder="e.g. 3rd Year" />
            </div>
            <div className="form-group">
              <label>Degree *</label>
              <input name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.Tech CSE Data Science" />
            </div>
            <div className="form-group">
              <label>Section *</label>
              <input name="section" value={form.section} onChange={handleChange} placeholder="e.g. AO1" />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Developer" />
            </div>
            <div className="form-group full-width">
              <label>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. arjun@gmail.com" />
            </div>
            <div className="form-group full-width">
              <label>About Project</label>
              <textarea name="project" value={form.project} onChange={handleChange} placeholder="Describe your project..." />
            </div>
            <div className="form-group">
              <label>Hobbies (comma separated)</label>
              <input name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="e.g. Coding, Photography" />
            </div>
            <div className="form-group">
              <label>Certificate</label>
              <input name="certificate" value={form.certificate} onChange={handleChange} placeholder="e.g. AWS Cloud Practitioner" />
            </div>
            <div className="form-group">
              <label>Internship</label>
              <input name="internship" value={form.internship} onChange={handleChange} placeholder="e.g. Web Dev at TechCorp" />
            </div>
            <div className="form-group full-width">
              <label>About Your Aim</label>
              <textarea name="aboutYourAim" value={form.aboutYourAim} onChange={handleChange} placeholder="What do you want to achieve?" />
            </div>
            <div className="form-group full-width">
              <label>Profile Photo</label>
              <label className="file-upload-label" htmlFor="imageUpload">
                📸 {image ? image.name : 'Browse... No file selected'}
              </label>
              <input id="imageUpload" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginTop: '0.5rem', border: '3px solid var(--green-accent)' }} />
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '⏳ Submitting...' : '🌿 SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
