import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ReportCard from '@/components/ReportCard.jsx';

const API_URL = import.meta.env.VITE_API_URL;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function SkeletonCard() {
  return (
    <div className="card-container professional-card animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-5 w-24 bg-muted rounded-full" />
        <div className="h-4 w-20 bg-muted rounded-full" />
      </div>
      <div className="flex gap-3 mb-3">
        <div className="h-10 w-10 bg-muted rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-full bg-muted rounded-lg" />
          <div className="h-4 w-3/4 bg-muted rounded-lg" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-5/6 bg-muted rounded" />
        <div className="h-3 w-4/6 bg-muted rounded" />
      </div>
      <div className="h-5 w-20 bg-muted rounded-full mb-4" />
      <div className="pt-4 border-t border-border/60">
        <div className="h-9 w-full bg-muted rounded-lg" />
      </div>
    </div>
  );
}

function ReportsList({
  limit,
  reportType,
  showFilters = false,
  columns = 3,
  emptyMessage = 'No reports available at the moment.',
}) {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState(reportType || 'all');

  useEffect(() => { fetchReports(); }, []);

  // ✅ FIX: reset both search and typeFilter when parent switches tab
  useEffect(() => {
    setTypeFilter(reportType || 'all');
    setSearchQuery('');
  }, [reportType]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.set('limit', limit ? String(limit * 4) : '200');
      if (reportType) params.set('type', reportType);

      const res = await fetch(`${API_URL}/api/reports?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setReports(data.reports || []);
      setError(null);
    } catch (err) {
      console.error('ReportsList fetch error:', err);
      setError('Failed to load reports. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FIX: helper so clearing search also re-syncs typeFilter
  const clearSearch = () => {
    setSearchQuery('');
    setTypeFilter(reportType || 'all');
  };

  const filteredReports = reports
    .filter(r => {
      if (typeFilter !== 'all' && r.report_type !== typeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          r.document_name?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.tag_text?.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .slice(0, limit || undefined);

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  if (isLoading) {
    return (
      <div className={`grid ${gridClass} gap-8`}>
        {Array.from({ length: limit || 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 text-center">
        <p className="text-destructive text-sm mb-3">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchReports}>Try Again</Button>
      </div>
    );
  }

  return (
    <div>
      {/* ── Filter Bar ──────────────────────────────────────── */}
      {showFilters && (
        <div className="mb-8 bg-card rounded-2xl border border-border p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}  // ✅ FIX
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            {!reportType && (
              <Select value={typeFilter} onValueChange={setTypeFilter}>
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
            )}
          </div>

          {searchQuery && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-muted-foreground">Searching:</span>
              <span className="inline-flex items-center gap-1 text-xs bg-accent/10
                text-accent px-2 py-0.5 rounded-full border border-accent/20">
                "{searchQuery}"
                <button onClick={clearSearch}>  {/* ✅ FIX */}
                  <X className="h-3 w-3" />
                </button>
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Empty ───────────────────────────────────────────── */}
      {filteredReports.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <FileText className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">{emptyMessage}</p>
          {searchQuery && (
            <Button variant="outline" size="sm" className="mt-4"
              onClick={clearSearch}>  {/* ✅ FIX */}
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <>
          <motion.div
  key={filteredReports.length}
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className={`grid ${gridClass} gap-8`}
>
            {filteredReports.map((report) => (
              <motion.div key={report.id} variants={itemVariants} className="h-full">
                <ReportCard report={report} />
              </motion.div>
            ))}
          </motion.div>

          {showFilters && (
            <p className="text-xs text-muted-foreground text-center mt-6">
              Showing{' '}
              <span className="font-semibold text-foreground">{filteredReports.length}</span>{' '}
              report{filteredReports.length !== 1 ? 's' : ''}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default ReportsList;