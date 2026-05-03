import React, { useState } from 'react';
import { Upload, FileText, Calendar as CalendarIcon, X, Tag, AlignLeft, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function FormField({ label, required, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1 mt-1">
          <span className="h-1 w-1 rounded-full bg-destructive flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function ReportForm({ mode = 'create', initialData = null, onSuccess }) {
  const { authFetch } = useAdminAuth();

  const [formData, setFormData] = useState({
    reportType:   initialData?.report_type   || '',
    documentName: initialData?.document_name || '',
    description:  initialData?.description   || '',
    tagText:      initialData?.tag_text      || 'PMEX Report',
    reportDate:   initialData?.report_date   ? new Date(initialData.report_date) : null,
    reportMonth:  initialData?.report_month  || '',
    pdfFile:      null,
  });

  const [errors, setErrors]             = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive]     = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(
    initialData?.file_name ? initialData.file_name : ''
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.reportType)
      newErrors.reportType = 'Report type is required';
    if (mode === 'create' && !formData.pdfFile)
      newErrors.pdfFile = 'PDF file is required';
    if (formData.reportType === 'daily' && !formData.reportDate)
      newErrors.reportDate = 'Report date is required for daily reports';
    if (formData.reportType === 'monthly' && !formData.reportMonth)
      newErrors.reportMonth = 'Report month is required for monthly reports';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, pdfFile: 'Only PDF files are allowed' }));
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, pdfFile: 'File size must be less than 20MB' }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      pdfFile: file,
      documentName: prev.documentName || file.name.replace('.pdf', ''),
    }));
    setSelectedFileName(file.name);
    setErrors(prev => ({ ...prev, pdfFile: null }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const clearFile = () => {
    setFormData(prev => ({ ...prev, pdfFile: null }));
    setSelectedFileName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    setIsSubmitting(true);
    try {
      if (mode === 'create') {
        const data = new FormData();
        data.append('reportType',   formData.reportType);
        data.append('documentName', formData.documentName);
        data.append('description',  formData.description);
        data.append('tagText',      formData.tagText);
        data.append('pdfFile',      formData.pdfFile);
        if (formData.reportType === 'daily' && formData.reportDate)
          data.append('reportDate', format(formData.reportDate, 'yyyy-MM-dd'));
        if (formData.reportType === 'monthly' && formData.reportMonth)
          data.append('reportMonth', formData.reportMonth);

        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${API_URL}/api/reports`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        });
        const result = await res.json();
        if (!res.ok) { toast.error(result.error || 'Failed to upload report'); return; }
        toast.success('Report uploaded successfully');
      } else {
        const body = {
          documentName: formData.documentName,
          description:  formData.description,
          tagText:      formData.tagText,
          reportDate:   formData.reportDate ? format(formData.reportDate, 'yyyy-MM-dd') : null,
          reportMonth:  formData.reportMonth || null,
        };
        const res = await authFetch(`${API_URL}/api/reports/${initialData.id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
        });
        if (!res) return;
        const result = await res.json();
        if (!res.ok) { toast.error(result.error || 'Failed to update report'); return; }
        toast.success('Report updated successfully');
      }

      setFormData({
        reportType: '', documentName: '', description: '',
        tagText: 'PMEX Report', reportDate: null, reportMonth: '', pdfFile: null,
      });
      setSelectedFileName('');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(mode === 'create' ? 'Failed to upload report' : 'Failed to update report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Report Type */}
      <FormField label="Report Type" required error={errors.reportType}>
        <Select
          value={formData.reportType}
          onValueChange={(value) => setFormData(prev => ({ ...prev, reportType: value }))}
        >
          <SelectTrigger className={errors.reportType ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select report type..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily Report</SelectItem>
            <SelectItem value="monthly">Monthly Report</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      {/* PDF Upload — create only */}
      {mode === 'create' && (
        <FormField label="PDF File" required error={errors.pdfFile}>
          {selectedFileName ? (
            /* File selected state */
            <div className="flex items-center gap-3 p-4 rounded-xl border border-accent/30 bg-accent/5">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{selectedFileName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formData.pdfFile ? `${(formData.pdfFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="h-7 w-7 rounded-lg hover:bg-destructive/10 flex items-center justify-center
                  text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            /* Drop zone */
            <div
              className={`relative mt-1 rounded-xl border-2 border-dashed p-8 text-center
                transition-all duration-200 cursor-pointer
                ${dragActive
                  ? 'border-accent bg-accent/5 scale-[1.01]'
                  : errors.pdfFile
                    ? 'border-destructive bg-destructive/5'
                    : 'border-border hover:border-accent/50 hover:bg-muted/30'
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                id="file-upload"
              />
              <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Upload className={`h-6 w-6 transition-colors ${dragActive ? 'text-accent' : 'text-muted-foreground'}`} />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                {dragActive ? 'Drop your PDF here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-muted-foreground">PDF files only · Max 20MB</p>
            </div>
          )}
        </FormField>
      )}

      {/* Two-column grid for name + tag on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Document Name */}
        <FormField label="Document Name" error={errors.documentName}>
          <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="documentName"
              value={formData.documentName}
              onChange={(e) => setFormData(prev => ({ ...prev, documentName: e.target.value }))}
              placeholder="Auto-filled from filename"
              className="pl-9"
            />
          </div>
        </FormField>

        {/* Tag Text */}
        <FormField label="Tag Text" error={errors.tagText}>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="tagText"
              value={formData.tagText}
              onChange={(e) => setFormData(prev => ({ ...prev, tagText: e.target.value }))}
              placeholder="PMEX Report"
              className="pl-9"
            />
          </div>
        </FormField>
      </div>

      {/* Description */}
      <FormField label="Description" error={errors.description}>
        <div className="relative">
          <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Optional description..."
            rows={3}
            className="pl-9 resize-none"
          />
        </div>
      </FormField>

      {/* Daily — Date picker */}
      {formData.reportType === 'daily' && (
        <FormField label="Report Date" required error={errors.reportDate}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal
                  ${!formData.reportDate ? 'text-muted-foreground' : ''}
                  ${errors.reportDate ? 'border-destructive' : ''}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                {formData.reportDate ? format(formData.reportDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.reportDate}
                onSelect={(date) => setFormData(prev => ({ ...prev, reportDate: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormField>
      )}

      {/* Monthly — Month picker */}
      {formData.reportType === 'monthly' && (
        <FormField label="Report Month" required error={errors.reportMonth}>
          <Input
            id="reportMonth"
            type="month"
            value={formData.reportMonth}
            onChange={(e) => setFormData(prev => ({ ...prev, reportMonth: e.target.value }))}
            className={errors.reportMonth ? 'border-destructive' : ''}
          />
        </FormField>
      )}

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11 font-semibold"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
            {mode === 'create' ? 'Uploading...' : 'Updating...'}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {mode === 'create' ? <Upload className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
            {mode === 'create' ? 'Upload Report' : 'Update Report'}
          </span>
        )}
      </Button>

    </form>
  );
}

export default ReportForm;