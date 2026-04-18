
import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Upload } from 'lucide-react';
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
import pb from '@/lib/pocketbaseClient.js';

function ManageReports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingReport, setEditingReport] = useState(null);
  const [deletingReport, setDeletingReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchQuery, filterType]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const result = await pb.collection('reports').getList(1, 100, {
        sort: '-created',
        $autoCancel: false
      });
      setReports(result.items);
      setError(null);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports');
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(r => r.reportType === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.documentName?.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query) ||
        r.tagText?.toLowerCase().includes(query)
      );
    }

    setFilteredReports(filtered);
  };

  const handleEdit = (report) => {
    setEditingReport(report);
  };

  const handleDelete = (report) => {
    setDeletingReport(report);
  };

  const confirmDelete = async () => {
    if (!deletingReport) return;

    try {
      await pb.collection('reports').delete(deletingReport.id, { $autoCancel: false });
      toast.success('Report deleted successfully');
      fetchReports();
      setDeletingReport(null);
    } catch (err) {
      console.error('Error deleting report:', err);
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
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading reports...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Manage Reports</h2>
              <p className="text-muted-foreground">View, edit, and delete reports</p>
            </div>
          </div>
          <Link to="/admin/upload-reports">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, description, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="daily">Daily Reports</SelectItem>
              <SelectItem value="monthly">Monthly Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reports Display */}
      {error ? (
        <div className="bg-destructive/10 border border-destructive rounded-xl p-6 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchReports}>Retry</Button>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-card rounded-xl p-12 border border-border text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {reports.length === 0 ? 'No reports yet' : 'No reports found'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {reports.length === 0 
              ? 'Upload your first report to get started'
              : 'Try adjusting your search or filter criteria'}
          </p>
          {reports.length === 0 && (
            <Link to="/admin/upload-reports">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Report
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-card rounded-xl border border-border overflow-hidden">
            <ReportTable
              reports={filteredReports}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Showing {filteredReports.length} of {reports.length} reports
          </div>
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingReport} onOpenChange={() => setEditingReport(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Report</DialogTitle>
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

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={!!deletingReport}
        onClose={() => setDeletingReport(null)}
        onConfirm={confirmDelete}
        reportName={deletingReport?.documentName || ''}
      />
    </AdminLayout>
  );
}

export default ManageReports;
