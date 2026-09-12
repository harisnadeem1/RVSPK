import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  Mail,
  Phone,
  ShieldCheck,
  TrendingUp,
  UserRound,
} from 'lucide-react';

import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const API_URL = import.meta.env.VITE_API_URL;
const PMEX_DEMO_TERMINAL_URL = 'https://demotrade.pmex.com.pk/terminal';

export default function OpenDemoAccount() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    /*
      Show success feedback immediately. The API request continues in the
      background, allowing the backend to generate and email credentials
      without keeping the user on the form.
    */
    setSubmitted(true);

    fetch(`${API_URL}/api/demo-accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));

          throw new Error(
            data.message || 'Unable to create the demo account request.'
          );
        }
      })
      .catch((error) => {
        console.error('Demo account error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitAnotherRequest = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });

    setSubmitted(false);
    setLoading(false);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Practice trading',
      description:
        'Explore the PMEX trading environment and familiarize yourself with market activity.',
    },
    {
      icon: ShieldCheck,
      title: 'No financial risk',
      description:
        'Learn platform features and test your understanding before opening a live account.',
    },
    {
      icon: Clock3,
      title: 'Quick account setup',
      description:
        'Your demo credentials are generally sent to your email within 2–3 minutes.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Open Demo Account - Right Vision Securities</title>

        <meta
          name="description"
          content="Request a PMEX demo trading account from Right Vision Securities and receive your demo credentials by email."
        />
      </Helmet>

      <Navbar />

      <PageHero
        title="Open Demo Account"
        subtitle="Experience the PMEX trading environment with a demo account from Right Vision Securities"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Demo Account' },
        ]}
      />

      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left side: Demo information */}
            <motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="order-2 lg:order-1 lg:sticky lg:top-28"
>
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Practice With Confidence
              </span>

              <h2 className="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                Start your trading journey with a demo account
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Request your PMEX demo account to explore the trading platform,
                understand market movements, and become familiar with the
                trading process before getting started.
              </p>

              

              {/* Existing support card */}
              <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Already have an account or need assistance? Contact our team
                    at{' '}
                    <a
                      href="mailto:hello@rvspk.com"
                      className="font-semibold text-accent hover:underline"
                    >
                      hello@rvspk.com
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* PMEX Demo Terminal login card */}
              <div className="mt-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <ExternalLink className="h-5 w-5 text-accent" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      Already have demo credentials?
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Open the PMEX Demo Trading Terminal, enter your Login and
                      Password and click{' '}
                      <span className="font-medium text-foreground">
                        “Connect to account”
                      </span>
                      .
                    </p>

                    <a
                      href={PMEX_DEMO_TERMINAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                    >
                      Open PMEX Demo Terminal
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: Form / Success state */}
           <motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="order-1 lg:order-2"
>
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10">
                {!submitted ? (
                  <>
                    <div className="mb-8">
                      <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        Request Demo Access
                      </span>

                      <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                        Create your demo account
                      </h2>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Enter your details below. Your demo trading credentials
                        will be sent to your email address.
                      </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-sm font-medium text-foreground"
                          >
                            First Name
                          </Label>

                          <Input
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={update}
                            placeholder="Enter first name"
                            autoComplete="given-name"
                            required
                            disabled={loading}
                            className="h-11 bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-sm font-medium text-foreground"
                          >
                            Last Name
                          </Label>

                          <Input
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={update}
                            placeholder="Enter last name"
                            autoComplete="family-name"
                            required
                            disabled={loading}
                            className="h-11 bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email Address
                        </Label>

                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={update}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            disabled={loading}
                            className="h-11 bg-background pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-foreground"
                        >
                          Phone Number
                        </Label>

                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={update}
                            placeholder="+92 3XX XXXXXXX"
                            autoComplete="tel"
                            required
                            disabled={loading}
                            className="h-11 bg-background pl-10"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="h-12 w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        {loading
                          ? 'Submitting Request...'
                          : 'Open Demo Account'}
                      </Button>

                      <p className="text-center text-xs leading-relaxed text-muted-foreground">
                        By submitting this form, you confirm that the information
                        provided is accurate.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="py-4 text-center sm:py-8"
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                      <CheckCircle2 className="h-8 w-8 text-accent" />
                    </div>

                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Request Submitted
                    </span>

                    <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                      Your demo account request is being processed
                    </h2>

                    <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Please wait approximately{' '}
                      <strong className="font-semibold text-foreground">
                        2–3 minutes
                      </strong>
                      . Your PMEX demo trading credentials will be sent to:
                    </p>

                    <div className="my-6 rounded-xl border border-accent/20 bg-accent/5 px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="h-4 w-4 text-accent" />

                        <p className="break-all text-sm font-semibold text-foreground">
                          {form.email}
                        </p>
                      </div>
                    </div>

                    {/* Inbox / spam reminder */}
                    <div className="rounded-xl border border-border/60 bg-muted p-5 text-left">
                      <div className="flex gap-3">
                        <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />

                        <div>
                          <p className="mb-1 text-sm font-semibold text-foreground">
                            Important: check your inbox
                          </p>

                          <p className="text-sm leading-relaxed text-muted-foreground">
                            If you do not receive your credentials within a few
                            minutes, please check your Spam, Junk, or Promotions
                            folder as well.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* PMEX login instructions after credentials arrive */}
                    <div className="mt-4 rounded-xl border border-accent/20 bg-accent/5 p-5 text-left">
                      <div className="flex gap-3">
                        <ExternalLink className="mt-0.5 h-5 w-5 shrink-0 text-accent" />

                        <div className="min-w-0">
                          <p className="mb-1 text-sm font-semibold text-foreground">
                            Where to log in
                          </p>

                          <p className="text-sm leading-relaxed text-muted-foreground">
                            Once you receive your credentials, open the PMEX
                            Demo Trading Terminal. Enter your Login and
                            Password, select{' '}
                            <span className="font-medium text-foreground">
                              PMEX-Demo
                            </span>
                            , then click{' '}
                            <span className="font-medium text-foreground">
                              “Connect to account”
                            </span>
                            .
                          </p>

                          <a
                            href={PMEX_DEMO_TERMINAL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 sm:w-auto"
                          >
                            Open PMEX Demo Terminal
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="mailto:hello@rvspk.com"
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <Mail className="h-4 w-4" />
                        Contact Support
                      </a>

                      <Button
                        type="button"
                        onClick={submitAnotherRequest}
                        variant="outline"
                        className="h-11 flex-1 rounded-xl"
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-center">
                <UserRound className="h-4 w-4 text-muted-foreground" />

                <p className="text-xs text-muted-foreground">
                  Need help? Call us at{' '}
                  <a
                    href="tel:+923108248717"
                    className="font-medium text-accent hover:underline"
                  >
                    +92 310 8248717
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}