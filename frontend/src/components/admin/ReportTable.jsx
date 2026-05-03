import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

function ReportTable({ reports, onEdit, onDelete }) {
  const handleView = (report) => {
    if (report.file_url) window.open(report.file_url, '_blank');
  };

  const formatDate = (d) => {
    if (!d) return 'N/A';
    try { return format(new Date(d), 'MMM dd, yyyy'); }
    catch { return d; }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase
              tracking-wider px-5 py-3.5">
              Document
            </th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase
              tracking-wider px-4 py-3.5">
              Type
            </th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase
              tracking-wider px-4 py-3.5 hidden lg:table-cell">
              Tag
            </th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase
              tracking-wider px-4 py-3.5">
              Date / Month
            </th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase
              tracking-wider px-4 py-3.5 hidden lg:table-cell">
              Uploaded
            </th>
            <th className="text-right text-xs font-semibold text-muted-foreground uppercase
              tracking-wider px-5 py-3.5">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {reports.map((report) => (
            <tr key={report.id} className="hover:bg-muted/30 transition-colors group">

              {/* Document Name */}
              <td className="px-5 py-4">
                <p className="font-medium text-foreground truncate max-w-[200px]">
                  {report.document_name}
                </p>
                {report.description && (
                  <p className="text-xs text-muted-foreground truncate max-w-[200px] mt-0.5">
                    {report.description}
                  </p>
                )}
              </td>

              {/* Type Badge */}
              <td className="px-4 py-4">
                <Badge
                  variant={report.report_type === 'daily' ? 'default' : 'secondary'}
                  className="capitalize text-xs"
                >
                  {report.report_type}
                </Badge>
              </td>

              {/* Tag */}
              <td className="px-4 py-4 hidden lg:table-cell">
                <span className="text-xs text-muted-foreground">
                  {report.tag_text || '—'}
                </span>
              </td>

              {/* Date */}
              <td className="px-4 py-4">
                <span className="text-sm text-foreground">
                  {report.report_type === 'daily'
                    ? formatDate(report.report_date)
                    : report.report_month || 'N/A'}
                </span>
              </td>

              {/* Upload date */}
              <td className="px-4 py-4 hidden lg:table-cell">
                <span className="text-xs text-muted-foreground">
                  {formatDate(report.created_at)}
                </span>
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    size="sm" variant="ghost"
                    onClick={() => handleView(report)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-accent
                      opacity-0 group-hover:opacity-100 transition-all"
                    title="View PDF"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm" variant="ghost"
                    onClick={() => onEdit(report)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground
                      opacity-0 group-hover:opacity-100 transition-all"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm" variant="ghost"
                    onClick={() => onDelete(report)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive
                      hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
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