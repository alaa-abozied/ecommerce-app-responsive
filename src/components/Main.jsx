import React, { useState } from 'react';

const Main = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="hero border-1 pb-3">
      <div
        className="card hero-card text-white border-0 mx-3 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #212529 0%, #3b4b3f 100%)',
        }}
      >
        {!imgFailed && (
          <img
            src={process.env.PUBLIC_URL + '/assets/main.jpg'}
            className="card-img hero-img"
            alt=""
            onError={() => setImgFailed(true)}
          />
        )}

        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <div className="container">
            <h2 className="card-title hero-title fw-bolder mb-3">
              Welcome to our store
            </h2>
            <p className="card-text lead hero-text col-lg-7 px-0">
              Discover a wide range of high-quality products at competitive
              prices, all in one place. Enjoy a seamless shopping experience
              with fast delivery and exclusive deals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;