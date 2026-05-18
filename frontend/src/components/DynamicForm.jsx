import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

// ─── helpers ────────────────────────────────────────────────────────────────

function buildInitialState(config) {
  const state = {}
  config.sections.forEach(section => {
    section.fields.forEach(field => {
      if (field.type === 'file') state[field.name] = []
      else if (field.type === 'checkbox') state[field.name] = false
      else state[field.name] = ''
    })
  })
  return state
}

// ─── individual field renderers ──────────────────────────────────────────────

function FieldWrapper({ field, children }) {
  return (
    <div className={field.colSpan === 2 ? 'sm:col-span-2' : ''}>
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-foreground mb-1.5"
      >
        {field.label}
        {field.required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
      {field.hint && (
        <p className="text-xs text-muted-foreground mt-1">{field.hint}</p>
      )}
    </div>
  )
}

function TextField({ field, value, onChange }) {
  return (
    <FieldWrapper field={field}>
      <Input
        id={field.name}
        name={field.name}
        type={field.type}
        required={field.required}
        value={value}
        onChange={e => onChange(field.name, e.target.value)}
        placeholder={field.placeholder || ''}
        className="text-foreground placeholder:text-muted-foreground"
      />
    </FieldWrapper>
  )
}

function TextareaField({ field, value, onChange }) {
  return (
    <FieldWrapper field={field}>
      <Textarea
        id={field.name}
        name={field.name}
        required={field.required}
        value={value}
        onChange={e => onChange(field.name, e.target.value)}
        placeholder={field.placeholder || ''}
        rows={field.rows || 5}
        className="text-foreground placeholder:text-muted-foreground resize-none"
      />
    </FieldWrapper>
  )
}

function SelectField({ field, value, onChange }) {
  return (
    <FieldWrapper field={field}>
      <Select
        value={value}
        onValueChange={val => onChange(field.name, val)}
        required={field.required}
      >
        <SelectTrigger id={field.name} className="text-foreground">
          <SelectValue
            placeholder={field.placeholder || `Select ${field.label}`}
          />
        </SelectTrigger>
        <SelectContent>
          {field.options.map(opt => {
            const val = typeof opt === 'object' ? opt.value : opt
            const label = typeof opt === 'object' ? opt.label : opt
            return (
              <SelectItem key={val} value={val}>
                {label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </FieldWrapper>
  )
}

function CheckboxField({ field, value, onChange }) {
  return (
    <div className={`flex items-center gap-3 ${field.colSpan === 2 ? 'sm:col-span-2' : ''}`}>
      <input
        id={field.name}
        name={field.name}
        type="checkbox"
        checked={value}
        onChange={e => onChange(field.name, e.target.checked)}
        className="h-4 w-4 rounded border-border accent-accent"
      />
      <label htmlFor={field.name} className="text-sm font-medium text-foreground">
        {field.label}
      </label>
    </div>
  )
}

function FileUploadField({ field, value, onChange }) {
  const handleFiles = e => {
    const selected = Array.from(e.target.files)
    const maxFiles = field.maxFiles || 5
    const combined = [...value, ...selected].slice(0, maxFiles)
    onChange(field.name, combined)
  }

  const removeFile = index => {
    const updated = value.filter((_, i) => i !== index)
    onChange(field.name, updated)
  }

  return (
    <FieldWrapper field={field}>
      <div className="border-2 border-dashed border-border rounded-xl p-5 text-center hover:border-accent/50 transition-colors">
        <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-3">
          {field.hint || `Upload up to ${field.maxFiles || 5} files`}
        </p>
        <label
          htmlFor={field.name}
          className="cursor-pointer inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Choose Files
          <input
            id={field.name}
            name={field.name}
            type="file"
            multiple={field.multiple}
            accept={field.accept}
            onChange={handleFiles}
            className="sr-only"
          />
        </label>
      </div>

      {value.length > 0 && (
        <ul className="mt-3 space-y-2">
          {value.map((file, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-muted rounded-lg px-3 py-2 text-sm"
            >
              <span className="text-foreground truncate max-w-[80%]">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-muted-foreground hover:text-destructive transition-colors ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </FieldWrapper>
  )
}

// ─── field router ────────────────────────────────────────────────────────────

function RenderField({ field, value, onChange }) {
  switch (field.type) {
    case 'textarea': return <TextareaField field={field} value={value} onChange={onChange} />
    case 'select':   return <SelectField   field={field} value={value} onChange={onChange} />
    case 'checkbox': return <CheckboxField field={field} value={value} onChange={onChange} />
    case 'file':     return <FileUploadField field={field} value={value} onChange={onChange} />
    default:         return <TextField     field={field} value={value} onChange={onChange} />
  }
}

// ─── main component ──────────────────────────────────────────────────────────

export default function DynamicForm({ config }) {
  const [formData, setFormData] = useState(() => buildInitialState(config))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name, value) =>
    setFormData(prev => ({ ...prev, [name]: value }))

  // Check if any field in the config is a file type
  const hasFiles = config.sections
    .flatMap(s => s.fields)
    .some(f => f.type === 'file')

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let body
      let headers = {}

      if (hasFiles) {
        const fd = new FormData()
        Object.entries(formData).forEach(([key, val]) => {
          if (Array.isArray(val)) {
            val.forEach(file => fd.append(key, file))
          } else {
            fd.append(key, val)
          }
        })
        body = fd
        // Do NOT set Content-Type — browser sets it with boundary automatically
      } else {
        body = JSON.stringify(formData)
        headers = { 'Content-Type': 'application/json' }
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}${config.endpoint}`,
        { method: 'POST', headers, body }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')

      toast.success(config.successMessage || 'Submitted successfully!', {
        description: config.successDescription || 'We will get back to you shortly.',
      })
      setFormData(buildInitialState(config))

    } catch (error) {
      toast.error('Submission failed', {
        description: error.message || 'Please try again or contact us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {config.sections.map((section, si) => {
        // Handle conditional sections — e.g. hide identity if anonymous is checked
        if (section.showWhen) {
          const { field, value } = section.showWhen
          if (formData[field] !== value) return null
        }

        return (
          <div key={si}>
            {section.title && (
              <div className="mb-5">
                <h3 className="text-base font-semibold text-foreground">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.description}
                  </p>
                )}
                <div className="mt-3 h-px bg-border" />
              </div>
            )}

            <div
              className={`grid gap-5 ${
                section.columns === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1'
              }`}
            >
              {section.fields.map((field, fi) => (
                <RenderField
                  key={fi}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        )
      })}

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          'Submitting...'
        ) : (
          <>
            {config.submitLabel || 'Submit'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.form>
  )
}