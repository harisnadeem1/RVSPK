import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    Mail,
    Plus,
    Search,
    Send,
    Trash2,
    RefreshCw,
    Users,
    Phone,
    Globe,
    UserRound,
    Loader2,
    X,
} from 'lucide-react';

import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

const API_URL = import.meta.env.VITE_API_URL;


function NewswireSubscribers() {
    const { authFetch } = useAdminAuth();

    const [subscribers, setSubscribers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [email, setEmail] =
        useState('');

    const [phone, setPhone] =
        useState('');

    const [adding, setAdding] =
        useState(false);

    const [sending, setSending] =
        useState(false);

    const [search, setSearch] =
        useState('');

    const [sourceFilter, setSourceFilter] =
        useState('all');

    const [dateFilter, setDateFilter] =
        useState('all');

    const [message, setMessage] =
        useState('');

    const [error, setError] =
        useState('');
        
    const [showSendConfirm, setShowSendConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [subscriberToDelete, setSubscriberToDelete] = useState(null);


    const fetchSubscribers = async () => {
        try {
            setLoading(true);

            const response = await authFetch(
                `${API_URL}/api/newswire/admin/subscribers`
            );

            if (!response) return;

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    'Failed to fetch subscribers.'
                );
            }

            setSubscribers(
                data.subscribers || []
            );

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchSubscribers();
    }, []);


    const addSubscriber = async (e) => {
        e.preventDefault();

        setError('');
        setMessage('');

        if (!email.trim()) {
            setError('Email is required.');
            return;
        }

        try {
            setAdding(true);

            const response = await authFetch(
                `${API_URL}/api/newswire/admin/subscribers`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',
                    },

                    body: JSON.stringify({
                        email,
                        phone,
                    }),
                }
            );

            if (!response) return;

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    'Failed to add subscriber.'
                );
            }

            setEmail('');
            setPhone('');

            setMessage(
                'Subscriber added successfully.'
            );

            await fetchSubscribers();

        } catch (err) {
            setError(err.message);

        } finally {
            setAdding(false);
        }
    };


   const deleteSubscriber = async () => {
  if (!subscriberToDelete) return;

  try {
    setError('');

    const response = await authFetch(
      `${API_URL}/api/newswire/admin/subscribers/${subscriberToDelete.id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response) return;

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to remove subscriber.'
      );
    }

    setMessage('Subscriber removed successfully.');

    setShowDeleteConfirm(false);
    setSubscriberToDelete(null);

    await fetchSubscribers();

  } catch (err) {
    setError(err.message);
  }
};


    const sendNewswire = async () => {
        const activeCount =
            subscribers.filter(
                (subscriber) =>
                    subscriber.is_active
            ).length;

        if (!activeCount) {
            setError(
                'There are no active subscribers.'
            );
            return;
        }

      

        try {
            setShowSendConfirm(false);
            setSending(true);
            setError('');
            setMessage('');

            const response = await authFetch(
                `${API_URL}/api/newswire/admin/subscribers/send`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',
                    },

                    body: JSON.stringify({
                        subject:
                            'Right Vision Securities - Daily Newswire',

                        message:
                            "Today's Daily Newswire is now available.",

                        pdfUrl:
                            `${window.location.origin}/notifications/daily-newswire`,
                    }),
                }
            );

            if (!response) return;

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    'Failed to send Newswire.'
                );
            }

            setMessage(
                data.message ||
                'Daily Newswire emails are being sent in the background.'
            );

        } catch (err) {
            setError(err.message);

        } finally {
            setSending(false);
        }
    };


    // FILTERING
    const filteredSubscribers =
        useMemo(() => {

            let result = [...subscribers];

            const q =
                search.trim().toLowerCase();

            if (q) {
                result = result.filter(
                    (subscriber) =>
                        subscriber.email
                            ?.toLowerCase()
                            .includes(q) ||

                        subscriber.phone
                            ?.toLowerCase()
                            .includes(q)
                );
            }


            if (sourceFilter !== 'all') {
                result = result.filter(
                    (subscriber) =>
                        subscriber.source ===
                        sourceFilter
                );
            }


            if (dateFilter !== 'all') {
                const now = new Date();

                result = result.filter(
                    (subscriber) => {

                        const created =
                            new Date(
                                subscriber.created_at
                            );

                        if (dateFilter === 'today') {
                            return (
                                created.toDateString() ===
                                now.toDateString()
                            );
                        }

                        if (dateFilter === '7days') {
                            const sevenDaysAgo =
                                new Date();

                            sevenDaysAgo.setDate(
                                sevenDaysAgo.getDate() - 7
                            );

                            return (
                                created >= sevenDaysAgo
                            );
                        }

                        if (dateFilter === '30days') {
                            const thirtyDaysAgo =
                                new Date();

                            thirtyDaysAgo.setDate(
                                thirtyDaysAgo.getDate() - 30
                            );

                            return (
                                created >= thirtyDaysAgo
                            );
                        }

                        return true;
                    }
                );
            }

            return result;

        }, [
            subscribers,
            search,
            sourceFilter,
            dateFilter,
        ]);


    const websiteCount =
        subscribers.filter(
            (item) =>
                item.source === 'website'
        ).length;

    const adminCount =
        subscribers.filter(
            (item) =>
                item.source === 'admin'
        ).length;


    return (
        <AdminLayout>

            <div className="mx-auto max-w-6xl">

                {/* HEADER */}
                <div
                    className="
            mb-6
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-accent/10
              "
                        >
                            <Mail className="h-5 w-5 text-accent" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                                Daily Newswire Subscribers
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Add subscribers and send the Daily Newswire
                            </p>
                        </div>

                    </div>


                   <Button
  onClick={() => setShowSendConfirm(true)}
  disabled={sending}
                        className="
              bg-accent
              text-accent-foreground
              hover:bg-accent/90
            "
                    >
                        {sending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="mr-2 h-4 w-4" />
                        )}

                        {sending
                            ? 'Sending...'
                            : 'Send Daily Newswire'}
                    </Button>

                </div>


                {/* SUMMARY */}
                <div className="mb-5 grid grid-cols-3 gap-3">

                    <Summary
                        title="Total"
                        value={subscribers.length}
                        icon={Users}
                    />

                    <Summary
                        title="Website"
                        value={websiteCount}
                        icon={Globe}
                    />

                    <Summary
                        title="Admin"
                        value={adminCount}
                        icon={UserRound}
                    />

                </div>


                {/* ADD FORM */}
                <div
                    className="
            mb-5
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-card
          "
                >

                    <div
                        className="
              h-1
              bg-gradient-to-r
              from-accent/60
              via-accent
              to-accent/60
            "
                    />

                    <form
                        onSubmit={addSubscriber}
                        className="
              flex
              flex-col
              gap-3
              p-4
              sm:flex-row
              sm:items-end
            "
                    >

                        <div className="flex-1">

                            <label className="mb-1.5 block text-xs font-medium">
                                Email *
                            </label>

                            <Input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="subscriber@example.com"
                                required
                            />

                        </div>


                        <div className="flex-1">

                            <label className="mb-1.5 block text-xs font-medium">
                                Phone
                            </label>

                            <Input
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                placeholder="+92..."
                            />

                        </div>


                        <Button
                            type="submit"
                            disabled={adding}
                            className="
                bg-accent
                text-accent-foreground
                hover:bg-accent/90
              "
                        >
                            {adding ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="mr-2 h-4 w-4" />
                            )}

                            Add Subscriber
                        </Button>

                    </form>

                </div>


                {error && (
                    <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mb-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-600">
                        {message}
                    </div>
                )}


                {/* LIST */}
                <div
                    className="
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-card
          "
                >

                    {/* FILTERS */}
                    <div
                        className="
              flex
              flex-col
              gap-3
              border-b
              border-border
              p-4
              md:flex-row
            "
                    >

                        <div className="relative flex-1">

                            <Search
                                className="
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-muted-foreground
                "
                            />

                            <Input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search email or phone..."
                                className="pl-9"
                            />

                        </div>


                        <select
                            value={sourceFilter}
                            onChange={(e) =>
                                setSourceFilter(
                                    e.target.value
                                )
                            }
                            className="
                h-10
                rounded-md
                border
                border-input
                bg-background
                px-3
                text-sm
              "
                        >
                            <option value="all">
                                All Sources
                            </option>

                            <option value="website">
                                Website
                            </option>

                            <option value="admin">
                                Admin
                            </option>
                        </select>


                        <select
                            value={dateFilter}
                            onChange={(e) =>
                                setDateFilter(
                                    e.target.value
                                )
                            }
                            className="
                h-10
                rounded-md
                border
                border-input
                bg-background
                px-3
                text-sm
              "
                        >
                            <option value="all">
                                All Dates
                            </option>

                            <option value="today">
                                Today
                            </option>

                            <option value="7days">
                                Last 7 Days
                            </option>

                            <option value="30days">
                                Last 30 Days
                            </option>
                        </select>

                        <Button
                            variant="outline"
                            onClick={fetchSubscribers}
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>

                    </div>


                    {loading ? (

                        <div className="py-16 text-center text-sm text-muted-foreground">
                            Loading subscribers...
                        </div>

                    ) : filteredSubscribers.length === 0 ? (

                        <div className="py-16 text-center text-sm text-muted-foreground">
                            No subscribers found.
                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-muted/40">

                                    <tr>

                                        <th className="px-5 py-3 text-left text-xs font-semibold">
                                            Email
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold">
                                            Phone
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold">
                                            Source
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold">
                                            Added
                                        </th>

                                        <th className="px-5 py-3 text-right text-xs font-semibold">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-border">

                                    {filteredSubscribers.map(
                                        (subscriber) => (

                                            <tr
                                                key={subscriber.id}
                                                className="hover:bg-muted/30"
                                            >

                                                <td className="px-5 py-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />

                                                        {subscriber.email}
                                                    </div>
                                                </td>


                                                <td className="px-5 py-3 text-sm text-muted-foreground">

                                                    {subscriber.phone ? (
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="h-3.5 w-3.5" />
                                                            {subscriber.phone}
                                                        </div>
                                                    ) : (
                                                        '—'
                                                    )}

                                                </td>


                                                <td className="px-5 py-3">

                                                    <span
                                                        className="
                              rounded-full
                              border
                              border-accent/20
                              bg-accent/10
                              px-2.5
                              py-1
                              text-xs
                              font-medium
                              text-accent
                            "
                                                    >
                                                        {subscriber.source ===
                                                            'website'
                                                            ? 'Website'
                                                            : 'Admin'}
                                                    </span>

                                                </td>


                                                <td className="px-5 py-3 text-xs text-muted-foreground">

                                                    {new Date(
                                                        subscriber.created_at
                                                    ).toLocaleDateString(
                                                        'en-PK'
                                                    )}

                                                </td>


                                                <td className="px-5 py-3 text-right">

                                                   <Button
  variant="ghost"
  size="sm"
  onClick={() => {
    setSubscriberToDelete(subscriber);
    setShowDeleteConfirm(true);
  }}
  className="
    text-destructive
    hover:bg-destructive/10
    hover:text-destructive
  "
>
  <Trash2 className="h-4 w-4" />
</Button>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

            {showDeleteConfirm && subscriberToDelete && (
  <div
    className="
      fixed
      inset-0
      z-[100]
      flex
      items-center
      justify-center
      bg-black/50
      p-4
      backdrop-blur-sm
    "
    onClick={() => {
      setShowDeleteConfirm(false);
      setSubscriberToDelete(null);
    }}
  >
    <div
      className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
        shadow-2xl
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* Red Accent */}
      <div
        className="
          h-1
          w-full
          bg-gradient-to-r
          from-red-500/40
          via-red-500
          to-red-500/40
        "
      />

      {/* Close */}
      <button
        type="button"
        onClick={() => {
          setShowDeleteConfirm(false);
          setSubscriberToDelete(null);
        }}
        className="
          absolute
          right-4
          top-4
          rounded-lg
          p-1.5
          text-muted-foreground
          transition
          hover:bg-muted
          hover:text-foreground
        "
      >
        <X className="h-4 w-4" />
      </button>

      <div className="p-6">

        {/* Icon */}
        <div
          className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-red-500/10
          "
        >
          <Trash2 className="h-5 w-5 text-red-500" />
        </div>

        {/* Heading */}
        <h3 className="text-lg font-bold text-foreground">
          Remove Subscriber?
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          Are you sure you want to remove this subscriber
          from the Daily Newswire?
        </p>

        {/* Subscriber */}
        <div
          className="
            mt-4
            rounded-xl
            border
            border-border
            bg-muted/40
            p-3
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-background
              "
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">

              <p className="text-xs text-muted-foreground">
                Subscriber
              </p>

              <p
                className="
                  truncate
                  text-sm
                  font-medium
                  text-foreground
                "
              >
                {subscriberToDelete.email}
              </p>

            </div>

          </div>
        </div>

        {/* Warning */}
        <p
          className="
            mt-3
            text-xs
            leading-relaxed
            text-muted-foreground
          "
        >
          This subscriber will no longer receive the
          Daily Newswire.
        </p>

        {/* Actions */}
        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowDeleteConfirm(false);
              setSubscriberToDelete(null);
            }}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={deleteSubscriber}
            className="
              bg-red-600
              text-white
              hover:bg-red-700
            "
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Subscriber
          </Button>
        </div>

      </div>
    </div>
  </div>
)}

        {showSendConfirm && (
  <div
    className="
      fixed
      inset-0
      z-[100]
      flex
      items-center
      justify-center
      bg-black/50
      p-4
      backdrop-blur-sm
    "
    onClick={() => setShowSendConfirm(false)}
  >
    <div
      className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
        shadow-2xl
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* Accent */}
      <div
        className="
          h-1
          w-full
          bg-gradient-to-r
          from-accent/60
          via-accent
          to-accent/60
        "
      />

      {/* Close */}
      <button
        type="button"
        onClick={() => setShowSendConfirm(false)}
        className="
          absolute
          right-4
          top-4
          rounded-lg
          p-1.5
          text-muted-foreground
          transition
          hover:bg-muted
          hover:text-foreground
        "
      >
        <X className="h-4 w-4" />
      </button>

      <div className="p-6">

        {/* Icon */}
        <div
          className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-accent/10
          "
        >
          <Send className="h-5 w-5 text-accent" />
        </div>

        {/* Heading */}
        <h3 className="text-lg font-bold text-foreground">
          Send Daily Newswire?
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          Today's Daily Newswire will be emailed to{' '}
          <span className="font-semibold text-foreground">
            {
              subscribers.filter(
                (subscriber) => subscriber.is_active
              ).length
            } active subscribers
          </span>
          .
        </p>

        {/* Info */}
        <div
          className="
            mt-4
            rounded-xl
            border
            border-border
            bg-muted/40
            p-3
          "
        >
          <div className="flex items-start gap-2">

            <Mail
              className="
                mt-0.5
                h-4
                w-4
                shrink-0
                text-accent
              "
            />

            <p className="text-xs leading-relaxed text-muted-foreground">
              Emails will be sent in the background.
              You can continue using the admin dashboard
              after starting the process.
            </p>

          </div>
        </div>

        {/* Buttons */}
        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSendConfirm(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={sendNewswire}
            className="
              bg-[#79AD14]
              text-white
              hover:bg-[#5E8410]
            "
          >
            <Send className="mr-2 h-4 w-4" />
            Send Newswire
          </Button>
        </div>

      </div>
    </div>
  </div>
)}
        
        </AdminLayout>
    );
}


function Summary({
    title,
    value,
    icon: Icon,
}) {
    return (
        <div
            className="
        rounded-xl
        border
        border-border
        bg-card
        p-4
      "
        >
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-xs text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-1 text-xl font-bold">
                        {value}
                    </p>
                </div>

                <div
                    className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-accent/10
          "
                >
                    <Icon className="h-4 w-4 text-accent" />
                </div>

            </div>
        </div>
    );
}


export default NewswireSubscribers;