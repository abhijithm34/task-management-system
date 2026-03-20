const TaskFilters = ({ filters, onChange }) => {
  const handleChange = (field, value) => {
    onChange((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="card flex flex-wrap items-center gap-3 p-4">
      <div className="flex flex-wrap gap-3 text-xs text-slate-600">
        <span className="font-medium text-slate-700">Filter</span>
        <select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="min-w-[120px] rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-primary focus:outline-none"
        >
          <option value="">All</option>
          <option value="notCompleted">Not completed</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </section>
  );
};

export default TaskFilters;

