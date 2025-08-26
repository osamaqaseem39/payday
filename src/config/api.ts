// Website API Configuration
const API_CONFIG = {
  // Dashboard server URL - change this for production
  DASHBOARD_SERVER: process.env.NEXT_PUBLIC_DASHBOARD_SERVER || 'https://payday-server.vercel.app',
  
  // API endpoints
  ENDPOINTS: {
    // Dashboard Server Endpoints
    DASHBOARD: {
      HEALTH: '/api/health',
      AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        TEST: '/api/auth/test'
      },
      JOBS: {
        LIST: '/api/jobs',
        PUBLIC: '/api/jobs/public',
        CREATE: '/api/jobs',
        GET_BY_ID: '/api/jobs/:id',
        UPDATE: '/api/jobs/:id',
        DELETE: '/api/jobs/:id'
      },
      CAREER_APPLICATIONS: {
        LIST: '/api/career-applications',
        CREATE: '/api/career-applications',
        GET_BY_ID: '/api/career-applications/:id',
        UPDATE: '/api/career-applications/:id',
        DELETE: '/api/career-applications/:id',
        UPDATE_STATUS: '/api/career-applications/:id/status'
      },
      APPLICATIONS: {
        LIST: '/api/applications',
        CREATE: '/api/applications',
        GET_BY_ID: '/api/applications/:id',
        UPDATE: '/api/applications/:id',
        DELETE: '/api/applications/:id'
      },
      UPLOAD: {
        RESUME: '/api/upload/resume',
        DOCUMENT: '/api/upload/document',
        IMAGE: '/api/upload/image'
      }
    },
    
    // Website Local Endpoints
    WEBSITE: {
      CONTACT_FORM: '/api/contact-form',
      CAREER_APPLICATION: '/api/career-application'
    }
  }
};

// Helper function to get full API URL for dashboard server
export const getDashboardApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  let url = `${API_CONFIG.DASHBOARD_SERVER}${endpoint}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }
  
  return url;
};

// Helper function to get full API URL for website endpoints
export const getWebsiteApiUrl = (endpoint: string): string => {
  return `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Dashboard API service functions
export const dashboardApi = {
  // Health check
  health: async () => {
    const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.HEALTH));
    return handleApiResponse(response);
  },
  
  // Authentication
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.AUTH.LOGIN), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return handleApiResponse(response);
    },
    
    register: async (userData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.AUTH.REGISTER), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return handleApiResponse(response);
    },
    
    test: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.AUTH.TEST), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    }
  },
  
  // Jobs
  jobs: {
    list: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.LIST), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    public: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.PUBLIC));
      return handleApiResponse(response);
    },
    
    create: async (jobData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(jobData)
      });
      return handleApiResponse(response);
    },
    
    getById: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.GET_BY_ID, { id }), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    update: async (id: string, jobData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.UPDATE, { id }), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(jobData)
      });
      return handleApiResponse(response);
    },
    
    delete: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.DELETE, { id }), {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    }
  },
  
  // Career Applications
  careerApplications: {
    list: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.CAREER_APPLICATIONS.LIST), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    create: async (applicationData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.CAREER_APPLICATIONS.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(applicationData)
      });
      return handleApiResponse(response);
    },
    
    getById: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.CAREER_APPLICATIONS.GET_BY_ID, { id }), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    update: async (id: string, applicationData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.CAREER_APPLICATIONS.UPDATE, { id }), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(applicationData)
      });
      return handleApiResponse(response);
    },
    
    delete: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.CAREER_APPLICATIONS.DELETE, { id }), {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    updateStatus: async (id: string, status: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.CAREER_APPLICATIONS.UPDATE_STATUS, { id }), {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return handleApiResponse(response);
    }
  },
  
  // File Upload
  upload: {
    resume: async (file: File) => {
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.UPLOAD.RESUME), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });
      return handleApiResponse(response);
    },
    
    document: async (file: File) => {
      const formData = new FormData();
      formData.append('document', file);
      
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.UPLOAD.DOCUMENT), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });
      return handleApiResponse(response);
    }
  }
};

// Website API service functions
export const websiteApi = {
  // Contact form
  contactForm: async (formData: {
    fullName: string;
    mobileNumber: string;
    emailAddress: string;
    subject: string;
    message: string;
  }) => {
    const response = await fetch(getWebsiteApiUrl(API_CONFIG.ENDPOINTS.WEBSITE.CONTACT_FORM), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return handleApiResponse(response);
  },
  
  // Career application (website local endpoint)
  careerApplication: async (formData: FormData) => {
    const response = await fetch(getWebsiteApiUrl(API_CONFIG.ENDPOINTS.WEBSITE.CAREER_APPLICATION), {
      method: 'POST',
      body: formData
    });
    return handleApiResponse(response);
  }
};

export default API_CONFIG; 