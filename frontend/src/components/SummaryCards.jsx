const SummaryCards = ({ stats }) => {
  const items = [
    {
      label: 'Not completed',
      value: stats.notCompleted,
      tone: 'text-slate-900'
    },
    {
      label: 'Completed',
      value: stats.completed,
      tone: 'text-slate-900'
    }
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {item.label}
            </span>
          </div>
          <p className={`mt-3 text-2xl font-semibold ${item.tone}`}>
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
};

export default SummaryCards;

