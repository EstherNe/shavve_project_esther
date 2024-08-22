// userService.ts
import apiClient from './api_Client'
import { CreateUserDto, UpdateUserDto } from './dto';

export const createUser = async (user: CreateUserDto) => {
  try {
    const response = await apiClient.post('/users', user);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'שגיאה ביצירת משתמש'); 
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'שגיאה בחיפוש משתמש לפי קוד משתמש');
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await apiClient.get(`/users/username/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'שגיאה בחיפוש משתמש לפי שם משתמש');
  }
};

export const updateUser = async (userId: string, user: UpdateUserDto) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, user);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'שגיאה בעדכון משתמש');
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await apiClient.delete(`/users/${userId}`);
  } catch (error) {
    throw new Error(error.response.data.message || 'שגיאה במחיקת משתמש');
  }
};
