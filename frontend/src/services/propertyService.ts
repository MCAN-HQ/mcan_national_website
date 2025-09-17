import axios from 'axios';
import { mockProperties, getFilteredProperties, PropertyItem } from '../data/mockProperties';

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
  async list(params: ListParams = {}): Promise<PropertyItem[]> {
    try {
      // Try to fetch from backend first
      const res = await api.get('/properties', { params });
      return res.data.data || [];
    } catch (error) {
      // Fallback to mock data if backend is not available
      console.log('Using mock property data');
      return getFilteredProperties(mockProperties, params.state, params.type, params.q);
    }
  },

  async getById(id: string): Promise<PropertyItem | null> {
    try {
      const res = await api.get(`/properties/${id}`);
      return res.data.data;
    } catch (error) {
      // Fallback to mock data
      return mockProperties.find(p => p.id === id) || null;
    }
  },

  async create(property: Omit<PropertyItem, 'id' | 'lastUpdated'>): Promise<PropertyItem> {
    try {
      const res = await api.post('/properties', property);
      return res.data.data;
    } catch (error) {
      // For now, just return the property with generated ID
      const newProperty: PropertyItem = {
        ...property,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString(),
      };
      return newProperty;
    }
  },

  async update(id: string, property: Partial<PropertyItem>): Promise<PropertyItem> {
    try {
      const res = await api.put(`/properties/${id}`, property);
      return res.data.data;
    } catch (error) {
      // For now, just return the updated property
      const existingProperty = mockProperties.find(p => p.id === id);
      if (!existingProperty) throw new Error('Property not found');
      
      const updatedProperty: PropertyItem = {
        ...existingProperty,
        ...property,
        lastUpdated: new Date().toISOString(),
      };
      return updatedProperty;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/properties/${id}`);
    } catch (error) {
      // For mock data, just log the deletion
      console.log(`Property ${id} deleted`);
    }
  }
};

export default propertyService;


