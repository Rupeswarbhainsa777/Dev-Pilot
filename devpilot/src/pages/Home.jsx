import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ── SVG helper ── */
const Icon = ({ d, className = "h-5 w-5", style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className={className}
         style={style} aria-hidden="true">
        <path d={d} />
    </svg>
);

const ICONS = {
    bolt:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    repo:     "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    chart:    "M3 3v18h18 M7 16l4-4 4 4 4-8",
    arrow:    "M5 12h14 M12 5l7 7-7 7",
    code:     "M16 18l6-6-6-6 M8 6l-6 6 6 6",
    clock:    "M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    branch:   "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9",
    check:    "M20 6L9 17l-5-5",
    sparkle:  "M12 3l1.5 4.5H18l-3.75 2.7 1.5 4.5L12 12l-3.75 2.7 1.5-4.5L6 7.5h4.5L12 3z",
    shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    globe:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
    users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
};

const features = [
    {
        icon: ICONS.code,
        title: "AI Code Analysis",
        desc: "Paste any GitHub URL and get an instant AI-powered breakdown — architecture, tech stack, and file structure, all in seconds.",
        color: "icon-wrap-brand",
    },
    {
        icon: ICONS.branch,
        title: "Branch Insights",
        desc: "Visualize branch history, open pull requests, and contributor activity patterns at a glance.",
        color: "icon-wrap-success",
    },
    {
        icon: ICONS.chart,
        title: "Commit Analytics",
        desc: "Track velocity, detect hotspots, and understand how the project has evolved over time.",
        color: "icon-wrap-warning",
    },
    {
        icon: ICONS.clock,
        title: "History Timeline",
        desc: "A rich timeline of every analysis you've run — organized, searchable, always one click away.",
        color: "icon-wrap-muted",
    },
    {
        icon: ICONS.shield,
        title: "Smart Q&A",
        desc: "Ask questions in plain English about any part of the codebase. Get pinpoint answers with file references.",
        color: "icon-wrap-brand",
    },
    {
        icon: ICONS.globe,
        title: "Multi-repo Support",
        desc: "Analyze public or private repos. Switch between projects instantly with your personal library.",
        color: "icon-wrap-success",
    },
];

const stats = [
    { label: "Repos Analyzed",    value: "12k+",  icon: ICONS.repo   },
    { label: "AI Summaries",      value: "84k+",  icon: ICONS.bolt   },
    { label: "Questions Answered",value: "230k+", icon: ICONS.chart  },
    { label: "Devs Onboarded",    value: "9k+",   icon: ICONS.users  },
];

const testimonials = [
    {
        quote: "DevPilot cut my onboarding time in half. I can understand any open-source project in minutes now.",
        name: "Priya S.",
        role: "Senior Engineer",
        avatar: "PS",
        avatarColor: "#6d28d9",
    },
    {
        quote: "The AI summaries are incredibly accurate. It's like having a senior dev walk you through the codebase.",
        name: "Marcus W.",
        role: "Tech Lead",
        avatar: "MW",
        avatarColor: "#0891b2",
    },
    {
        quote: "I use DevPilot before every code review to get context. It's become an essential part of my workflow.",
        name: "Aisha K.",
        role: "Full-Stack Dev",
        avatar: "AK",
        avatarColor: "#059669",
    },
];

/* ── Animated counter ── */
const AnimatedStat = ({ value, label, icon }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className="text-center"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
        >
            <div
                style={{
                    fontSize: "2.25rem",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "var(--color-cal-emphasis)",
                    lineHeight: 1,
                }}
            >
                {value}
            </div>
            <div style={{ marginTop: "0.375rem", fontSize: "0.8125rem", color: "var(--color-cal-muted)", fontWeight: 500 }}>
                {label}
            </div>
        </div>
    );
};

const Home = () => (
    <div style={{ minHeight: "100vh", background: "var(--color-cal-bg)" }}>

        {/* ── Hero section ── */}
        <section
            style={{
                position: "relative",
                overflow: "hidden",
                padding: "7rem 1.5rem 6rem",
                textAlign: "center",
            }}
        >
            {/* Background blobs */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div
                    className="anim-glow-pulse"
                    style={{
                        position: "absolute",
                        top: "-10rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "40rem",
                        height: "40rem",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 65%)",
                        filter: "blur(40px)",
                    }}
                />
                <div
                    className="anim-float"
                    style={{
                        position: "absolute",
                        top: "5rem",
                        right: "10%",
                        width: "20rem",
                        height: "20rem",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                <div
                    className="anim-float-delayed"
                    style={{
                        position: "absolute",
                        top: "8rem",
                        left: "10%",
                        width: "15rem",
                        height: "15rem",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />
                {/* Grid lines */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
                }} />
            </div>

            {/* Hero content */}
            <div className="page-enter" style={{ position: "relative", zIndex: 1, maxWidth: "52rem", margin: "0 auto" }}>
                <div style={{ marginBottom: "1.75rem" }}>
                    <span className="badge badge-brand" style={{ fontSize: "0.8125rem" }}>
                        <span className="dot-pulse" />
                        Powered by Gemini AI · Free to use
                    </span>
                </div>

                <h1 style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                    color: "var(--color-cal-emphasis)",
                    marginBottom: "1.5rem",
                }}>
                    Understand any{" "}
                    <span className="gradient-text">codebase</span>
                    <br />
                    <span style={{ color: "var(--color-cal-secondary)" }}>in seconds.</span>
                </h1>

                <p style={{
                    maxWidth: "38rem",
                    margin: "0 auto",
                    fontSize: "1.125rem",
                    lineHeight: 1.75,
                    color: "var(--color-cal-muted)",
                }}>
                    DevPilot reads your GitHub repository, analyzes every file, and gives you an
                    AI-generated briefing — so you can ask questions in plain English without
                    reading a single line of documentation.
                </p>

                <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                    <Link
                        to="/dashboard"
                        className="btn-brand"
                        style={{ padding: "0.75rem 1.75rem", fontSize: "0.9375rem", borderRadius: "0.625rem" }}
                    >
                        <Icon d={ICONS.bolt} className="h-4 w-4" />
                        Analyze a Repository
                    </Link>
                    <Link
                        to="/repos"
                        className="btn-ghost"
                        style={{ padding: "0.75rem 1.75rem", fontSize: "0.9375rem", borderRadius: "0.625rem" }}
                    >
                        <Icon d={ICONS.repo} className="h-4 w-4" />
                        Browse My Repos
                    </Link>
                </div>

                {/* Trust pills */}
                <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                    {["No signup required", "Works with public repos", "Results in 10 seconds"].map((text) => (
                        <span
                            key={text}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                fontSize: "0.8125rem",
                                color: "var(--color-cal-muted)",
                            }}
                        >
                            <Icon d={ICONS.check} className="h-3.5 w-3.5" style={{ color: "var(--color-success)" }} />
                            {text}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hero mockup card */}
            <div
                className="anim-scale-in"
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "680px",
                    margin: "4rem auto 0",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    border: "1px solid var(--color-cal-border)",
                    background: "var(--color-cal-surface)",
                    boxShadow: "0 32px 80px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
                    animationDelay: "0.15s",
                }}
            >
                {/* Window chrome */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 1.25rem",
                    borderBottom: "1px solid var(--color-cal-border)",
                    background: "var(--color-cal-elevated)",
                }}>
                    <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#ef4444", opacity: 0.7 }} />
                    <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#f59e0b", opacity: 0.7 }} />
                    <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#10b981", opacity: 0.7 }} />
                    <span style={{ flex: 1, textAlign: "center", fontSize: "0.75rem", color: "var(--color-cal-muted)", fontFamily: "monospace" }}>
                        devpilot.ai/analyze
                    </span>
                    <span className="badge badge-success" style={{ fontSize: "0.6875rem" }}>
                        <span className="dot-pulse" />
                        Live
                    </span>
                </div>

                {/* Mockup content */}
                <div style={{ padding: "1.5rem" }}>
                    {/* URL input */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.625rem",
                        background: "var(--color-cal-elevated)",
                        border: "1px solid var(--color-brand)",
                        boxShadow: "0 0 0 3px var(--color-brand-glow)",
                        marginBottom: "1.25rem",
                    }}>
                        <Icon d={ICONS.repo} className="h-4 w-4" style={{ color: "#a78bfa", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.875rem", color: "var(--color-cal-subtle)", fontFamily: "monospace" }}>
                            github.com/vercel/next.js
                        </span>
                        <span className="badge badge-success" style={{ marginLeft: "auto", fontSize: "0.6875rem" }}>
                            <span className="dot-pulse" />
                            Analyzing…
                        </span>
                    </div>

                    {/* AI response preview */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div style={{
                            padding: "1rem",
                            borderRadius: "0.625rem",
                            background: "var(--color-cal-elevated)",
                            border: "1px solid var(--color-cal-border)",
                        }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--color-cal-muted)", fontWeight: 600, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                AI Summary
                            </div>
                            <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--color-cal-default)", margin: 0 }}>
                                <strong style={{ color: "var(--color-cal-emphasis)" }}>Next.js</strong> is a React framework for production. It uses{" "}
                                <code>pages/</code> and <code>app/</code> router conventions, with built-in SSR, SSG, and ISR support.
                                The codebase spans <strong style={{ color: "#a78bfa" }}>2,847 files</strong> across 38 packages.
                            </p>
                        </div>

                        {/* Chat messages */}
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div style={{
                                maxWidth: "85%",
                                padding: "0.625rem 0.875rem",
                                borderRadius: "1rem 1rem 0.25rem 1rem",
                                background: "var(--color-brand)",
                                fontSize: "0.875rem",
                                color: "#fff",
                            }}>
                                How does file-based routing work here?
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                            <div style={{
                                width: "1.75rem",
                                height: "1.75rem",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #6d28d9, #4f46e5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <Icon d={ICONS.bolt} className="h-3 w-3" style={{ color: "#fff" }} />
                            </div>
                            <div style={{
                                padding: "0.625rem 0.875rem",
                                borderRadius: "0.25rem 1rem 1rem 1rem",
                                background: "var(--color-cal-elevated-2)",
                                fontSize: "0.875rem",
                                color: "var(--color-cal-default)",
                                lineHeight: 1.6,
                            }}>
                                Files in <code>pages/</code> automatically become routes. <code>pages/index.js</code> → <code>/</code>,{" "}
                                <code>pages/about.js</code> → <code>/about</code>. Dynamic routes use <code>[param].js</code> syntax.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ── Stats ── */}
        <section style={{
            borderTop: "1px solid var(--color-cal-border)",
            borderBottom: "1px solid var(--color-cal-border)",
            background: "var(--color-cal-surface)",
            padding: "3rem 1.5rem",
        }}>
            <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "2rem",
                }}>
                    {stats.map((s) => (
                        <AnimatedStat key={s.label} {...s} />
                    ))}
                </div>
            </div>
        </section>

        {/* ── Features ── */}
        <section style={{ padding: "6rem 1.5rem", maxWidth: "72rem", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }} className="page-enter">
                <span className="badge badge-brand" style={{ marginBottom: "1rem", display: "inline-flex" }}>
                    <Icon d={ICONS.sparkle} className="h-3 w-3" />
                    Features
                </span>
                <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                    Everything you need to understand a repository
                </h2>
                <p style={{ marginTop: "0.875rem", maxWidth: "38rem", margin: "0.875rem auto 0", fontSize: "1.0625rem", color: "var(--color-cal-muted)" }}>
                    From first glance to deep dive — all the insights you need, instantly delivered by AI.
                </p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                }}
                className="stagger-children"
            >
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="cal-card page-enter"
                        style={{ padding: "1.5rem", display: "flex", gap: "1rem" }}
                    >
                        <span
                            className={`icon-wrap ${f.color}`}
                            style={{ width: "2.5rem", height: "2.5rem", flexShrink: 0, marginTop: "0.125rem" }}
                        >
                            <Icon d={f.icon} className="h-5 w-5" />
                        </span>
                        <div>
                            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-cal-emphasis)", marginBottom: "0.375rem" }}>
                                {f.title}
                            </h3>
                            <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--color-cal-muted)", margin: 0 }}>
                                {f.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* ── Testimonials ── */}
        <section style={{
            padding: "5rem 1.5rem",
            background: "var(--color-cal-surface)",
            borderTop: "1px solid var(--color-cal-border)",
            borderBottom: "1px solid var(--color-cal-border)",
        }}>
            <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                        Loved by developers
                    </h2>
                    <p style={{ marginTop: "0.5rem", color: "var(--color-cal-muted)" }}>
                        Join thousands of engineers who ship faster with DevPilot.
                    </p>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "1rem",
                }}>
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="cal-card"
                            style={{ padding: "1.5rem" }}
                        >
                            {/* Stars */}
                            <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem" }}>
                                {[...Array(5)].map((_, i) => (
                                    <Icon key={i} d={ICONS.star} className="h-3.5 w-3.5"
                                          style={{ fill: "#f59e0b", stroke: "#f59e0b" }} />
                                ))}
                            </div>
                            <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-cal-secondary)", margin: "0 0 1.25rem" }}>
                                "{t.quote}"
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <div style={{
                                    width: "2.25rem",
                                    height: "2.25rem",
                                    borderRadius: "50%",
                                    background: t.avatarColor,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    color: "#fff",
                                    flexShrink: 0,
                                }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-cal-emphasis)" }}>
                                        {t.name}
                                    </div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-cal-muted)" }}>
                                        {t.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{ padding: "6rem 1.5rem" }}>
            <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
                <div
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "1.25rem",
                        padding: "4rem 2rem",
                        textAlign: "center",
                        background: "linear-gradient(135deg, #3b0764 0%, #4c1d95 40%, #1e1b4b 100%)",
                        border: "1px solid rgba(139,92,246,0.2)",
                        boxShadow: "0 0 60px rgba(109,40,217,0.2)",
                    }}
                >
                    <div className="noise-overlay" />
                    {/* Glow */}
                    <div aria-hidden="true" style={{
                        position: "absolute",
                        top: "-30%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "30rem",
                        height: "20rem",
                        background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 65%)",
                        filter: "blur(40px)",
                        pointerEvents: "none",
                    }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        <span className="badge" style={{
                            background: "rgba(167,139,250,0.15)",
                            color: "#c4b5fd",
                            border: "1px solid rgba(167,139,250,0.25)",
                            marginBottom: "1.5rem",
                            display: "inline-flex",
                        }}>
                            <Icon d={ICONS.zap} className="h-3 w-3" />
                            Get started in 10 seconds
                        </span>
                        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff" }}>
                            Ready to explore your first repo?
                        </h2>
                        <p style={{ color: "rgba(196,181,253,0.8)", marginTop: "0.75rem", fontSize: "1.0625rem" }}>
                            Paste a link, get your AI briefing instantly — no signup required.
                        </p>
                        <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                            <Link
                                to="/dashboard"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.8125rem 1.75rem",
                                    borderRadius: "0.625rem",
                                    background: "#fff",
                                    color: "#4c1d95",
                                    fontWeight: 700,
                                    fontSize: "0.9375rem",
                                    textDecoration: "none",
                                    transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#ede9fe"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
                            >
                                Get started free
                                <Icon d={ICONS.arrow} className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/repos"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.8125rem 1.5rem",
                                    borderRadius: "0.625rem",
                                    background: "rgba(255,255,255,0.08)",
                                    color: "#c4b5fd",
                                    fontWeight: 600,
                                    fontSize: "0.9375rem",
                                    textDecoration: "none",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                            >
                                Browse repos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer style={{
            borderTop: "1px solid var(--color-cal-border)",
            padding: "2rem 1.5rem",
            textAlign: "center",
        }}>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-cal-muted)" }}>
                © 2025 DevPilot — Built with ❤️ using React + Gemini AI ·{" "}
                <a
                    href="https://github.com/Rupeswarbhainsa777"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#a78bfa", textDecoration: "none" }}
                    onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                >
                    GitHub
                </a>
            </p>
        </footer>
    </div>
);

export default Home;