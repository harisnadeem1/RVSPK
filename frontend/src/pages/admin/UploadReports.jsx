import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Info } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import ReportForm from '@/components/admin/ReportForm.jsx';

function UploadReports() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => navigate('/admin/manage-reports'), 1500);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Upload className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                Upload Report
              </h2>
              <p className="text-sm text-muted-foreground">
                Add a new daily or monthly report to the system
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Card Header stripe */}
          <div className="h-1 w-full bg-gradient-to-r from-accent/60 via-accent to-accent/60" />
          <div className="p-5 sm:p-8">
            <ReportForm mode="create" onSuccess={handleSuccess} />
          </div>
        </div>

        {/* Guidelines */}
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-accent flex-shrink-0" />
            <h3 className="text-sm font-semibold text-foreground">Upload Guidelines</h3>
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {[
              'Only PDF files are accepted (max 20MB)',
              'Document name will auto-fill from filename if left empty',
              'Daily reports require a specific date',
              'Monthly reports require month and year selection',
              'Tag text defaults to "PMEX Report" but can be customized',
            ].map((guideline, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                {guideline}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </AdminLayout>
  );
}

export default UploadReports;