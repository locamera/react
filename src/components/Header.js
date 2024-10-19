import React from 'react';
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
                    <li><a href="#incidents">Incidents</a></li>
                    <li><a href="#user-config">User Config</a></li>
                    <li><a href="#configuration">Configuration</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
