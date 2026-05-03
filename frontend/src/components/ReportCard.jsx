import React from 'react';
import { Download, Calendar, Tag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

function ReportCard({ report }) {
  const formatDisplayDate = () => {
    if (!report) return '';
    try {
      if (report.report_type === 'daily' && report.report_date)
        return format(new Date(report.report_date), 'MMM dd, yyyy');
      if (report.report_type === 'monthly' && report.report_month)
        return format(new Date(report.report_month + '-01'), 'MMMM yyyy');
      if (report.created_at)
        return format(new Date(report.created_at), 'MMM dd, yyyy');
    } catch { return ''; }
    return '';
  };

  return (
    <div className="card-container professional-card flex flex-col h-full group
      hover:border-accent/40 transition-all duration-300">

      <div className="flex-1 flex flex-col">

        {/* Top meta row */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <Badge variant="outline" className="border-accent/30 text-accent flex-shrink-0">
            <Tag className="h-3 w-3 mr-1" />
            {report.tag_text || 'PMEX Report'}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDisplayDate()}</span>
          </div>
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center
            justify-center flex-shrink-0
            group-hover:bg-accent transition-colors duration-300">
            <FileText className="h-5 w-5 text-accent
              group-hover:text-accent-foreground transition-colors duration-300" />
          </div>
          <h3 className="text-lg font-semibold text-foreground leading-snug
            group-hover:text-accent transition-colors duration-200 line-clamp-2">
            {report.document_name}
          </h3>
        </div>

        {/* Description */}
        {report.description ? (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
            {report.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        {/* Type badge */}
        <Badge
          variant={report.report_type === 'daily' ? 'default' : 'secondary'}
          className="text-[10px] uppercase tracking-wider capitalize w-fit mb-4"
        >
          {report.report_type} report
        </Badge>
      </div>

      {/* Download CTA */}
      <div className="pt-4 border-t border-border/60">
        <a href={report.file_url} target="_blank" rel="noopener noreferrer">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </a>
      </div>
    </div>
  );
}

export default ReportCard;