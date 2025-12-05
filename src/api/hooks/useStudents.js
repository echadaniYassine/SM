import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = '/api/students'; // Adjust to your API endpoint

// Fetch students
export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch students');
      return response.json();
    }
  });
};

// Create student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (studentData) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      if (!response.ok) throw new Error('Failed to create student');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    }
  });
};

// Update student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update student');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    }
  });
};

export const useMyTimetable = () => {
  return useQuery({
    queryKey: ['myTimetable'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/my-timetable`);
      if (!response.ok) throw new Error('Failed to fetch timetable');
      return response.json();
    }
  });
};

// Delete student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete student');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    }
  });
};

export const useMySubjects = () => {
  return useQuery({
    queryKey: ['mySubjects'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/my-subjects`);
      if (!response.ok) throw new Error('Failed to fetch subjects');
      return response.json();
    }
  });
};