const Icon = ({ d, className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d={d} />
    </svg>
);

const ICONS = {
    clock:  "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    search: "M21 21l-4.35-4.35 M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
    repo:   "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
};

const History = () => (
    <div className="page-enter">
        {/* Header */}
        <div className="mb-8">
            <span className="badge badge-muted mb-2 inline-flex">
                <Icon d={ICONS.clock} className="h-3 w-3 mr-1" />
                Activity
            </span>
            <h1 className="text-3xl font-bold" style={{ color: "var(--color-cal-emphasis)" }}>
                History
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--color-cal-muted)" }}>
                A timeline of every repository you've analyzed with DevPilot.
            </p>
        </div>

        {/* Empty state */}
        <div
            className="rounded-2xl border p-16 text-center"
            style={{
                background: "var(--color-cal-surface)",
                borderColor: "var(--color-cal-border)",
            }}
        >
            <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: "var(--color-cal-elevated)" }}
            >
                <Icon d={ICONS.clock} className="h-8 w-8" style={{ color: "var(--color-cal-muted)" }} />
            </div>
            <h2 className="mt-5 text-xl font-semibold" style={{ color: "var(--color-cal-emphasis)" }}>
                No history yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: "var(--color-cal-muted)" }}>
                Once you analyze a repository, it'll appear here with a full timeline of your
                conversations and AI summaries.
            </p>
            <a href="/repos" className="btn-brand mx-auto mt-6 inline-flex text-sm">
                <Icon d={ICONS.repo} className="h-4 w-4" />
                Analyze a Repository
            </a>
        </div>
    </div>
);

export default History;