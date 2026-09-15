import React, { useEffect, useMemo, useState } from 'react';

import {
  CalendarDays,
  Search,
  RefreshCw,
  Mail,
  Phone,
  UserRound,
  Clock,
  MessageSquare,
  MapPin,
  Briefcase,
  FileDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Settings,
  X,
  CheckCircle2,
  UserCheck,
  Loader2,
} from 'lucide-react';

import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_URL = import.meta.env.VITE_API_URL;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const STATUS_OPTIONS = [
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'in_process',
    label: 'In Process',
  },
  {
    value: 'closed',
    label: 'Closed',
  },
  {
    value: 'rejected',
    label: 'Rejected',
  },
];

const getStatusLabel = (status) => {
  const option = STATUS_OPTIONS.find(
    (item) => item.value === status
  );

  return option?.label || status || 'Pending';
};

const getStatusClasses = (status) => {
  switch (status) {
    case 'in_process':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20';

    case 'closed':
      return 'bg-green-500/10 text-green-600 border-green-500/20';

    case 'rejected':
      return 'bg-red-500/10 text-red-600 border-red-500/20';

    case 'pending':
    default:
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
  }
};

function Bookings() {
  const { authFetch } = useAdminAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  const [selectedMonth, setSelectedMonth] =
    useState('all');

  const [selectedYear, setSelectedYear] =
    useState('all');

  const [selectedStatus, setSelectedStatus] =
    useState('all');

  const [sortBy, setSortBy] =
    useState('newest');

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage, setItemsPerPage] =
    useState(10);

  // Manage Modal
  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [editStatus, setEditStatus] =
    useState('pending');

  const [adminComment, setAdminComment] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const [saveError, setSaveError] =
    useState('');

  const [saveSuccess, setSaveSuccess] =
    useState('');

  // ─────────────────────────────────────────────
  // Fetch Bookings
  // ─────────────────────────────────────────────

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await authFetch(
        `${API_URL}/api/bookings`
      );

      if (!response) return;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to fetch bookings'
        );
      }

      setBookings(data.bookings || []);

    } catch (error) {
      console.error(
        'Fetch bookings error:',
        error
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ─────────────────────────────────────────────
  // Manage Modal
  // ─────────────────────────────────────────────

  const openManageModal = (booking) => {
    setSelectedBooking(booking);

    setEditStatus(
      booking.status || 'pending'
    );

    setAdminComment(
      booking.admin_comment || ''
    );

    setSaveError('');
    setSaveSuccess('');
  };

  const closeManageModal = () => {
    if (saving) return;

    setSelectedBooking(null);
    setEditStatus('pending');
    setAdminComment('');
    setSaveError('');
    setSaveSuccess('');
  };

  const handleSaveChanges = async () => {
    if (!selectedBooking) return;

    try {
      setSaving(true);
      setSaveError('');
      setSaveSuccess('');

      const response = await authFetch(
        `${API_URL}/api/bookings/${selectedBooking.id}/status`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            status: editStatus,
            comment: adminComment,
          }),
        }
      );

      if (!response) {
        throw new Error(
          'No response received from server'
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to update booking'
        );
      }

      setSaveSuccess(
        'Booking updated successfully.'
      );

      await fetchBookings();

      setTimeout(() => {
        setSelectedBooking(null);
        setSaveSuccess('');
      }, 700);

    } catch (error) {
      console.error(
        'Update booking error:',
        error
      );

      setSaveError(
        error.message ||
        'Failed to update booking'
      );

    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────
  // Available Years
  // ─────────────────────────────────────────────

  const availableYears = useMemo(() => {
    const years = bookings
      .map((booking) => {
        const date = new Date(
          booking.created_at
        );

        return date.getFullYear();
      })
      .filter((year) =>
        !Number.isNaN(year)
      );

    return [...new Set(years)]
      .sort((a, b) => b - a);

  }, [bookings]);

  // ─────────────────────────────────────────────
  // Search + Filters + Sorting
  // ─────────────────────────────────────────────

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    const query = search
      .toLowerCase()
      .trim();

    if (query) {
      result = result.filter((booking) => {
        return [
          booking.name,
          booking.email,
          booking.whatsapp_number,
          booking.profession,
          booking.city,
          booking.country,
          booking.subject,
          booking.message,
          booking.session_date,
          booking.session_time,
          booking.status,
          booking.admin_comment,
          booking.status_updated_by_name,
        ].some((value) =>
          value
            ?.toString()
            .toLowerCase()
            .includes(query)
        );
      });
    }

    // Filter based on booking creation date
    if (selectedMonth !== 'all') {
      result = result.filter((booking) => {
        const date = new Date(
          booking.created_at
        );

        return (
          date.getMonth() ===
          Number(selectedMonth)
        );
      });
    }

    if (selectedYear !== 'all') {
      result = result.filter((booking) => {
        const date = new Date(
          booking.created_at
        );

        return (
          date.getFullYear() ===
          Number(selectedYear)
        );
      });
    }

    if (selectedStatus !== 'all') {
      result = result.filter(
        (booking) =>
          booking.status === selectedStatus
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'oldest') {
        return (
          new Date(a.created_at) -
          new Date(b.created_at)
        );
      }

      if (sortBy === 'session-soonest') {
        return (
          new Date(a.session_date) -
          new Date(b.session_date)
        );
      }

      if (sortBy === 'session-latest') {
        return (
          new Date(b.session_date) -
          new Date(a.session_date)
        );
      }

      if (sortBy === 'name-asc') {
        return (a.name || '')
          .localeCompare(
            b.name || ''
          );
      }

      if (sortBy === 'name-desc') {
        return (b.name || '')
          .localeCompare(
            a.name || ''
          );
      }

      return (
        new Date(b.created_at) -
        new Date(a.created_at)
      );
    });

    return result;

  }, [
    bookings,
    search,
    selectedMonth,
    selectedYear,
    selectedStatus,
    sortBy,
  ]);

  // ─────────────────────────────────────────────
  // Pagination
  // ─────────────────────────────────────────────

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredBookings.length /
      itemsPerPage
    )
  );

  const paginatedBookings = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      itemsPerPage;

    return filteredBookings.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  }, [
    filteredBookings,
    currentPage,
    itemsPerPage,
  ]);

  useEffect(() => {
    setCurrentPage(1);

  }, [
    search,
    selectedMonth,
    selectedYear,
    selectedStatus,
    sortBy,
    itemsPerPage,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

  }, [currentPage, totalPages]);

  // ─────────────────────────────────────────────
  // Date Format
  // ─────────────────────────────────────────────

  const formatDateTime = (date) => {
    if (!date) return '—';

    return new Date(date)
      .toLocaleString(
        'en-PK',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      );
  };

  const formatSessionDate = (date) => {
    if (!date) return '—';

    /*
      Adding T00:00:00 prevents some browsers
      from interpreting YYYY-MM-DD as UTC and
      showing the previous day.
    */
    const normalizedDate =
      typeof date === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? `${date}T00:00:00`
        : date;

    return new Date(normalizedDate)
      .toLocaleDateString(
        'en-PK',
        {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }
      );
  };

  // ─────────────────────────────────────────────
  // PDF Export
  // ─────────────────────────────────────────────

  const exportPDF = () => {
    if (
      filteredBookings.length === 0
    ) {
      return;
    }

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    let filterTitle =
      'All Online Session Bookings';

    if (
      selectedMonth !== 'all' &&
      selectedYear !== 'all'
    ) {
      filterTitle =
        `${MONTHS[
          Number(selectedMonth)
        ]} ${selectedYear}`;

    } else if (
      selectedMonth !== 'all'
    ) {
      filterTitle =
        MONTHS[
          Number(selectedMonth)
        ];

    } else if (
      selectedYear !== 'all'
    ) {
      filterTitle =
        selectedYear;
    }

    if (selectedStatus !== 'all') {
      filterTitle +=
        ` - ${getStatusLabel(
          selectedStatus
        )}`;
    }

    doc.setFontSize(18);

    doc.text(
      'Right Vision Securities',
      14,
      15
    );

    doc.setFontSize(13);

    doc.text(
      'Online Session Bookings',
      14,
      23
    );

    doc.setFontSize(9);

    doc.text(
      `Filter: ${filterTitle}`,
      14,
      30
    );

    doc.text(
      `Total Records: ${filteredBookings.length}`,
      14,
      35
    );

    doc.text(
      `Generated: ${new Date()
        .toLocaleString('en-PK')}`,
      14,
      40
    );

    autoTable(doc, {
      startY: 47,

      head: [[
        '#',
        'Customer',
        'Email',
        'WhatsApp',
        'Profession',
        'Session',
        'Time',
        'Subject',
        'Status',
      ]],

      body: filteredBookings.map(
        (booking, index) => [
          index + 1,
          booking.name || '—',
          booking.email || '—',
          booking.whatsapp_number || '—',
          booking.profession || '—',
          formatSessionDate(
            booking.session_date
          ),
          booking.session_time || '—',
          booking.subject || '—',
          getStatusLabel(
            booking.status
          ),
        ]
      ),

      styles: {
        fontSize: 7,
        cellPadding: 2,
        overflow: 'linebreak',
      },

      headStyles: {
        fontStyle: 'bold',
      },

      margin: {
        left: 10,
        right: 10,
      },

      didDrawPage: () => {
        const pageCount =
          doc.internal
            .getNumberOfPages();

        doc.setFontSize(8);

        doc.text(
          `Page ${pageCount}`,
          doc.internal.pageSize
            .getWidth() - 28,
          doc.internal.pageSize
            .getHeight() - 8
        );
      },
    });

    let fileName =
      'online-session-bookings';

    if (selectedMonth !== 'all') {
      fileName +=
        `-${MONTHS[
          Number(selectedMonth)
        ].toLowerCase()}`;
    }

    if (selectedYear !== 'all') {
      fileName +=
        `-${selectedYear}`;
    }

    if (selectedStatus !== 'all') {
      fileName +=
        `-${selectedStatus}`;
    }

    doc.save(`${fileName}.pdf`);
  };

  // ─────────────────────────────────────────────
  // Clear Filters
  // ─────────────────────────────────────────────

  const clearFilters = () => {
    setSearch('');
    setSelectedMonth('all');
    setSelectedYear('all');
    setSelectedStatus('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasFilters =
    search ||
    selectedMonth !== 'all' ||
    selectedYear !== 'all' ||
    selectedStatus !== 'all' ||
    sortBy !== 'newest';

  // ─────────────────────────────────────────────
  // Summary Counts
  // ─────────────────────────────────────────────

  const pendingCount =
    bookings.filter(
      (booking) =>
        booking.status === 'pending'
    ).length;

  const inProcessCount =
    bookings.filter(
      (booking) =>
        booking.status === 'in_process'
    ).length;

  const closedCount =
    bookings.filter(
      (booking) =>
        booking.status === 'closed'
    ).length;

  const rejectedCount =
    bookings.filter(
      (booking) =>
        booking.status === 'rejected'
    ).length;

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <AdminLayout>

      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-6">

          <div className="
            flex flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          ">

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className="
                h-10
                w-10
                bg-accent/10
                rounded-xl
                flex
                items-center
                justify-center
                flex-shrink-0
              ">

                <CalendarDays
                  className="
                    h-5
                    w-5
                    text-accent
                  "
                />

              </div>

              <div>

                <h2 className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-foreground
                  leading-tight
                ">
                  Online Session Bookings
                </h2>

                <p className="
                  text-sm
                  text-muted-foreground
                ">
                  View and manage online session requests
                </p>

              </div>

            </div>

            <Button
              variant="outline"
              onClick={fetchBookings}
              disabled={loading}
            >

              <RefreshCw
                className={`
                  h-4
                  w-4
                  mr-2
                  ${
                    loading
                      ? 'animate-spin'
                      : ''
                  }
                `}
              />

              Refresh

            </Button>

          </div>

        </div>

        {/* Summary Cards */}
        <div className="
          grid
          grid-cols-2
          md:grid-cols-3
          xl:grid-cols-5
          gap-4
          mb-6
        ">

          <SummaryCard
            label="Total Bookings"
            value={bookings.length}
            stripe="bg-accent"
          />

          <SummaryCard
            label="Pending"
            value={pendingCount}
            stripe="bg-yellow-500"
          />

          <SummaryCard
            label="In Process"
            value={inProcessCount}
            stripe="bg-blue-500"
          />

          <SummaryCard
            label="Closed"
            value={closedCount}
            stripe="bg-green-500"
          />

          <SummaryCard
            label="Rejected"
            value={rejectedCount}
            stripe="bg-red-500"
          />

        </div>

        {/* Main Card */}
        <div className="
          bg-card
          rounded-2xl
          border
          border-border
          overflow-hidden
        ">

          <div className="
            h-1
            w-full
            bg-gradient-to-r
            from-accent/60
            via-accent
            to-accent/60
          " />

          {/* Toolbar */}
          <div className="
            p-4
            sm:p-5
            border-b
            border-border
          ">

            <div className="
              flex
              flex-col
              gap-4
            ">

              <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-3
              ">

                <div>

                  <h3 className="
                    text-sm
                    font-semibold
                    text-foreground
                  ">
                    Booking Requests
                  </h3>

                  <p className="
                    text-xs
                    text-muted-foreground
                    mt-0.5
                  ">
                    {filteredBookings.length}{' '}
                    record
                    {
                      filteredBookings.length !== 1
                        ? 's'
                        : ''
                    }{' '}
                    found
                  </p>

                </div>

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-2
                ">

                  <div className="
                    relative
                    w-full
                    sm:w-72
                  ">

                    <Search className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      h-4
                      w-4
                      text-muted-foreground
                    " />

                    <Input
                      type="text"
                      placeholder="Search bookings..."
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      className="pl-9"
                    />

                  </div>

                  <Button
                    onClick={exportPDF}
                    disabled={
                      filteredBookings.length === 0
                    }
                    className="
                      bg-accent
                      text-accent-foreground
                      hover:bg-accent/90
                    "
                  >

                    <FileDown className="
                      h-4
                      w-4
                      mr-2
                    " />

                    Export PDF

                  </Button>

                </div>

              </div>

              {/* Filters */}
              <div className="
                flex
                flex-wrap
                items-center
                gap-2
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-muted-foreground
                  mr-1
                ">

                  <Filter className="h-4 w-4" />

                  Filters

                </div>

                {/* Status */}
                <FilterSelect
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(
                      e.target.value
                    )
                  }
                >

                  <option value="all">
                    All Statuses
                  </option>

                  {STATUS_OPTIONS.map(
                    (status) => (
                      <option
                        key={status.value}
                        value={status.value}
                      >
                        {status.label}
                      </option>
                    )
                  )}

                </FilterSelect>

                {/* Month */}
                <FilterSelect
                  value={selectedMonth}
                  onChange={(e) =>
                    setSelectedMonth(
                      e.target.value
                    )
                  }
                >

                  <option value="all">
                    All Months
                  </option>

                  {MONTHS.map(
                    (month, index) => (
                      <option
                        key={month}
                        value={index}
                      >
                        {month}
                      </option>
                    )
                  )}

                </FilterSelect>

                {/* Year */}
                <FilterSelect
                  value={selectedYear}
                  onChange={(e) =>
                    setSelectedYear(
                      e.target.value
                    )
                  }
                >

                  <option value="all">
                    All Years
                  </option>

                  {availableYears.map(
                    (year) => (
                      <option
                        key={year}
                        value={year}
                      >
                        {year}
                      </option>
                    )
                  )}

                </FilterSelect>

                {/* Sort */}
                <FilterSelect
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                >

                  <option value="newest">
                    Newest First
                  </option>

                  <option value="oldest">
                    Oldest First
                  </option>

                  <option value="session-soonest">
                    Session Soonest
                  </option>

                  <option value="session-latest">
                    Session Latest
                  </option>

                  <option value="name-asc">
                    Name A-Z
                  </option>

                  <option value="name-desc">
                    Name Z-A
                  </option>

                </FilterSelect>

                {hasFilters && (

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>

                )}

              </div>

            </div>

          </div>

          {/* Content */}
          {loading ? (

            <div className="
              py-20
              flex
              flex-col
              items-center
              justify-center
            ">

              <RefreshCw className="
                h-6
                w-6
                text-accent
                animate-spin
                mb-3
              " />

              <p className="
                text-sm
                text-muted-foreground
              ">
                Loading bookings...
              </p>

            </div>

          ) : filteredBookings.length === 0 ? (

            <div className="
              py-20
              text-center
              px-4
            ">

              <div className="
                h-12
                w-12
                rounded-xl
                bg-muted
                flex
                items-center
                justify-center
                mx-auto
                mb-3
              ">

                <CalendarDays className="
                  h-5
                  w-5
                  text-muted-foreground
                " />

              </div>

              <h3 className="
                text-sm
                font-semibold
                text-foreground
              ">
                No bookings found
              </h3>

              <p className="
                text-xs
                text-muted-foreground
                mt-1
              ">
                There are currently no matching online session bookings.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="
                w-full
                min-w-[1400px]
              ">

                <thead>

                  <tr className="
                    bg-muted/40
                    border-b
                    border-border
                  ">

                    <TableHeader>
                      Customer
                    </TableHeader>

                    <TableHeader>
                      Contact
                    </TableHeader>

                    <TableHeader>
                      Profession
                    </TableHeader>

                    <TableHeader>
                      Session
                    </TableHeader>

                    <TableHeader>
                      Subject
                    </TableHeader>

                    <TableHeader>
                      Status
                    </TableHeader>

                    <TableHeader>
                      Updated By
                    </TableHeader>

                    <TableHeader>
                      Action
                    </TableHeader>

                  </tr>

                </thead>

                <tbody className="
                  divide-y
                  divide-border
                ">

                  {paginatedBookings.map(
                    (booking) => (

                      <tr
                        key={booking.id}
                        className="
                          hover:bg-muted/30
                          transition-colors
                        "
                      >

                        {/* Customer */}
                        <td className="px-5 py-4">

                          <div className="
                            flex
                            items-center
                            gap-3
                          ">

                            <div className="
                              h-9
                              w-9
                              rounded-xl
                              bg-accent/10
                              flex
                              items-center
                              justify-center
                              flex-shrink-0
                            ">

                              <UserRound className="
                                h-4
                                w-4
                                text-accent
                              " />

                            </div>

                            <div>

                              <p className="
                                text-sm
                                font-semibold
                                text-foreground
                                whitespace-nowrap
                              ">
                                {booking.name}
                              </p>

                              <div className="
                                flex
                                items-center
                                gap-1
                                text-xs
                                text-muted-foreground
                                mt-1
                              ">

                                <MapPin className="h-3 w-3" />

                                {booking.city},{' '}
                                {booking.country}

                              </div>

                            </div>

                          </div>

                        </td>

                        {/* Contact */}
                        <td className="px-5 py-4">

                          <div className="space-y-1.5">

                            <div className="
                              flex
                              items-center
                              gap-2
                              text-sm
                              text-foreground
                            ">

                              <Mail className="
                                h-3.5
                                w-3.5
                                text-muted-foreground
                              " />

                              {booking.email}

                            </div>

                            <div className="
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-muted-foreground
                            ">

                              <Phone className="h-3.5 w-3.5" />

                              {booking.whatsapp_number}

                            </div>

                          </div>

                        </td>

                        {/* Profession */}
                        <td className="px-5 py-4">

                          <div className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-foreground
                          ">

                            <Briefcase className="
                              h-3.5
                              w-3.5
                              text-muted-foreground
                            " />

                            {booking.profession}

                          </div>

                        </td>

                        {/* Session */}
                        <td className="px-5 py-4">

                          <div className="space-y-1.5">

                            <div className="
                              flex
                              items-center
                              gap-2
                              text-sm
                              font-medium
                              text-foreground
                              whitespace-nowrap
                            ">

                              <CalendarDays className="
                                h-3.5
                                w-3.5
                                text-accent
                              " />

                              {formatSessionDate(
                                booking.session_date
                              )}

                            </div>

                            <div className="
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-muted-foreground
                            ">

                              <Clock className="h-3.5 w-3.5" />

                              {booking.session_time}

                            </div>

                          </div>

                        </td>

                        {/* Subject */}
                        <td className="px-5 py-4">

                          <div className="max-w-[220px]">

                            <p
                              className="
                                text-sm
                                font-medium
                                text-foreground
                                truncate
                              "
                              title={booking.subject}
                            >
                              {booking.subject}
                            </p>

                            <p
                              className="
                                text-xs
                                text-muted-foreground
                                truncate
                                mt-1
                              "
                              title={booking.message}
                            >
                              {booking.message}
                            </p>

                          </div>

                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">

                          <span
                            className={`
                              inline-flex
                              items-center
                              px-2.5
                              py-1
                              rounded-full
                              border
                              text-xs
                              font-semibold
                              whitespace-nowrap
                              ${getStatusClasses(
                                booking.status
                              )}
                            `}
                          >
                            {getStatusLabel(
                              booking.status
                            )}
                          </span>

                        </td>

                        {/* Updated By */}
                        <td className="px-5 py-4">

                          {booking.status_updated_by_name ? (

                            <div className="space-y-1">

                              <div className="
                                flex
                                items-center
                                gap-1.5
                                text-sm
                                text-foreground
                              ">

                                <UserCheck className="
                                  h-3.5
                                  w-3.5
                                  text-muted-foreground
                                " />

                                <span className="font-medium">
                                  {
                                    booking
                                      .status_updated_by_name
                                  }
                                </span>

                              </div>

                              {booking.status_updated_at && (

                                <div className="
                                  flex
                                  items-center
                                  gap-1.5
                                  text-xs
                                  text-muted-foreground
                                  whitespace-nowrap
                                ">

                                  <Clock className="h-3 w-3" />

                                  {formatDateTime(
                                    booking.status_updated_at
                                  )}

                                </div>

                              )}

                            </div>

                          ) : (

                            <span className="
                              text-xs
                              text-muted-foreground
                            ">
                              Not updated
                            </span>

                          )}

                        </td>

                        {/* Action */}
                        <td className="px-5 py-4">

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              openManageModal(
                                booking
                              )
                            }
                            className="
                              whitespace-nowrap
                            "
                          >

                            <Settings className="
                              h-3.5
                              w-3.5
                              mr-2
                            " />

                            Manage

                          </Button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

          {/* Pagination */}
          {!loading &&
            filteredBookings.length > 0 && (

            <div className="
              px-5
              py-3
              border-t
              border-border
              bg-muted/20
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
            ">

              <div className="
                flex
                flex-wrap
                items-center
                gap-3
              ">

                <p className="
                  text-xs
                  text-muted-foreground
                ">

                  Showing{' '}

                  {
                    (currentPage - 1) *
                    itemsPerPage +
                    1
                  }

                  {' - '}

                  {
                    Math.min(
                      currentPage *
                      itemsPerPage,
                      filteredBookings.length
                    )
                  }

                  {' of '}

                  {filteredBookings.length}

                </p>

                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    setItemsPerPage(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="
                    h-8
                    rounded-md
                    border
                    border-input
                    bg-background
                    px-2
                    text-xs
                    text-foreground
                  "
                >

                  <option value={10}>
                    10 per page
                  </option>

                  <option value={25}>
                    25 per page
                  </option>

                  <option value={50}>
                    50 per page
                  </option>

                  <option value={100}>
                    100 per page
                  </option>

                </select>

              </div>

              <div className="
                flex
                items-center
                gap-2
              ">

                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (prev) =>
                        Math.max(
                          prev - 1,
                          1
                        )
                    )
                  }
                >

                  <ChevronLeft className="h-4 w-4" />

                </Button>

                <span className="
                  text-xs
                  text-muted-foreground
                  px-2
                  whitespace-nowrap
                ">
                  Page {currentPage}{' '}
                  of{' '}
                  {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (prev) =>
                        Math.min(
                          prev + 1,
                          totalPages
                        )
                    )
                  }
                >

                  <ChevronRight className="h-4 w-4" />

                </Button>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* Manage Booking Modal */}
      {selectedBooking && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          p-4
          bg-black/50
          backdrop-blur-sm
        ">

          <div
            className="
              absolute
              inset-0
            "
            onClick={closeManageModal}
          />

          <div className="
            relative
            z-10
            w-full
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            bg-card
            border
            border-border
            rounded-2xl
            shadow-2xl
          ">

            {/* Header */}
            <div className="
              sticky
              top-0
              z-10
              bg-card
              px-6
              py-5
              border-b
              border-border
              flex
              items-start
              justify-between
              gap-4
            ">

              <div>

                <h3 className="
                  text-lg
                  font-bold
                  text-foreground
                ">
                  Manage Online Session
                </h3>

                <p className="
                  text-sm
                  text-muted-foreground
                  mt-1
                ">
                  Review booking details and update its status.
                </p>

              </div>

              <button
                type="button"
                onClick={closeManageModal}
                disabled={saving}
                className="
                  p-2
                  rounded-lg
                  text-muted-foreground
                  hover:text-foreground
                  hover:bg-muted
                "
              >

                <X className="h-4 w-4" />

              </button>

            </div>

            {/* Body */}
            <div className="
              px-6
              py-5
              space-y-5
            ">

              {/* Customer */}
              <ModalSection title="Customer Details">

                <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                ">

                  <DetailItem
                    label="Name"
                    value={
                      selectedBooking.name
                    }
                  />

                  <DetailItem
                    label="Profession"
                    value={
                      selectedBooking.profession
                    }
                  />

                  <DetailItem
                    label="Email"
                    value={
                      selectedBooking.email
                    }
                  />

                  <DetailItem
                    label="WhatsApp"
                    value={
                      selectedBooking.whatsapp_number
                    }
                  />

                  <DetailItem
                    label="City"
                    value={
                      selectedBooking.city
                    }
                  />

                  <DetailItem
                    label="Country"
                    value={
                      selectedBooking.country
                    }
                  />

                </div>

              </ModalSection>

              {/* Session */}
              <ModalSection title="Requested Session">

                <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                ">

                  <DetailItem
                    label="Date"
                    value={
                      formatSessionDate(
                        selectedBooking
                          .session_date
                      )
                    }
                  />

                  <DetailItem
                    label="Time"
                    value={
                      selectedBooking
                        .session_time
                    }
                  />

                </div>

              </ModalSection>

              {/* Inquiry */}
              <ModalSection title="Inquiry">

                <div className="space-y-4">

                  <DetailItem
                    label="Subject"
                    value={
                      selectedBooking.subject
                    }
                  />

                  <div>

                    <p className="
                      text-xs
                      font-medium
                      text-muted-foreground
                      mb-1
                    ">
                      Message
                    </p>

                    <p className="
                      text-sm
                      text-foreground
                      leading-relaxed
                      whitespace-pre-wrap
                    ">
                      {selectedBooking.message}
                    </p>

                  </div>

                </div>

              </ModalSection>

              {/* Status */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-foreground
                  mb-2
                ">
                  Status
                </label>

                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(
                      e.target.value
                    )
                  }
                  disabled={saving}
                  className="
                    w-full
                    h-10
                    rounded-md
                    border
                    border-input
                    bg-background
                    px-3
                    text-sm
                    text-foreground
                    focus:outline-none
                    focus:ring-2
                    focus:ring-ring
                  "
                >

                  {STATUS_OPTIONS.map(
                    (status) => (
                      <option
                        key={status.value}
                        value={status.value}
                      >
                        {status.label}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Admin Comment */}
              <div>

                <label className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-foreground
                  mb-2
                ">

                  <MessageSquare className="h-4 w-4" />

                  Admin Comment

                </label>

                <textarea
                  value={adminComment}
                  onChange={(e) =>
                    setAdminComment(
                      e.target.value
                    )
                  }
                  disabled={saving}
                  rows={5}
                  maxLength={2000}
                  placeholder="Add notes about this booking..."
                  className="
                    w-full
                    rounded-md
                    border
                    border-input
                    bg-background
                    px-3
                    py-2.5
                    text-sm
                    text-foreground
                    resize-none
                    focus:outline-none
                    focus:ring-2
                    focus:ring-ring
                    placeholder:text-muted-foreground
                  "
                />

                <div className="
                  flex
                  justify-end
                  mt-1
                ">

                  <span className="
                    text-xs
                    text-muted-foreground
                  ">
                    {adminComment.length}/2000
                  </span>

                </div>

              </div>

              {/* Last Update */}
              {selectedBooking.status_updated_by_name && (

                <ModalSection title="Last Update">

                  <div className="space-y-2">

                    <div className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-foreground
                    ">

                      <UserCheck className="
                        h-4
                        w-4
                        text-muted-foreground
                      " />

                      {
                        selectedBooking
                          .status_updated_by_name
                      }

                    </div>

                    {selectedBooking.status_updated_at && (

                      <div className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-muted-foreground
                      ">

                        <Clock className="h-3.5 w-3.5" />

                        {formatDateTime(
                          selectedBooking
                            .status_updated_at
                        )}

                      </div>

                    )}

                  </div>

                </ModalSection>

              )}

              {saveError && (

                <div className="
                  rounded-lg
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-600
                ">
                  {saveError}
                </div>

              )}

              {saveSuccess && (

                <div className="
                  rounded-lg
                  border
                  border-green-500/20
                  bg-green-500/10
                  px-4
                  py-3
                  text-sm
                  text-green-600
                  flex
                  items-center
                  gap-2
                ">

                  <CheckCircle2 className="h-4 w-4" />

                  {saveSuccess}

                </div>

              )}

            </div>

            {/* Footer */}
            <div className="
              sticky
              bottom-0
              bg-card
              px-6
              py-4
              border-t
              border-border
              flex
              justify-end
              gap-3
            ">

              <Button
                variant="outline"
                onClick={closeManageModal}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSaveChanges}
                disabled={saving}
                className="
                  bg-accent
                  text-accent-foreground
                  hover:bg-accent/90
                "
              >

                {saving ? (

                  <>
                    <Loader2 className="
                      h-4
                      w-4
                      mr-2
                      animate-spin
                    " />

                    Saving...
                  </>

                ) : (

                  <>
                    <CheckCircle2 className="
                      h-4
                      w-4
                      mr-2
                    " />

                    Save Changes
                  </>

                )}

              </Button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}

// ─────────────────────────────────────────────
// Helper Components
// ─────────────────────────────────────────────

function SummaryCard({
  label,
  value,
  stripe,
}) {
  return (
    <div className="
      bg-card
      rounded-2xl
      border
      border-border
      overflow-hidden
    ">

      <div
        className={`h-1 w-full ${stripe}`}
      />

      <div className="p-5">

        <p className="
          text-xs
          font-medium
          text-muted-foreground
          uppercase
          tracking-wide
        ">
          {label}
        </p>

        <p className="
          text-2xl
          font-bold
          text-foreground
          mt-1
        ">
          {value}
        </p>

      </div>

    </div>
  );
}

function TableHeader({ children }) {
  return (
    <th className="
      px-5
      py-3
      text-left
      text-xs
      font-semibold
      text-muted-foreground
      whitespace-nowrap
    ">
      {children}
    </th>
  );
}

function FilterSelect({
  children,
  ...props
}) {
  return (
    <select
      {...props}
      className="
        h-9
        rounded-md
        border
        border-input
        bg-background
        px-3
        text-sm
        text-foreground
        focus:outline-none
        focus:ring-2
        focus:ring-ring
      "
    >
      {children}
    </select>
  );
}

function ModalSection({
  title,
  children,
}) {
  return (
    <div className="
      rounded-xl
      border
      border-border
      bg-muted/20
      p-4
    ">

      <p className="
        text-xs
        font-semibold
        text-muted-foreground
        uppercase
        tracking-wide
        mb-3
      ">
        {title}
      </p>

      {children}

    </div>
  );
}

function DetailItem({
  label,
  value,
}) {
  return (
    <div>

      <p className="
        text-xs
        font-medium
        text-muted-foreground
        mb-1
      ">
        {label}
      </p>

      <p className="
        text-sm
        font-medium
        text-foreground
        break-words
      ">
        {value || '—'}
      </p>

    </div>
  );
}

export default Bookings;
