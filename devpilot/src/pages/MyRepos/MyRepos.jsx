import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ── SVG helper ── */
const Icon = ({ d, className = "h-4 w-4", style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className={className}
         style={style} aria-hidden="true">
        <path d={d} />
    </svg>
);

const ICONS = {
    star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    fork:     "M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M18 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 6v3a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6V6",
    external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
    eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    repo:     "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    search:   "M21 21l-4.35-4.35 M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
    close:    "M18 6 6 18 M6 6l12 12",
    sort:     "M3 6h18 M7 12h10 M11 18h4",
    bolt:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    grid:     "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    list:     "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
    refresh:  "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
};

const LANG_COLORS = {
    JavaScript: "#f7df1e", TypeScript: "#3178c6",
    Python:     "#3572a5", Rust:       "#dea584",
    Go:         "#00add8", Java:       "#b07219",
    "C++":      "#f34b7d", C:          "#555555",
    CSS:        "#563d7c", HTML:       "#e34c26",
    Ruby:       "#701516", Shell:      "#89e051",
    Dockerfile: "#384d54", Dart:       "#00b4ab",
    Swift:      "#f05138", Kotlin:     "#7f52ff",
    Vue:        "#42b883", PHP:        "#4f5d95",
};

const LangDot = ({ lang }) => {
    const color = LANG_COLORS[lang] ?? "#6b7280";
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "var(--color-cal-muted)" }}>
            <span style={{ display: "inline-block", width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: color, flexShrink: 0 }} />
            {lang}
        </span>
    );
};

const SkeletonCard = () => (
    <div className="cal-card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem" }}>
            <div className="skeleton" style={{ width: "1.5rem", height: "1.5rem", borderRadius: "0.375rem", flexShrink: 0 }} />
            <div className="skeleton" style={{ height: "1rem", width: "60%", borderRadius: "0.25rem" }} />
        </div>
        <div className="skeleton" style={{ height: "0.75rem", width: "100%", borderRadius: "0.25rem", marginBottom: "0.5rem" }} />
        <div className="skeleton" style={{ height: "0.75rem", width: "75%", borderRadius: "0.25rem", marginBottom: "1.25rem" }} />
        <div style={{ display: "flex", gap: "0.75rem" }}>
            <div className="skeleton" style={{ height: "0.625rem", width: "3rem", borderRadius: "0.25rem" }} />
            <div className="skeleton" style={{ height: "0.625rem", width: "2.5rem", borderRadius: "0.25rem" }} />
            <div className="skeleton" style={{ height: "0.625rem", width: "3.5rem", borderRadius: "0.25rem" }} />
        </div>
    </div>
);

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
};

const MyReposPage = () => {
    const [repos,   setRepos]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);
    const [search,  setSearch]  = useState("");
    const [sortBy,  setSortBy]  = useState("updated");
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        fetch("https://api.github.com/users/Rupeswarbhainsa777/repos?per_page=100")
            .then((r) => {
                if (!r.ok) throw new Error(`GitHub API error ${r.status}`);
                return r.json();
            })
            .then((data) => { setRepos(data); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, []);

    const filtered = repos
        .filter((r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            (r.description ?? "").toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
            if (sortBy === "name")  return a.name.localeCompare(b.name);
            if (sortBy === "forks") return b.forks_count - a.forks_count;
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

    return (
        <div className="page-enter">
            {/* ── Header ── */}
            <div style={{ marginBottom: "1.75rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                            <span className="badge badge-brand">
                                <Icon d={ICONS.repo} className="h-3 w-3" />
                                GitHub
                            </span>
                        </div>
                        <h1 style={{ fontSize: "1.75rem", letterSpacing: "-0.025em", color: "var(--color-cal-emphasis)" }}>
                            My Repositories
                        </h1>
                        <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "var(--color-cal-muted)" }}>
                            {loading ? "Loading repositories…" : `${filtered.length} of ${repos.length} repos`}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Controls toolbar ── */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1.5rem",
                padding: "0.75rem",
                background: "var(--color-cal-surface)",
                border: "1px solid var(--color-cal-border)",
                borderRadius: "0.75rem",
            }}>
                {/* Search */}
                <div style={{ position: "relative", flex: "1 1 200px", minWidth: "160px" }}>
                    <Icon
                        d={ICONS.search}
                        className="h-4 w-4"
                        style={{
                            position: "absolute",
                            left: "0.625rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--color-cal-muted)",
                            pointerEvents: "none",
                        }}
                    />
                    <input
                        type="search"
                        id="repo-search"
                        placeholder="Search repositories…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field"
                        style={{ paddingLeft: "2.125rem" }}
                        aria-label="Search repositories"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            aria-label="Clear search"
                            style={{
                                position: "absolute",
                                right: "0.5rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--color-cal-muted)",
                                display: "flex",
                                padding: "0.125rem",
                            }}
                        >
                            <Icon d={ICONS.close} className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {/* Sort */}
                <div style={{ position: "relative" }}>
                    <Icon
                        d={ICONS.sort}
                        className="h-3.5 w-3.5"
                        style={{
                            position: "absolute",
                            left: "0.625rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--color-cal-muted)",
                            pointerEvents: "none",
                        }}
                    />
                    <select
                        id="repo-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input-field"
                        style={{ paddingLeft: "2rem", paddingRight: "0.75rem", width: "auto", cursor: "pointer" }}
                        aria-label="Sort repositories"
                    >
                        <option value="updated">Recently Updated</option>
                        <option value="stars">Most Stars</option>
                        <option value="forks">Most Forks</option>
                        <option value="name">Name A–Z</option>
                    </select>
                </div>

                {/* View toggle */}
                <div style={{ display: "flex", border: "1px solid var(--color-cal-border)", borderRadius: "0.5rem", overflow: "hidden", flexShrink: 0 }}>
                    {[["grid", ICONS.grid], ["list", ICONS.list]].map(([mode, icon]) => (
                        <button
                            key={mode}
                            id={`view-${mode}`}
                            onClick={() => setViewMode(mode)}
                            aria-label={`${mode} view`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "2.125rem",
                                height: "2.125rem",
                                background: viewMode === mode ? "var(--color-cal-elevated-2)" : "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: viewMode === mode ? "var(--color-cal-emphasis)" : "var(--color-cal-muted)",
                                transition: "all 0.15s ease",
                            }}
                        >
                            <Icon d={icon} className="h-3.5 w-3.5" />
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Error ── */}
            {error && (
                <div style={{
                    marginBottom: "1.25rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "0.625rem",
                    background: "var(--color-danger-muted)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    color: "#fca5a5",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                }}>
                    ⚠ {error}
                </div>
            )}

            {/* ── Grid / List ── */}
            {loading ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.875rem" }}>
                    {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : viewMode === "grid" ? (
                <div
                    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.875rem" }}
                    className="stagger-children"
                >
                    {filtered.map((repo) => (
                        <article
                            key={repo.id}
                            className="cal-card cal-card-interactive page-enter"
                            style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: "1.25rem" }}
                        >
                            {/* Header */}
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
                                    <span
                                        className="icon-wrap icon-wrap-muted"
                                        style={{ width: "1.75rem", height: "1.75rem", flexShrink: 0 }}
                                    >
                                        <Icon d={ICONS.repo} className="h-3.5 w-3.5" />
                                    </span>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            fontWeight: 600,
                                            fontSize: "0.875rem",
                                            color: "#a78bfa",
                                            textDecoration: "none",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                                    >
                                        {repo.name}
                                    </a>
                                </div>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Open ${repo.name} on GitHub`}
                                    style={{ color: "var(--color-cal-muted)", flexShrink: 0, transition: "color 0.15s ease" }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-cal-subtle)"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-cal-muted)"}
                                >
                                    <Icon d={ICONS.external} className="h-3.5 w-3.5" />
                                </a>
                            </div>

                            {/* Description */}
                            <p style={{
                                fontSize: "0.8125rem",
                                lineHeight: 1.65,
                                color: "var(--color-cal-muted)",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                flex: 1,
                                margin: 0,
                            }}>
                                {repo.description || "No description available."}
                            </p>

                            {/* Badges row */}
                            {(repo.fork || repo.archived || repo.private) && (
                                <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                                    {repo.fork     && <span className="badge badge-muted">Fork</span>}
                                    {repo.archived && <span className="badge badge-warning">Archived</span>}
                                    {repo.private  && <span className="badge badge-brand">Private</span>}
                                </div>
                            )}

                            {/* Footer meta */}
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                gap: "0.75rem",
                                paddingTop: "0.75rem",
                                borderTop: "1px solid var(--color-cal-border)",
                            }}>
                                {repo.language && <LangDot lang={repo.language} />}

                                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--color-cal-muted)" }}>
                                    <Icon d={ICONS.star} className="h-3 w-3" />
                                    {repo.stargazers_count.toLocaleString()}
                                </span>

                                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--color-cal-muted)" }}>
                                    <Icon d={ICONS.fork} className="h-3 w-3" />
                                    {repo.forks_count.toLocaleString()}
                                </span>

                                <span style={{ marginLeft: "auto", fontSize: "0.6875rem", color: "var(--color-cal-muted)" }}>
                                    {formatDate(repo.updated_at)}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                /* List view */
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} className="stagger-children">
                    {filtered.map((repo) => (
                        <div
                            key={repo.id}
                            className="cal-card cal-card-interactive page-enter"
                            style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1.125rem" }}
                        >
                            <span className="icon-wrap icon-wrap-muted" style={{ width: "2rem", height: "2rem", flexShrink: 0 }}>
                                <Icon d={ICONS.repo} className="h-3.5 w-3.5" />
                            </span>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ fontWeight: 600, fontSize: "0.875rem", color: "#a78bfa", textDecoration: "none" }}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                                    >
                                        {repo.name}
                                    </a>
                                    {repo.fork     && <span className="badge badge-muted" style={{ fontSize: "0.6875rem" }}>Fork</span>}
                                    {repo.archived && <span className="badge badge-warning" style={{ fontSize: "0.6875rem" }}>Archived</span>}
                                    {repo.private  && <span className="badge badge-brand" style={{ fontSize: "0.6875rem" }}>Private</span>}
                                </div>
                                <p style={{ fontSize: "0.8125rem", color: "var(--color-cal-muted)", margin: "0.125rem 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {repo.description || "No description"}
                                </p>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                                {repo.language && (
                                    <span style={{ display: "none", fontSize: "0.75rem", color: "var(--color-cal-muted)" }}
                                          className="sm:inline-flex">
                                        <LangDot lang={repo.language} />
                                    </span>
                                )}
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--color-cal-muted)" }}>
                                    <Icon d={ICONS.star} className="h-3 w-3" />
                                    {repo.stargazers_count}
                                </span>
                                <span style={{ fontSize: "0.6875rem", color: "var(--color-cal-muted)" }}>
                                    {formatDate(repo.updated_at)}
                                </span>
                                <a href={repo.html_url} target="_blank" rel="noreferrer"
                                   style={{ color: "var(--color-cal-muted)" }}
                                   aria-label={`Open ${repo.name} on GitHub`}>
                                    <Icon d={ICONS.external} className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Empty search state ── */}
            {!loading && filtered.length === 0 && (
                <div className="empty-state" style={{ marginTop: "2rem" }}>
                    <span style={{ fontSize: "3rem" }}>🔍</span>
                    <h3 style={{ color: "var(--color-cal-emphasis)" }}>No repositories match your search</h3>
                    <p style={{ fontSize: "0.875rem" }}>
                        Try a different keyword or clear the search filter.
                    </p>
                    <button onClick={() => setSearch("")} className="btn-ghost">
                        <Icon d={ICONS.close} className="h-4 w-4" />
                        Clear search
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyReposPage;