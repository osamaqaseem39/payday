import { NextRequest, NextResponse } from 'next/server';

const DASHBOARD_SERVER = process.env.NEXT_PUBLIC_DASHBOARD_SERVER || 'http://localhost:3002';

// Helper function to submit to dashboard server
async function submitToDashboard(applicationData: any) {
  try {
    const response = await fetch(`${DASHBOARD_SERVER}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData)
    });

    if (!response.ok) {
      throw new Error(`Dashboard server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Dashboard submission error:', error);
    throw error;
  }
}

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
    const resumeUrl = formData.get('resumeUrl') as string;
    const resumeName = formData.get('resumeName') as string;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !position || !experience || !coverLetter || !resumeUrl || !resumeName) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Prepare application data for dashboard
    const applicationData = {
      firstName,
      lastName,
      email,
      phone,
      position,
      experience,
      coverLetter,
      resume: {
        url: resumeUrl,
        name: resumeName,
        uploadedAt: new Date()
      },
      status: 'pending',
      applicationDate: new Date(),
      source: 'website',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Submit to dashboard server
    try {
      const dashboardResult = await submitToDashboard(applicationData);
      console.log('✅ Application submitted to dashboard server');
      
      return NextResponse.json(
        { 
          success: true,
          message: 'Application submitted successfully',
          data: dashboardResult
        },
        { status: 201 }
      );
    } catch (dashboardError) {
      console.error('❌ Dashboard server error:', dashboardError);
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to submit application to server. Please try again later.' 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { message: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
} 