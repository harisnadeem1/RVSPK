
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, BarChart3, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import StatsCard from '@/components/StatsCard.jsx';
import { format } from 'date-fns';
import pb from '@/lib/pocketbaseClient.js';

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    daily: 0,
    monthly: 0
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
      
      // Fetch all reports for stats
      const allReports = await pb.collection('reports').getFullList({ $autoCancel: false });
      
      // Calculate stats
      const dailyCount = allReports.filter(r => r.reportType === 'daily').length;
      const monthlyCount = allReports.filter(r => r.reportType === 'monthly').length;
      
      setStats({
        total: allReports.length,
        daily: dailyCount,
        monthly: monthlyCount
      });

      // Fetch recent 5 reports
      const recent = await pb.collection('reports').getList(1, 5, {
        sort: '-created',
        $autoCancel: false
      });
      
      setRecentReports(recent.items);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
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

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-destructive/10 border border-destructive rounded-xl p-6 text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={fetchDashboardData} className="mt-4">
            Retry
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 mb-8 text-primary-foreground">
        <h2 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-primary-foreground/90 text-lg">
          Manage your reports and monitor system activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/admin/upload-reports">
          <div className="bg-card rounded-xl p-6 border border-border hover:border-accent transition-colors group">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Upload className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">Upload Reports</h3>
                <p className="text-sm text-muted-foreground">Add new daily or monthly reports</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </div>
        </Link>

        <Link to="/admin/manage-reports">
          <div className="bg-card rounded-xl p-6 border border-border hover:border-accent transition-colors group">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <FileText className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">Manage Reports</h3>
                <p className="text-sm text-muted-foreground">View, edit, and delete reports</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Uploads */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Recent Uploads</h3>
          <Link to="/admin/manage-reports">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {recentReports.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No reports uploaded yet</p>
            <Link to="/admin/upload-reports">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Upload Your First Report
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{report.documentName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {report.reportType} • {formatDate(report.uploadDate)}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {report.tagText || 'PMEX Report'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
