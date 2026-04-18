
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, FileText, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAdminAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Upload, label: 'Upload Reports', path: '/admin/upload-reports' },
    { icon: FileText, label: 'Manage Reports', path: '/admin/manage-reports' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[hsl(var(--admin-bg))]">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[hsl(var(--admin-sidebar))] text-[hsl(var(--admin-sidebar-foreground))] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-xl">RV</span>
          </div>
          <div>
            <div className="font-bold text-lg">Admin Dashboard</div>
            <div className="text-xs opacity-80">Right Vision Securities</div>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 admin-sidebar min-h-screen p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-2xl">RV</span>
              </div>
              <div>
                <div className="font-bold text-lg">Admin Dashboard</div>
                <div className="text-xs opacity-80">Right Vision Securities</div>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item flex items-center gap-3 ${
                  isActive(item.path) ? 'active' : ''
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <button
              onClick={logout}
              className="admin-nav-item flex items-center gap-3 w-full text-left hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <aside
              className="w-64 admin-sidebar min-h-screen p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`admin-nav-item flex items-center gap-3 ${
                      isActive(item.path) ? 'active' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8">
                <button
                  onClick={() => {
                    logout();
                    setSidebarOpen(false);
                  }}
                  className="admin-nav-item flex items-center gap-3 w-full text-left hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <Button
                onClick={logout}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
