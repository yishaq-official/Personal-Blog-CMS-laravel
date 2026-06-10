import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Search, Github, Twitter } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink to="/" className="text-xl font-bold tracking-tight text-indigo-600 flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md group-hover:bg-indigo-700 transition-colors">B</div>
              <span className="hidden sm:block">Blog</span>
            </NavLink>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <NavLink to="/" className={({isActive}) => isActive ? 'text-indigo-600' : 'hover:text-slate-900 transition-colors'}>Home</NavLink>
              <NavLink to="/category/technology" className="hover:text-slate-900 transition-colors">Technology</NavLink>
              <NavLink to="/category/lifestyle" className="hover:text-slate-900 transition-colors">Lifestyle</NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative items-center">
              <Search size={16} className="absolute left-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search posts..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border border-transparent focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded-full text-sm w-48 transition-all outline-none"
              />
            </div>
            
            {/* Login button for demo */}
            <NavLink to="/admin/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              Sign In
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-80">
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-white font-bold text-xs">B</div>
            <span className="font-medium text-slate-800 text-sm">&copy; {new Date().getFullYear()} Personal Blog CMS</span>
          </div>
          
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-slate-900 transition-colors"><Github size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
