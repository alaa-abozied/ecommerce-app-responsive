import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Logged in as ' + email);
  };

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />

        <div className="row my-4 h-100">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="loginEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="my-3">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="my-3">
                <p>
                  New Here?{' '}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
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

export default Login;