import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import TaskForm from '../components/TaskForm';
import { useApi } from '../services/api';

const TaskFormPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const api = useApi();

  const taskFromState = location.state?.task || null;
  const isEditing = Boolean(id && taskFromState);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (form) => {
    setSubmitting(true);
    try {
      if (isEditing) {
        await api.put(`/tasks/${id}`, form);
      } else {
        await api.post('/tasks', form);
      }
      navigate('/');
    } catch (error) {
      console.error('Save task error', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-2xl">
        <TaskForm
          initialTask={taskFromState}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          submitting={submitting}
        />
      </div>
    </AppLayout>
  );
};

export default TaskFormPage;

