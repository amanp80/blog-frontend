import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.119:5001';

const EditPostScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/posts/${id}`); // <-- UPDATED
        if (user._id !== data.author._id) {
            navigate('/');
        }
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch post.');
        setLoading(false);
      }
    };
    if (user) {
        fetchPost();
    } else {
        navigate('/login');
    }
  }, [id, user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(`${API_URL}/api/posts/${id}`, { title, content }, config); // <-- UPDATED
      navigate(`/post/${id}`);
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Post</h1>
      {error && <div className="error-message">{error}</div>}
      {loading ? <div className="loading-spinner">Loading...</div> : (
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn">Update Post</button>
        </form>
      )}
    </div>
  );
};

export default EditPostScreen;