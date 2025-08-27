import { NextRequest, NextResponse } from 'next/server';

// This API route should proxy requests to the backend server
// DO NOT connect to database directly from frontend API routes
// All database operations should be handled by the backend server

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const position = searchParams.get('position');
    const search = searchParams.get('search');

    // TODO: Replace mock data with proxy to backend server
    // const backendUrl = process.env.NEXT_PUBLIC_DASHBOARD_SERVER || 'https://payday-new.vercel.app';
    // const response = await fetch(`${backendUrl}/api/career-applications?${searchParams.toString()}`);
    // return NextResponse.json(await response.json());

    // Mock data for testing - replace with actual backend server call
    const mockApplications = [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0123',
        position: 'Senior Software Engineer',
        experience: '5-10 years',
        coverLetter: 'I am excited to apply for this position...',
        resume: {
          url: 'https://payday.osamaqaseem.online/uploads/resume1.pdf',
          name: 'John_Doe_Resume.pdf',
          uploadedAt: new Date().toISOString()
        },
        status: 'pending',
        applicationDate: new Date().toISOString(),
        reviewedBy: null,
        reviewedAt: null
      },
      {
        _id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0456',
        position: 'Product Manager',
        experience: '3-5 years',
        coverLetter: 'I have extensive experience in product management...',
        resume: {
          url: 'https://payday.osamaqaseem.online/uploads/resume2.pdf',
          name: 'Jane_Smith_Resume.pdf',
          uploadedAt: new Date().toISOString()
        },
        status: 'reviewed',
        applicationDate: new Date(Date.now() - 86400000).toISOString(),
        reviewedBy: {
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@paydayexpress.com'
        },
        reviewedAt: new Date().toISOString()
      }
    ];

    // Apply filters
    let filteredApplications = mockApplications;
    
    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }
    
    if (position) {
      filteredApplications = filteredApplications.filter(app => app.position === position);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredApplications = filteredApplications.filter(app => 
        app.firstName.toLowerCase().includes(searchLower) ||
        app.lastName.toLowerCase().includes(searchLower) ||
        app.email.toLowerCase().includes(searchLower) ||
        app.position.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const total = filteredApplications.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const applications = filteredApplications.slice(skip, skip + limit);

    return NextResponse.json({
      applications,
      pagination: {
        currentPage: page,
        totalPages,
        totalApplications: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching career applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch career applications' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    const { status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Mock update - replace with actual database update
    const updatedApplication = {
      _id: id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      position: 'Senior Software Engineer',
      experience: '5-10 years',
      coverLetter: 'I am excited to apply for this position...',
      resume: {
        url: 'https://payday.osamaqaseem.online/uploads/resume1.pdf',
        name: 'John_Doe_Resume.pdf',
        uploadedAt: new Date().toISOString()
      },
      status: status,
      notes: notes,
      applicationDate: new Date().toISOString(),
      reviewedBy: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@paydayexpress.com'
      },
      reviewedAt: new Date().toISOString()
    };

    return NextResponse.json(updatedApplication);

  } catch (error) {
    console.error('Error updating career application:', error);
    return NextResponse.json(
      { error: 'Failed to update career application' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Mock delete - replace with actual database delete
    return NextResponse.json({ 
      message: 'Career application deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting career application:', error);
    return NextResponse.json(
      { error: 'Failed to delete career application' },
      { status: 500 }
    );
  }
} 