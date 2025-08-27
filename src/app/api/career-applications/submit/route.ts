import { NextRequest, NextResponse } from 'next/server';

// Dashboard server configuration
const DASHBOARD_SERVER = process.env.NEXT_PUBLIC_DASHBOARD_SERVER || 'https://payday-new.vercel.app';

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json();
    
    console.log('🔄 Forwarding career application to server:', DASHBOARD_SERVER + '/api/applications');
    console.log('📤 Application data:', applicationData);
    
    // Forward the request to the server's applications endpoint
    const response = await fetch(`${DASHBOARD_SERVER}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData)
    });

    console.log('📥 Server response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Server error:', errorData);
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || 'Failed to submit application to server' 
        },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    console.log('✅ Server response:', responseData);
    
    return NextResponse.json(responseData, { status: 201 });

  } catch (error) {
    console.error('❌ Career application submit error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit application. Please try again.' 
      },
      { status: 500 }
    );
  }
} 