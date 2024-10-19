import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="logo-container">
                <img src="/logo.svg" alt="LoCamera Logo" className="logo"/>
                <h1>LoCamera</h1>
            </div>
            <small>map of local cameras</small>
            <nav className="main-nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/incidents">Incidents</Link></li>
                    <li><Link to="/account">Account</Link></li>
                    <li><Link to="/camera-management">Camera Management</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
