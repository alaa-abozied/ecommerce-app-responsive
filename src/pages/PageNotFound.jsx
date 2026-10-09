import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <div className="container my-5 py-3">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="display-5">404: Page Not Found</h4>
            <p className="lead">The page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-outline-dark m-2">
              <i className="fa fa-arrow-left"></i> Go Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
