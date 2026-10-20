// About.jsx
// React + Tailwind CSS. Edit the constants at the top to change the text.

import { useState } from "react";

const PROJECT_NAME = "Your Project Name";

const steps = [
    {
        title: "Paste a repository link",
        body: "Use any public GitHub URL. For private repositories, add a GitHub access token.",
    },
    {
        title: "The app fetches it",
        body: "Files, folders, commits, issues and workflows are read through the GitHub API.",
    },
    {
        title: "The AI writes a summary",
        body: "You get what the project does, its tech stack, and how the code is laid out.",
    },
    {
        title: "Ask questions",
        body: "Ask in plain English and get answers based on the real repository contents.",
    },
];

const groups = [
    {
        label: "Files in the repository",
        items: [
            {
                id: "readme",
                name: "README.md",
                summary:
                    "The project's front page: what it is, how to install it and how to run it.",
                usage:
                    "The AI reads this first to write the opening summary, then uses it to answer setup questions.",
                question: "How do I run this locally?",
                answer:
                    "Install the dependencies with npm install, then start the dev server with npm run dev. The README says it runs on port 5173.",
            },
            {
                id: "package",
                name: "package.json",
                summary:
                    "Lists every library the project depends on and the scripts you can run.",
                usage:
                    "This is how the AI knows your tech stack: frameworks, testing tools and build tools.",
                question: "Which frameworks does it use?",
                answer:
                    "React 18 with Vite for builds and Tailwind CSS for styling. Tests run with Vitest.",
            },
            {
                id: "src",
                name: "src/",
                summary: "The main source code, organised into folders.",
                usage:
                    "The AI maps the folder structure and opens the important files, so it can point you to where things live.",
                question: "Where should I start reading?",
                answer:
                    "Start at src/main.jsx, which mounts the app, then read src/App.jsx to see how the pages are routed.",
            },
            {
                id: "workflows",
                name: ".github/workflows/",
                summary:
                    "GitHub Actions files that run tests, builds and deployments automatically.",
                usage:
                    "The AI turns the YAML into plain steps, so you can see what happens every time code is pushed.",
                question: "What happens when I push code?",
                answer:
                    "The ci.yml workflow installs dependencies, runs the tests and builds the app. If a step fails, GitHub flags the push.",
            },
            {
                id: "license",
                name: "LICENSE",
                summary: "The legal terms for using, copying and changing the code.",
                usage:
                    "The AI names the license and summarises what it allows. It is not legal advice.",
                question: "Can I use this in my own project?",
                answer:
                    "It uses the MIT license, which allows reuse as long as the license notice is kept.",
            },
        ],
    },
    {
        label: "Activity on GitHub",
        items: [
            {
                id: "commits",
                name: "Commits",
                summary:
                    "The full history of changes, each with an author, a date and a message.",
                usage:
                    "The AI reads recent commits to explain what changed lately and who has been working on which part.",
                question: "What changed recently?",
                answer:
                    "The last 10 commits mostly fix the login form and update dependencies.",
            },
            {
                id: "issues",
                name: "Issues",
                summary:
                    "Bug reports, feature requests and questions from users and contributors.",
                usage:
                    "The AI groups open issues by topic, so you can see known problems before you start.",
                question: "What are the known problems?",
                answer:
                    "Most open issues are about slow loading of large images and a missing dark mode.",
            },
            {
                id: "pulls",
                name: "Pull requests",
                summary:
                    "Proposed changes that are reviewed before they join the main code.",
                usage:
                    "The AI summarises what each pull request changes and why, using its description and discussion.",
                question: "What is being worked on right now?",
                answer:
                    "Three pull requests are open: a search bar, a fix for the sign-up bug and a documentation update.",
            },
        ],
    },
];

const allItems = groups.flatMap((group) => group.items);

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cal-bg)]";

const About = () => {
    const [selectedId, setSelectedId] = useState(allItems[0].id);
    const selected = allItems.find((item) => item.id === selectedId);

    return (
        <main className="page-enter min-h-screen" style={{ color: "var(--color-cal-default)" }}>
            <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
                {/* Hero: text on the left, a sample conversation on the right */}
                <section className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <span className="badge badge-brand mb-4 inline-flex">
                            About {PROJECT_NAME}
                        </span>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--color-cal-emphasis)" }}>
                            Understand any GitHub repository without reading every file.
                        </h1>
                        <p className="mt-6 max-w-prose text-lg leading-8" style={{ color: "var(--color-cal-muted)" }}>
                            {PROJECT_NAME} sends a repository's code, documentation and
                            history to an AI model, then lets you ask questions about it in
                            plain English. It is made for people who are new to a codebase:
                            students, new team members and anyone weighing up an open-source
                            project.
                        </p>
                    </div>

                    <figure
                        aria-label="Example conversation about a repository"
                        className="cal-card overflow-hidden rounded-2xl shadow-xl"
                        style={{ boxShadow: "var(--shadow-popover)" }}
                    >
                        <div
                            className="flex items-center justify-between gap-4 px-5 py-3"
                            style={{ borderBottom: "1px solid var(--color-cal-border)", background: "var(--color-cal-elevated)" }}
                        >
                            <span className="truncate font-mono text-sm" style={{ color: "var(--color-cal-muted)" }}>
                                github.com/owner/repo
                            </span>
                            <span className="badge badge-success shrink-0">
                                <span className="dot-pulse mr-1" />
                                48 files read
                            </span>
                        </div>

                        <div className="space-y-4 p-5">
                            <div className="flex justify-end">
                                <p className="max-w-[85%] rounded-2xl rounded-br-sm px-4 py-2 text-sm text-white" style={{ background: "var(--color-brand)" }}>
                                    Which frameworks does this use?
                                </p>
                            </div>

                            <div className="max-w-[92%] rounded-2xl rounded-bl-sm px-4 py-3" style={{ background: "var(--color-cal-elevated)" }}>
                                <p className="text-sm leading-6" style={{ color: "var(--color-cal-default)" }}>
                                    It is a React 18 app built with Vite and styled with Tailwind
                                    CSS. Tests run with Vitest through the workflow that starts on
                                    every push.
                                </p>
                                <p className="mt-3 flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--color-cal-muted)" }}>
                                    Based on
                                    <code className="rounded px-1.5 py-0.5 font-mono" style={{ background: "var(--color-cal-surface)" }}>
                                        package.json
                                    </code>
                                    <code className="rounded px-1.5 py-0.5 font-mono" style={{ background: "var(--color-cal-surface)" }}>
                                        .github/workflows/ci.yml
                                    </code>
                                </p>
                            </div>
                        </div>
                    </figure>
                </section>

                {/* How to use it: a horizontal timeline */}
                <section className="mt-24" aria-labelledby="how-to-use">
                    <h2
                        id="how-to-use"
                        className="text-xl font-semibold"
                        style={{ color: "var(--color-cal-emphasis)" }}
                    >
                        Using it with your repository takes four steps
                    </h2>

                    <ol className="mt-10 grid gap-10 md:grid-cols-4 md:gap-6">
                        {steps.map((step, index) => (
                            <li
                                key={step.title}
                                className="relative pl-6 md:pl-0 md:pt-6"
                                style={{
                                    borderLeft: "2px solid var(--color-cal-border)",
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute -left-[7px] top-0 h-3 w-3 rounded-full"
                                    style={{ background: "var(--color-brand)" }}
                                />
                                <p className="text-sm font-medium" style={{ color: "#a78bfa" }}>
                                    Step {index + 1}
                                </p>
                                <h3 className="mt-1 font-semibold" style={{ color: "var(--color-cal-emphasis)" }}>
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6" style={{ color: "var(--color-cal-muted)" }}>
                                    {step.body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Explorer: pick a part of GitHub, see what the AI does with it */}
                <section className="mt-24" aria-labelledby="explorer">
                    <div className="grid gap-4 md:grid-cols-[16rem_1fr] md:gap-8">
                        <h2
                            id="explorer"
                            className="text-2xl font-bold tracking-tight"
                            style={{ color: "var(--color-cal-emphasis)" }}
                        >
                            What the AI reads on GitHub
                        </h2>
                        <p className="max-w-prose leading-7" style={{ color: "var(--color-cal-muted)" }}>
                            A repository is more than code. Select any part below to see what
                            it contains and how the AI uses it to answer your questions.
                        </p>
                    </div>

                    <div
                        className="mt-8 grid overflow-hidden rounded-2xl md:grid-cols-[16rem_1fr]"
                        style={{ border: "1px solid var(--color-cal-border)", background: "var(--color-cal-surface)" }}
                    >
                        {/* Left: the list of repository parts */}
                        <nav
                            aria-label="Parts of a GitHub repository"
                            className="p-3"
                            style={{
                                borderBottom: "1px solid var(--color-cal-border)",
                                background: "var(--color-cal-elevated)",
                            }}
                        >
                            {groups.map((group, groupIndex) => (
                                <div key={group.label} className={groupIndex > 0 ? "mt-4" : ""}>
                                    <p
                                        className="px-3 pb-1 text-xs font-medium uppercase tracking-wide"
                                        style={{ color: "var(--color-cal-muted)" }}
                                    >
                                        {group.label}
                                    </p>
                                    <ul>
                                        {group.items.map((item) => {
                                            const isSelected = item.id === selectedId;
                                            return (
                                                <li key={item.id}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedId(item.id)}
                                                        aria-current={isSelected ? "true" : undefined}
                                                        className={`w-full rounded-lg px-3 py-2 text-left font-mono text-sm transition-all ${focusRing}`}
                                                        style={isSelected ? {
                                                            background: "var(--color-brand-muted)",
                                                            color: "#a78bfa",
                                                        } : {
                                                            color: "var(--color-cal-subtle)",
                                                        }}
                                                    >
                                                        {item.name}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </nav>

                        {/* Right: details for the selected part */}
                        <div aria-live="polite" className="p-6 sm:p-8">
                            <h3 className="font-mono text-xl font-semibold" style={{ color: "var(--color-cal-emphasis)" }}>
                                {selected.name}
                            </h3>

                            <dl className="mt-6 space-y-5">
                                <div>
                                    <dt className="text-sm font-medium" style={{ color: "var(--color-cal-muted)" }}>
                                        What it is
                                    </dt>
                                    <dd className="mt-1 max-w-prose leading-7" style={{ color: "var(--color-cal-subtle)" }}>
                                        {selected.summary}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium" style={{ color: "var(--color-cal-muted)" }}>
                                        How the AI uses it
                                    </dt>
                                    <dd className="mt-1 max-w-prose leading-7" style={{ color: "var(--color-cal-subtle)" }}>
                                        {selected.usage}
                                    </dd>
                                </div>
                            </dl>

                            <div
                                className="mt-8 rounded-xl p-5"
                                style={{ border: "1px solid var(--color-cal-border)", background: "var(--color-cal-elevated)" }}
                            >
                                <p className="text-sm" style={{ color: "var(--color-cal-muted)" }}>
                                    Example question
                                </p>
                                <p className="mt-1 font-medium" style={{ color: "var(--color-cal-emphasis)" }}>
                                    {selected.question}
                                </p>
                                <p
                                    className="mt-4 pl-4 text-sm leading-6"
                                    style={{
                                        borderLeft: "3px solid var(--color-success)",
                                        color: "var(--color-cal-default)",
                                    }}
                                >
                                    {selected.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing note */}
                <p
                    className="mt-16 max-w-prose pt-6 text-sm leading-6"
                    style={{ borderTop: "1px solid var(--color-cal-border)", color: "var(--color-cal-muted)" }}
                >
                    The AI can misread code or miss files in very large repositories, so
                    check important answers on GitHub. The answers on this page are
                    examples, not real results.
                </p>
            </div>
        </main>
    );
};

export default About;