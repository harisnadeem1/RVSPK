
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { format } from 'date-fns';
import pb from '@/lib/pocketbaseClient.js';

function ReportForm({ mode = 'create', initialData = null, onSuccess }) {
  const [formData, setFormData] = useState({
    reportType: initialData?.reportType || '',
    documentName: initialData?.documentName || '',
    description: initialData?.description || '',
    tagText: initialData?.tagText || 'PMEX Report',
    reportDate: initialData?.reportDate ? new Date(initialData.reportDate) : null,
    reportMonth: initialData?.reportMonth || '',
    pdfFile: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(
    initialData?.pdfFile ? 'Current file: ' + initialData.pdfFile : ''
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.reportType) {
      newErrors.reportType = 'Report type is required';
    }

    if (mode === 'create' && !formData.pdfFile) {
      newErrors.pdfFile = 'PDF file is required';
    }

    if (formData.reportType === 'daily' && !formData.reportDate) {
      newErrors.reportDate = 'Report date is required for daily reports';
    }

    if (formData.reportType === 'monthly' && !formData.reportMonth) {
      newErrors.reportMonth = 'Report month is required for monthly reports';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (file) => {
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors({ ...errors, pdfFile: 'Only PDF files are allowed' });
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        setErrors({ ...errors, pdfFile: 'File size must be less than 20MB' });
        return;
      }

      setFormData({
        ...formData,
        pdfFile: file,
        documentName: formData.documentName || file.name.replace('.pdf', '')
      });
      setSelectedFileName(file.name);
      setErrors({ ...errors, pdfFile: null });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('reportType', formData.reportType);
      data.append('documentName', formData.documentName || selectedFileName.replace('.pdf', ''));
      data.append('description', formData.description);
      data.append('tagText', formData.tagText);

      if (formData.reportType === 'daily' && formData.reportDate) {
        data.append('reportDate', format(formData.reportDate, 'yyyy-MM-dd'));
      }

      if (formData.reportType === 'monthly' && formData.reportMonth) {
        data.append('reportMonth', formData.reportMonth);
      }

      if (formData.pdfFile) {
        data.append('pdfFile', formData.pdfFile);
      }

      if (mode === 'create') {
        await pb.collection('reports').create(data, { $autoCancel: false });
        toast.success('Report uploaded successfully');
      } else {
        await pb.collection('reports').update(initialData.id, data, { $autoCancel: false });
        toast.success('Report updated successfully');
      }

      // Reset form
      setFormData({
        reportType: '',
        documentName: '',
        description: '',
        tagText: 'PMEX Report',
        reportDate: null,
        reportMonth: '',
        pdfFile: null
      });
      setSelectedFileName('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error(mode === 'create' ? 'Failed to upload report' : 'Failed to update report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Report Type */}
      <div>
        <Label htmlFor="reportType">Report Type *</Label>
        <Select
          value={formData.reportType}
          onValueChange={(value) => setFormData({ ...formData, reportType: value })}
        >
          <SelectTrigger className={errors.reportType ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        {errors.reportType && (
          <p className="text-sm text-destructive mt-1">{errors.reportType}</p>
        )}
      </div>

      {/* PDF File Upload */}
      <div>
        <Label>PDF File {mode === 'create' && '*'}</Label>
        <div
          className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-accent bg-accent/5' : 'border-border'
          } ${errors.pdfFile ? 'border-destructive' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop your PDF file here, or click to browse
          </p>
          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button type="button" variant="outline" className="cursor-pointer" asChild>
              <span>Choose file</span>
            </Button>
          </label>
          {selectedFileName && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground">
              <FileText className="h-4 w-4" />
              <span>{selectedFileName}</span>
            </div>
          )}
        </div>
        {errors.pdfFile && (
          <p className="text-sm text-destructive mt-1">{errors.pdfFile}</p>
        )}
      </div>

      {/* Document Name */}
      <div>
        <Label htmlFor="documentName">Document Name</Label>
        <Input
          id="documentName"
          value={formData.documentName}
          onChange={(e) => setFormData({ ...formData, documentName: e.target.value })}
          placeholder="Auto-filled from filename if empty"
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Optional description"
          rows={3}
        />
      </div>

      {/* Tag Text */}
      <div>
        <Label htmlFor="tagText">Tag Text</Label>
        <Input
          id="tagText"
          value={formData.tagText}
          onChange={(e) => setFormData({ ...formData, tagText: e.target.value })}
          placeholder="PMEX Report"
        />
      </div>

      {/* Conditional Date Fields */}
      {formData.reportType === 'daily' && (
        <div>
          <Label>Report Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !formData.reportDate && 'text-muted-foreground'
                } ${errors.reportDate ? 'border-destructive' : ''}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.reportDate ? format(formData.reportDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.reportDate}
                onSelect={(date) => setFormData({ ...formData, reportDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.reportDate && (
            <p className="text-sm text-destructive mt-1">{errors.reportDate}</p>
          )}
        </div>
      )}

      {formData.reportType === 'monthly' && (
        <div>
          <Label htmlFor="reportMonth">Report Month *</Label>
          <Input
            id="reportMonth"
            type="month"
            value={formData.reportMonth}
            onChange={(e) => setFormData({ ...formData, reportMonth: e.target.value })}
            className={errors.reportMonth ? 'border-destructive' : ''}
          />
          {errors.reportMonth && (
            <p className="text-sm text-destructive mt-1">{errors.reportMonth}</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (mode === 'create' ? 'Uploading...' : 'Updating...') : (mode === 'create' ? 'Upload Report' : 'Update Report')}
      </Button>
    </form>
  );
}

export default ReportForm;
