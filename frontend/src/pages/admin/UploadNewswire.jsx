import React, { useRef, useState } from 'react';
import { Upload, Info, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

function UploadNewswire() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { authFetch } = useAdminAuth();

  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 20 * 1024 * 1024;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setError('');
    setSuccess('');

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      event.target.value = '';
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('PDF file must be smaller than 20MB.');
      event.target.value = '';
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setError('');
    setSuccess('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    try {
      setUploading(true);
      setError('');
      setSuccess('');

      const formData = new FormData();

      formData.append('pdfFile', file);

      const response = await authFetch(
  `${import.meta.env.VITE_API_URL}/api/admin/notifications/daily-newswire`,
  {
    method: 'POST',
    body: formData,
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to upload Daily Newswire.'
        );
      }

      setSuccess('Daily Newswire PDF replaced successfully.');
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Newswire Upload Error:', err);

      setError(
        err.message || 'Something went wrong while uploading the PDF.'
      );
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 MB';

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">

            <div className="h-10 w-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Upload className="h-5 w-5 text-accent" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                Upload Daily Newswire
              </h2>

              <p className="text-sm text-muted-foreground">
                Replace the current Daily Newswire PDF
              </p>
            </div>

          </div>
        </div>

        {/* Upload Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">

          <div className="h-1 w-full bg-gradient-to-r from-accent/60 via-accent to-accent/60" />

          <div className="p-5 sm:p-8">

            <div className="mb-5">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Daily Newswire PDF
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent/60 hover:bg-accent/5 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="h-12 w-12 mx-auto mb-3 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-accent" />
                </div>

                <p className="text-sm font-medium text-foreground">
                  Click to select a PDF
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  PDF only, maximum file size 20MB
                </p>
              </div>
            </div>

            {/* Selected File */}
            {file && (
              <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 p-4">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  disabled={uploading}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />

                <p className="text-sm text-destructive">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-5 flex items-start gap-2 rounded-xl border border-green-500/20 bg-green-500/5 p-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />

                <p className="text-sm text-green-600">
                  {success}
                </p>
              </div>
            )}

            {/* Upload Button */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload className="h-4 w-4" />

              {uploading
                ? 'Uploading...'
                : 'Replace Daily Newswire'}
            </button>

          </div>
        </div>

        {/* Guidelines */}
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4 sm:p-5">

          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-accent flex-shrink-0" />

            <h3 className="text-sm font-semibold text-foreground">
              Upload Guidelines
            </h3>
          </div>

          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {[
              'Only PDF files are accepted',
              'Maximum allowed file size is 20MB',
              'Uploading a new PDF will replace the current Daily Newswire',
             
            ].map((guideline, i) => (
              <li
                key={i}
                className="flex items-start gap-2"
              >
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />

                {guideline}
              </li>
            ))}
          </ul>

        </div>

      </div>
    </AdminLayout>
  );
}

export default UploadNewswire;