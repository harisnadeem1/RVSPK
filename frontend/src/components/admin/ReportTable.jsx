
import React from 'react';
import { Eye, Edit, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import pb from '@/lib/pocketbaseClient.js';

function ReportTable({ reports, onEdit, onDelete }) {
  const handleView = (report) => {
    if (report.pdfFile) {
      const url = pb.files.getUrl(report, report.pdfFile);
      window.open(url, '_blank');
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

  return (
    <div className="overflow-x-auto">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Type</th>
            <th>Tag</th>
            <th>Date/Month</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="font-medium">{report.documentName}</td>
              <td>
                <Badge variant={report.reportType === 'daily' ? 'default' : 'secondary'}>
                  {report.reportType}
                </Badge>
              </td>
              <td className="text-sm text-muted-foreground">{report.tagText || 'N/A'}</td>
              <td className="text-sm">
                {report.reportType === 'daily' 
                  ? formatDate(report.reportDate)
                  : report.reportMonth || 'N/A'}
              </td>
              <td className="text-sm text-muted-foreground">
                {formatDate(report.uploadDate)}
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleView(report)}
                    title="View PDF"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(report)}
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(report)}
                    className="text-destructive hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
