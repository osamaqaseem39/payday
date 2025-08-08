# SMTP Email Setup for Career Application Form

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# HR Email (where career applications will be sent)
HR_EMAIL=hr@paydayexpress.com

# Support Email (where contact form submissions will be sent)
SUPPORT_EMAIL=support@paydayexpress.ca
```

## Gmail Setup Instructions

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Navigate to Security
   - Under "2-Step Verification", click on "App passwords"
   - Generate a new app password for "Mail"
   - Use this password as `SMTP_PASS`

## Other Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

### Custom SMTP Server
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
```

## Features

### Career Application Form
- **Form Validation**: All fields are required and validated
- **File Upload**: Resume/CV upload with size and type validation
- **Email Notifications**: 
  - HR receives application with resume attachment
  - Applicant receives confirmation email
- **Error Handling**: Proper error messages for failed submissions
- **Security**: File size limits and type restrictions

### Contact Form
- **Form Validation**: All fields are required and validated
- **Email Notifications**: 
  - Support team receives detailed message
  - Customer receives confirmation email
- **Subject Categories**: Organized inquiry types for better routing
- **Error Handling**: Proper error messages for failed submissions

## Testing

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run the development server: `npm run dev`
4. Test Career Form:
   - Navigate to `/career` page
   - Fill out and submit the application form
   - Check both HR and applicant email inboxes
5. Test Contact Form:
   - Navigate to `/contact` page
   - Fill out and submit the contact form
   - Check both support team and customer email inboxes

## Troubleshooting

- **Authentication Error**: Ensure SMTP credentials are correct
- **File Upload Issues**: Check file size (max 5MB) and format (PDF, DOC, DOCX)
- **Email Not Sending**: Verify SMTP settings and network connection 