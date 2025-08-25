// API Configuration
const API_CONFIG = {
  // Dashboard server URL - change this for production
  DASHBOARD_SERVER: process.env.NEXT_PUBLIC_DASHBOARD_SERVER || 'http://localhost:3002',
  
  // API endpoints
  ENDPOINTS: {
    CAREER_APPLICATIONS: '/api/career-applications',
    CAREER_SUBMIT: '/api/career-applications/submit',
    AUTH: '/api/auth',
    JOBS: '/api/jobs',
    APPLICATIONS: '/api/applications',
    UPLOAD: '/api/upload',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.DASHBOARD_SERVER}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export default API_CONFIG; 