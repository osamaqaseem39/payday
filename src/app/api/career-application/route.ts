import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure SMTP transporter
const transporter = nodemailer.createTransporter({
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
    const formData = await request.formData();
    
    // Extract form data
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resume = formData.get('resume') as File;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !position || !experience || !coverLetter || !resume) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'Resume file size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        { message: 'Resume must be in PDF, DOC, or DOCX format' },
        { status: 400 }
      );
    }

    // Convert file to buffer for email attachment
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    // Email content for HR
    const hrEmailContent = `
      <h2>New Career Application Received</h2>
      <p><strong>Applicant Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Position Applied For:</strong> ${position}</p>
      <p><strong>Years of Experience:</strong> ${experience}</p>
      <h3>Cover Letter:</h3>
      <p>${coverLetter.replace(/\n/g, '<br>')}</p>
    `;

    // Email content for applicant (confirmation)
    const applicantEmailContent = `
      <h2>Application Received - Payday Express</h2>
      <p>Dear ${firstName} ${lastName},</p>
      <p>Thank you for your interest in joining our team at Payday Express!</p>
      <p>We have received your application for the <strong>${position}</strong> position and will review it carefully.</p>
      <p><strong>Application Details:</strong></p>
      <ul>
        <li>Position: ${position}</li>
        <li>Experience Level: ${experience}</li>
        <li>Application Date: ${new Date().toLocaleDateString()}</li>
      </ul>
      <p>Our HR team will review your application and contact you within 5-7 business days if your qualifications match our requirements.</p>
      <p>If you have any questions, please don't hesitate to reach out to us at careers@paydayexpress.com</p>
      <p>Best regards,<br>The Payday Express Team</p>
    `;

    // Send email to HR
    const hrMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.HR_EMAIL || 'hr@paydayexpress.com',
      subject: `New Career Application: ${firstName} ${lastName} - ${position}`,
      html: hrEmailContent,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
          contentType: resume.type,
        },
      ],
    };

    // Send confirmation email to applicant
    const applicantMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Application Received - Payday Express',
      html: applicantEmailContent,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(hrMailOptions),
      transporter.sendMail(applicantMailOptions),
    ]);

    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { message: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
} 