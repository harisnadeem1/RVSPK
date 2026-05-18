export const contactFormConfig = {
  endpoint: '/api/contact',
  submitLabel: 'Send Message',
  successMessage: 'Message sent successfully!',
  successDescription: 'We will respond to your inquiry within 24 hours.',
  sections: [
    {
      columns: 2,
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          placeholder: 'Your full name',
          colSpan: 2,                  // full width row
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          placeholder: 'your.email@example.com',
          colSpan: 2,                  // full width row
        },
        {
          name: 'cell',
          label: 'Cell Number',
          type: 'tel',
          required: true,
          placeholder: '+92 300 0000000',
                                       // half width — sits left
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp Number',
          type: 'tel',
          required: true,
          placeholder: '+92 300 0000000',
                                       // half width — sits right
        },
        {
          name: 'country',
          label: 'Country',
          type: 'text',
          required: true,
          placeholder: 'e.g. Pakistan',
                                       // half width — sits left
        },
        {
          name: 'city',
          label: 'City',
          type: 'text',
          required: true,
          placeholder: 'e.g. Lahore',
                                       // half width — sits right
        },
        {
          name: 'address',
          label: 'Address',
          type: 'textarea',
          required: false,
          placeholder: 'Your full address',
          rows: 2,
          colSpan: 2,                  // full width row
        },
        {
          name: 'subject',
          label: 'Subject',
          type: 'text',
          required: true,
          placeholder: 'Brief description of your inquiry',
          colSpan: 2,                  // full width row
        },
        {
          name: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
          placeholder: 'Please provide details about your inquiry...',
          rows: 5,
          colSpan: 2,
        },
      ],
    },
  ],
}