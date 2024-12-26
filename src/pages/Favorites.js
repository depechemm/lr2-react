import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites">
      <h1>Избранное</h1>
      {favorites.length === 0 ? (
        <p>Избранное пусто</p>
      ) : (
        <ul className="favorites-grid">
          {favorites.map((item, index) => (
            <li key={index} className="favorites-item">
              <Link to="/non-existent-path">
                <img src={item.imageUrl} alt={item.name} />
              </Link>
              <p className="product-price">{item.price} ₽</p>
              <p>{item.name}</p>
              <button onClick={() => removeFromFavorites(item.id)}>УДАЛИТЬ ИЗ ИЗБРАННОГО</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;

