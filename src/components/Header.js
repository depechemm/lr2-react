import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './img/logo.svg';

const Header = () => {
    return (
        <header>
            <Link to="/"><img src={logo} alt='Logo'></img></Link>
            <input type="text" placeholder="ПОИСК" className="search-input" />
            <nav>
                <ul>
                    <li><Link to="/favorites">ИЗБРАННОЕ</Link></li>
                    <li><Link to="/cart">КОРЗИНА</Link></li>
                    <li><Link to="/profile">ПРОФИЛЬ</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
