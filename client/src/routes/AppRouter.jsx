import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import PublicLayout from '../components/layout/PublicLayout';
import Login from '../pages/auth/Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;
  
  return children ? children : <Outlet />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<div className="p-8 font-bold text-2xl">Home Page Content</div>} />
          <Route path="/posts/:slug" element={<div className="p-8 font-bold text-2xl">Post Detail Content</div>} />
          <Route path="/category/:slug" element={<div className="p-8 font-bold text-2xl">Category Page Content</div>} />
          <Route path="/tag/:slug" element={<div className="p-8 font-bold text-2xl">Tag Page Content</div>} />
        </Route>
        
        {/* Auth Route */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Admin Protected Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<div className="glass-card">Dashboard Content</div>} />
          <Route path="posts" element={<div className="glass-card">Posts List Content</div>} />
          <Route path="posts/new" element={<div className="glass-card">New Post Content</div>} />
          <Route path="posts/:id" element={<div className="glass-card">Edit Post Content</div>} />
          <Route path="categories" element={<div className="glass-card">Categories Content</div>} />
          <Route path="tags" element={<div className="glass-card">Tags Content</div>} />
          <Route path="media" element={<div className="glass-card">Media Content</div>} />
          <Route path="profile" element={<div className="glass-card">Profile Content</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
