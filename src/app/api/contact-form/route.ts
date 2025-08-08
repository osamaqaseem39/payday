import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract form data
    const { fullName, mobileNumber, emailAddress, subject, message } = body;

    // Validate required fields
    if (!fullName || !mobileNumber || !emailAddress || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Get subject display name
    const getSubjectDisplayName = (subject: string) => {
      const subjectMap: { [key: string]: string } = {
        'loan-inquiry': 'Loan Inquiry',
        'account-assistance': 'Account Assistance',
        'investment-guidance': 'Investment Guidance',
        'business-partnership': 'Business Partnership',
        'media-request': 'Media Request',
        'general': 'General Inquiry'
      };
      return subjectMap[subject] || subject;
    };

    // Email content for support team
    const supportEmailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${emailAddress}</p>
      <p><strong>Phone:</strong> ${mobileNumber}</p>
      <p><strong>Subject:</strong> ${getSubjectDisplayName(subject)}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `;

    // Email content for customer (confirmation)
    const customerEmailContent = `
      <h2>Message Received - Payday Express</h2>
      <p>Dear ${fullName},</p>
      <p>Thank you for reaching out to Payday Express!</p>
      <p>We have received your message regarding <strong>${getSubjectDisplayName(subject)}</strong> and will review it carefully.</p>
      <p><strong>Message Details:</strong></p>
      <ul>
        <li>Subject: ${getSubjectDisplayName(subject)}</li>
        <li>Submitted: ${new Date().toLocaleDateString()}</li>
      </ul>
      <p>Our support team will get back to you within 24-48 hours with a detailed response.</p>
      <p>If you have an urgent matter, please call us at +1 (800) 123-4567 during business hours (Monday – Friday, 9 AM – 6 PM EST).</p>
      <p>Best regards,<br>The Payday Express Team</p>
    `;

    // Send email to support team
    const supportMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SUPPORT_EMAIL || 'support@paydayexpress.ca',
      subject: `New Contact Form: ${getSubjectDisplayName(subject)} - ${fullName}`,
      html: supportEmailContent,
    };

    // Send confirmation email to customer
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: emailAddress,
      subject: 'Message Received - Payday Express',
      html: customerEmailContent,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(supportMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
} 