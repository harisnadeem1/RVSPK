import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Shield,
  Mail,
  User
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import { toast } from 'sonner';
import { format } from 'date-fns';

import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function ManageAdmins() {
  const { authFetch } = useAdminAuth();

  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  // ─────────────────────────────────────────────
  // Fetch Admins
  // ─────────────────────────────────────────────

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);

      const res = await authFetch(
        `${API_URL}/api/users/admins`
      );

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.error || 'Failed to load admins'
        );
        return;
      }

      setAdmins(data.admins || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load admins');
    } finally {
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  // Validate Create Form
  // ─────────────────────────────────────────────

  const validateForm = () => {
    const errors = {};

    if (!form.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required';
    }

    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 8) {
      errors.password =
        'Password must be at least 8 characters';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // ─────────────────────────────────────────────
  // Create Admin
  // ─────────────────────────────────────────────

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await authFetch(
        `${API_URL}/api/users/admins`,
        {
          method: 'POST',
          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            password: form.password
          })
        }
      );

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.error || 'Failed to create admin'
        );
        return;
      }

      toast.success(
        `Admin "${form.fullName}" created successfully`
      );

      setForm({
        fullName: '',
        email: '',
        password: ''
      });

      setFormErrors({});
      setShowPassword(false);
      setIsCreateOpen(false);

      fetchAdmins();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────
  // Enable / Disable Admin
  // ─────────────────────────────────────────────

  const handleToggle = async (admin) => {
    try {
      const res = await authFetch(
        `${API_URL}/api/users/admins/${admin.id}/toggle`,
        {
          method: 'PATCH'
        }
      );

      if (!res) return;

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.error || 'Failed to update status'
        );
        return;
      }

      toast.success(
        `${admin.full_name} ${
          data.admin.is_active
            ? 'activated'
            : 'deactivated'
        }`
      );

      fetchAdmins();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  // ─────────────────────────────────────────────
  // Format Date
  // ─────────────────────────────────────────────

  const formatDate = (date) => {
    if (!date) return 'Never';

    try {
      return format(
        new Date(date),
        'MMM dd, yyyy'
      );
    } catch {
      return date;
    }
  };

  return (
    <AdminLayout>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Manage Admins
              </h2>

              <p className="text-sm text-muted-foreground">
                Create and manage admin accounts
              </p>
            </div>

          </div>

          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            New Admin
          </Button>

        </div>
      </div>

      {/* Admin List */}

      {isLoading ? (

        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent border-t-transparent" />
        </div>

      ) : admins.length === 0 ? (

        <div className="bg-card rounded-xl p-12 border border-border text-center">

          <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-7 w-7 text-accent" />
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-1">
            No admins yet
          </h3>

          <p className="text-sm text-muted-foreground mb-5">
            Create your first admin account.
          </p>

          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Create Admin
          </Button>

        </div>

      ) : (

        <div className="bg-card rounded-xl border border-border overflow-hidden">

          <div className="overflow-x-auto">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Created</th>
                  <th>Access</th>
                </tr>
              </thead>

              <tbody>

                {admins.map((admin) => (

                  <tr key={admin.id}>

                    {/* Name */}
                    <td className="font-medium">

                      <div className="flex items-center gap-2">

                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-accent" />
                        </div>

                        <span>
                          {admin.full_name}
                        </span>

                      </div>

                    </td>

                    {/* Email */}
                    <td className="text-muted-foreground text-sm">
                      {admin.email}
                    </td>

                    {/* Status */}
                    <td>

                      <Badge
                        variant={
                          admin.is_active
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {admin.is_active
                          ? 'Active'
                          : 'Inactive'}
                      </Badge>

                    </td>

                    {/* Last Login */}
                    <td className="text-sm text-muted-foreground">
                      {formatDate(admin.last_login)}
                    </td>

                    {/* Created */}
                    <td className="text-sm text-muted-foreground">
                      {formatDate(admin.created_at)}
                    </td>

                    {/* Access */}
                    <td>

                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          role="switch"
                          aria-checked={admin.is_active}
                          onClick={() => handleToggle(admin)}
                          title={
                            admin.is_active
                              ? 'Deactivate admin'
                              : 'Activate admin'
                          }
                          className={`
                            relative
                            inline-flex
                            h-6
                            w-11
                            shrink-0
                            cursor-pointer
                            items-center
                            rounded-full
                            transition-colors
                            duration-200
                            focus:outline-none
                            focus:ring-2
                            focus:ring-accent/30
                            ${
                              admin.is_active
                                ? 'bg-accent'
                                : 'bg-muted-foreground/25'
                            }
                          `}
                        >

                          <span
                            className={`
                              block
                              h-5
                              w-5
                              rounded-full
                              bg-white
                              shadow-sm
                              transition-transform
                              duration-200
                              ${
                                admin.is_active
                                  ? 'translate-x-[22px]'
                                  : 'translate-x-0.5'
                              }
                            `}
                          />

                        </button>

                        <span
                          className={`
                            text-xs
                            font-medium
                            ${
                              admin.is_active
                                ? 'text-accent'
                                : 'text-muted-foreground'
                            }
                          `}
                        >
                          {admin.is_active
                            ? 'Enabled'
                            : 'Disabled'}
                        </span>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* Create Admin Dialog */}

      <Dialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          setFormErrors({});

          if (!open) {
            setShowPassword(false);
          }
        }}
      >

        <DialogContent className="max-w-md">

          <DialogHeader>

            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-accent" />
              Create New Admin
            </DialogTitle>

          </DialogHeader>

          <form
            onSubmit={handleCreate}
            className="space-y-4 mt-2"
          >

            {/* Full Name */}

            <div>

              <Label>Full Name</Label>

              <div className="relative mt-1">

                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  value={form.fullName}
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      fullName: e.target.value
                    }))
                  }
                  placeholder="Abdullah"
                  className={`pl-9 ${
                    formErrors.fullName
                      ? 'border-destructive'
                      : ''
                  }`}
                />

              </div>

              {formErrors.fullName && (
                <p className="text-xs text-destructive mt-1">
                  {formErrors.fullName}
                </p>
              )}

            </div>

            {/* Email */}

            <div>

              <Label>Email</Label>

              <div className="relative mt-1">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      email: e.target.value
                    }))
                  }
                  placeholder="admin@rightvision.com"
                  className={`pl-9 ${
                    formErrors.email
                      ? 'border-destructive'
                      : ''
                  }`}
                />

              </div>

              {formErrors.email && (
                <p className="text-xs text-destructive mt-1">
                  {formErrors.email}
                </p>
              )}

            </div>

            {/* Password */}

            <div>

              <Label>Password</Label>

              <div className="relative mt-1">

                <Input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={form.password}
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      password: e.target.value
                    }))
                  }
                  placeholder="Min. 8 characters"
                  className={`pr-16 ${
                    formErrors.password
                      ? 'border-destructive'
                      : ''
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(prev => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword
                    ? 'Hide'
                    : 'Show'}
                </button>

              </div>

              {formErrors.password && (
                <p className="text-xs text-destructive mt-1">
                  {formErrors.password}
                </p>
              )}

            </div>

            {/* Buttons */}

            <div className="flex gap-3 pt-2">

              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() =>
                  setIsCreateOpen(false)
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isSubmitting
                  ? 'Creating...'
                  : 'Create Admin'}
              </Button>

            </div>

          </form>

        </DialogContent>

      </Dialog>

    </AdminLayout>
  );
}

export default ManageAdmins;