import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import PublicLayout from '../components/layout/PublicLayout';

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
        {/* Public Routes with Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<div className="p-8">Home Page Placeholder</div>} />
          <Route path="/posts/:slug" element={<div className="p-8">Post Detail Placeholder</div>} />
          <Route path="/category/:slug" element={<div className="p-8">Category Page Placeholder</div>} />
          <Route path="/tag/:slug" element={<div className="p-8">Tag Page Placeholder</div>} />
        </Route>
        
        {/* Auth Route */}
        <Route path="/admin/login" element={<div className="p-8">Login Page Placeholder</div>} />
        
        {/* Admin Protected Routes with Layout */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<div>Dashboard Placeholder</div>} />
          <Route path="posts" element={<div>Posts List Placeholder</div>} />
          <Route path="posts/new" element={<div>New Post Placeholder</div>} />
          <Route path="posts/:id" element={<div>Edit Post Placeholder</div>} />
          <Route path="categories" element={<div>Categories Placeholder</div>} />
          <Route path="tags" element={<div>Tags Placeholder</div>} />
          <Route path="media" element={<div>Media Placeholder</div>} />
          <Route path="profile" element={<div>Profile Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
