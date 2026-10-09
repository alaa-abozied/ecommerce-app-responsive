import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const state = useSelector((state) => state.handleCart) || [];

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No item in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      alert('Thank you! Your order has been placed.');
    };

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>

              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})
                    <span>${Math.round(subtotal * 100) / 100}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>${shipping}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>
                        ${Math.round((subtotal + shipping) * 100) / 100}
                      </strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing address</h4>
              </div>

              <div className="card-body">
                <form className="needs-validation" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        required
                      />
                    </div>

                    <div className="col-sm-6 my-1">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        required
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="address2" className="form-label">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Apartment or suite"
                      />
                    </div>

                    <div className="col-md-5 my-1">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select className="form-select" id="country" required>
                        <option value="">Choose...</option>
                        <option>Egypt</option>
                        <option>Saudi Arabia</option>
                        <option>United Arab Emirates</option>
                        <option>United States</option>
                      </select>
                    </div>

                    <div className="col-md-4 my-1">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <select className="form-select" id="state" required>
                        <option value="">Choose...</option>
                        <option>Cairo</option>
                        <option>Alexandria</option>
                        <option>Kafr el-Sheikh</option>
                        <option>Giza</option>
                      </select>
                    </div>

                    <div className="col-md-3 my-1">
                      <label htmlFor="zip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        required
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3">Payment</h4>

                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label htmlFor="cc-name" className="form-label">
                        Name on card
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        required
                      />
                      <small className="text-muted">
                        Full name as displayed on card
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="cc-number" className="form-label">
                        Credit card number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="cc-expiration" className="form-label">
                        Expiration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="cc-cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        required
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button className="w-100 btn btn-primary btn-lg" type="submit">
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>

      <Footer />
    </>
  );
};

export default Checkout;