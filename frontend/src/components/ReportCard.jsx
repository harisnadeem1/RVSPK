
import React from 'react';
import { Download, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ReportCard({ title, date, category, description, downloadUrl, featured = false }) {
  return (
    <div className={`card-container professional-card ${featured ? 'border-2 border-accent' : ''}`}>
      <div className="card-content-grow">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className="border-accent/30 text-accent">
            <Tag className="h-3 w-3 mr-1" />
            {category}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
      </div>

      <div className="card-footer-bottom">
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>
    </div>
  );
}

export default ReportCard;
