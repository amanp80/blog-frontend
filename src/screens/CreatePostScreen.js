import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.119:5001';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${API_URL}/api/posts`, { title, content }, config); // <-- UPDATED
      navigate(`/post/${data._id}`);
    } catch (err) {
      setError('Failed to create post. Please fill out all fields.');
    }
  };

  return (
    <div className="form-container">
      <h1>Create New Post</h1>
      {error && <div className="error-message">{error}</div>}
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
        <button type="submit" className="btn">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostScreen;
