import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import EditPostScreen from './screens/EditPostScreen';

function App() {
  return (
    // FIX: <Router> must wrap <AuthProvider> so that hooks like useNavigate
    // are available to the AuthContext.
    <Router>
      <AuthProvider>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/post/:id" element={<PostScreen />} />
            <Route path="/edit/:id" element={<EditPostScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/create" element={<CreatePostScreen />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;