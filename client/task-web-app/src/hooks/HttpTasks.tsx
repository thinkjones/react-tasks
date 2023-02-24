import React from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';

export const useFetchTasks = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    `${import.meta.env.VITE_API_URL}/tasks`
  )
  return { data, error, loading, refetch};
};

export const useModifyTasks = () => {
  const [result, setResult] = React.useState(null);
  const baseUrl =  `${import.meta.env.VITE_API_URL}/tasks`

  const executeUpdate = async (taskId: number | null, taskUpdate: any) => {
    const url = taskId ? `${baseUrl}/${taskId}` : baseUrl;
    const result = await axios.post(url, taskUpdate);
    setResult(result.data)
  }

  return { executeUpdate, result };
};
