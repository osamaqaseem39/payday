import { NextRequest, NextResponse } from 'next/server';

// For now, we'll store contact form submissions locally
// In production, this should be forwarded to a secure backend service

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

    // Log the contact form submission (in production, this should go to a secure backend)
    console.log('📧 Contact form submission received:', {
      fullName,
      emailAddress,
      mobileNumber,
      subject: getSubjectDisplayName(subject),
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      timestamp: new Date().toISOString()
    });

    // TODO: In production, forward this to a secure backend service
    // For now, we'll just confirm receipt

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