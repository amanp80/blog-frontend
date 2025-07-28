import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1>
        <Link to="/">EchoVerse</Link>
      </h1>
      <nav className="header-nav">
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <Link to="/create">New Post</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;