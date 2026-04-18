
import React from 'react';
import { Eye, Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import pb from '@/lib/pocketbaseClient.js';

function ReportCard({ report, onEdit, onDelete }) {
  const handleView = () => {
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
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-start justify-between mb-4">
        <Badge variant={report.reportType === 'daily' ? 'default' : 'secondary'}>
          {report.reportType}
        </Badge>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleView}
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
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">
        {report.documentName}
      </h3>

      {report.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {report.description}
        </p>
      )}

      <div className="space-y-2 text-sm">
        {report.tagText && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span>{report.tagText}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {report.reportType === 'daily' 
              ? formatDate(report.reportDate)
              : report.reportMonth || 'N/A'}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Uploaded: {formatDate(report.uploadDate)}
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
