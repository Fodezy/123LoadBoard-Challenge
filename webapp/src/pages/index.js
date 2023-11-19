import React from 'react';

const HeroSection = () => (
  <section id="hero" className="text-center py-3">
    <h1 className="display-4 ">Squash No Friends</h1>
    <p className="lead">Find a McGill Squash Buddy</p>
    
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="mt-5">
    <div className="container">
      <div className="text-center mt-4">
        <p>We use AI to pair you with a partner when you're both free.</p>
        <a href='/form' className="btn btn-primary btn-lg">Start</a>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="bg-light py-5">
    <div className="container">
      <h2 className="text-center mb-4">Testimonials</h2>
      <blockquote className="blockquote text-center">
        "This service is amazing!" - John Doe
      </blockquote>
      <blockquote className="blockquote text-center">
        "I highly recommend it." - Jane Smith
      </blockquote>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-dark text-white text-center py-3">
    <p>&copy; 2023 Your Company Name</p>
  </footer>
);

const LandingPage = () => (
  <div>
    <HeroSection />
    <FeaturesSection />
    {/* <TestimonialsSection />
    <Footer /> */}
  </div>
);

export default LandingPage;
