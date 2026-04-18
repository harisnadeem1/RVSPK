
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import ReportForm from '@/components/admin/ReportForm.jsx';

function UploadReports() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Optionally navigate to manage reports after successful upload
    setTimeout(() => {
      navigate('/admin/manage-reports');
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Upload className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Upload Reports</h2>
              <p className="text-muted-foreground">Add new daily or monthly reports to the system</p>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-card rounded-xl p-8 border border-border">
          <ReportForm mode="create" onSuccess={handleSuccess} />
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-accent/5 border border-accent/20 rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-2">Upload Guidelines</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Only PDF files are accepted (max 20MB)</li>
            <li>• Document name will auto-fill from filename if left empty</li>
            <li>• Daily reports require a specific date</li>
            <li>• Monthly reports require month and year selection</li>
            <li>• Tag text defaults to "PMEX Report" but can be customized</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UploadReports;
