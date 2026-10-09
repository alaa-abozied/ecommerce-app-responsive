import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addCart, delCart } from '../redux/action';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const state = useSelector((state) => state.handleCart) || [];
  const dispatch = useDispatch();

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Your Cart is Empty</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-12 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Item List</h5>
                </div>

                <div className="card-body">
                  {state.map((item) => (
                    <div key={item.id}>
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-3 col-12 mb-3 mb-lg-0">
                          <div className="bg-image rounded text-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              width={100}
                              height={75}
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-5 col-12 col-md-6">
                          <p>
                            <strong>{item.title}</strong>
                          </p>
                        </div>

                        <div className="col-lg-4 col-12 col-md-6">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: '300px' }}
                          >
                            <button
                              className="btn px-3"
                              onClick={() => removeItem(item)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>

                            <p className="mx-3 mx-sm-5 mb-0 align-self-center">
                              {item.qty}
                            </p>

                            <button
                              className="btn px-3"
                              onClick={() => addItem(item)}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>

                          <p className="text-start text-md-center">
                            <strong>
                              <span className="text-muted">{item.qty}</span> x $
                              {item.price}
                            </strong>
                          </p>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
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

                  <Link
                    to="/checkout"
                    className="btn btn-dark btn-lg btn-block w-100"
                  >
                    Go to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>

      <Footer />
    </>
  );
};

export default Cart;