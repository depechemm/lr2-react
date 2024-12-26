import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css';
import FilterMenu from './FilterMenu';

import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpg';

const ProductList = ({ addToFavorites, addToCart, favorites, cart }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Черная ветровка', imageUrl: img1, price: 1000 },
    { id: 2, name: 'Пушистая сумочка', imageUrl: img2, price: 1500 },
    { id: 3, name: 'Абстрактные штаны', imageUrl: img3, price: 2000 },
  ]);

  const [sortBy, setSortBy] = useState('name-asc');
  const [warning, setWarning] = useState('');

  const navigate = useNavigate();

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const [newProductName, setNewProductName] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (!newProductImage) {
      setWarning('Пожалуйста, добавьте изображение товара');
      return;
    }
    if (newProductName.trim().length === 0) {
      setWarning('Название товара не должно быть пустым');
      return;
    }
    if (newProductPrice <= 0) {
      setWarning('Цена товара должна быть больше 0');
      return;
    }

    const newProduct = { id: Date.now(), name: newProductName, imageUrl: newProductImage, price: newProductPrice };
    setProducts([...products, newProduct]);
    setNewProductName('');
    setNewProductImage(null);
    setNewProductPrice('');
    setWarning('');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="product-list">
      <FilterMenu sortBy={sortBy} setSortBy={setSortBy} />
      <ul>
        {sortedProducts.map(product => (
          <li key={product.id}>
            <Link to="/non-existent-path">
              <img src={product.imageUrl} alt={product.name} />
            </Link>
            <p className="product-price">{product.price} ₽</p>
            <p>{product.name}</p>
            <button
              onClick={() => {
                if (favorites.some(item => item.id === product.id)) {
                  navigate('/favorites');
                } else {
                  addToFavorites(product);
                }
              }}
            >
              {favorites.some(item => item.id === product.id) ? 'В ИЗБРАННОМ' : 'ДОБАВИТЬ В ИЗБРАННОЕ'}
            </button>
            <button
              onClick={() => {
                if (cart.some(item => item.id === product.id)) {
                  navigate('/cart');
                } else {
                  addToCart(product);
                }
              }}
            >
              {cart.some(item => item.id === product.id) ? 'В КОРЗИНЕ' : 'ДОБАВИТЬ В КОРЗИНУ'}
            </button>
            <button onClick={() => deleteProduct(product.id)} id="hide-button">СКРЫТЬ</button>
          </li>
        ))}
      </ul>
      <div className="add-product-form">
        <h3>Хотите поделиться своим творчеством? Добавьте свой товар!</h3>
        {warning && <p className="warning">{warning}</p>}
        <input
          type="text"
          placeholder="Название товара"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <input
          type="number"
          placeholder="Цена товара"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <button onClick={addProduct}>ДОБАВИТЬ</button>
      </div>
    </div>
  );
};

export default ProductList;
