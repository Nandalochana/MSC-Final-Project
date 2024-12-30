import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Freelancer Web Application</h1>
        <nav>
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Find the Best Freelancers</h2>
          <p>Browse through our extensive list of freelancers to find the perfect match for your project.</p>
        </section>
        <section>
          <h2>Post a Job</h2>
          <p>Post your job requirements and get proposals from talented freelancers.</p>
        </section>
        <section>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Wide range of freelancers</li>
            <li>Secure payment system</li>
            <li>24/7 customer support</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Freelancer Web Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;