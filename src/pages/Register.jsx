import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account created for ' + name);
  };

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />

        <div className="row my-4 h-100">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="registerName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerName"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form my-3">
                <label htmlFor="registerEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form my-3">
                <label htmlFor="registerPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="my-3">
                <p>
                  Already has an account?{' '}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Login
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
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

export default Register;