import React, { useEffect, useState } from 'react';
import {
  Mail,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const API_URL = import.meta.env.VITE_API_URL;

function NewswireSubscribePopup() {
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const alreadySubscribed = localStorage.getItem(
      'rvspk_newswire_subscribed'
    );

    if (alreadySubscribed === 'true') {
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Only allow digits in phone field
  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');

    setPhone(digitsOnly);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    // Required validation
    if (!cleanEmail || !cleanPhone) {
      setError('Email and phone number are required.');
      return;
    }

    // Email validation
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(cleanEmail)) {
      setError(
        'Please enter a valid email address, for example name@gmail.com.'
      );
      return;
    }

    // Phone validation
    if (!/^\d+$/.test(cleanPhone)) {
      setError('Phone number must contain digits only.');
      return;
    }

    // Basic length validation
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      setError(
        'Please enter a valid phone number between 7 and 15 digits.'
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/newswire/subscribe`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email: cleanEmail,
            phone: cleanPhone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Subscription failed.'
        );
      }

      // Remember this device
      localStorage.setItem(
        'rvspk_newswire_subscribed',
        'true'
      );

      // Remove values
      setEmail('');
      setPhone('');

      // Replace form with success state
      setSubscribed(true);

      // Automatically close popup
      setTimeout(() => {
        setVisible(false);
      }, 2500);

    } catch (err) {
      setError(
        err.message ||
          'Something went wrong. Please try again.'
      );

    } finally {
      setLoading(false);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-4
        right-4
        z-[60]
        w-[calc(100%-2rem)]
        max-w-sm
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-card
          shadow-2xl
        "
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
        {!subscribed && (
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Close subscription popup"
            className="
              absolute
              right-3
              top-4
              rounded-lg
              p-1.5
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="p-5">

          {/* ============================== */}
          {/* SUCCESS STATE */}
          {/* ============================== */}

          {subscribed ? (
            <div className="py-4 text-center">

              <div
                className="
                  mx-auto
                  mb-3
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-green-500/10
                "
              >
                <CheckCircle2
                  className="
                    h-6
                    w-6
                    text-green-600
                  "
                />
              </div>

              <h3
                className="
                  text-base
                  font-bold
                  text-foreground
                "
              >
                Successfully Subscribed!
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-[280px]
                  text-sm
                  leading-relaxed
                  text-muted-foreground
                "
              >
                You are now subscribed to the Daily Newswire.
              </p>

            </div>
          ) : (
            <>
              {/* ============================== */}
              {/* HEADER */}
              {/* ============================== */}

              <div className="mb-4 flex items-start gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-accent/10
                  "
                >
                  <Mail className="h-5 w-5 text-accent" />
                </div>

                <div className="pr-6">

                  <h3
                    className="
                      text-base
                      font-bold
                      text-foreground
                    "
                  >
                    Daily Newswire
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-relaxed
                      text-muted-foreground
                    "
                  >
                    Receive our Daily Newswire directly
                    in your inbox.
                  </p>

                </div>
              </div>

              {/* ============================== */}
              {/* FORM */}
              {/* ============================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-3"
              >

                {/* Email */}
                <div>
                  <label
                    htmlFor="newswire-email"
                    className="
                      mb-1.5
                      block
                      text-xs
                      font-medium
                      text-foreground
                    "
                  >
                    Email Address{' '}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <Input
                    id="newswire-email"
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);

                      if (error) {
                        setError('');
                      }
                    }}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="newswire-phone"
                    className="
                      mb-1.5
                      block
                      text-xs
                      font-medium
                      text-foreground
                    "
                  >
                    Phone Number{' '}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <Input
                    id="newswire-phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="03001234567"
                    value={phone}
                    onChange={(e) => {
                      handlePhoneChange(e);

                      if (error) {
                        setError('');
                      }
                    }}
                    autoComplete="tel"
                    minLength={7}
                    maxLength={15}
                    required
                  />
                </div>

                {/* Error */}
                {error && (
                  <p
                    className="
                      rounded-lg
                      bg-destructive/10
                      px-3
                      py-2
                      text-xs
                      text-destructive
                    "
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    bg-[#79AD14]
                    text-white
                    hover:bg-[#5E8410]
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        className="
                          mr-2
                          h-4
                          w-4
                          animate-spin
                        "
                      />

                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Subscribe to Daily Newswire
                    </>
                  )}
                </Button>

              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default NewswireSubscribePopup;