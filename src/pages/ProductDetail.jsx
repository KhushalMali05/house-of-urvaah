import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BEST_SELLERS_PRODUCTS, MOCK_PRODUCTS } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import { Home } from './Home';

export const ProductDetail = () => {
  const { id } = useParams();
  const { setPdpProduct } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const product =
      BEST_SELLERS_PRODUCTS.find((p) => p.id === id) ||
      MOCK_PRODUCTS?.find((p) => p.id === id) ||
      BEST_SELLERS_PRODUCTS[0];

    if (product) {
      setPdpProduct(product);
      navigate('/', { replace: true });
    }
  }, [id, setPdpProduct, navigate]);

  return <Home />;
};
