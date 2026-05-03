import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
      setPassword('');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-secondary p-4 relative overflow-hidden">

      {/* Background decorative circles */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-[-150px] w-[250px] h-[250px] rounded-full bg-accent/10 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/80 to-accent/40" />

          <div className="p-8 sm:p-10">

            {/* Logo + Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/rvspk_logo.png"
                  alt="Right Vision Securities"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                Admin Portal
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to access the dashboard
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@rightvision.com"
                    className="pl-10 h-12 bg-muted/40 border-border/60 focus:border-accent"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 bg-muted/40 border-border/60 focus:border-accent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold mt-2 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-60 disabled:translate-y-0"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>

            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border/40 text-center">
              <p className="text-xs text-muted-foreground/70">
                🔒 Authorized personnel only · Right Vision Securities
              </p>
            </div>

          </div>
        </div>

        {/* Below card note */}
        <p className="text-center text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} Right Vision Securities. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;