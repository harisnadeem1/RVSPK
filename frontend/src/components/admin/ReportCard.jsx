import React from 'react';
import { Eye, Edit, Trash2, Calendar, Tag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

function ReportCard({ report, onEdit, onDelete }) {
  const handleView = () => {
    if (report.file_url) window.open(report.file_url, '_blank');
  };

  const formatDate = (d) => {
    if (!d) return 'N/A';
    try { return format(new Date(d), 'MMM dd, yyyy'); }
    catch { return d; }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden
      hover:border-accent/30 hover:shadow-sm transition-all duration-200">

      {/* Card top */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center
            justify-center flex-shrink-0">
            <FileText className="h-4 w-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate leading-tight">
              {report.document_name}
            </p>
            <Badge
              variant={report.report_type === 'daily' ? 'default' : 'secondary'}
              className="text-[10px] px-1.5 h-4 mt-1 capitalize"
            >
              {report.report_type}
            </Badge>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          <Button size="sm" variant="ghost"
            onClick={handleView}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-accent"
            title="View PDF"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost"
            onClick={() => onEdit(report)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            title="Edit"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost"
            onClick={() => onDelete(report)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 py-3 space-y-2">
        {report.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {report.description}
          </p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {report.tag_text && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Tag className="h-3 w-3 flex-shrink-0" />
              <span className="truncate max-w-[120px]">{report.tag_text}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span>
              {report.report_type === 'daily'
                ? formatDate(report.report_date)
                : report.report_month || 'N/A'}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground/60">
          Uploaded {formatDate(report.created_at)}
        </p>
      </div>
    </div>
  );
}

export default ReportCard;