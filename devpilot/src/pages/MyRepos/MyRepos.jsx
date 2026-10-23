import { useEffect, useState } from "react";

/* ── Inline SVG helper ── */
const Icon = ({ d, className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
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
    code:     "M16 18l6-6-6-6 M8 6l-6 6 6 6",
};

/* Language → color dot */
const LANG_COLORS = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python:     "#3572a5",
    Rust:       "#dea584",
    Go:         "#00add8",
    Java:       "#b07219",
    "C++":      "#f34b7d",
    C:          "#555555",
    CSS:        "#563d7c",
    HTML:       "#e34c26",
    Ruby:       "#701516",
    Shell:      "#89e051",
    Dockerfile: "#384d54",
};

const LangDot = ({ lang }) => {
    const color = LANG_COLORS[lang] ?? "#6b7280";
    return (
        <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-cal-muted)" }}>
            <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: color }}
            />
            {lang}
        </span>
    );
};

/* Skeleton card */
const SkeletonCard = () => (
    <div className="cal-card p-5 space-y-3">
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="flex gap-3 mt-4">
            <div className="skeleton h-3 w-12 rounded" />
            <div className="skeleton h-3 w-12 rounded" />
            <div className="skeleton h-3 w-16 rounded" />
        </div>
    </div>
);

const MyReposPage = () => {
    const [repos, setRepos]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);
    const [search, setSearch]   = useState("");
    const [sortBy, setSortBy]   = useState("updated");

    useEffect(() => {
        fetch("https://api.github.com/users/Rupeswarbhainsa777/repos?per_page=100")
            .then((r) => {
                if (!r.ok) throw new Error(`GitHub API error ${r.status}`);
                return r.json();
            })
            .then((data) => {
                setRepos(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filtered = repos
        .filter((r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            (r.description ?? "").toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "stars")   return b.stargazers_count - a.stargazers_count;
            if (sortBy === "name")    return a.name.localeCompare(b.name);
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

    return (
        <div className="page-enter">
            {/* ── Header ── */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="badge badge-brand mb-2 inline-flex">
                        <Icon d={ICONS.repo} className="h-3 w-3 mr-1" />
                        GitHub
                    </span>
                    <h1 className="text-3xl font-bold" style={{ color: "var(--color-cal-emphasis)" }}>
                        My Repositories
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: "var(--color-cal-muted)" }}>
                        {loading ? "Loading…" : `${filtered.length} of ${repos.length} repos`}
                    </p>
                </div>

                {/* Controls */}
                <div className="flex gap-2 flex-wrap">
                    {/* Search */}
                    <label className="relative flex items-center">
                        <Icon
                            d={ICONS.search}
                            className="pointer-events-none absolute left-3 h-4 w-4"
                            style={{ color: "var(--color-cal-muted)" }}
                        />
                        <input
                            type="search"
                            placeholder="Search repos…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9 rounded-lg pl-9 pr-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                            style={{
                                background: "var(--color-cal-surface)",
                                border: "1px solid var(--color-cal-border)",
                                color: "var(--color-cal-default)",
                                width: "200px",
                            }}
                        />
                    </label>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-9 rounded-lg px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
                        style={{
                            background: "var(--color-cal-surface)",
                            border: "1px solid var(--color-cal-border)",
                            color: "var(--color-cal-default)",
                        }}
                    >
                        <option value="updated">Recently Updated</option>
                        <option value="stars">Most Stars</option>
                        <option value="name">Name A–Z</option>
                    </select>
                </div>
            </div>

            {/* ── Error ── */}
            {error && (
                <div
                    className="mb-6 rounded-xl border p-4 text-sm"
                    style={{
                        background: "var(--color-danger-muted)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        color: "#fca5a5",
                    }}
                >
                    ⚠ {error}
                </div>
            )}

            {/* ── Grid ── */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : filtered.map((repo) => (
                        <article key={repo.id} className="cal-card p-5 flex flex-col gap-3">
                            {/* Repo name + link */}
                            <div className="flex items-start justify-between gap-2">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 font-semibold text-sm hover:underline"
                                    style={{ color: "#a78bfa" }}
                                >
                                    <Icon d={ICONS.repo} className="h-4 w-4 shrink-0" />
                                    {repo.name}
                                </a>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Open on GitHub"
                                    className="shrink-0 transition-opacity hover:opacity-80"
                                    style={{ color: "var(--color-cal-muted)" }}
                                >
                                    <Icon d={ICONS.external} />
                                </a>
                            </div>

                            {/* Description */}
                            <p
                                className="text-sm leading-6 line-clamp-2 grow"
                                style={{ color: "var(--color-cal-muted)" }}
                            >
                                {repo.description || "No description available."}
                            </p>

                            {/* Footer meta */}
                            <div
                                className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3"
                                style={{ borderTop: "1px solid var(--color-cal-border)" }}
                            >
                                {repo.language && <LangDot lang={repo.language} />}

                                <span
                                    className="flex items-center gap-1 text-xs"
                                    style={{ color: "var(--color-cal-muted)" }}
                                >
                                    <Icon d={ICONS.star} className="h-3.5 w-3.5" />
                                    {repo.stargazers_count}
                                </span>

                                <span
                                    className="flex items-center gap-1 text-xs"
                                    style={{ color: "var(--color-cal-muted)" }}
                                >
                                    <Icon d={ICONS.fork} className="h-3.5 w-3.5" />
                                    {repo.forks_count}
                                </span>

                                <span
                                    className="flex items-center gap-1 text-xs"
                                    style={{ color: "var(--color-cal-muted)" }}
                                >
                                    <Icon d={ICONS.eye} className="h-3.5 w-3.5" />
                                    {repo.watchers_count}
                                </span>

                                {repo.fork && <span className="badge badge-muted ml-auto">Fork</span>}
                                {repo.archived && <span className="badge badge-warning ml-auto">Archived</span>}
                                {repo.private && <span className="badge badge-brand ml-auto">Private</span>}
                            </div>
                        </article>
                    ))}
            </div>

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
                <div className="mt-20 flex flex-col items-center gap-3 text-center">
                    <span style={{ fontSize: "3rem" }}>🔍</span>
                    <p className="font-medium" style={{ color: "var(--color-cal-emphasis)" }}>
                        No repositories match your search
                    </p>
                    <button
                        onClick={() => setSearch("")}
                        className="btn-ghost text-sm"
                    >
                        Clear search
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyReposPage;