import { useEffect, useMemo, useState } from 'react';
import { useApi } from '../services/api';

export const useTasks = () => {
  const api = useApi();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '' // '', 'completed', 'notCompleted'
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      console.error('Fetch tasks error', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const notCompleted = total - completed;
    return { total, completed, notCompleted };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    if (filters.status === 'completed') {
      return tasks.filter((t) => t.status === 'Completed');
    }
    if (filters.status === 'notCompleted') {
      return tasks.filter((t) => t.status !== 'Completed');
    }
    return tasks;
  }, [tasks]);

  return {
    tasks: visibleTasks,
    loading,
    filters,
    setFilters,
    fetchTasks,
    stats
  };
};

