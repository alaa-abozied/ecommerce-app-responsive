import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Link } from 'react-router-dom';

const API_SOURCES = [
  'https://fakestoreapi.com/products',
  'https://dummyjson.com/products?limit=30',
];

const fetchWithTimeout = async (url, timeout = 10000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
};

const normalizeProducts = (json) => {
  const list = Array.isArray(json) ? json : json.products || [];

  return list.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.image || item.thumbnail,
  }));
};

const formatCategory = (cat) => {
  const text = cat.replace(/-/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const getProducts = useCallback(async (isMounted) => {
    setLoading(true);
    setError('');

    for (const url of API_SOURCES) {
      try {
        const json = await fetchWithTimeout(url);
        const products = normalizeProducts(json);

        if (products.length === 0) {
          throw new Error('No products returned');
        }

        if (isMounted()) {
          setData(products);
          setFilter(products);
          setLoading(false);
        }
        return;
      } catch (err) {
        console.error('Error fetching from ' + url + ':', err);
      }
    }

    if (isMounted()) {
      setError(
        'Unable to load products. Please check your internet connection.'
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    getProducts(() => mounted);

    return () => {
      mounted = false;
    };
  }, [getProducts, attempt]);

  const categories = [...new Set(data.map((item) => item.category))];

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const Loading = () => {
    return (
      <>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="col-md-4 col-sm-6 col-12 mb-4">
            <Skeleton height={450} />
          </div>
        ))}
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-4">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => filterProduct(cat)}
            >
              {formatCategory(cat)}
            </button>
          ))}
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 mb-4"
            >
              <div className="card h-100 text-center p-4">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height="250px"
                  style={{ objectFit: 'contain' }}
                />

                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>

                  <p className="card-text">
                    {product.description
                      ? product.description.substring(0, 90) + '...'
                      : ''}
                  </p>
                </div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">
                    $ {product.price}
                  </li>
                </ul>

                <div className="card-body">
                  <Link
                    to={'/product/' + product.id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>

                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="col-12 text-center py-5">
              <h4>{error}</h4>
              <button
                className="btn btn-dark mt-3"
                onClick={() => setAttempt((a) => a + 1)}
              >
                Try Again
              </button>
            </div>
          ) : (
            <ShowProducts />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;