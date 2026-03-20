import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { useApi } from '../services/api';
import AppLayout from '../layouts/AppLayout';
import SummaryCards from '../components/SummaryCards';
import TaskFilters from '../components/TaskFilters';
import TaskCard from '../components/TaskCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const api = useApi();
  const { tasks, loading, filters, setFilters, fetchTasks, stats } = useTasks();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleDelete = async (task) => {
    const confirmed = window.confirm(
      `Delete task "${task.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${task._id}`);
      await fetchTasks();
    } catch (error) {
      console.error('Delete task error', error);
    }
  };

  const handleToggleCompleted = async (task, checked) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        status: checked ? 'Completed' : 'Pending'
      });
      await fetchTasks();
    } catch (error) {
      console.error('Status update error', error);
    }
  };

  return (
    <AppLayout>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-slate-900">
            Tasks
          </h1>
          <p className="text-xs text-slate-500">View and manage your tasks.</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <SummaryCards stats={stats} />
          <Link to="/tasks/new" className="btn-primary whitespace-nowrap">
            New task
          </Link>
        </div>

        <TaskFilters filters={filters} onChange={setFilters} />

        <section className="space-y-3">
          <header className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Task list
            </h2>
          </header>

          <div className="space-y-3">
            {loading && tasks.length === 0 ? (
              <div className="card p-3 text-xs text-slate-500">
                Loading tasks...
              </div>
            ) : tasks.length === 0 ? (
              <div className="card p-4 text-xs text-slate-400">
                You don&apos;t have any tasks yet.
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={() =>
                    navigate(`/tasks/${task._id}/edit`, { state: { task } })
                  }
                  onDelete={handleDelete}
                  onToggleCompleted={handleToggleCompleted}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;

