import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, ToggleLeft, ToggleRight, Shield, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';
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
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const res = await authFetch(`${API_URL}/api/users/admins`);
      if (!res) return;

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to load admins');
        return;
      }

      setAdmins(data.admins);
    } catch (err) {
      toast.error('Failed to load admins');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = 'Full name is required';
    if (!form.email.trim())    errors.email    = 'Email is required';
    if (!form.password)        errors.password = 'Password is required';
    if (form.password.length < 8) errors.password = 'Password must be at least 8 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await authFetch(`${API_URL}/api/users/admins`, {
        method: 'POST',
        body: JSON.stringify({
          fullName: form.fullName,
          email:    form.email,
          password: form.password,
        }),
      });

      if (!res) return;
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to create admin');
        return;
      }

      toast.success(`Admin "${form.fullName}" created successfully`);
      setForm({ fullName: '', email: '', password: '' });
      setIsCreateOpen(false);
      fetchAdmins();
    } catch (err) {
      toast.error('Failed to create admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (admin) => {
    try {
      const res = await authFetch(`${API_URL}/api/users/admins/${admin.id}/toggle`, {
        method: 'PATCH',
      });

      if (!res) return;
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to update status');
        return;
      }

      toast.success(`${admin.full_name} ${data.admin.is_active ? 'activated' : 'deactivated'}`);
      fetchAdmins();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deletingAdmin) return;
    setIsDeleting(true);

    try {
      const res = await authFetch(`${API_URL}/api/users/admins/${deletingAdmin.id}`, {
        method: 'DELETE',
      });

      if (!res) return;
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to delete admin');
        return;
      }

      toast.success(`${deletingAdmin.full_name} deleted successfully`);
      setDeletingAdmin(null);
      fetchAdmins();
    } catch (err) {
      toast.error('Failed to delete admin');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return 'Never';
    try { return format(new Date(d), 'MMM dd, yyyy'); }
    catch { return d; }
  };

  return (
    <AdminLayout>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Manage Admins</h2>
              <p className="text-muted-foreground">Create and manage admin accounts</p>
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

      {/* Admins List */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
        </div>
      ) : admins.length === 0 ? (
        <div className="bg-card rounded-xl p-12 border border-border text-center">
          <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No admins yet</h3>
          <p className="text-muted-foreground mb-6">Create your first admin account</p>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-accent" />
                        </div>
                        {admin.full_name}
                      </div>
                    </td>
                    <td className="text-muted-foreground text-sm">{admin.email}</td>
                    <td>
                      <Badge variant={admin.is_active ? 'default' : 'secondary'}>
                        {admin.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="text-sm text-muted-foreground">
                      {formatDate(admin.last_login)}
                    </td>
                    <td className="text-sm text-muted-foreground">
                      {formatDate(admin.created_at)}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggle(admin)}
                          title={admin.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {admin.is_active
                            ? <ToggleRight className="h-4 w-4 text-accent" />
                            : <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                          }
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeletingAdmin(admin)}
                          className="text-destructive hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
      <Dialog open={isCreateOpen} onOpenChange={(o) => { setIsCreateOpen(o); setFormErrors({}); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-accent" />
              Create New Admin
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 mt-2">
            <div>
              <Label>Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm(p => ({ ...p, fullName: e.target.value }))}
                  placeholder="John Doe"
                  className={`pl-9 ${formErrors.fullName ? 'border-destructive' : ''}`}
                />
              </div>
              {formErrors.fullName && <p className="text-xs text-destructive mt-1">{formErrors.fullName}</p>}
            </div>

            <div>
              <Label>Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@rightvision.com"
                  className={`pl-9 ${formErrors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Min. 8 characters"
                  className={formErrors.password ? 'border-destructive' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {formErrors.password && <p className="text-xs text-destructive mt-1">{formErrors.password}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isSubmitting ? 'Creating...' : 'Create Admin'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingAdmin} onOpenChange={() => setDeletingAdmin(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete admin account?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deletingAdmin?.full_name}</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeletingAdmin(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </AdminLayout>
  );
}

export default ManageAdmins;