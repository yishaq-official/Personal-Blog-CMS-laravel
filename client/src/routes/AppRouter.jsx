import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
        {/* Public Routes - Placeholders for now */}
        <Route path="/" element={<div className="p-8">Home Page</div>} />
        <Route path="/posts/:slug" element={<div className="p-8">Post Detail</div>} />
        <Route path="/category/:slug" element={<div className="p-8">Category Page</div>} />
        <Route path="/tag/:slug" element={<div className="p-8">Tag Page</div>} />
        
        {/* Auth Route */}
        <Route path="/admin/login" element={<div className="p-8">Login Page</div>} />
        
        {/* Admin Protected Routes - Placeholders */}
        <Route path="/admin" element={
          <ProtectedRoute>
            {/* Replace with AdminLayout component later */}
            <div>
              <nav className="p-4 bg-gray-800 text-white">Admin Nav Placeholder</nav>
              <div className="p-8">
                <Outlet />
              </div>
            </div>
          </ProtectedRoute>
        }>
          <Route index element={<div>Dashboard</div>} />
          <Route path="posts" element={<div>Posts List</div>} />
          <Route path="posts/new" element={<div>New Post</div>} />
          <Route path="posts/:id" element={<div>Edit Post</div>} />
          <Route path="categories" element={<div>Categories</div>} />
          <Route path="tags" element={<div>Tags</div>} />
          <Route path="media" element={<div>Media</div>} />
          <Route path="profile" element={<div>Profile</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
