# Environment Configuration for Career Emails

Copy this content to your `.env` file and customize the values for your setup.

```env
# ========================================
# CAREER EMAIL & SMTP CONFIGURATION
# ========================================

# ========================================
# SMTP SERVER SETTINGS
# ========================================
# Gmail SMTP (Recommended for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Outlook/Office 365 SMTP
# SMTP_HOST=smtp-mail.outlook.com
# SMTP_PORT=587
# SMTP_SECURE=false

# Custom SMTP Server
# SMTP_HOST=your-smtp-server.com
# SMTP_PORT=587
# SMTP_SECURE=false

# ========================================
# EMAIL CREDENTIALS
# ========================================
# Your email address (sender)
SMTP_USER=careers@yourcompany.com
SMTP_PASSWORD=your-app-password

# ========================================
# CAREER-SPECIFIC EMAIL SETTINGS
# ========================================
# Company Information
COMPANY_NAME=Payday Express
COMPANY_WEBSITE=https://yourcompany.com
CAREER_EMAIL=careers@yourcompany.com
HR_EMAIL=hr@yourcompany.com

# Email Templates
EMAIL_TEMPLATES_PATH=./email-templates
DEFAULT_SENDER_NAME=Payday Careers Team
DEFAULT_SENDER_EMAIL=noreply@yourcompany.com

# ========================================
# JOB APPLICATION EMAILS
# ========================================
# Application Confirmation
APPLICATION_CONFIRMATION_SUBJECT=Application Received - {position}
APPLICATION_CONFIRMATION_TEMPLATE=application-confirmation.html

# Application Status Updates
APPLICATION_REVIEWED_SUBJECT=Application Update - {position}
APPLICATION_REVIEWED_TEMPLATE=application-reviewed.html

APPLICATION_ACCEPTED_SUBJECT=Congratulations! Your Application - {position}
APPLICATION_ACCEPTED_TEMPLATE=application-accepted.html

APPLICATION_REJECTED_SUBJECT=Application Update - {position}
APPLICATION_REJECTED_TEMPLATE=application-rejected.html

# ========================================
# INTERVIEW EMAILS
# ========================================
# Interview Scheduling
INTERVIEW_SCHEDULED_SUBJECT=Interview Scheduled - {position}
INTERVIEW_SCHEDULED_TEMPLATE=interview-scheduled.html

# Interview Reminders
INTERVIEW_REMINDER_SUBJECT=Interview Reminder - {position}
INTERVIEW_REMINDER_TEMPLATE=interview-reminder.html

# Interview Cancellation
INTERVIEW_CANCELLED_SUBJECT=Interview Cancelled - {position}
INTERVIEW_CANCELLED_TEMPLATE=interview-cancelled.html

# Interview Rescheduling
INTERVIEW_RESCHEDULED_SUBJECT=Interview Rescheduled - {position}
INTERVIEW_RESCHEDULED_TEMPLATE=interview-rescheduled.html

# ========================================
# OFFER & ONBOARDING EMAILS
# ========================================
# Job Offer
JOB_OFFER_SUBJECT=Job Offer - {position}
JOB_OFFER_TEMPLATE=job-offer.html

# Offer Accepted
OFFER_ACCEPTED_SUBJECT=Welcome to the Team! - {position}
OFFER_ACCEPTED_TEMPLATE=offer-accepted.html

# Onboarding
ONBOARDING_WELCOME_SUBJECT=Welcome to {company} - Next Steps
ONBOARDING_WELCOME_TEMPLATE=onboarding-welcome.html

# ========================================
# NOTIFICATION SETTINGS
# ========================================
# Email Notifications
ENABLE_APPLICATION_NOTIFICATIONS=true
ENABLE_INTERVIEW_NOTIFICATIONS=true
ENABLE_OFFER_NOTIFICATIONS=true
ENABLE_HR_NOTIFICATIONS=true

# Notification Recipients
NOTIFY_HR_ON_NEW_APPLICATION=true
NOTIFY_MANAGER_ON_APPLICATION_REVIEW=true
NOTIFY_CANDIDATE_ON_STATUS_CHANGE=true

# ========================================
# EMAIL LIMITS & RATE LIMITING
# ========================================
# Daily email limits
MAX_DAILY_EMAILS=1000
MAX_EMAILS_PER_HOUR=100

# Rate limiting
EMAIL_RATE_LIMIT_MS=1000

# ========================================
# DEVELOPMENT & TESTING
# ========================================
# Development email settings
DEV_EMAIL_OVERRIDE=test@example.com
ENABLE_EMAIL_LOGGING=true
SAVE_EMAILS_TO_FILE=false

# Test email addresses
TEST_EMAIL=test@yourcompany.com
TEST_CANDIDATE_EMAIL=candidate@example.com
TEST_HR_EMAIL=hr-test@yourcompany.com

# ========================================
# SECURITY & COMPLIANCE
# ========================================
# Email encryption
ENABLE_EMAIL_ENCRYPTION=false
ENCRYPTION_KEY=your-encryption-key

# GDPR compliance
ENABLE_EMAIL_TRACKING=false
ENABLE_UNSUBSCRIBE_LINKS=true
PRIVACY_POLICY_URL=https://yourcompany.com/privacy

# ========================================
# BACKUP & MONITORING
# ========================================
# Email backup
BACKUP_EMAILS_TO_S3=false
S3_BUCKET=email-backups
AWS_REGION=us-east-1

# Monitoring
ENABLE_EMAIL_MONITORING=true
ALERT_ON_EMAIL_FAILURES=true
MONITORING_WEBHOOK=https://hooks.slack.com/your-webhook

# ========================================
# INTEGRATION SETTINGS
# ========================================
# CRM Integration
CRM_WEBHOOK_URL=https://your-crm.com/webhook
ENABLE_CRM_SYNC=true

# Calendar Integration
CALENDAR_WEBHOOK_URL=https://your-calendar.com/webhook
ENABLE_CALENDAR_SYNC=true
```

## **🚀 Quick Setup Guide**

### **1. Gmail Setup (Recommended for Development)**
```bash
# 1. Enable 2FA on your Google account
# 2. Generate an App Password:
#    - Go to Google Account Settings
#    - Security → 2-Step Verification → App passwords
#    - Select "Mail" and generate password
# 3. Use the generated password in SMTP_PASSWORD
```

### **2. Outlook/Office 365 Setup**
```bash
# 1. Enable SMTP authentication in your account
# 2. Use your regular password or generate an app password
# 3. Set SMTP_HOST=smtp-mail.outlook.com
```

### **3. Custom SMTP Server**
```bash
# 1. Get SMTP details from your email provider
# 2. Update SMTP_HOST, SMTP_PORT, and SMTP_SECURE
# 3. Use your email credentials
```

## **📧 Email Template Variables**

Use these variables in your email templates:

- `{candidate_name}` - Applicant's full name
- `{position}` - Job position title
- `{company}` - Company name
- `{interview_date}` - Scheduled interview date/time
- `{interview_location}` - Interview location or video call link
- `{hr_name}` - HR representative name
- `{application_id}` - Unique application identifier
- `{status}` - Current application status
- `{next_steps}` - Next steps for the candidate

## **🔧 Backend Integration**

Add this to your backend server to use these environment variables:

```javascript
// Load environment variables
require('dotenv').config();

// SMTP Configuration
const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
};

// Email service
const emailService = {
  sendApplicationConfirmation: (candidate, position) => {
    const subject = process.env.APPLICATION_CONFIRMATION_SUBJECT
      .replace('{position}', position);
    
    // Send email logic here
  },
  
  sendInterviewScheduled: (candidate, position, interviewDetails) => {
    const subject = process.env.INTERVIEW_SCHEDULED_SUBJECT
      .replace('{position}', position);
    
    // Send email logic here
  }
};
```

## **📋 Required Environment Variables**

**Minimum required for basic functionality:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
COMPANY_NAME=Your Company Name
CAREER_EMAIL=careers@yourcompany.com
```

## **🧪 Testing Your Configuration**

Create a test script to verify your email setup:

```bash
# Test email configuration
npm run test:email

# Or manually test
node -e "
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Error:', error);
  } else {
    console.log('✅ SMTP Server is ready');
  }
});
"
```

## **🔒 Security Best Practices**

1. **Never commit `.env` files** to version control
2. **Use App Passwords** instead of regular passwords
3. **Enable 2FA** on your email accounts
4. **Rotate credentials** regularly
5. **Monitor email logs** for suspicious activity
6. **Use environment-specific** configurations

## **📁 File Structure**

```
payday-website/
├── .env                    ← Your actual environment file
├── ENV_EXAMPLE.md         ← This example file
├── email-templates/        ← HTML email templates
│   ├── application-confirmation.html
│   ├── interview-scheduled.html
│   └── job-offer.html
└── src/
    └── services/
        └── emailService.ts ← Email service implementation
```

Copy this configuration to your `.env` file and customize it for your needs! 🎉 