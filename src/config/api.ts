// Website API Configuration
const API_CONFIG = {
  // Dashboard server URL - change this for production
  DASHBOARD_SERVER: process.env.NEXT_PUBLIC_DASHBOARD_SERVER || 'https://payday-server.vercel.app',
  
  // API endpoints
  ENDPOINTS: {
    // Dashboard Server Endpoints
    DASHBOARD: {
      HEALTH: '/',
      AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        PROFILE: '/api/auth/profile',
        UPDATE_PROFILE: '/api/auth/profile'
      },
      JOBS: {
        LIST: '/api/jobs',
        SEARCH: '/api/jobs/search',
        FILTERS: '/api/jobs/filters',
        REMOTE: '/api/jobs/remote',
        URGENT: '/api/jobs/urgent',
        EXPIRING: '/api/jobs/expiring',
        STATISTICS: '/api/jobs/statistics',
        MY_JOBS: '/api/jobs/my-jobs',
        BY_DEPARTMENT: '/api/jobs/department/:department',
        CREATE: '/api/jobs',
        GET_BY_ID: '/api/jobs/:id',
        UPDATE: '/api/jobs/:id',
        DELETE: '/api/jobs/:id',
        PUBLISH: '/api/jobs/:id/publish',
        CLOSE: '/api/jobs/:id/close'
      },
      APPLICATIONS: {
        LIST: '/api/applications',
        CREATE: '/api/applications',
        GET_BY_ID: '/api/applications/:id',
        UPDATE: '/api/applications/:id',
        DELETE: '/api/applications/:id',
        BY_STATUS: '/api/applications/status/:status',
        RECENT: '/api/applications/recent',
        STATISTICS: '/api/applications/statistics',
        SEARCH: '/api/applications/search',
        UPDATE_STATUS: '/api/applications/:id/status'
      },
      INTERVIEW_CANDIDATES: {
        LIST: '/api/interview-candidates',
        CREATE: '/api/interview-candidates',
        GET_BY_ID: '/api/interview-candidates/:id',
        STATISTICS: '/api/interview-candidates/statistics',
        FOLLOW_UP: '/api/interview-candidates/follow-up',
        UPCOMING_INTERVIEWS: '/api/interview-candidates/upcoming-interviews',
        BY_INTERVIEWER: '/api/interview-candidates/interviewer/:interviewerId',
        BY_STAGE: '/api/interview-candidates/stage/:stage',
        SCHEDULE_INTERVIEW: '/api/interview-candidates/:id/schedule-interview',
        MAKE_DECISION: '/api/interview-candidates/:id/decision',
        ADD_COMMUNICATION: '/api/interview-candidates/:id/communication',
        CREATE_OFFER: '/api/interview-candidates/:id/offer'
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

// Backward compatibility - alias for getDashboardApiUrl
export const getApiUrl = getDashboardApiUrl;

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
    
    getProfile: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.AUTH.PROFILE), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    updateProfile: async (profileData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.AUTH.UPDATE_PROFILE), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
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
    
    search: async (query: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.SEARCH) + `?q=${encodeURIComponent(query)}`, {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getFilters: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.FILTERS), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getRemote: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.REMOTE), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getUrgent: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.URGENT), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getExpiring: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.EXPIRING), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getStatistics: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.STATISTICS), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getMyJobs: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.MY_JOBS), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getByDepartment: async (department: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.BY_DEPARTMENT, { department }), {
        headers: getAuthHeaders()
      });
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
    },
    
    publish: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.PUBLISH, { id }), {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    close: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.JOBS.CLOSE, { id }), {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    }
  },
  
  // Applications
  applications: {
    list: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.LIST), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    create: async (applicationData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(applicationData)
      });
      return handleApiResponse(response);
    },
    
    getById: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.GET_BY_ID, { id }), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    update: async (id: string, applicationData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.UPDATE, { id }), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(applicationData)
      });
      return handleApiResponse(response);
    },
    
    delete: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.DELETE, { id }), {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getByStatus: async (status: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.BY_STATUS, { status }), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getRecent: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.RECENT), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getStatistics: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.STATISTICS), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    search: async (query: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.SEARCH) + `?q=${encodeURIComponent(query)}`, {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    updateStatus: async (id: string, status: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.APPLICATIONS.UPDATE_STATUS, { id }), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return handleApiResponse(response);
    }
  },
  
  // Interview Candidates
  interviewCandidates: {
    list: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.LIST), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    create: async (candidateData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(candidateData)
      });
      return handleApiResponse(response);
    },
    
    getById: async (id: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.GET_BY_ID, { id }), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getStatistics: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.STATISTICS), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getFollowUp: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.FOLLOW_UP), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getUpcomingInterviews: async () => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.UPCOMING_INTERVIEWS), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getByInterviewer: async (interviewerId: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.BY_INTERVIEWER, { interviewerId }), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    getByStage: async (stage: string) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.BY_STAGE, { stage }), {
        headers: getAuthHeaders()
      });
      return handleApiResponse(response);
    },
    
    scheduleInterview: async (id: string, interviewData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.SCHEDULE_INTERVIEW, { id }), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(interviewData)
      });
      return handleApiResponse(response);
    },
    
    makeDecision: async (id: string, decisionData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.MAKE_DECISION, { id }), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(decisionData)
      });
      return handleApiResponse(response);
    },
    
    addCommunication: async (id: string, communicationData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.ADD_COMMUNICATION, { id }), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(communicationData)
      });
      return handleApiResponse(response);
    },
    
    createOffer: async (id: string, offerData: any) => {
      const response = await fetch(getDashboardApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.INTERVIEW_CANDIDATES.CREATE_OFFER, { id }), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(offerData)
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