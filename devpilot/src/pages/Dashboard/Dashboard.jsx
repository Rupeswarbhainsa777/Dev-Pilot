import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Icon = ({ d, className = "h-5 w-5", style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className={className}
         style={style} aria-hidden="true">
        <path d={d} />
    </svg>
);

const ICONS = {
    chart:    "M3 3v18h18 M7 16l4-4 4 4 4-8",
    bolt:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    repo:     "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    clock:    "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    plus:     "M12 5v14 M5 12h14",
    trend:    "M23 6l-9.5 9.5-5-5L1 18",
    user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    arrow:    "M5 12h14 M12 5l7 7-7 7",
    star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    check:    "M20 6L9 17l-5-5",
    external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    sparkle:  "M12 3l1.5 4.5H18l-3.75 2.7 1.5 4.5L12 12l-3.75 2.7 1.5-4.5L6 7.5h4.5L12 3z",
};

const metrics = [
    {
        label:  "Repos Analyzed",
        value:  "—",
        icon:   ICONS.repo,
        sub:    "Connect GitHub to track",
        badge:  "icon-wrap-brand",
        color:  "#a78bfa",
        trend:  null,
    },
    {
        label:  "AI Summaries",
        value:  "—",
        icon:   ICONS.bolt,
        sub:    "Generated this month",
        badge:  "icon-wrap-brand",
        color:  "#a78bfa",
        trend:  null,
    },
    {
        label:  "Questions Asked",
        value:  "—",
        icon:   ICONS.chart,
        sub:    "Across all sessions",
        badge:  "icon-wrap-success",
        color:  "#34d399",
        trend:  null,
    },
    {
        label:  "Avg Analysis Time",
        value:  "—s",
        icon:   ICONS.clock,
        sub:    "Per repository",
        badge:  "icon-wrap-muted",
        color:  "var(--color-cal-subtle)",
        trend:  null,
    },
];

const quickActions = [
    {
        title:  "Analyze Repository",
        desc:   "Paste a GitHub URL and get an instant AI overview",
        icon:   ICONS.bolt,
        to:     "/repos",
        accent: "var(--color-brand)",
        accentMuted: "var(--color-brand-muted)",
        accentBorder: "rgba(109,40,217,0.2)",
    },
    {
        title:  "Browse My Repos",
        desc:   "View and analyze your own GitHub repositories",
        icon:   ICONS.repo,
        to:     "/repos",
        accent: "var(--color-success)",
        accentMuted: "var(--color-success-muted)",
        accentBorder: "var(--color-success-border)",
    },
    {
        title:  "View History",
        desc:   "See a timeline of all past analyses",
        icon:   ICONS.clock,
        to:     "/history",
        accent: "var(--color-warning)",
        accentMuted: "var(--color-warning-muted)",
        accentBorder: "rgba(245,158,11,0.2)",
    },
];

/* ── Activity bar chart (decorative) ── */
const ActivityChart = () => {
    const bars = [30, 55, 40, 75, 60, 90, 45, 80, 65, 50, 70, 85, 60, 95, 72, 88, 64, 76, 58, 82, 70, 48, 65, 79, 55, 67, 83, 72];
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "80px", padding: "0 0.25rem" }}>
            {bars.map((h, i) => (
                <div
                    key={i}
                    style={{
                        flex: 1,
                        height: `${h}%`,
                        borderRadius: "3px 3px 0 0",
                        background: i === bars.length - 1
                            ? "linear-gradient(180deg, #a78bfa 0%, #6d28d9 100%)"
                            : "var(--color-cal-elevated-2)",
                        opacity: i === bars.length - 1 ? 1 : (0.3 + (i / bars.length) * 0.4),
                        transition: "height 0.5s ease",
                    }}
                />
            ))}
        </div>
    );
};

const Dashboard = () => {
    const [greeting, setGreeting] = useState("Good morning");

    useEffect(() => {
        const h = new Date().getHours();
        if (h >= 12 && h < 17) setGreeting("Good afternoon");
        else if (h >= 17) setGreeting("Good evening");
    }, []);

    return (
        <div className="page-enter">
            {/* ── Header ── */}
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                        <p style={{ fontSize: "0.875rem", color: "var(--color-cal-muted)", fontWeight: 500, marginBottom: "0.25rem" }}>
                            {greeting} 👋
                        </p>
                        <h1 style={{ fontSize: "1.75rem", letterSpacing: "-0.025em", color: "var(--color-cal-emphasis)" }}>
                            Dashboard
                        </h1>
                        <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "var(--color-cal-muted)" }}>
                            Here's an overview of your DevPilot activity.
                        </p>
                    </div>
                    <Link to="/repos" className="btn-brand" style={{ flexShrink: 0 }}>
                        <Icon d={ICONS.plus} className="h-4 w-4" />
                        New Analysis
                    </Link>
                </div>
            </div>

            {/* ── Metric cards ── */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                }}
                className="stagger-children"
            >
                {metrics.map((m) => (
                    <div key={m.label} className="metric-card page-enter">
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    color: "var(--color-cal-muted)",
                                    marginBottom: "0.75rem",
                                }}>
                                    {m.label}
                                </p>
                                <p style={{
                                    fontSize: "2rem",
                                    fontWeight: 800,
                                    letterSpacing: "-0.04em",
                                    lineHeight: 1,
                                    color: "var(--color-cal-emphasis)",
                                    marginBottom: "0.375rem",
                                }}>
                                    {m.value}
                                </p>
                                <p style={{ fontSize: "0.75rem", color: "var(--color-cal-muted)" }}>
                                    {m.sub}
                                </p>
                            </div>
                            <span className={`icon-wrap ${m.badge}`} style={{ width: "2.25rem", height: "2.25rem", flexShrink: 0 }}>
                                <Icon d={m.icon} className="h-4 w-4" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Activity + Quick Actions row ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                {/* Activity Chart card */}
                <div className="cal-card" style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                        <div>
                            <h3 style={{ fontSize: "0.9375rem", color: "var(--color-cal-emphasis)" }}>Activity</h3>
                            <p style={{ fontSize: "0.8125rem", color: "var(--color-cal-muted)", margin: 0 }}>
                                Analyses over the last 28 days
                            </p>
                        </div>
                        <span className="badge badge-muted">Last 4 weeks</span>
                    </div>
                    <ActivityChart />
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                        fontSize: "0.6875rem",
                        color: "var(--color-cal-muted)",
                    }}>
                        <span>28 days ago</span>
                        <span>Today</span>
                    </div>
                </div>
            </div>

            {/* ── Quick actions ── */}
            <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "0.9375rem", color: "var(--color-cal-emphasis)", marginBottom: "0.75rem" }}>
                    Quick Actions
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem" }}>
                    {quickActions.map((qa) => (
                        <Link
                            key={qa.title}
                            to={qa.to}
                            className="cal-card cal-card-interactive"
                            style={{
                                padding: "1.125rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                textDecoration: "none",
                            }}
                        >
                            <span
                                className="icon-wrap"
                                style={{
                                    width: "2.5rem",
                                    height: "2.5rem",
                                    flexShrink: 0,
                                    background: qa.accentMuted,
                                    color: qa.accent,
                                    border: `1px solid ${qa.accentBorder}`,
                                }}
                            >
                                <Icon d={qa.icon} className="h-4 w-4" />
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-cal-emphasis)", margin: "0 0 0.2rem" }}>
                                    {qa.title}
                                </p>
                                <p style={{ fontSize: "0.8125rem", color: "var(--color-cal-muted)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {qa.desc}
                                </p>
                            </div>
                            <Icon d={ICONS.arrow} className="h-4 w-4" style={{ color: "var(--color-cal-muted)", flexShrink: 0 }} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* ── Empty / CTA state ── */}
            <div className="empty-state">
                <div
                    className="icon-wrap icon-wrap-brand anim-float"
                    style={{ width: "4rem", height: "4rem", borderRadius: "1rem" }}
                >
                    <Icon d={ICONS.sparkle} className="h-8 w-8" />
                </div>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-cal-emphasis)", marginTop: "0.5rem" }}>
                    Run your first analysis
                </h2>
                <p style={{ maxWidth: "30rem", fontSize: "0.875rem", color: "var(--color-cal-muted)", margin: 0 }}>
                    Paste a GitHub repository URL and DevPilot will read the code, generate a summary,
                    and let you ask questions in plain English. Results arrive in under 10 seconds.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
                    <Link to="/repos" className="btn-brand">
                        <Icon d={ICONS.repo} className="h-4 w-4" />
                        Choose a Repository
                    </Link>
                    <Link to="/about" className="btn-ghost">
                        <Icon d={ICONS.sparkle} className="h-4 w-4" />
                        How it works
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;