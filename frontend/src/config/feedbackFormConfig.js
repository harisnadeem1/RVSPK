export const feedbackFormConfig = {
  endpoint: '/api/feedback',
  submitLabel: 'Submit Feedback',
  successMessage: 'Feedback submitted!',
  successDescription: 'Thank you for helping us improve our services.',
  sections: [
    {
      columns: 2,
      fields: [
        {
          name: 'name',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Your full name',
        },
        {
          name: 'cnic',
          label: 'CNIC Number',
          type: 'text',
          required: false,
          placeholder: '42101-1234567-1',
        },
        {
          name: 'mobile',
          label: 'Mobile Number',
          type: 'tel',
          required: false,
          placeholder: '+92 300 0000000',
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          placeholder: 'your.email@example.com',
        },
        {
          name: 'subject',
          label: 'Subject',
          type: 'select',
          required: true,
          placeholder: 'Select a subject',
          options: [
            'Website Feedback',
            'Suggestions',
            'Enquiries',
            'Queries',
          ],
          colSpan: 2,
        },
      ],
    },
    {
      columns: 1,
      fields: [
        {
          name: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
          placeholder: 'Share your feedback, suggestions, or queries...',
          rows: 6,
        },
      ],
    },
  ],
}