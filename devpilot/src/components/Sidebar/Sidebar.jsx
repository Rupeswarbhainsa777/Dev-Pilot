import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

/* ── SVG helper ── */
const Icon = ({ d, className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {Array.isArray(d)
            ? d.map((path, i) => <path key={i} d={path} />)
            : <path d={d} />}
    </svg>
);

const ICONS = {
    dashboard:  "M3 3h7v9H3z M14 3h7v5h-7z M14 12h7v9h-7z M3 16h7v5H3z",
    repos:      "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    history:    "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    about:      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8h.01 M11 12h1v4h1",
    bolt:       "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    chevronLeft:"M15 18l-6-6 6-6",
    chevronRight:"M9 18l6-6-6-6",
    plus:       "M12 5v14 M5 12h14",
    menu:       "M4 6h16 M4 12h16 M4 18h16",
    close:      "M6 6l12 12 M18 6L6 18",
    settings:   "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    github:     "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
};

const NAV_ITEMS = [
    { to: "/dashboard", label: "Dashboard",      icon: ICONS.dashboard },
    { to: "/repos",     label: "My Repos",       icon: ICONS.repos     },
    { to: "/history",   label: "History",        icon: ICONS.history   },
    { to: "/about",     label: "About",          icon: ICONS.about     },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const handleNavClick = () => {
        if (window.innerWidth < 1024) setMobileOpen(false);
    };

    const linkClass = ({ isActive }) =>
        `sidebar-link${isActive ? " active" : ""}`;

    return (
        <>
            {/* ── Mobile overlay ── */}
            <div
                className={`sidebar-overlay${mobileOpen ? " active" : ""}`}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />

            {/* ── Sidebar panel ── */}
            <aside
                className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}
                aria-label="Sidebar navigation"
            >
                {/* Logo row */}
                <div
                    style={{
                        height: "var(--topbar-height)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: collapsed ? "center" : "space-between",
                        padding: collapsed ? "0 1rem" : "0 0.75rem 0 1rem",
                        borderBottom: "1px solid var(--color-cal-border)",
                        flexShrink: 0,
                    }}
                >
                    {!collapsed && (
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
                            aria-label="DevPilot home"
                            onClick={handleNavClick}
                        >
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "1.875rem",
                                    height: "1.875rem",
                                    borderRadius: "0.5rem",
                                    background: "var(--color-brand)",
                                    flexShrink: 0,
                                    boxShadow: "0 0 12px rgba(109,40,217,0.4)",
                                }}
                            >
                                <Icon d={ICONS.bolt} className="h-3.5 w-3.5" style={{ color: "#fff" }} />
                            </span>
                            <span style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-cal-emphasis)" }}>
                                Dev<span style={{ color: "#a78bfa" }}>Pilot</span>
                            </span>
                        </Link>
                    )}

                    {collapsed && (
                        <Link to="/" onClick={handleNavClick} aria-label="DevPilot home">
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "1.875rem",
                                    height: "1.875rem",
                                    borderRadius: "0.5rem",
                                    background: "var(--color-brand)",
                                    boxShadow: "0 0 12px rgba(109,40,217,0.4)",
                                }}
                            >
                                <Icon d={ICONS.bolt} className="h-3.5 w-3.5" style={{ color: "#fff" }} />
                            </span>
                        </Link>
                    )}

                    {!collapsed && (
                        <button
                            className="btn-icon"
                            onClick={() => setCollapsed(true)}
                            aria-label="Collapse sidebar"
                            title="Collapse sidebar"
                        >
                            <Icon d={ICONS.chevronLeft} className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {/* Nav items */}
                <nav
                    className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2"
                    style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}
                    aria-label="Main navigation"
                >
                    {/* New Analysis CTA */}
                    {!collapsed ? (
                        <Link
                            to="/dashboard"
                            className="btn-brand mb-3 w-full justify-center"
                            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
                            onClick={handleNavClick}
                        >
                            <Icon d={ICONS.plus} className="h-3.5 w-3.5" />
                            New Analysis
                        </Link>
                    ) : (
                        <div className="tooltip mb-3" data-tooltip="New Analysis">
                            <Link
                                to="/dashboard"
                                className="btn-brand w-full justify-center"
                                style={{ padding: "0.5rem", borderRadius: "0.5rem", width: "100%", display: "flex" }}
                                onClick={handleNavClick}
                            >
                                <Icon d={ICONS.plus} className="h-4 w-4" />
                            </Link>
                        </div>
                    )}

                    <div style={{ height: "1px", background: "var(--color-cal-border)", margin: "0.25rem 0 0.5rem" }} />

                    {/* Main nav */}
                    {NAV_ITEMS.map((item) =>
                        collapsed ? (
                            <div key={item.to} className="tooltip" data-tooltip={item.label}>
                                <NavLink
                                    to={item.to}
                                    className={linkClass}
                                    onClick={handleNavClick}
                                    style={{ justifyContent: "center", padding: "0.5rem" }}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                         strokeLinecap="round" strokeLinejoin="round" className="sidebar-link-icon"
                                         style={{ width: "1rem", height: "1rem" }} aria-hidden="true">
                                        <path d={item.icon} />
                                    </svg>
                                </NavLink>
                            </div>
                        ) : (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={linkClass}
                                onClick={handleNavClick}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                     strokeLinecap="round" strokeLinejoin="round" className="sidebar-link-icon"
                                     aria-hidden="true">
                                    <path d={item.icon} />
                                </svg>
                                <span className="sidebar-label">{item.label}</span>
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Bottom section */}
                <div
                    style={{
                        padding: "0.75rem 0.5rem",
                        borderTop: "1px solid var(--color-cal-border)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.125rem",
                    }}
                >
                    {/* GitHub link */}
                    {collapsed ? (
                        <div className="tooltip" data-tooltip="View on GitHub">
                            <a
                                href="https://github.com/Rupeswarbhainsa777"
                                target="_blank"
                                rel="noreferrer"
                                className="sidebar-link"
                                style={{ justifyContent: "center", padding: "0.5rem" }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                     strokeLinecap="round" strokeLinejoin="round" className="sidebar-link-icon"
                                     aria-hidden="true">
                                    <path d={ICONS.github} />
                                </svg>
                            </a>
                        </div>
                    ) : (
                        <a
                            href="https://github.com/Rupeswarbhainsa777"
                            target="_blank"
                            rel="noreferrer"
                            className="sidebar-link"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                 strokeLinecap="round" strokeLinejoin="round" className="sidebar-link-icon"
                                 aria-hidden="true">
                                <path d={ICONS.github} />
                            </svg>
                            <span className="sidebar-label">GitHub Profile</span>
                        </a>
                    )}

                    {/* Collapse toggle (when NOT collapsed, show bottom toggle too) */}
                    {collapsed && (
                        <div className="tooltip" data-tooltip="Expand sidebar">
                            <button
                                className="sidebar-link w-full"
                                onClick={() => setCollapsed(false)}
                                aria-label="Expand sidebar"
                                style={{ justifyContent: "center", padding: "0.5rem", border: "none", background: "none" }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                     strokeLinecap="round" strokeLinejoin="round" className="sidebar-link-icon"
                                     aria-hidden="true">
                                    <path d={ICONS.chevronRight} />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Version tag */}
                    {!collapsed && (
                        <div style={{ padding: "0.5rem 0.75rem", marginTop: "0.25rem" }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem 0.625rem",
                                borderRadius: "0.5rem",
                                background: "var(--color-cal-elevated)",
                                border: "1px solid var(--color-cal-border)",
                            }}>
                                <span className="dot-pulse dot-pulse-brand" />
                                <span style={{ fontSize: "0.75rem", color: "var(--color-cal-muted)", fontWeight: 500 }}>
                                    Powered by Gemini
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
