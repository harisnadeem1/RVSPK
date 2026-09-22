import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ReportCard from '@/components/ReportCard.jsx';

const API_URL = import.meta.env.VITE_API_URL;

const REPORTS_PER_PAGE = 7;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchReports();
  }, [reportType]);

  // Reset filters + page when Daily/Monthly tab changes
  useEffect(() => {
    setTypeFilter(reportType || 'all');
    setSearchQuery('');
    setCurrentPage(1);
  }, [reportType]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();

      // Fetch enough reports for client-side pagination
      params.set('limit', '500');

      if (reportType) {
        params.set('type', reportType);
      }

      const res = await fetch(
        `${API_URL}/api/reports?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await res.json();

      setReports(data.reports || []);
      setError(null);
    } catch (err) {
      console.error('ReportsList fetch error:', err);

      setError(
        'Failed to load reports. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setTypeFilter(reportType || 'all');
    setCurrentPage(1);
  };

  // Reset to page 1 whenever filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);

  // ─────────────────────────────────────────────
  // FILTER REPORTS
  // ─────────────────────────────────────────────

  const filteredReports = reports.filter((report) => {
    if (
      typeFilter !== 'all' &&
      report.report_type !== typeFilter
    ) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      return (
        report.document_name?.toLowerCase().includes(q) ||
        report.description?.toLowerCase().includes(q) ||
        report.tag_text?.toLowerCase().includes(q)
      );
    }

    return true;
  });

  // ─────────────────────────────────────────────
  // PAGINATION
  // ─────────────────────────────────────────────

  const totalPages = Math.ceil(
    filteredReports.length / REPORTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * REPORTS_PER_PAGE;

  const endIndex =
    startIndex + REPORTS_PER_PAGE;

  const paginatedReports = filteredReports.slice(
    startIndex,
    endIndex
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    // Smoothly move user back toward reports
    window.scrollTo({
      top: window.scrollY - 250,
      behavior: 'smooth',
    });
  };

  // Create page numbers
  const getPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  const gridClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    }[columns] ||
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  // ─────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className={`grid ${gridClass} gap-8`}>
        {Array.from({
          length: REPORTS_PER_PAGE,
        }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // ERROR
  // ─────────────────────────────────────────────

  if (error) {
    return (
      <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 text-center">
        <p className="text-destructive text-sm mb-3">
          {error}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchReports}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* ───────────── FILTER BAR ───────────── */}

      {showFilters && (
        <div className="mb-8 bg-card rounded-2xl border border-border p-4">
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  h-4 w-4
                  text-muted-foreground
                "
              />

              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="pl-9 h-9"
              />

              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="
                    absolute right-3 top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                    hover:text-foreground
                  "
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Report type */}
            {!reportType && (
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-full sm:w-44 h-9">
                  <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All Reports
                  </SelectItem>

                  <SelectItem value="daily">
                    Daily Reports
                  </SelectItem>

                  <SelectItem value="monthly">
                    Monthly Reports
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Search badge */}

          {searchQuery && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-muted-foreground">
                Searching:
              </span>

              <span
                className="
                  inline-flex items-center gap-1
                  text-xs
                  bg-accent/10
                  text-accent
                  px-2 py-0.5
                  rounded-full
                  border border-accent/20
                "
              >
                "{searchQuery}"

                <button onClick={clearSearch}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            </div>
          )}
        </div>
      )}

      {/* ───────────── EMPTY ───────────── */}

      {filteredReports.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">

          <div
            className="
              h-14 w-14
              rounded-2xl
              bg-muted
              flex items-center justify-center
              mx-auto mb-4
            "
          >
            <FileText className="h-7 w-7 text-muted-foreground" />
          </div>

          <p className="text-muted-foreground text-sm">
            {emptyMessage}
          </p>

          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={clearSearch}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* ───────────── REPORTS ───────────── */}

          <motion.div
            key={`${currentPage}-${reportType}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid ${gridClass} gap-8`}
          >
            {paginatedReports.map((report) => (
              <motion.div
                key={report.id}
                variants={itemVariants}
                className="h-full"
              >
                <ReportCard report={report} />
              </motion.div>
            ))}
          </motion.div>

          {/* ───────────── PAGINATION ───────────── */}

          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

              {/* Previous */}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() =>
                  goToPage(currentPage - 1)
                }
                className="h-9 px-3"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              {/* Page Numbers */}
              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  size="sm"
                  variant={
                    currentPage === page
                      ? 'default'
                      : 'outline'
                  }
                  onClick={() => goToPage(page)}
                  className={
                    currentPage === page
                      ? `
                        h-9 min-w-9
                        bg-[#79AD14]
                        text-white
                        hover:bg-[#5E8410]
                      `
                      : `
                        h-9 min-w-9
                        hover:border-[#79AD14]
                        hover:text-[#79AD14]
                      `
                  }
                >
                  {page}
                </Button>
              ))}

              {/* Next */}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  goToPage(currentPage + 1)
                }
                className="h-9 px-3"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>

            </div>
          )}

          {/* ───────────── RESULT INFO ───────────── */}

          {showFilters && (
            <p className="mt-5 text-center text-xs text-muted-foreground">
              Showing{' '}
              <span className="font-semibold text-foreground">
                {startIndex + 1}
              </span>
              {' – '}
              <span className="font-semibold text-foreground">
                {Math.min(
                  endIndex,
                  filteredReports.length
                )}
              </span>
              {' of '}
              <span className="font-semibold text-foreground">
                {filteredReports.length}
              </span>{' '}
              reports
            </p>
          )}

        </>
      )}
    </div>
  );
}

export default ReportsList;