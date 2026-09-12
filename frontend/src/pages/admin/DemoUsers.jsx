import React, { useEffect, useMemo, useState } from 'react';

import {
  Users,
  Search,
  RefreshCw,
  Mail,
  Phone,
  UserRound,
  KeyRound,
  CalendarDays,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
  FileDown,
  ChevronLeft,
  ChevronRight,
  Filter,
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

function DemoUsers() {
  const { authFetch } = useAdminAuth();

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  const [selectedMonth, setSelectedMonth] =
    useState('all');

  const [selectedYear, setSelectedYear] =
    useState('all');

  const [sortBy, setSortBy] =
    useState('newest');

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage, setItemsPerPage] =
    useState(10);

  const [visiblePasswords, setVisiblePasswords] =
    useState({});

  const [copiedField, setCopiedField] =
    useState(null);

  // ─────────────────────────────────────────────
  // Fetch Accounts
  // ─────────────────────────────────────────────

  const fetchAccounts = async () => {
    try {
      setLoading(true);

      const response = await authFetch(
        `${API_URL}/api/demo-accounts`
      );

      if (!response) return;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to fetch demo accounts'
        );
      }

      setAccounts(data.accounts || []);

    } catch (error) {
      console.error(
        'Fetch demo accounts error:',
        error
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ─────────────────────────────────────────────
  // Available Years
  // ─────────────────────────────────────────────

  const availableYears = useMemo(() => {
    const years = accounts
      .map((account) => {
        const date = new Date(
          account.created_at
        );

        return date.getFullYear();
      })
      .filter((year) => !Number.isNaN(year));

    return [...new Set(years)]
      .sort((a, b) => b - a);

  }, [accounts]);

  // ─────────────────────────────────────────────
  // Search + Filter + Sort
  // ─────────────────────────────────────────────

  const filteredAccounts = useMemo(() => {
    let result = [...accounts];

    // Search
    const query = search
      .toLowerCase()
      .trim();

    if (query) {
      result = result.filter((account) => {
        return [
          account.first_name,
          account.last_name,
          account.email,
          account.phone,
          account.pmex_login,
          account.status,
        ].some((value) =>
          value
            ?.toString()
            .toLowerCase()
            .includes(query)
        );
      });
    }

    // Filter by month
    if (selectedMonth !== 'all') {
      result = result.filter((account) => {
        const date = new Date(
          account.created_at
        );

        return (
          date.getMonth() ===
          Number(selectedMonth)
        );
      });
    }

    // Filter by year
    if (selectedYear !== 'all') {
      result = result.filter((account) => {
        const date = new Date(
          account.created_at
        );

        return (
          date.getFullYear() ===
          Number(selectedYear)
        );
      });
    }

    // Sort
    result.sort((a, b) => {

      if (sortBy === 'oldest') {
        return (
          new Date(a.created_at) -
          new Date(b.created_at)
        );
      }

      if (sortBy === 'name-asc') {
        const nameA =
          `${a.first_name || ''} ${a.last_name || ''}`;

        const nameB =
          `${b.first_name || ''} ${b.last_name || ''}`;

        return nameA.localeCompare(nameB);
      }

      if (sortBy === 'name-desc') {
        const nameA =
          `${a.first_name || ''} ${a.last_name || ''}`;

        const nameB =
          `${b.first_name || ''} ${b.last_name || ''}`;

        return nameB.localeCompare(nameA);
      }

      // Newest default
      return (
        new Date(b.created_at) -
        new Date(a.created_at)
      );
    });

    return result;

  }, [
    accounts,
    search,
    selectedMonth,
    selectedYear,
    sortBy,
  ]);

  // ─────────────────────────────────────────────
  // Pagination
  // ─────────────────────────────────────────────

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAccounts.length /
      itemsPerPage
    )
  );

  const paginatedAccounts = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      itemsPerPage;

    return filteredAccounts.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  }, [
    filteredAccounts,
    currentPage,
    itemsPerPage,
  ]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);

  }, [
    search,
    selectedMonth,
    selectedYear,
    sortBy,
    itemsPerPage,
  ]);

  // Make sure page remains valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

  }, [currentPage, totalPages]);

  // ─────────────────────────────────────────────
  // Password Toggle
  // ─────────────────────────────────────────────

  const togglePassword = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ─────────────────────────────────────────────
  // Copy
  // ─────────────────────────────────────────────

  const copyText = async (
    text,
    field
  ) => {
    if (!text) return;

    try {
      await navigator.clipboard
        .writeText(text);

      setCopiedField(field);

      setTimeout(() => {
        setCopiedField(null);
      }, 1500);

    } catch (error) {
      console.error(
        'Copy failed:',
        error
      );
    }
  };

  // ─────────────────────────────────────────────
  // Date Format
  // ─────────────────────────────────────────────

  const formatDate = (date) => {
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

  // ─────────────────────────────────────────────
  // PDF Export
  // ─────────────────────────────────────────────

  const exportPDF = () => {
    if (
      filteredAccounts.length === 0
    ) {
      return;
    }

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    let filterTitle =
      'All Demo Users';

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

    // Main Heading
    doc.setFontSize(18);

    doc.text(
      'Right Vision Securities',
      14,
      15
    );

    doc.setFontSize(13);

    doc.text(
      'PMEX Demo Account Users',
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
      `Total Records: ${filteredAccounts.length}`,
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
        'Name',
        'Email',
        'Phone',
        'PMEX Login',
        'PMEX Password',
        'Created',
      ]],

      body: filteredAccounts.map(
        (account, index) => [

          index + 1,

          `${account.first_name || ''} ${
            account.last_name || ''
          }`.trim(),

          account.email || '—',

          account.phone || '—',

          account.pmex_login || '—',

          account.pmex_password || '—',

          account.created_at
            ? new Date(
                account.created_at
              ).toLocaleDateString(
                'en-PK',
                {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }
              )
            : '—',
        ]
      ),

      styles: {
        fontSize: 8,
        cellPadding: 2.5,
        overflow: 'linebreak',
      },

      headStyles: {
        fontStyle: 'bold',
      },

      columnStyles: {
        0: {
          cellWidth: 10,
        },

        1: {
          cellWidth: 35,
        },

        2: {
          cellWidth: 55,
        },

        3: {
          cellWidth: 30,
        },

        4: {
          cellWidth: 30,
        },

        5: {
          cellWidth: 35,
        },

        6: {
          cellWidth: 30,
        },
      },

      margin: {
        left: 14,
        right: 14,
      },

      didDrawPage: (data) => {

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
      'demo-users-all';

    if (
      selectedMonth !== 'all'
    ) {
      fileName +=
        `-${MONTHS[
          Number(selectedMonth)
        ].toLowerCase()}`;
    }

    if (
      selectedYear !== 'all'
    ) {
      fileName +=
        `-${selectedYear}`;
    }

    if (search.trim()) {
      fileName += '-search-results';
    }

    doc.save(
      `${fileName}.pdf`
    );
  };

  // ─────────────────────────────────────────────
  // Clear Filters
  // ─────────────────────────────────────────────

  const clearFilters = () => {
    setSearch('');
    setSelectedMonth('all');
    setSelectedYear('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasFilters =
    search ||
    selectedMonth !== 'all' ||
    selectedYear !== 'all' ||
    sortBy !== 'newest';

  // ─────────────────────────────────────────────
  // Summary Counts
  // ─────────────────────────────────────────────

  const pendingCount =
    accounts.filter(
      (account) =>
        account.status === 'pending'
    ).length;

  const completedCount =
    accounts.filter(
      (account) =>
        account.pmex_login &&
        account.pmex_password
    ).length;

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <AdminLayout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">

          <div className="
            flex flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          ">

            <div className="flex items-center gap-3">

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
                <Users className="h-5 w-5 text-accent" />
              </div>

              <div>

                <h2 className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-foreground
                  leading-tight
                ">
                  Demo Users
                </h2>

                <p className="
                  text-sm
                  text-muted-foreground
                ">
                  View and manage PMEX demo account requests
                </p>

              </div>

            </div>

            <Button
              variant="outline"
              onClick={fetchAccounts}
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
          grid-cols-1
          sm:grid-cols-3
          gap-4
          mb-6
        ">

          {/* Total */}
          <div className="
            bg-card
            rounded-2xl
            border
            border-border
            overflow-hidden
          ">

            <div className="h-1 w-full bg-accent" />

            <div className="p-5">

              <p className="
                text-xs
                font-medium
                text-muted-foreground
                uppercase
                tracking-wide
              ">
                Total Users
              </p>

              <p className="
                text-2xl
                font-bold
                text-foreground
                mt-1
              ">
                {accounts.length}
              </p>

            </div>

          </div>

          {/* Pending */}
          <div className="
            bg-card
            rounded-2xl
            border
            border-border
            overflow-hidden
          ">

            <div className="h-1 w-full bg-yellow-500" />

            <div className="p-5">

              <p className="
                text-xs
                font-medium
                text-muted-foreground
                uppercase
                tracking-wide
              ">
                Pending
              </p>

              <p className="
                text-2xl
                font-bold
                text-foreground
                mt-1
              ">
                {pendingCount}
              </p>

            </div>

          </div>

          {/* Created */}
          <div className="
            bg-card
            rounded-2xl
            border
            border-border
            overflow-hidden
          ">

            <div className="h-1 w-full bg-green-500" />

            <div className="p-5">

              <p className="
                text-xs
                font-medium
                text-muted-foreground
                uppercase
                tracking-wide
              ">
                Account Created
              </p>

              <p className="
                text-2xl
                font-bold
                text-foreground
                mt-1
              ">
                {completedCount}
              </p>

            </div>

          </div>

        </div>

        {/* Main Card */}
        <div className="
          bg-card
          rounded-2xl
          border
          border-border
          overflow-hidden
        ">

          {/* Accent Stripe */}
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

            <div className="flex flex-col gap-4">

              {/* Toolbar Top */}
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
                    Demo Account Requests
                  </h3>

                  <p className="
                    text-xs
                    text-muted-foreground
                    mt-0.5
                  ">
                    {filteredAccounts.length}
                    {' '}
                    record
                    {
                      filteredAccounts.length !== 1
                        ? 's'
                        : ''
                    }
                    {' '}
                    found
                  </p>

                </div>

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-2
                ">

                  {/* Search */}
                  <div className="
                    relative
                    w-full
                    sm:w-72
                  ">

                    <Search
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        h-4
                        w-4
                        text-muted-foreground
                      "
                    />

                    <Input
                      type="text"
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      className="pl-9"
                    />

                  </div>

                  {/* Export */}
                  <Button
                    onClick={exportPDF}
                    disabled={
                      filteredAccounts.length === 0
                    }
                    className="
                      bg-accent
                      text-accent-foreground
                      hover:bg-accent/90
                    "
                  >

                    <FileDown className="h-4 w-4 mr-2" />

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

                {/* Month */}
                <select
                  value={selectedMonth}
                  onChange={(e) =>
                    setSelectedMonth(
                      e.target.value
                    )
                  }
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

                </select>

                {/* Year */}
                <select
                  value={selectedYear}
                  onChange={(e) =>
                    setSelectedYear(
                      e.target.value
                    )
                  }
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

                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
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

                  <option value="newest">
                    Newest First
                  </option>

                  <option value="oldest">
                    Oldest First
                  </option>

                  <option value="name-asc">
                    Name A-Z
                  </option>

                  <option value="name-desc">
                    Name Z-A
                  </option>

                </select>

                {/* Clear */}
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

          {/* Loading */}
          {loading ? (

            <div className="
              py-20
              flex
              flex-col
              items-center
              justify-center
            ">

              <RefreshCw
                className="
                  h-6
                  w-6
                  text-accent
                  animate-spin
                  mb-3
                "
              />

              <p className="
                text-sm
                text-muted-foreground
              ">
                Loading demo users...
              </p>

            </div>

          ) : filteredAccounts.length === 0 ? (

            /* Empty */
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

                <Users
                  className="
                    h-5
                    w-5
                    text-muted-foreground
                  "
                />

              </div>

              <h3 className="
                text-sm
                font-semibold
                text-foreground
              ">
                No demo users found
              </h3>

              <p className="
                text-xs
                text-muted-foreground
                mt-1
              ">
                There are currently no matching demo account requests.
              </p>

            </div>

          ) : (

            /* Table */
            <div className="overflow-x-auto">

              <table className="
                w-full
                min-w-[1000px]
              ">

                <thead>

                  <tr className="
                    bg-muted/40
                    border-b
                    border-border
                  ">

                    <th className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-muted-foreground
                    ">
                      User
                    </th>

                    <th className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-muted-foreground
                    ">
                      Contact
                    </th>

                    <th className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-muted-foreground
                    ">
                      PMEX Login
                    </th>

                    <th className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-muted-foreground
                    ">
                      Password
                    </th>

                    <th className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-muted-foreground
                    ">
                      Created
                    </th>

                  </tr>

                </thead>

                <tbody className="
                  divide-y
                  divide-border
                ">

                  {paginatedAccounts.map(
                    (account) => (

                      <tr
                        key={account.id}
                        className="
                          hover:bg-muted/30
                          transition-colors
                        "
                      >

                        {/* User */}
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

                              <UserRound
                                className="
                                  h-4
                                  w-4
                                  text-accent
                                "
                              />

                            </div>

                            <div className="min-w-0">

                              <p className="
                                text-sm
                                font-semibold
                                text-foreground
                                whitespace-nowrap
                              ">
                                {account.first_name}
                                {' '}
                                {account.last_name}
                              </p>

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

                              <Mail
                                className="
                                  h-3.5
                                  w-3.5
                                  text-muted-foreground
                                "
                              />

                              <span>
                                {account.email}
                              </span>

                            </div>

                            <div className="
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-muted-foreground
                            ">

                              <Phone
                                className="
                                  h-3.5
                                  w-3.5
                                "
                              />

                              <span>
                                {account.phone}
                              </span>

                            </div>

                          </div>

                        </td>

                        {/* Login */}
                        <td className="px-5 py-4">

                          {account.pmex_login ? (

                            <div className="
                              flex
                              items-center
                              gap-2
                            ">

                              <span className="
                                text-sm
                                font-mono
                                text-foreground
                              ">
                                {account.pmex_login}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  copyText(
                                    account.pmex_login,
                                    `login-${account.id}`
                                  )
                                }
                                className="
                                  p-1.5
                                  rounded-md
                                  text-muted-foreground
                                  hover:text-accent
                                  hover:bg-accent/10
                                  transition-colors
                                "
                                title="Copy login"
                              >

                                {
                                  copiedField ===
                                  `login-${account.id}`
                                    ? (
                                      <CheckCircle2
                                        className="
                                          h-3.5
                                          w-3.5
                                          text-green-500
                                        "
                                      />
                                    )
                                    : (
                                      <Copy
                                        className="
                                          h-3.5
                                          w-3.5
                                        "
                                      />
                                    )
                                }

                              </button>

                            </div>

                          ) : (

                            <span className="
                              text-sm
                              text-muted-foreground
                            ">
                              —
                            </span>

                          )}

                        </td>

                        {/* Password */}
                        <td className="px-5 py-4">

                          {account.pmex_password ? (

                            <div className="
                              flex
                              items-center
                              gap-1
                            ">

                              <KeyRound
                                className="
                                  h-3.5
                                  w-3.5
                                  text-muted-foreground
                                  mr-1
                                "
                              />

                              <span className="
                                text-sm
                                font-mono
                                text-foreground
                                min-w-[80px]
                              ">
                                {
                                  visiblePasswords[
                                    account.id
                                  ]
                                    ? account.pmex_password
                                    : '••••••••'
                                }
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  togglePassword(
                                    account.id
                                  )
                                }
                                className="
                                  p-1.5
                                  rounded-md
                                  text-muted-foreground
                                  hover:text-accent
                                  hover:bg-accent/10
                                  transition-colors
                                "
                                title={
                                  visiblePasswords[
                                    account.id
                                  ]
                                    ? 'Hide password'
                                    : 'Show password'
                                }
                              >

                                {
                                  visiblePasswords[
                                    account.id
                                  ]
                                    ? (
                                      <EyeOff
                                        className="
                                          h-3.5
                                          w-3.5
                                        "
                                      />
                                    )
                                    : (
                                      <Eye
                                        className="
                                          h-3.5
                                          w-3.5
                                        "
                                      />
                                    )
                                }

                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  copyText(
                                    account.pmex_password,
                                    `password-${account.id}`
                                  )
                                }
                                className="
                                  p-1.5
                                  rounded-md
                                  text-muted-foreground
                                  hover:text-accent
                                  hover:bg-accent/10
                                  transition-colors
                                "
                                title="Copy password"
                              >

                                {
                                  copiedField ===
                                  `password-${account.id}`
                                    ? (
                                      <CheckCircle2
                                        className="
                                          h-3.5
                                          w-3.5
                                          text-green-500
                                        "
                                      />
                                    )
                                    : (
                                      <Copy
                                        className="
                                          h-3.5
                                          w-3.5
                                        "
                                      />
                                    )
                                }

                              </button>

                            </div>

                          ) : (

                            <span className="
                              text-sm
                              text-muted-foreground
                            ">
                              —
                            </span>

                          )}

                        </td>

                        {/* Created */}
                        <td className="px-5 py-4">

                          <div className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-muted-foreground
                            whitespace-nowrap
                          ">

                            <CalendarDays
                              className="
                                h-3.5
                                w-3.5
                              "
                            />

                            {formatDate(
                              account.created_at
                            )}

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

          {/* Pagination Footer */}
          {!loading &&
            filteredAccounts.length > 0 && (

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

              {/* Left */}
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
                      filteredAccounts.length
                    )
                  }

                  {' of '}

                  {
                    filteredAccounts.length
                  }

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

              {/* Pagination */}
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

                  <ChevronLeft
                    className="
                      h-4
                      w-4
                    "
                  />

                </Button>

                <span className="
                  text-xs
                  text-muted-foreground
                  px-2
                  whitespace-nowrap
                ">
                  Page {currentPage}
                  {' '}
                  of
                  {' '}
                  {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    currentPage ===
                    totalPages
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

                  <ChevronRight
                    className="
                      h-4
                      w-4
                    "
                  />

                </Button>

              </div>

            </div>

          )}

        </div>

      </div>

    </AdminLayout>
  );
}

export default DemoUsers;