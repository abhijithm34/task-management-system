import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: ''
};

const TaskForm = ({ initialTask, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || ''
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialTask]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isEditing = Boolean(initialTask);

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            {isEditing ? 'Edit task' : 'Create task'}
          </h2>
        </div>
      </header>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">Title</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
          placeholder="Write documentation"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">
          Description
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
          placeholder="Add relevant context, links, or acceptance criteria."
        />
      </div>

      <footer className="flex items-center justify-end gap-2 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn-primary"
          disabled={submitting}
        >
          {submitting
            ? isEditing
              ? 'Saving...'
              : 'Creating...'
            : isEditing
            ? 'Save changes'
            : 'Create task'}
        </button>
      </footer>
    </form>
  );
};

export default TaskForm;

