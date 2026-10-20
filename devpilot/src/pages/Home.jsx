/* ── Inline SVG helper ── */
const Icon = ({ d, className = "h-5 w-5" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <path d={d} />
    </svg>
);

const ICONS = {
    bolt:    "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    repo:    "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    chart:   "M3 3v18h18 M7 16l4-4 4 4 4-8",
    arrow:   "M5 12h14 M12 5l7 7-7 7",
    code:    "M16 18l6-6-6-6 M8 6l-6 6 6 6",
    clock:   "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    branch:  "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9",
    plus:    "M12 5v14 M5 12h14",
    external:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
};

const features = [
    {
        icon: ICONS.code,
        title: "AI Code Analysis",
        desc: "Paste any GitHub URL and get an instant AI-powered breakdown of the codebase architecture.",
    },
    {
        icon: ICONS.branch,
        title: "Branch Insights",
        desc: "Visualize branch history, open pull requests, and contributor activity at a glance.",
    },
    {
        icon: ICONS.chart,
        title: "Commit Analytics",
        desc: "Track velocity, detect hotspots, and understand how the project has evolved over time.",
    },
    {
        icon: ICONS.clock,
        title: "History Timeline",
        desc: "Scroll through a rich timeline of every analysis you've run — always just one click away.",
    },
];

const stats = [
    { label: "Repos Analyzed", value: "12 k+" },
    { label: "AI Summaries", value: "84 k+" },
    { label: "Questions Answered", value: "230 k+" },
    { label: "Devs Onboarded", value: "9 k+" },
];

const Home = () => (
    <div className="page-enter">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-16 pb-20 text-center">
            {/* Glow blobs */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div
                    className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
                    style={{ background: "var(--color-brand)" }}
                />
            </div>

            <div className="mx-auto max-w-3xl px-4">
                <span className="badge badge-brand mb-6 inline-flex">
                    <span className="dot-pulse mr-1.5" />
                    Powered by Gemini AI
                </span>

                <h1 className="mt-2 text-5xl sm:text-6xl">
                    Navigate any{" "}
                    <span style={{ color: "#a78bfa" }}>codebase</span>
                    <br />
                    in seconds.
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: "var(--color-cal-muted)" }}>
                    DevPilot fetches your GitHub repository, reads every file, and gives you an
                    AI-generated map so you can ask questions in plain English — no onboarding docs required.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href="/dashboard" className="btn-brand px-6 py-2.5 text-sm">
                        <Icon d={ICONS.bolt} className="h-4 w-4" />
                        Analyze a Repository
                    </a>
                    <a href="/repos" className="btn-ghost px-6 py-2.5 text-sm">
                        <Icon d={ICONS.repo} className="h-4 w-4" />
                        Browse My Repos
                    </a>
                </div>
            </div>
        </section>

        {/* ── Stats strip ── */}
        <section
            className="border-y py-8"
            style={{ borderColor: "var(--color-cal-border)", background: "var(--color-cal-surface)" }}
        >
            <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:grid-cols-4">
                {stats.map((s) => (
                    <div key={s.label} className="text-center">
                        <dt className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--color-cal-muted)" }}>
                            {s.label}
                        </dt>
                        <dd className="mt-1 text-3xl font-bold" style={{ color: "var(--color-cal-emphasis)" }}>
                            {s.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>

        {/* ── Feature grid ── */}
        <section className="mx-auto max-w-5xl px-4 py-20">
            <h2 className="text-center text-2xl font-bold" style={{ color: "var(--color-cal-emphasis)" }}>
                Everything you need to understand a repository
            </h2>
            <p className="mt-3 text-center" style={{ color: "var(--color-cal-muted)" }}>
                From first glance to deep dive — all in one place.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {features.map((f) => (
                    <div key={f.title} className="cal-card p-6 flex gap-4">
                        <span
                            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                            style={{ background: "var(--color-brand-muted)", color: "#a78bfa" }}
                        >
                            <Icon d={f.icon} className="h-5 w-5" />
                        </span>
                        <div>
                            <h3 className="font-semibold" style={{ color: "var(--color-cal-emphasis)" }}>
                                {f.title}
                            </h3>
                            <p className="mt-1 text-sm leading-6" style={{ color: "var(--color-cal-muted)" }}>
                                {f.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* ── CTA Banner ── */}
        <section
            className="mx-auto mb-20 max-w-5xl rounded-2xl px-4"
        >
            <div
                className="relative overflow-hidden rounded-2xl p-10 text-center"
                style={{
                    background: "linear-gradient(135deg, var(--color-brand) 0%, #312e81 100%)",
                }}
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 70% 30%, #fff 0%, transparent 60%)",
                    }}
                />
                <h2 className="relative text-2xl font-bold text-white">
                    Ready to explore your first repo?
                </h2>
                <p className="relative mt-2 text-sm text-purple-200">
                    Paste a link, get your AI briefing in under 10 seconds.
                </p>
                <a
                    href="/dashboard"
                    className="relative mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
                >
                    Get started free
                    <Icon d={ICONS.arrow} className="h-4 w-4" />
                </a>
            </div>
        </section>
    </div>
);

export default Home;