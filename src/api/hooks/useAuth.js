import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/auth'; // Adjust to your backend

// Main auth hook with all methods
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  // Login function
  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Handle different response formats
      const responseData = data.data || data;
      const { user, token } = responseData;
      
      if (user && token) {
        setUser(user);
        useAuthStore.getState().setToken(token);
        queryClient.setQueryData(['currentUser'], user);
        return { success: true };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      
      const data = await response.json();
      
      // Handle different response formats
      const responseData = data.data || data;
      const user = responseData.guardian || responseData.user;
      const { token } = responseData;
      
      if (user && token) {
        setUser(user);
        useAuthStore.getState().setToken(token);
        queryClient.setQueryData(['currentUser'], user);
        return { success: true };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${useAuthStore.getState().token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearUser();
      queryClient.clear();
    }
  };

  return {
    user,
    isAuthenticated,
    loading: false, // Add if needed by your components
    login,
    register,
    logout
  };
};

// Optional: Separate mutation hooks if you prefer
export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      const responseData = data.data || data;
      const { user, token } = responseData;
      setUser(user);
      setToken(token);
      queryClient.setQueryData(['currentUser'], user);
    }
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      const responseData = data.data || data;
      const user = responseData.guardian || responseData.user;
      const { token } = responseData;
      setUser(user);
      setToken(token);
      queryClient.setQueryData(['currentUser'], user);
    }
  });
};

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/logout`, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Logout failed');
      return response.json();
    },
    onSuccess: () => {
      clearUser();
      queryClient.clear();
    }
  });
};