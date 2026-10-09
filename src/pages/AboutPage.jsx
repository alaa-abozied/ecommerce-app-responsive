import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SOURCES = [
  'https://fakestoreapi.com/products?limit=4',
  'https://dummyjson.com/products?limit=4',
];

const AboutPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      for (const url of SOURCES) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 8000);
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timer);

          if (!res.ok) throw new Error('Failed');

          const json = await res.json();
          const list = Array.isArray(json) ? json : json.products || [];

          if (mounted && list.length) {
            setItems(
              list.slice(0, 4).map((p) => ({
                id: p.id,
                title: p.title,
                image: p.image || p.thumbnail,
              }))
            );
          }
          return;
        } catch (err) {
          console.error('About page images failed:', err);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />

        <p className="lead text-center">
          We are a small team passionate about bringing you high-quality
          products at fair prices. Our store offers a wide range of clothing,
          jewelery and electronics, carefully selected to make your shopping
          experience simple, fast and enjoyable. From the moment you browse to
          the moment your order arrives, we care about every detail.
        </p>

        <h2 className="text-center py-4">Our Products</h2>

        <div className="row">
          {items.map((item) => (
            <div className="col-md-3 col-sm-6 mb-3 px-3" key={item.id}>
              <div className="card h-100">
                <img
                  className="card-img-top img-fluid p-3"
                  src={item.image}
                  alt={item.title}
                  height={160}
                  style={{ objectFit: 'contain', height: '160px' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {item.title.substring(0, 15)}...
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;