import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Upload, FileText,
  LogOut, Menu, X, Shield, User, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout, admin } = useAdminAuth();

  const isSuperAdmin = admin?.role === 'super_admin';

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard',      path: '/admin' },
    { icon: Upload,          label: 'Upload Reports', path: '/admin/upload-reports' },
    { icon: FileText,        label: 'Manage Reports', path: '/admin/manage-reports' },
    ...(isSuperAdmin
      ? [{ icon: Shield, label: 'Manage Admins', path: '/admin/manage-admins', superAdminOnly: true }]
      : []
    ),
  ];

  const isActive = (path) => location.pathname === path;
  const currentPage = menuItems.find(m => isActive(m.path))?.label || 'Admin Dashboard';

  // ── Sidebar Inner Content ──────────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Logo */}
      <div className="px-4 py-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0 p-1.5">
            <img src="/rvspk_logo.png" alt="RV" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="font-bold text-sm text-white leading-tight">Right Vision</p>
            <p className="text-[11px] text-white/50 leading-tight">Securities · Admin</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-3 border-t border-white/10 flex-shrink-0" />

      {/* Nav — scrollable if needed */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 px-3 mb-2">
          Navigation
        </p>

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`
              group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-150
              ${isActive(item.path)
                ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive(item.path) ? '' : 'opacity-70 group-hover:opacity-100'}`} />
            <span className="flex-1">{item.label}</span>
            {item.superAdminOnly && (
              <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md
                ${isActive(item.path)
                  ? 'bg-white/20 text-white'
                  : 'bg-accent/20 text-accent'
                }`}>
                SA
              </span>
            )}
            {isActive(item.path) && (
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom — always visible, never pushed off screen */}
      <div className="flex-shrink-0 px-3 pb-5 pt-4 border-t border-white/10">
        {/* User card */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
          <div className="h-8 w-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate leading-tight">
              {admin?.full_name || 'Admin'}
            </p>
            <p className="text-[11px] text-white/40 capitalize truncate leading-tight">
              {admin?.role?.replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => { logout(); setSidebarOpen(false); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    // ── Full viewport height, no overflow on root ────────────
    <div className="h-screen flex overflow-hidden bg-[hsl(var(--admin-bg))]">

      {/* ── Sidebar Desktop — fixed height, never scrolls ────── */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-[hsl(var(--admin-sidebar))] h-full">
        <SidebarContent />
      </aside>

      {/* ── Sidebar Mobile Overlay ────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 bg-[hsl(var(--admin-sidebar))] h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Right Side — header + scrollable content ─────────── */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

        {/* Top Bar — sticky, never scrolls */}
        <header className="flex-shrink-0 bg-card border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm z-30">

          {/* Left */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm p-1">
                <img src="/rvspk_logo.png" alt="RV" className="h-full w-full object-contain" />
              </div>
              <span className="font-semibold text-sm text-foreground">Admin Portal</span>
            </div>

            {/* Desktop breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
              <span>Admin</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-foreground">{currentPage}</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User pill — hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border">
              <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                {admin?.full_name}
              </span>
              <span className="hidden md:inline text-xs text-muted-foreground capitalize px-1.5 py-0.5 bg-accent/10 rounded-full whitespace-nowrap">
                {admin?.role?.replace('_', ' ')}
              </span>
            </div>

            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
            >
              <LogOut className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </header>

        {/* ── Scrollable Page Content ─────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-border text-center text-xs text-muted-foreground/40">
            © {new Date().getFullYear()} Right Vision Securities · Admin Portal
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;