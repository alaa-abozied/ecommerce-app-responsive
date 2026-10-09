import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { addCart } from '../redux/action';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SOURCES = [
  {
    detail: (id) => 'https://fakestoreapi.com/products/' + id,
    category: (cat) =>
      'https://fakestoreapi.com/products/category/' + encodeURIComponent(cat),
  },
  {
    detail: (id) => 'https://dummyjson.com/products/' + id,
    category: (cat) =>
      'https://dummyjson.com/products/category/' + encodeURIComponent(cat),
  },
];

const fetchJson = async (url, timeout = 10000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
};

const normalize = (item) => ({
  id: item.id,
  title: item.title,
  price: item.price,
  description: item.description,
  category: item.category,
  image: item.image || item.thumbnail,
  rating:
    typeof item.rating === 'object' && item.rating !== null
      ? item.rating.rate
      : item.rating,
});

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(false);
      setProduct(null);
      setSimilar([]);

      for (const source of SOURCES) {
        try {
          const json = await fetchJson(source.detail(id));
          const item = normalize(json);

          if (!item.title) throw new Error('Invalid product');

          let related = [];
          try {
            const catJson = await fetchJson(source.category(item.category));
            const list = Array.isArray(catJson) ? catJson : catJson.products || [];
            related = list
              .map(normalize)
              .filter((x) => x.id !== item.id)
              .slice(0, 4);
          } catch (e) {
            related = [];
          }

          if (mounted) {
            setProduct(item);
            setSimilar(related);
            setLoading(false);
          }
          return;
        } catch (err) {
          console.error('Error loading product:', err);
        }
      }

      if (mounted) {
        setError(true);
        setLoading(false);
      }
    };

    load();
    window.scrollTo(0, 0);

    return () => {
      mounted = false;
    };
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3 text-center">
          <img
            className="img-fluid"
            src={product.image}
            alt={product.title}
            width="400px"
            height="400px"
            style={{ objectFit: 'contain', maxHeight: '400px' }}
          />
        </div>

        <div className="col-md-6 col-12 py-md-5 py-3">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>

          <p className="lead">
            {product.rating} <i className="fa fa-star"></i>
          </p>

          <h3 className="display-6 my-4">${product.price}</h3>
          <p className="lead">{product.description}</p>

          <button
            className="btn btn-outline-dark me-2 mb-2"
            onClick={() => dispatch(addCart(product))}
          >
            Add to Cart
          </button>

          <Link to="/cart" className="btn btn-dark mb-2">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowSimilar = () => (
    <div className="py-4 my-4">
      <div className="d-flex flex-wrap justify-content-center">
        {similar.map((item) => (
          <div key={item.id} className="card mx-2 mx-md-3 mb-4 text-center similar-card">
            <img
              className="card-img-top p-3"
              src={item.image}
              alt={item.title}
              height={250}
              style={{ objectFit: 'contain' }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
            </div>
            <div className="card-body">
              <Link to={'/product/' + item.id} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => dispatch(addCart(item))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-5 my-5">
            <h4>Unable to load this product.</h4>
            <Link to="/product" className="btn btn-dark mt-3">
              Back to Products
            </Link>
          </div>
        ) : (
          <ShowProduct />
        )}

        {!loading && !error && similar.length > 0 && (
          <div className="row my-5 py-5">
            <div>
              <h2 className="text-center text-md-start">You may also Like</h2>
              <ShowSimilar />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Product;