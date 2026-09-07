import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Mail,
    MessageSquare,
    Phone,
    Send,
    UserRound,
} from 'lucide-react';

import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';

/*
  Set this to false in the future if you want this page to work
  as a normal contact/inquiry form without date and time selection.
*/
const ENABLE_SESSION_SCHEDULING = true;

/*
  30-minute sessions:
  9:00 AM–9:30 AM through 4:30 PM–5:00 PM.
*/
const TIME_SLOTS = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
];

function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function formatSelectedDate(date) {
    if (!date) return 'Choose a suitable date';

    return new Intl.DateTimeFormat('en-PK', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

function isSameDate(firstDate, secondDate) {
    if (!firstDate || !secondDate) return false;

    return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate()
    );
}

function isWeekend(date) {
    const day = date.getDay();

    return day === 0 || day === 6;
}

function BookOnlineSessionPage() {
    const today = useMemo(() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return currentDate;
    }, []);

    const [currentMonth, setCurrentMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingError, setBookingError] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsappNumber: '',
        profession: '',
        city: '',
        country: '',
        subject: '',
        message: '',
    });

    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];

        for (let emptyDay = 0; emptyDay < firstDayOfMonth; emptyDay += 1) {
            days.push(null);
        }

        for (let day = 1; day <= numberOfDaysInMonth; day += 1) {
            days.push(new Date(year, month, day));
        }

        return days;
    }, [currentMonth]);

    const monthLabel = new Intl.DateTimeFormat('en-PK', {
        month: 'long',
        year: 'numeric',
    }).format(currentMonth);

    const changeMonth = (direction) => {
        setCurrentMonth(
            (previousMonth) =>
                new Date(
                    previousMonth.getFullYear(),
                    previousMonth.getMonth() + direction,
                    1
                )
        );
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (ENABLE_SESSION_SCHEDULING && !selectedDate && !selectedTime) {
            setBookingError(
                'Please select both a session date and time before submitting.'
            );
            return;
        }

        if (ENABLE_SESSION_SCHEDULING && !selectedDate) {
            setBookingError('Please select a preferred session date.');
            return;
        }

        if (ENABLE_SESSION_SCHEDULING && !selectedTime) {
            setBookingError('Please select a preferred session time.');
            return;
        }

        setBookingError('');

        const apiBaseUrl =
            import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            whatsappNumber: formData.whatsappNumber.trim(),
            profession: formData.profession,
            city: formData.city.trim(),
            country: formData.country.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
        };

        /*
          Only booking mode sends sessionDate and sessionTime.
          When false, neither property exists in the request body.
        */
        if (ENABLE_SESSION_SCHEDULING) {
            payload.sessionDate = formatDateForInput(selectedDate);
            payload.sessionTime = selectedTime;
        }
        setSubmitted(true);

        try {
            const response = await fetch(`${apiBaseUrl}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const contentType = response.headers.get('content-type') || '';

            const result = contentType.includes('application/json')
                ? await response.json()
                : null;

            if (!response.ok || !result?.success) {
                throw new Error(
                    result?.error ||
                    `Unable to send your request. Server returned ${response.status}.`
                );
            }

        } catch (error) {
            console.error('Booking submission error:', error);

            setBookingError(
                error.message ||
                'Unable to send your request. Please try again later.'
            );
        }
    };

    const resetForm = () => {
        setSubmitted(false);
        setSelectedDate(null);
        setSelectedTime('');
        setBookingError('');

        setFormData({
            name: '',
            email: '',
            whatsappNumber: '',
            profession: '',
            city: '',
            country: '',
            subject: '',
            message: '',
        });

        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    return (
        <>
            <Helmet>
                <title>Book an Online Session | Right Vision Securities</title>
                <meta
                    name="description"
                    content="Book an online session with Right Vision Securities. Select a convenient date and time, then send us your inquiry."
                />
            </Helmet>

            <Navbar />

            <PageHero
                title="Schedule a conversation with us"
                subtitle="Share your details and select a preferred session time. Our team will review your request and confirm the appointment with you."
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Book an Online Session' },
                ]}
            />

            <section className="section-spacing bg-muted">
                <div className="container-custom">


                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className={`mx-auto grid max-w-7xl gap-6 lg:gap-8 ${ENABLE_SESSION_SCHEDULING
                            ? 'grid-cols-1 lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1fr)]'
                            : 'max-w-3xl grid-cols-1'
                            }`}
                    >
                        {/* ============================================================
                CALENDAR CARD
                Mobile/Tablet: appears first at top
                Desktop: appears in the left column
            ============================================================ */}
                        {ENABLE_SESSION_SCHEDULING && (
                            <div className="order-1 rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6 lg:p-7">
                                <div className="mb-6 flex items-center  gap-3">
                                    <div className="mb-0 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                                        <CalendarDays className="h-5 w-5 text-accent" />
                                    </div>

                                    <div>
                                        <h2 className="mb-0 text-xl font-bold text-foreground sm:text-2xl">
                                            Select date and time
                                        </h2>

                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Choose a preferred date and an available 30-minute time slot.
                                        </p>
                                    </div>

                                </div>

                                {/* Calendar */}
                                <div className="overflow-hidden rounded-xl border border-border/70">
                                    <div className="flex items-center justify-between border-b border-border/70 bg-muted/50 px-2 py-3 sm:px-4">
                                        <button
                                            type="button"
                                            onClick={() => changeMonth(-1)}
                                            aria-label="Show previous month"
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-card focus:outline-none focus:ring-2 focus:ring-accent/30"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>

                                        <p className="px-2 text-center text-sm font-bold text-foreground sm:text-base">
                                            {monthLabel}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => changeMonth(1)}
                                            aria-label="Show next month"
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-card focus:outline-none focus:ring-2 focus:ring-accent/30"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="bg-card p-2.5 sm:p-4">
                                        {/* Weekday labels */}
                                        <div className="mb-2 grid grid-cols-7 gap-1">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                                                (dayName) => (
                                                    <span
                                                        key={dayName}
                                                        className="py-1 text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground sm:text-xs"
                                                    >
                                                        <span className="sm:hidden">
                                                            {dayName.slice(0, 1)}
                                                        </span>

                                                        <span className="hidden sm:inline">{dayName}</span>
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        {/* Calendar date buttons */}
                                        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                                            {calendarDays.map((date, index) => {
                                                if (!date) {
                                                    return (
                                                        <div
                                                            key={`empty-${index}`}
                                                            aria-hidden="true"
                                                        />
                                                    );
                                                }

                                                const isPastDate = date < today;
                                                const isWeekendDate = isWeekend(date);
                                                const isUnavailable = isPastDate || isWeekendDate;
                                                const isSelected = isSameDate(date, selectedDate);
                                                const isToday = isSameDate(date, today);

                                                return (
                                                    <button
                                                        key={formatDateForInput(date)}
                                                        type="button"
                                                        disabled={isUnavailable}
                                                        onClick={() => {
                                                            setSelectedDate(date);
                                                            setBookingError('');
                                                        }}
                                                        aria-label={
                                                            isWeekendDate
                                                                ? `${formatSelectedDate(date)} — unavailable, weekends are closed`
                                                                : formatSelectedDate(date)
                                                        }
                                                        aria-pressed={isSelected}
                                                        className={`flex aspect-square min-h-8 items-center justify-center rounded-md text-[11px] font-semibold transition-all sm:min-h-10 sm:rounded-lg sm:text-sm ${isSelected
                                                            ? 'bg-accent text-accent-foreground shadow-sm'
                                                            : isUnavailable
                                                                ? 'cursor-not-allowed text-muted-foreground/35 line-through'
                                                                : isToday
                                                                    ? 'border border-accent text-accent hover:bg-accent/10'
                                                                    : 'text-foreground hover:bg-muted'
                                                            }`}
                                                    >
                                                        {date.getDate()}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Time slots */}
                                <div className="mt-5 sm:mt-6">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Clock3 className="h-4 w-4 text-accent" />

                                        <p className="text-sm font-bold text-foreground">
                                            Available time slots
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                                        {TIME_SLOTS.map((time) => {
                                            const isActive = selectedTime === time;

                                            return (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedTime(time);
                                                        setBookingError('');
                                                    }}
                                                    aria-pressed={isActive}
                                                    className={`min-h-11 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-all sm:px-3 ${isActive
                                                        ? 'border-accent bg-accent text-accent-foreground shadow-sm'
                                                        : 'border-border bg-background text-foreground hover:border-accent/50 hover:bg-accent/5'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                
                            </div>
                        )}

                        {/* ============================================================
                CONTACT FORM CARD
                Mobile/Tablet: below calendar
                Desktop: right column
            ============================================================ */}
                        <div
                            className={`rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-7 lg:p-8 ${ENABLE_SESSION_SCHEDULING ? 'order-2' : 'order-1'
                                }`}
                        >
                            {submitted ? (
                                <div className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center">
                                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
                                        <Check className="h-8 w-8 text-accent" />
                                    </div>

                                    <p className="mb-2 text-xl font-bold text-foreground">
                                        Your request has been received
                                    </p>

                                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                                        Thank you for contacting Right Vision Securities. Our team will
                                        review your request and get back to you shortly.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="mt-7 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                                    >
                                        Send another request
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-7 flex items-center gap-3 ">
                                        <div className="mb-0 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                                            <MessageSquare className="h-5 w-5 text-accent" />
                                        </div>
                                        <div>
                                            <h2 className="mb-0 text-xl font-bold text-foreground sm:text-2xl">
                                            Your details
                                        </h2>

                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Tell us how we can help. All fields are required.
                                        </p>
                                        </div>


                                        
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            {/* Full name */}
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="mb-2 block text-sm font-semibold text-foreground"
                                                >
                                                    Full name
                                                </label>

                                                <div className="relative">
                                                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleFieldChange}
                                                        placeholder="Enter your full name"
                                                        className="h-12 w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-2 block text-sm font-semibold text-foreground"
                                                >
                                                    Email address
                                                </label>

                                                <div className="relative">
                                                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleFieldChange}
                                                        placeholder="you@example.com"
                                                        className="h-12 w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                                                    />
                                                </div>
                                            </div>

                                            {/* WhatsApp number */}
                                            <div>
                                                <label
                                                    htmlFor="whatsappNumber"
                                                    className="mb-2 block text-sm font-semibold text-foreground"
                                                >
                                                    WhatsApp number
                                                </label>

                                                <div className="relative">
                                                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                                    <input
                                                        id="whatsappNumber"
                                                        name="whatsappNumber"
                                                        type="tel"
                                                        required
                                                        value={formData.whatsappNumber}
                                                        onChange={handleFieldChange}
                                                        placeholder="+92 300 1234567"
                                                        inputMode="tel"
                                                        autoComplete="tel"
                                                        className="h-12 w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                                                    />
                                                </div>
                                            </div>

                                            {/* Profession */}
                                            <div>
                                                <label
                                                    htmlFor="profession"
                                                    className="mb-2 block text-sm font-semibold text-foreground"
                                                >
                                                    Profession
                                                </label>

                                                <select
                                                    id="profession"
                                                    name="profession"
                                                    required
                                                    value={formData.profession}
                                                    onChange={handleFieldChange}
                                                    className="h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                                                >
                                                    <option value="" disabled>
                                                        Select your profession
                                                    </option>
                                                    <option value="Student">Student</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Service">Service</option>
                                                    <option value="Household">Household</option>
                                                    <option value="Retired">Retired</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>

                                            {/* City */}
                                            <div>
                                                <label
                                                    htmlFor="city"
                                                    className="mb-2 block text-sm font-semibold text-foreground"
                                                >
                                                    City
                                                </label>

                                                <input
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    required
                                                    value={formData.city}
                                                    onChange={handleFieldChange}
                                                    placeholder="For example: Lahore"
                                                    autoComplete="address-level2"
                                                    className="h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                                                />
                                            </div>

                                            {/* Country */}
                                            <div>
                                                <label
                                                    htmlFor="country"
                                                    className="mb-2 block text-sm font-semibold text-foreground"
                                                >
                                                    Country
                                                </label>

                                                <input
                                                    id="country"
                                                    name="country"
                                                    type="text"
                                                    required
                                                    value={formData.country}
                                                    onChange={handleFieldChange}
                                                    placeholder="For example: Pakistan"
                                                    autoComplete="country-name"
                                                    className="h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="mb-2 block text-sm font-semibold text-foreground"
                                            >
                                                Subject
                                            </label>

                                            <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                required
                                                value={formData.subject}
                                                onChange={handleFieldChange}
                                                placeholder="For example: Account opening or trading inquiry"
                                                className="h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="mb-2 block text-sm font-semibold text-foreground"
                                            >
                                                Message
                                            </label>

                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleFieldChange}
                                                placeholder="Briefly tell us what you would like to discuss..."
                                                className="min-h-36 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-base leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                                            />
                                        </div>

                                        {/* Date and time are sent with the form only when scheduling is enabled */}
                                        {ENABLE_SESSION_SCHEDULING && (
                                            <>
                                                <input
                                                    type="hidden"
                                                    name="sessionDate"
                                                    value={
                                                        selectedDate
                                                            ? formatDateForInput(selectedDate)
                                                            : ''
                                                    }
                                                />

                                                <input
                                                    type="hidden"
                                                    name="sessionTime"
                                                    value={selectedTime}
                                                />

                                                {bookingError && (
                                                    <div
                                                        role="alert"
                                                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                                                    >
                                                        {bookingError}
                                                    </div>
                                                )}
                                            </>
                                        )}

                                       {/* Selected session summary — displayed immediately above submit button */}
{ENABLE_SESSION_SCHEDULING && (
    <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
        <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <CalendarDays className="h-4 w-4 text-accent" />
            </div>

            <div>
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent sm:text-xs">
                    Your preferred session
                </p>

                <p className="text-sm font-semibold text-foreground">
                    {selectedDate
                        ? formatSelectedDate(selectedDate)
                        : 'No date selected'}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    {selectedTime
                        ? `${selectedTime} — 30-minute session`
                        : 'No time selected'}
                </p>
            </div>
        </div>
    </div>
)}

<button
    type="submit"
    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition-all duration-300 hover:bg-accent/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
>
    <Send className="h-4 w-4" />

    {ENABLE_SESSION_SCHEDULING
        ? 'Request online session'
        : 'Send message'}
</button>

                                        <p className="text-center text-xs leading-relaxed text-muted-foreground">
                                            By submitting this form, you agree to be contacted by Right
                                            Vision Securities regarding your inquiry.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default BookOnlineSessionPage;