import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mcan-national-website.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mcan_token');
  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface EIDCard {
  id: string;
  user_id: string;
  svg_markup: string;
  version: string;
  created_at: string;
  updated_at: string;
}

export const eidService = {
  async getMyEid(): Promise<EIDCard | null> {
    try {
      const res = await api.get('/eid/me');
      return res.data?.data || null;
    } catch (e: any) {
      if (e?.response?.status === 404) return null;
      throw e;
    }
  },

  async generateMyEid(): Promise<EIDCard> {
    const res = await api.post('/eid/me');
    return res.data.data;
  },
};

export default eidService;


