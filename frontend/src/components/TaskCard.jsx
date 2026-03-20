const statusColorMap = {
  Pending: 'bg-slate-100 text-slate-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700'
};

const TaskCard = ({ task, onEdit, onDelete, onToggleCompleted }) => {
  const completed = task.status === 'Completed';

  return (
    <article className="card flex flex-col gap-3 p-4">
      <header className="flex items-start justify-between gap-3">
        <label className="mt-0.5 inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => onToggleCompleted(task, e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <span className="sr-only">Mark complete</span>
        </label>

        <div className="flex-1">
          <h3
            className={`text-sm font-semibold ${
              completed ? 'text-slate-500 line-through' : 'text-slate-900'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-xs text-slate-600 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`mt-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColorMap[task.status]}`}
        >
          {task.status}
        </span>
      </header>

      <footer className="mt-2 flex items-center justify-between gap-2 text-xs">
        <span className="text-[11px] text-slate-400">
          {completed ? 'Completed' : 'Not completed'}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className="rounded-lg border border-red-100 bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
};

export default TaskCard;

