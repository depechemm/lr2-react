import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="cart">
      <h1>Корзина</h1>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className="cart-grid">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <Link to="/non-existent-path">
                <img src={item.imageUrl} alt={item.name} />
              </Link>
              <p className="product-price">{item.price} ₽</p>
              <p>{item.name}</p>
              <button onClick={() => removeFromCart(item.id)}>УДАЛИТЬ ИЗ КОРЗИНЫ</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
