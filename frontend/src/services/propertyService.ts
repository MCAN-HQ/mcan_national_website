import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mcan-national-website.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export interface ListParams {
  state?: string;
  type?: string;
  q?: string;
}

export const propertyService = {
  async list(params: ListParams = {}) {
    const res = await api.get('/properties', { params });
    return res.data.data || [];
  },
};

export default propertyService;


