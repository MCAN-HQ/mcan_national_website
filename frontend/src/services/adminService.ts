import axios from 'axios';
import { User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const adminService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.data;
  },

  // Create a new user
  createUser: async (userData: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    stateCode?: string;
    deploymentState?: string;
    serviceYear?: string;
    password?: string;
  }): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/admin/users`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  },

  // Update a user
  updateUser: async (userId: string, userData: {
    fullName?: string;
    email?: string;
    phone?: string;
    role?: string;
    stateCode?: string;
    deploymentState?: string;
    serviceYear?: string;
    isActive?: boolean;
  }): Promise<User> => {
    const response = await axios.put(`${API_BASE_URL}/admin/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  },

  // Delete a user
  deleteUser: async (userId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  // Reset user password
  resetUserPassword: async (userId: string, newPassword: string): Promise<void> => {
    await axios.post(
      `${API_BASE_URL}/admin/users/${userId}/reset-password`,
      { newPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
  },

  // Get user statistics
  getUserStats: async (): Promise<{
    total: number;
    active: number;
    verified: number;
    byRole: Record<string, number>;
  }> => {
    const response = await axios.get(`${API_BASE_URL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.data;
  },

  // Get role permissions
  getRolePermissions: async (): Promise<Record<string, any>> => {
    const response = await axios.get(`${API_BASE_URL}/admin/permissions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.data;
  },
};

export default adminService;
