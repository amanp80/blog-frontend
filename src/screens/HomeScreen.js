import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.119:5001';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/posts`); // <-- UPDATED
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch posts.');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Latest Posts</h1>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <h2>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="post-meta">
              By {post.author.name} on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="post-content">
              {post.content.substring(0, 150)}...
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default HomeScreen;

