import { useState } from "react";

/* Small helper so we don't need any icon library */
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
    dashboard: "M3 3h7v9H3z M14 3h7v5h-7z M14 12h7v9h-7z M3 16h7v5H3z",
    analyze: "M21 21l-4.3-4.3 M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z",
    repos: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    history: "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    reports: "M4 20V10 M10 20V4 M16 20v-6 M22 20H2",
    settings: "M4 6h9 M17 6h3 M4 12h3 M11 12h9 M4 18h11 M19 18h1",
    plus: "M12 5v14 M5 12h14",
    collapse: "M15 18l-6-6 6-6",
    menu: "M4 6h16 M4 12h16 M4 18h16",
    close: "M6 6l12 12 M18 6L6 18",
    branch: "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9",
};

const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { id: "analyze", label: "Analyze repo", icon: ICONS.analyze },
    { id: "repos", label: "My repositories", icon: ICONS.repos },
    { id: "history", label: "History", icon: ICONS.history },
    { id: "reports", label: "Reports", icon: ICONS.reports },
];

/* Placeholder data - replace with the repos your backend returns */
const RECENT_REPOS = [
    { name: "facebook/react", dot: "bg-sky-500" },
    { name: "django/django", dot: "bg-emerald-500" },
    { name: "vercel/next.js", dot: "bg-amber-500" },
];

const NaveBar = ({ onNavigate, onNewAnalysis }) => {
    const [active, setActive] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false); // desktop only
    const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer

    const handleSelect = (id) => {
        setActive(id);
        setMobileOpen(false);
        onNavigate?.(id);
    };

    // hides text when the desktop sidebar is collapsed
    const hideWhenCollapsed = collapsed ? "lg:hidden" : "";

    const itemClass = (isActive) =>
        `relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        } ${collapsed ? "lg:justify-center lg:px-0" : ""}`;

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="fixed left-3 top-3 z-30 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
            >
                <Icon d={ICONS.menu} />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-all duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
            >
                {/* Logo */}
                <div
                    className={`flex h-16 items-center gap-3 border-b border-slate-200 px-4 ${
                        collapsed ? "lg:justify-center lg:px-0" : ""
                    }`}
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <Icon d={ICONS.branch} className="h-5 w-5" />
                    </div>
                    <span className={`text-lg font-semibold text-slate-900 ${hideWhenCollapsed}`}>
            RepoAnalyzer
          </span>
                    <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
                    >
                        <Icon d={ICONS.close} />
                    </button>
                </div>

                {/* Main content of the sidebar */}
                <div className="flex-1 overflow-y-auto px-3 py-4">
                    {/* Primary action */}
                    <button
                        onClick={() => onNewAnalysis?.()}
                        className={`mb-5 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
                        title="New analysis"
                    >
                        <Icon d={ICONS.plus} className="h-4 w-4" />
                        <span className={hideWhenCollapsed}>New analysis</span>
                    </button>

                    {/* Navigation */}
                    <nav aria-label="Main">
                        <ul className="space-y-1">
                            {NAV_ITEMS.map((item) => {
                                const isActive = active === item.id;
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => handleSelect(item.id)}
                                            aria-current={isActive ? "page" : undefined}
                                            title={collapsed ? item.label : undefined}
                                            className={itemClass(isActive)}
                                        >
                                            {isActive && (
                                                <span className="absolute inset-y-2 left-0 w-1 rounded-r bg-indigo-600" />
                                            )}
                                            <Icon d={item.icon} />
                                            <span className={hideWhenCollapsed}>{item.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Recent repositories */}
                    <div className={`mt-8 ${hideWhenCollapsed}`}>
                        <p className="px-3 pb-2 text-xs font-medium text-slate-500">
                            Recent repositories
                        </p>
                        <ul className="space-y-1">
                            {RECENT_REPOS.map((repo) => (
                                <li key={repo.name}>
                                    <button
                                        onClick={() => onNavigate?.("repo:" + repo.name)}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                                    >
                                        <span className={`h-2 w-2 shrink-0 rounded-full ${repo.dot}`} />
                                        <span className="truncate">{repo.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="space-y-1 border-t border-slate-200 px-3 py-3">
                    <button
                        onClick={() => handleSelect("settings")}
                        aria-current={active === "settings" ? "page" : undefined}
                        title={collapsed ? "Settings" : undefined}
                        className={itemClass(active === "settings")}
                    >
                        {active === "settings" && (
                            <span className="absolute inset-y-2 left-0 w-1 rounded-r bg-indigo-600" />
                        )}
                        <Icon d={ICONS.settings} />
                        <span className={hideWhenCollapsed}>Settings</span>
                    </button>

                    {/* Collapse toggle (desktop only) */}
                    <button
                        onClick={() => setCollapsed((c) => !c)}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        className={`hidden w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:flex ${
                            collapsed ? "lg:justify-center lg:px-0" : ""
                        }`}
                    >
                        <Icon
                            d={ICONS.collapse}
                            className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
                        />
                        <span className={hideWhenCollapsed}>Collapse</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default NaveBar;