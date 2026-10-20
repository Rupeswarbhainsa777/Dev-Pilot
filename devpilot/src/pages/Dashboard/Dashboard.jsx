const Icon = ({ d, className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d={d} />
    </svg>
);

const ICONS = {
    chart:  "M3 3v18h18 M7 16l4-4 4 4 4-8",
    bolt:   "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    repo:   "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    clock:  "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    plus:   "M12 5v14 M5 12h14",
    trend:  "M23 6l-9.5 9.5-5-5L1 18",
    user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
};

const metrics = [
    { label: "Repos Analyzed",    value: "—",  icon: ICONS.repo,  sub: "0 this week",  badge: "badge-muted"   },
    { label: "AI Summaries",      value: "—",  icon: ICONS.bolt,  sub: "0 this month", badge: "badge-brand"   },
    { label: "Questions Asked",   value: "—",  icon: ICONS.chart, sub: "0 today",      badge: "badge-success" },
    { label: "Analysis Time (avg)", value: "—s", icon: ICONS.clock, sub: "per repo",   badge: "badge-muted"   },
];

const Dashboard = () => (
    <div className="page-enter">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold" style={{ color: "var(--color-cal-emphasis)" }}>
                    Dashboard
                </h1>
                <p className="mt-1 text-sm" style={{ color: "var(--color-cal-muted)" }}>
                    Welcome back — here's what's happening with your repositories.
                </p>
            </div>
            <a href="/repos" className="btn-brand mt-4 sm:mt-0 self-start text-sm">
                <Icon d={ICONS.plus} className="h-4 w-4" />
                New Analysis
            </a>
        </div>

        {/* Metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((m) => (
                <div key={m.label} className="cal-card p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-cal-muted)" }}>
                                {m.label}
                            </p>
                            <p className="mt-2 text-3xl font-bold" style={{ color: "var(--color-cal-emphasis)" }}>
                                {m.value}
                            </p>
                            <p className="mt-1 text-xs" style={{ color: "var(--color-cal-muted)" }}>
                                {m.sub}
                            </p>
                        </div>
                        <span
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.badge}`}
                        >
                            <Icon d={m.icon} className="h-5 w-5" />
                        </span>
                    </div>
                </div>
            ))}
        </div>

        {/* Empty / CTA state */}
        <div
            className="mt-8 rounded-2xl border p-10 text-center"
            style={{
                background: "var(--color-cal-surface)",
                borderColor: "var(--color-cal-border)",
                borderStyle: "dashed",
            }}
        >
            <span style={{ fontSize: "2.5rem" }}>🚀</span>
            <h2 className="mt-4 text-xl font-semibold" style={{ color: "var(--color-cal-emphasis)" }}>
                Run your first analysis
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: "var(--color-cal-muted)" }}>
                Paste a GitHub repository URL and DevPilot will read the code, generate a summary,
                and let you ask questions in plain English.
            </p>
            <a href="/repos" className="btn-brand mx-auto mt-6 inline-flex text-sm">
                <Icon d={ICONS.repo} className="h-4 w-4" />
                Choose a Repository
            </a>
        </div>
    </div>
);

export default Dashboard;