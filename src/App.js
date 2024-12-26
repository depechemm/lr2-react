import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Slider from './components/Slider';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ]);
  const [filterText, setFilterText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [filterText, products]);

  const addToFavorites = (product) => {
    if (!favorites.find(item => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<><Slider /><ProductList products={filteredProducts} setProducts={setProducts} addToFavorites={addToFavorites} addToCart={addToCart} favorites={favorites} cart={cart} /></>} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

