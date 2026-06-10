import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Tags, 
  Image as ImageIcon, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Categories', path: '/admin/categories', icon: FolderOpen },
    { name: 'Tags', path: '/admin/tags', icon: Tags },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    if (path.includes('/admin/posts')) return 'Posts';
    if (path.includes('/admin/categories')) return 'Categories';
    if (path.includes('/admin/tags')) return 'Tags';
    if (path.includes('/admin/media')) return 'Media Library';
    if (path.includes('/admin/profile')) return 'Profile';
    return 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0e14] text-gray-900 dark:text-gray-100 flex admin-mode font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 glass-panel border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">B</div>
            Blog CMS
          </h1>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                  : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
              }`
            }
          >
            <User size={18} />
            Profile
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Topbar */}
        <header className="h-16 glass-panel border-b border-white/10 flex items-center justify-between px-4 lg:px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-400 hover:text-white p-2 rounded-md hover:bg-white/5"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-medium">{getPageTitle()}</h2>
          </div>

          <div className="relative">
            <button 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-medium border border-indigo-500/30">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 glass-card border border-white/10 z-50 py-1 !p-1 animate-fade-in origin-top-right">
                  <div className="px-4 py-2 text-sm border-b border-white/10 mb-1">
                    <p className="font-medium text-white truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{user?.email}</p>
                  </div>
                  <NavLink
                    to="/admin/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={14} />
                    Profile Settings
                  </NavLink>
                  <button
                    onClick={() => { setIsProfileOpen(false); logout(); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-md transition-colors text-left"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
