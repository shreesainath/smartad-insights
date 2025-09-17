const API_BASE_URL = 'http://localhost:5000/api';

export interface CampaignData {
  product_name: string;
  target_audience: {
    age_group: string;
    interests: string[];
  };
  budget: number;
  location: string;
  objectives: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // AI Model health check
  async checkAIHealth() {
    try {
      
      const response = await this.request('/campaign/health');
      
      return response;
    } catch (error) {
      ;
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Get platforms
  async getPlatforms() {
    return this.request('/platforms');
  }

  // Get campaign recommendations using AI model
  async getCampaignRecommendations(campaignData: CampaignData) {
    try {
      
      
      const response = await this.request('/campaign/recommendations', {
        method: 'POST',
        body: JSON.stringify(campaignData),
      });

      return response;
    } catch (error) {
      
      throw error;
    }
  }

  // User authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Upload files
  async uploadFiles(files: FileList) {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type for FormData
    });
  }
}

export const apiService = new ApiService();
