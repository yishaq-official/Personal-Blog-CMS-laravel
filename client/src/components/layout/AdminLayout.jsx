import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Tags, 
  Image as ImageIcon, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Tags', path: '/admin/tags', icon: Tags },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Profile', path: '/admin/profile', icon: User },
  ];

  const getPageTitle = () => {
    const currentItem = navItems.find(item => 
      item.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.path)
    );
    return currentItem ? currentItem.name : 'Admin Panel';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-dark)] text-[var(--text-light)]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[var(--border)] bg-[var(--sidebar-bg)] backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-[var(--border)]">
          <span className="text-xl font-bold tracking-wider text-[var(--accent)]">Blog CMS</span>
          <button 
            className="md:hidden p-1 text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between py-4">
          <nav className="flex-1 space-y-1 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)]/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <item.icon size={18} />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="px-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--sidebar-bg)]/50 backdrop-blur-md px-4 sm:px-6 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold tracking-tight">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-gray-400">{user?.email}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold" style={{ boxShadow: 'var(--shadow-glow)' }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 animate-fade-in relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
