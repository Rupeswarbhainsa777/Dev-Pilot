import { useState } from "react";
import { NavLink } from "react-router-dom";

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
    dashboard: "M3 3h7v9H3z M14 3h7v5h-7z M14 12h7v9h-7z M3 16h7v5H3z",
    repos:     "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    history:   "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    about:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8h.01 M11 12h1v4h1",
    menu:      "M4 6h16 M4 12h16 M4 18h16",
    close:     "M6 6l12 12 M18 6L6 18",
    branch:    "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9",
    plus:      "M12 5v14 M5 12h14",
    bolt:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

const NAV_ITEMS = [
    { to: "/dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { to: "/repos",     label: "My Repos",  icon: ICONS.repos     },
    { to: "/history",   label: "History",   icon: ICONS.history   },
    { to: "/about",     label: "About",     icon: ICONS.about     },
];

const NaveBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] ${
            isActive
                ? "bg-[var(--color-brand-muted)] text-[#a78bfa] shadow-sm"
                : "text-[var(--color-cal-muted)] hover:bg-[var(--color-cal-elevated)] hover:text-[var(--color-cal-default)]"
        }`;

    const mobileLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150 ${
            isActive
                ? "bg-[var(--color-brand-muted)] text-[#a78bfa] border-l-[3px] border-[var(--color-brand)]"
                : "text-[var(--color-cal-muted)] hover:bg-[var(--color-cal-elevated)] hover:text-[var(--color-cal-default)] border-l-[3px] border-transparent"
        }`;

    return (
        <>
            {/* ── Fixed top bar ── */}
            <header
                className="fixed top-0 inset-x-0 z-50 h-14"
                style={{
                    background: "rgba(16,16,16,0.85)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderBottom: "1px solid var(--color-cal-border)",
                }}
            >
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">

                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
                        aria-label="DevPilot home"
                    >
                        <span
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow"
                            style={{ background: "var(--color-brand)" }}
                        >
                            <Icon d={ICONS.bolt} className="h-4 w-4" />
                        </span>
                        <span
                            className="text-base font-bold tracking-tight"
                            style={{ color: "var(--color-cal-emphasis)" }}
                        >
                            Dev<span style={{ color: "#a78bfa" }}>Pilot</span>
                        </span>
                    </NavLink>

                    {/* Desktop nav */}
                    <nav aria-label="Main" className="hidden lg:flex items-center gap-0.5">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.to} to={item.to} className={linkClass}>
                                <Icon d={item.icon} className="h-4 w-4" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <NavLink to="/dashboard" className="btn-brand text-xs px-3.5 py-1.5">
                            <Icon d={ICONS.plus} className="h-3.5 w-3.5" />
                            New Analysis
                        </NavLink>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        className="btn-ghost lg:hidden border-[var(--color-cal-border)] px-2 py-2"
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
                        className="fixed inset-0 z-40 lg:hidden"
                        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Drawer */}
                    <div
                        className="fixed top-14 inset-x-0 z-50 lg:hidden"
                        style={{
                            background: "var(--color-cal-surface)",
                            borderBottom: "1px solid var(--color-cal-border)",
                            boxShadow: "var(--shadow-popover)",
                        }}
                    >
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
                            <div className="px-4 pt-3 pb-4">
                                <NavLink
                                    to="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="btn-brand w-full justify-center"
                                >
                                    <Icon d={ICONS.plus} className="h-4 w-4" />
                                    New Analysis
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </>
            )}

            {/* ── Spacer ── */}
            <div className="h-14" aria-hidden="true" />
        </>
    );
};

export default NaveBar;