import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <div className="top-bar">
      <div className="top-center">
        <h1>Bike Share Reviews</h1>
      </div>
      <div className="top-flex">
        <div className="top-bottom">
          <nav>
            <ul className="top-nav">
            <li className="top-link"><NavLink to="about">About</NavLink></li>
            <li className="top-link"><NavLink to="reviews">Reviews</NavLink></li>
            <li className="top-link"><NavLink to="maps">Maps</NavLink></li>
            <li className="top-link-login"><NavLink to="login">Sign In</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
  </div>
)


export default Header;