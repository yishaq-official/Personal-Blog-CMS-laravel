import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, Github, Twitter } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-light)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
              Blog.
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
              <Link to="/category/technology" className="hover:text-[var(--accent)] transition-colors">Technology</Link>
              <Link to="/category/lifestyle" className="hover:text-[var(--accent)] transition-colors">Lifestyle</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="pl-9 pr-4 py-1.5 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-glow)] transition-all outline-none"
              />
            </div>
            <Link to="/admin/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-xl font-bold tracking-tighter mb-4 inline-block">
                Blog.
              </Link>
              <p className="text-gray-500 text-sm max-w-sm mb-6">
                A modern personal blog CMS built with React, Vite, and Laravel. Sharing thoughts, tutorials, and life experiences.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Github size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/category/technology" className="hover:text-[var(--accent)] transition-colors">Technology</Link></li>
                <li><Link to="/category/lifestyle" className="hover:text-[var(--accent)] transition-colors">Lifestyle</Link></li>
                <li><Link to="/category/coding" className="hover:text-[var(--accent)] transition-colors">Coding</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Personal Blog CMS. All rights reserved.</p>
            <p>Built with <span className="text-red-500">♥</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
