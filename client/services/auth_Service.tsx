
import apiClient from './api_Client';
import { CreateUserDto, LoginDto } from './dto';


export const registerUser = async (user: CreateUserDto) => {
    try {
      const response = await apiClient.post('users', user);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Response error:', error.response.data);
        throw new Error(error.response.data.message || 'שגיאה בהרשמה');
      } else {
        console.error('Request error:', error.message);
        throw new Error('שגיאה בהרשמה');
      }
    }
  };
  

export const login = async (credentials: LoginDto) => {
  try {
    const response = await apiClient.post('users', credentials);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token); 
    return access_token;
  } catch (error) {
    throw new Error('שגיאה בהתחברות');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
