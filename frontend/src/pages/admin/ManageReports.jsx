import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import ReportTable from '@/components/admin/ReportTable.jsx';
import ReportCard from '@/components/admin/ReportCard.jsx';
import ReportForm from '@/components/admin/ReportForm.jsx';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation.jsx';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function ManageReports() {
  const { authFetch } = useAdminAuth();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingReport, setEditingReport] = useState(null);
  const [deletingReport, setDeletingReport] = useState(null);

  useEffect(() => { fetchReports(); }, []);
  useEffect(() => { filterReports(); }, [reports, searchQuery, filterType]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const res = await authFetch(`${API_URL}/api/reports?limit=100`);
      if (!res) return;
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to load reports');
        toast.error(data.error || 'Failed to load reports');
        return;
      }
      setReports(data.reports);
      setError(null);
    } catch (err) {
      console.error('fetchReports error:', err);
      setError('Failed to load reports');
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];
    if (filterType !== 'all')
      filtered = filtered.filter(r => r.report_type === filterType);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.document_name?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.tag_text?.toLowerCase().includes(q)
      );
    }
    setFilteredReports(filtered);
  };

  const confirmDelete = async () => {
    if (!deletingReport) return;
    try {
      const res = await authFetch(`${API_URL}/api/reports/${deletingReport.id}`, { method: 'DELETE' });
      if (!res) return;
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Failed to delete report'); return; }
      toast.success('Report deleted successfully');
      setDeletingReport(null);
      fetchReports();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete report');
    }
  };

  const handleEditSuccess = () => {
    setEditingReport(null);
    fetchReports();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
              <div className="animate-spin rounded-full h-7 w-7 border-2 border-accent border-t-transparent" />
            </div>
            <p className="text-muted-foreground text-sm">Loading reports...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* ── Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
              Manage Reports
            </h2>
            <p className="text-sm text-muted-foreground">View, edit, and delete reports</p>
          </div>
        </div>
        <Link to="/admin/upload-reports" className="sm:flex-shrink-0">
          <Button className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            <Upload className="h-4 w-4" />
            Upload New
          </Button>
        </Link>
      </div>

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <div className="bg-card rounded-2xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, description, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-44 h-9">
              <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="daily">Daily Reports</SelectItem>
              <SelectItem value="monthly">Monthly Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active filter chips */}
        {(searchQuery || filterType !== 'all') && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {filterType !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent
                px-2 py-0.5 rounded-full border border-accent/20">
                {filterType}
                <button onClick={() => setFilterType('all')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent
                px-2 py-0.5 rounded-full border border-accent/20">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      {error ? (
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 text-center">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-6 w-6 text-destructive" />
          </div>
          <p className="text-destructive font-medium mb-4">{error}</p>
          <Button onClick={fetchReports} variant="outline" size="sm">Retry</Button>
        </div>

      ) : filteredReports.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 sm:p-16 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {reports.length === 0 ? 'No reports yet' : 'No results found'}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
            {reports.length === 0
              ? 'Upload your first report to get started'
              : 'Try adjusting your search or filter criteria'}
          </p>
          {reports.length === 0 && (
            <Link to="/admin/upload-reports">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Report
              </Button>
            </Link>
          )}
        </div>

      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
            <ReportTable
              reports={filteredReports}
              onEdit={setEditingReport}
              onDelete={setDeletingReport}
            />
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onEdit={setEditingReport}
                onDelete={setDeletingReport}
              />
            ))}
          </div>

          {/* Count */}
          <p className="mt-4 text-xs text-muted-foreground text-center">
            Showing <span className="font-semibold text-foreground">{filteredReports.length}</span> of{' '}
            <span className="font-semibold text-foreground">{reports.length}</span> reports
          </p>
        </>
      )}

      {/* ── Edit Dialog ───────────────────────────────────────── */}
      <Dialog open={!!editingReport} onOpenChange={() => setEditingReport(null)}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-accent" />
              Edit Report
            </DialogTitle>
          </DialogHeader>
          {editingReport && (
            <ReportForm
              mode="edit"
              initialData={editingReport}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ── Delete Dialog ─────────────────────────────────────── */}
      <DeleteConfirmation
        isOpen={!!deletingReport}
        onClose={() => setDeletingReport(null)}
        onConfirm={confirmDelete}
        reportName={deletingReport?.document_name || ''}
      />

    </AdminLayout>
  );
}

export default ManageReports;