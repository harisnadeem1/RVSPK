import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Upload,
  CalendarDays,
  Users,
  ArrowRight,
  Clock,
  Eye,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';
import { format } from 'date-fns';

const API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const { authFetch, admin } = useAdminAuth();

  const [stats, setStats] = useState({
    reports: { total: 0, daily: 0, monthly: 0 },
    demoUsers: { total: 0, pending: 0, inProcess: 0, closed: 0, rejected: 0 },
    bookings: { total: 0, pending: 0, inProcess: 0, closed: 0, rejected: 0 },
  });

  const [recentReports, setRecentReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [reportsRes, recentRes, demoRes, bookingsRes] = await Promise.all([
        authFetch(`${API_URL}/api/reports?limit=1000`),
        authFetch(`${API_URL}/api/reports?limit=5`),
        authFetch(`${API_URL}/api/demo-accounts`),
        authFetch(`${API_URL}/api/bookings`),
      ]);

      if (!reportsRes || !recentRes || !demoRes || !bookingsRes) {
        throw new Error('Failed to load dashboard data');
      }

      const [reportsData, recentData, demoData, bookingsData] =
        await Promise.all([
          reportsRes.json(),
          recentRes.json(),
          demoRes.json(),
          bookingsRes.json(),
        ]);

      if (!reportsRes.ok || !recentRes.ok || !demoRes.ok || !bookingsRes.ok) {
        throw new Error(
          reportsData.error ||
          recentData.error ||
          demoData.error ||
          bookingsData.error ||
          reportsData.message ||
          demoData.message ||
          bookingsData.message ||
          'Failed to load dashboard data'
        );
      }

      const reports = reportsData.reports || [];
      const demoUsers = demoData.accounts || [];
      const bookings = bookingsData.bookings || [];

      setStats({
        reports: {
          total: reports.length,
          daily: reports.filter(r => r.report_type === 'daily').length,
          monthly: reports.filter(r => r.report_type === 'monthly').length,
        },

        demoUsers: {
          total: demoUsers.length,
          pending: demoUsers.filter(u => u.status === 'pending').length,
          inProcess: demoUsers.filter(u => u.status === 'in_process').length,
          closed: demoUsers.filter(u => u.status === 'closed').length,
          rejected: demoUsers.filter(u => u.status === 'rejected').length,
        },

        bookings: {
          total: bookings.length,
          pending: bookings.filter(b => b.status === 'pending').length,
          inProcess: bookings.filter(b => b.status === 'in_process').length,
          closed: bookings.filter(b => b.status === 'closed').length,
          rejected: bookings.filter(b => b.status === 'rejected').length,
        },
      });

      setRecentReports(recentData.reports || []);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const isSuperAdmin = admin?.role === 'super_admin';

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
              <div className="animate-spin rounded-full h-7 w-7 border-2 border-accent border-t-transparent" />
            </div>
            <p className="text-sm text-muted-foreground">
              Loading dashboard...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="max-w-md w-full text-center p-8 rounded-2xl border border-destructive/20 bg-destructive/5">
            <FileText className="h-7 w-7 text-destructive mx-auto mb-3" />
            <p className="text-sm text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={fetchDashboardData}>
              Retry
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-secondary p-6 sm:p-8 mb-8">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-14 right-[20%] h-56 w-56 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Welcome back, {admin?.full_name?.split(' ')[0] || 'Admin'}
            </h2>

            <p className="text-white/60 text-sm">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold self-start sm:self-auto ${
              isSuperAdmin
                ? 'bg-amber-400/20 border border-amber-400/30 text-amber-300'
                : 'bg-white/10 border border-white/20 text-white/80'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {isSuperAdmin ? 'Super Admin' : 'Admin'}
          </div>
        </div>
      </div>

      {/* Overview */}
      <SectionTitle title="Overview" />

      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">

          <OverviewItem
            icon={FileText}
            number={stats.reports.total}
            title="Reports"
            subtitle={`${stats.reports.daily} Daily · ${stats.reports.monthly} Monthly`}
            link="/admin/manage-reports"
          />

          <OverviewItem
            icon={Users}
            number={stats.demoUsers.total}
            title="Demo Users"
            subtitle={`${stats.demoUsers.pending + stats.demoUsers.inProcess} need attention`}
            link="/admin/demo-users"
          />

          <OverviewItem
            icon={CalendarDays}
            number={stats.bookings.total}
            title="Bookings"
            subtitle={`${stats.bookings.pending + stats.bookings.inProcess} need attention`}
            link="/admin/bookings"
          />

        </div>
      </div>

      {/* Activity */}
      <div className="flex items-center justify-between mb-3">
        <SectionTitle title="Activity" noMargin />

        <span className="text-xs text-muted-foreground">
          Current workflow
        </span>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border mb-8">

        <ActivityRow
          icon={Users}
          title="Demo Users"
          stats={stats.demoUsers}
          link="/admin/demo-users"
        />

        <ActivityRow
          icon={CalendarDays}
          title="Bookings"
          stats={stats.bookings}
          link="/admin/bookings"
        />

      </div>

      {/* Quick Access */}
      <SectionTitle title="Quick Access" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">

        <QuickLink
          icon={Upload}
          title="Upload Report"
          link="/admin/upload-reports"
        />

        <QuickLink
          icon={FileText}
          title="Manage Reports"
          link="/admin/manage-reports"
        />

        <QuickLink
          icon={Users}
          title="Demo Users"
          link="/admin/demo-users"
        />

        <QuickLink
          icon={CalendarDays}
          title="Bookings"
          link="/admin/bookings"
        />

      </div>

      {/* Recent Reports */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">

        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />

            <h3 className="font-semibold text-sm">
              Recent Reports
            </h3>

            {recentReports.length > 0 && (
              <Badge variant="secondary" className="text-xs h-5">
                {recentReports.length}
              </Badge>
            )}
          </div>

          <Link to="/admin/manage-reports">
            <Button
              variant="ghost"
              size="sm"
              className="text-accent hover:text-accent hover:bg-accent/10 gap-1 text-xs"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

        </div>

        {recentReports.length === 0 ? (

          <div className="py-12 text-center">
            <FileText className="h-7 w-7 text-muted-foreground mx-auto mb-3" />

            <p className="text-sm font-medium">
              No reports yet
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              Uploaded reports will appear here.
            </p>
          </div>

        ) : (

          <div className="divide-y divide-border">

            {recentReports.map(report => (
              <div
                key={report.id}
                className="flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-muted/30 transition-colors group"
              >

                <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-accent" />
                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-sm font-medium truncate">
                    {report.document_name}
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <Badge
                      variant={
                        report.report_type === 'daily'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-[10px] h-4 capitalize"
                    >
                      {report.report_type}
                    </Badge>

                    <span className="text-xs text-muted-foreground">
                      {formatDate(report.created_at)}
                    </span>

                  </div>
                </div>

                <a
                  href={report.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-medium text-accent opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">View</span>
                </a>

              </div>
            ))}

          </div>
        )}

      </div>

    </AdminLayout>
  );
}


/* ─────────────────────────────────────────────
   Small Components
───────────────────────────────────────────── */

function SectionTitle({ title, noMargin = false }) {
  return (
    <p
      className={`text-xs font-semibold text-muted-foreground uppercase tracking-widest ${
        noMargin ? '' : 'mb-3'
      }`}
    >
      {title}
    </p>
  );
}


function OverviewItem({
  icon: Icon,
  number,
  title,
  subtitle,
  link,
}) {
  return (
    <Link
      to={link}
      className="group p-5 sm:p-6 hover:bg-muted/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-3xl font-bold tracking-tight">
            {number}
          </p>

          <p className="text-sm font-semibold mt-1">
            {title}
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        </div>

        <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent" />
        </div>

      </div>
    </Link>
  );
}


function ActivityRow({
  icon: Icon,
  title,
  stats,
  link,
}) {
  return (
    <Link
      to={link}
      className="flex flex-col lg:flex-row lg:items-center gap-4 px-5 sm:px-6 py-4 hover:bg-muted/30 transition-colors group"
    >

      <div className="flex items-center gap-3 lg:w-40 shrink-0">

        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-accent" />
        </div>

        <span className="text-sm font-semibold">
          {title}
        </span>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 flex-1">

        <StatusItem
          label="Pending"
          value={stats.pending}
          dot="bg-amber-500"
        />

        <StatusItem
          label="In Process"
          value={stats.inProcess}
          dot="bg-blue-500"
        />

        <StatusItem
          label="Closed"
          value={stats.closed}
          dot="bg-green-500"
        />

        <StatusItem
          label="Rejected"
          value={stats.rejected}
          dot="bg-red-500"
        />

      </div>

      <ArrowRight className="hidden lg:block h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />

    </Link>
  );
}


function StatusItem({ label, value, dot }) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />

        <span className="text-[11px] text-muted-foreground">
          {label}
        </span>
      </div>

      <p className="text-sm font-bold mt-0.5 ml-3">
        {value}
      </p>
    </div>
  );
}


function QuickLink({
  icon: Icon,
  title,
  link,
}) {
  return (
    <Link
      to={link}
      className="group flex items-center gap-3 px-4 py-3.5 border-b sm:border border-border sm:rounded-xl hover:bg-muted/40 hover:border-accent/30 transition-all"
    >

      <Icon className="h-4 w-4 text-accent shrink-0" />

      <span className="text-sm font-medium flex-1">
        {title}
      </span>

      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />

    </Link>
  );
}


export default AdminDashboard;