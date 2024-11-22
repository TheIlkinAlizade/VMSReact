import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { Link } from 'react-router-dom';
import envImg from '../assets/img/env.jpg';
import comImg from '../assets/img/comsup.jpg';
import edureaImg from '../assets/img/edurea.jpg';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="hero-section text-white text-center py-5" style={{minHeight:'90vh', display:'flex',justifyContent:'center', alignItems:'center'}}>
        <div className="container">
          <h1>Make a Difference in Your Community</h1>
          <p className="lead">Join us to support meaningful causes and create positive change</p>
          <a href="#get-involved" className="btn btn-primary btn-lg mt-3">Volunteer Now</a>
        </div>
      </header>



      <section id="projects" className="py-5 bg-light">
      {/* About Section */}
      <div id="about" className="py-5 text-white about-section">
        <div className="container">
          <h2 className="text-center mb-4" style={{fontSize:'2.5em'}}>ABOUT US</h2>
          <p className="text-center" style={{fontSize:'1.5em'}}>VolunteerConnect is dedicated to connecting passionate volunteers with community projects that need their skills and support. Our goal is to empower individuals to make a real impact by helping causes that matter most to them.</p>
        </div>
      </div>
      {/* Projects Section */}
        <div className="container">
          <h2 className="text-center mb-4" style={{color:'black'}}>Ongoing Projects</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src={envImg} className="card-img-top" alt="Environment Project" />
                <div className="card-body">
                  <h5 className="card-title">Environmental Cleanup</h5>
                  <p className="card-text">Join us in cleaning up local parks and nature trails to keep our environment healthy and beautiful.</p>
                  <a href="#get-involved" className="btn btn-primary">Join Now</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src={comImg} className="card-img-top" alt="Community Support Project" />
                <div className="card-body">
                  <h5 className="card-title">Community Support</h5>
                  <p className="card-text">Support families in need by distributing food, clothing, and essential supplies in our community.</p>
                  <a href="#get-involved" className="btn btn-primary">Get Involved</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src={edureaImg} className="card-img-top" alt="Education Project" />
                <div className="card-body">
                  <h5 className="card-title">Educational Outreach</h5>
                  <p className="card-text">Help us run workshops and mentoring sessions to support youth education and career development.</p>
                  <a href="#get-involved" className="btn btn-primary">Volunteer</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-5 text-white" style={{ backgroundColor: '#8e44ad' }}>
        <div className="container">
          <h2 className="text-center mb-4">How to Get Involved</h2>
          <p className="text-center">Sign up to start making an impact. Whether you have a few hours to spare or can commit long-term, there’s a way for you to help.</p>
          <div className="text-center" style={{display:'flex', flexDirection:'column'}}>
            <Link to='/register/user' className="btn btn-light btn-lg mt-3">Sign Up to Volunteer</Link>
            <Link to='/register/org' className="btn btn-light btn-lg mt-3">Sign Up as Organization</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <form className="row g-3 justify-content-center">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="col-md-6">
              <input type="email" className="form-control" placeholder="Your Email" required />
            </div>
            <div className="col-12">
              <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 footer-section">
        <div className="container text-center">
          <p className="mb-0">© 2024 VolunteerConnect. All rights reserved.</p>
          <div className="social-icons mt-3">
            <a href="#" className="text-white me-3"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
