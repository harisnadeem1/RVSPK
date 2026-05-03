import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Upload, BarChart3, Calendar,
  ArrowRight, Clock, Eye, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import StatsCard from '@/components/StatsCard.jsx';
import { format } from 'date-fns';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const { authFetch, admin } = useAdminAuth();
  const [stats, setStats] = useState({ total: 0, daily: 0, monthly: 0 });
  const [recentReports, setRecentReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [allRes, recentRes] = await Promise.all([
        authFetch(`${API_URL}/api/reports?limit=1000`),
        authFetch(`${API_URL}/api/reports?limit=5`),
      ]);

      if (!allRes || !recentRes) return;

      const allData    = await allRes.json();
      const recentData = await recentRes.json();

      if (!allRes.ok) {
        setError(allData.error || 'Failed to load dashboard data');
        return;
      }

      const allReports = allData.reports || [];
      setStats({
        total:   allReports.length,
        daily:   allReports.filter(r => r.report_type === 'daily').length,
        monthly: allReports.filter(r => r.report_type === 'monthly').length,
      });
      setRecentReports(recentData.reports || []);
      setError(null);
    } catch (err) {
      console.error('fetchDashboardData error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try { return format(new Date(dateString), 'MMM dd, yyyy'); }
    catch { return dateString; }
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
            <p className="text-muted-foreground text-sm">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 text-center max-w-md w-full">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-destructive font-medium mb-4">{error}</p>
            <Button onClick={fetchDashboardData} variant="outline">Retry</Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* ── Welcome Banner ───────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-secondary p-6 sm:p-8 mb-6 sm:mb-8">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-14 right-[20%] h-56 w-56 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left text */}
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">
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

          {/* Right badge */}
          <div className="flex-shrink-0 flex items-center gap-2 self-start sm:self-auto">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
              ${isSuperAdmin
                ? 'bg-amber-400/20 border border-amber-400/30 text-amber-300'
                : 'bg-white/10 border border-white/20 text-white/80'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {isSuperAdmin ? 'Super Admin' : 'Admin'}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
        <StatsCard
          icon={FileText}
          number={stats.total}
          label="Total Reports"
          description="All uploaded reports"
        />
        <StatsCard
          icon={Calendar}
          number={stats.daily}
          label="Daily Reports"
          description="Daily market reports"
        />
        <StatsCard
          icon={BarChart3}
          number={stats.monthly}
          label="Monthly Reports"
          description="Monthly analysis reports"
        />
      </div>

      {/* ── Quick Actions ─────────────────────────────────────── */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Quick Actions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Link to="/admin/upload-reports" className="group">
            <div className="relative overflow-hidden bg-card rounded-xl p-5 border border-border
              hover:border-accent/50 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 bg-accent/10 rounded-xl flex items-center justify-center
                  group-hover:bg-accent transition-colors duration-200 flex-shrink-0">
                  <Upload className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">Upload Reports</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    Add new daily or monthly reports
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent
                  group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300" />
            </div>
          </Link>

          <Link to="/admin/manage-reports" className="group">
            <div className="relative overflow-hidden bg-card rounded-xl p-5 border border-border
              hover:border-accent/50 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 bg-accent/10 rounded-xl flex items-center justify-center
                  group-hover:bg-accent transition-colors duration-200 flex-shrink-0">
                  <FileText className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">Manage Reports</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    View, edit, and delete reports
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent
                  group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300" />
            </div>
          </Link>
        </div>
      </div>

      {/* ── Recent Uploads ────────────────────────────────────── */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent flex-shrink-0" />
            <h3 className="font-semibold text-foreground text-sm">Recent Uploads</h3>
            {recentReports.length > 0 && (
              <Badge variant="secondary" className="text-xs h-5">
                {recentReports.length}
              </Badge>
            )}
          </div>
          <Link to="/admin/manage-reports">
            <Button variant="ghost" size="sm"
              className="text-accent hover:text-accent hover:bg-accent/10 gap-1.5 text-xs h-8">
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Body */}
        {recentReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <FileText className="h-7 w-7 text-muted-foreground" />
            </div>
            <h4 className="font-semibold text-foreground mb-1 text-sm">No reports yet</h4>
            <p className="text-xs text-muted-foreground mb-5 max-w-xs">
              Upload your first report to start tracking market data.
            </p>
            <Link to="/admin/upload-reports">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Upload First Report
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-3.5
                  hover:bg-muted/40 transition-colors group"
              >
                {/* Icon */}
                <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center
                  justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-accent" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {report.document_name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <Badge
                      variant={report.report_type === 'daily' ? 'default' : 'secondary'}
                      className="text-[10px] px-1.5 h-4 capitalize"
                    >
                      {report.report_type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(report.created_at)}
                    </span>
                    {report.tag_text && (
                      <span className="text-xs text-muted-foreground/50 hidden sm:inline truncate max-w-[100px]">
                        · {report.tag_text}
                      </span>
                    )}
                  </div>
                </div>

                {/* View PDF */}
                <a
                  href={report.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-1 text-xs font-medium
                    text-accent opacity-0 group-hover:opacity-100 transition-opacity
                    hover:underline underline-offset-2 whitespace-nowrap"
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

export default AdminDashboard;