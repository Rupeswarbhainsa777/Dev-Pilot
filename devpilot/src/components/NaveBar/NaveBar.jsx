import { useState } from "react";
import { NavLink } from "react-router-dom";

/* ── Inline SVG helper (no icon lib needed) ── */
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
    repos:     "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    history:   "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    about:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8h.01 M11 12h1v4h1",
    menu:      "M4 6h16 M4 12h16 M4 18h16",
    close:     "M6 6l12 12 M18 6L6 18",
    branch:    "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9",
    plus:      "M12 5v14 M5 12h14",
};

/* Routes must match App.jsx exactly */
const NAV_ITEMS = [
    { to: "/dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { to: "/repos",     label: "My Repos",  icon: ICONS.repos     },
    { to: "/history",   label: "History",   icon: ICONS.history   },
    { to: "/about",     label: "About",     icon: ICONS.about     },
];

const NaveBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            isActive
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    const mobileLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
            isActive
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "text-slate-700 hover:bg-slate-100 border-l-4 border-transparent"
        }`;

    return (
        <>
            {/* ── Fixed top bar ── */}
            <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">

                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-2.5 text-slate-900 hover:opacity-80 transition-opacity"
                        aria-label="DevPilot home"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow">
                            <Icon d={ICONS.branch} className="h-5 w-5" />
                        </span>
                        <span className="text-lg font-bold tracking-tight">DevPilot</span>
                    </NavLink>

                    {/* Desktop nav links */}
                    <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.to} to={item.to} className={linkClass}>
                                <Icon d={item.icon} className="h-4 w-4" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <NavLink
                            to="/dashboard"
                            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                            <Icon d={ICONS.plus} className="h-4 w-4" />
                            New Analysis
                        </NavLink>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        className="lg:hidden rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                        <Icon d={mobileOpen ? ICONS.close : ICONS.menu} />
                    </button>
                </div>
            </header>

            {/* ── Mobile drawer ── */}
            {mobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Drawer panel */}
                    <div className="fixed top-16 inset-x-0 z-50 bg-white border-b border-slate-200 shadow-lg lg:hidden">
                        <nav aria-label="Mobile" className="py-2">
                            {NAV_ITEMS.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={mobileLinkClass}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon d={item.icon} className="h-5 w-5" />
                                    {item.label}
                                </NavLink>
                            ))}
                            <div className="px-4 pt-3 pb-2">
                                <NavLink
                                    to="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                                >
                                    <Icon d={ICONS.plus} className="h-4 w-4" />
                                    New Analysis
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </>
            )}

            {/* ── Spacer so page content starts below the fixed bar ── */}
            <div className="h-16" aria-hidden="true" />
        </>
    );
};

export default NaveBar;