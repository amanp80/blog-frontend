import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.119:5001';

const PostScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/posts/${id}`); // <-- UPDATED
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch post.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  
  const deleteHandler = async () => {
      if (window.confirm('Are you sure you want to delete this post?')) {
          try {
              const config = {
                  headers: {
                      Authorization: `Bearer ${user.token}`,
                  },
              };
              await axios.delete(`${API_URL}/api/posts/${id}`, config); // <-- UPDATED
              navigate('/');
          } catch (error) {
              setError('Could not delete post. You must be the author.');
          }
      }
  };

  return (
    <div>
      <Link to="/" className="btn">Go Back</Link>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : post ? (
        <div className="post-card" style={{marginTop: '1rem'}}>
          <h1>{post.title}</h1>
          <p className="post-meta">
            By {post.author.name} on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="post-content">{post.content}</p>
          {user && user._id === post.author._id && (
              <div>
                  <Link to={`/edit/${post._id}`} className="btn">Edit</Link>
                  <button onClick={deleteHandler} className="btn btn-delete">Delete</button>
              </div>
          )}
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostScreen;