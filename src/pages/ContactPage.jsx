import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks ' + name + ', your message has been sent!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />

        <div className="row my-4 h-100">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="contactName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactName"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form my-3">
                <label htmlFor="contactEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="contactEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form my-3">
                <label htmlFor="contactMessage">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="contactMessage"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="text-center">
                <button className="my-2 px-4 mx-auto btn btn-dark" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;