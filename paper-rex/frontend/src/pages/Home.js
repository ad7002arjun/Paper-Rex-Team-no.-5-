import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <div className="home-leaf-deco">🌿</div>
      <h1 className="home-title">
        Team <span>Paper Rex</span>
      </h1>
      <p className="home-subtitle">Student Team Members Management Application</p>
      <p className="home-tagline">SRM Institute of Science and Technology · CSE Data Science · AO1 Section</p>

      <div className="home-card">
        <h3>🌱 Manage Team</h3>
        <div className="home-btn-group">
          <Link to="/add" className="btn-primary">
            ➕ Add Member
          </Link>
          <Link to="/view" className="btn-secondary">
            👥 View Members
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
