import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home     from "./pages/Home.jsx";
import About    from "./pages/About.jsx";
import History  from "./pages/History/History.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import MyRepos  from "./pages/MyRepos/MyRepos.jsx";
import Sidebar  from "./components/Sidebar/Sidebar.jsx";

/* ── Mobile topbar hamburger icon ── */
const MenuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.25rem", height: "1.25rem" }}
         aria-hidden="true">
        <path d="M4 6h16 M4 12h16 M4 18h16" />
    </svg>
);

const BreadcrumbIcon = ({ d }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round"
         style={{ width: "0.875rem", height: "0.875rem", opacity: 0.5 }} aria-hidden="true">
        <path d={d} />
    </svg>
);

const PAGE_META = {
    "/":          { label: "Home",      icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" },
    "/dashboard": { label: "Dashboard", icon: "M3 3h7v9H3z M14 3h7v5h-7z M14 12h7v9h-7z M3 16h7v5H3z" },
    "/repos":     { label: "My Repos",  icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    "/history":   { label: "History",   icon: "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
    "/about":     { label: "About",     icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8h.01 M11 12h1v4h1" },
};

function App() {
    const [collapsed,   setCollapsed]   = useState(false);
    const [mobileOpen,  setMobileOpen]  = useState(false);
    const location = useLocation();

    /* Close mobile menu on route change */
    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    /* Collapse sidebar at medium widths automatically */
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1280px)");
        const handler = (e) => { if (e.matches && !collapsed) setCollapsed(true); };
        if (mq.matches) setCollapsed(true);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const pageMeta = PAGE_META[location.pathname] ?? PAGE_META["/dashboard"];

    const isHome = location.pathname === "/";

    return (
        <div className="app-shell">
            {/* ── Sidebar ── */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* ── Main content area ── */}
            <div className={`main-content${collapsed ? " sidebar-collapsed" : ""}`}>

                {/* ── Topbar (mobile hamburger + breadcrumb) ── */}
                {!isHome && (
                    <header className="topbar">
                        {/* Mobile hamburger */}
                        <button
                            className="btn-icon lg:hidden"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open navigation"
                        >
                            <MenuIcon />
                        </button>

                        {/* Breadcrumb */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
                            <BreadcrumbIcon d={pageMeta.icon} />
                            <span style={{ fontSize: "0.875rem", color: "var(--color-cal-subtle)", fontWeight: 500 }}>
                                {pageMeta.label}
                            </span>
                        </div>

                        {/* Right side: could add search, notifications, user avatar */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span className="badge badge-brand hidden sm:inline-flex">
                                <span className="dot-pulse" style={{ background: "#a78bfa" }} />
                                Beta
                            </span>
                        </div>
                    </header>
                )}

                {/* ── Page content ── */}
                <main className={isHome ? "" : "page-content"} style={isHome ? { flex: 1 } : {}}>
                    <Routes>
                        <Route path="/"         element={<Home />} />
                        <Route path="/about"    element={<About />} />
                        <Route path="/history"  element={<History />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/repos"    element={<MyRepos />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;