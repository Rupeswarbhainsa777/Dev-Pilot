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
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950";

const About = () => {
    const [selectedId, setSelectedId] = useState(allItems[0].id);
    const selected = allItems.find((item) => item.id === selectedId);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
            <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
                {/* Hero: text on the left, a sample conversation on the right */}
                <section className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            About {PROJECT_NAME}
                        </p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                            Understand any GitHub repository without reading every file.
                        </h1>
                        <p className="mt-6 max-w-prose text-lg leading-8 text-slate-600 dark:text-slate-400">
                            {PROJECT_NAME} sends a repository's code, documentation and
                            history to an AI model, then lets you ask questions about it in
                            plain English. It is made for people who are new to a codebase:
                            students, new team members and anyone weighing up an open-source
                            project.
                        </p>
                    </div>

                    <figure
                        aria-label="Example conversation about a repository"
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3 dark:border-slate-800">
              <span className="truncate font-mono text-sm text-slate-600 dark:text-slate-400">
                github.com/owner/repo
              </span>
                            <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                48 files read
              </span>
                        </div>

                        <div className="space-y-4 p-5">
                            <div className="flex justify-end">
                                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-indigo-600 px-4 py-2 text-sm text-white">
                                    Which frameworks does this use?
                                </p>
                            </div>

                            <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3 dark:bg-slate-800">
                                <p className="text-sm leading-6 text-slate-800 dark:text-slate-200">
                                    It is a React 18 app built with Vite and styled with Tailwind
                                    CSS. Tests run with Vitest through the workflow that starts on
                                    every push.
                                </p>
                                <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    Based on
                                    <code className="rounded bg-white px-1.5 py-0.5 font-mono dark:bg-slate-900">
                                        package.json
                                    </code>
                                    <code className="rounded bg-white px-1.5 py-0.5 font-mono dark:bg-slate-900">
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
                        className="text-xl font-semibold text-slate-900 dark:text-white"
                    >
                        Using it with your repository takes four steps
                    </h2>

                    <ol className="mt-10 grid gap-10 md:grid-cols-4 md:gap-6">
                        {steps.map((step, index) => (
                            <li
                                key={step.title}
                                className="relative border-l-2 border-slate-300 pl-6 md:border-l-0 md:border-t-2 md:pl-0 md:pt-6 dark:border-slate-700"
                            >
                <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-indigo-600 md:left-0 md:-top-[7px]"
                />
                                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    Step {index + 1}
                                </p>
                                <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
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
                            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
                        >
                            What the AI reads on GitHub
                        </h2>
                        <p className="max-w-prose leading-7 text-slate-600 dark:text-slate-400">
                            A repository is more than code. Select any part below to see what
                            it contains and how the AI uses it to answer your questions.
                        </p>
                    </div>

                    <div className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-[16rem_1fr] dark:border-slate-800 dark:bg-slate-900">
                        {/* Left: the list of repository parts */}
                        <nav
                            aria-label="Parts of a GitHub repository"
                            className="border-b border-slate-200 bg-slate-50 p-3 md:border-b-0 md:border-r dark:border-slate-800 dark:bg-slate-950/50"
                        >
                            {groups.map((group, groupIndex) => (
                                <div key={group.label} className={groupIndex > 0 ? "mt-4" : ""}>
                                    <p className="px-3 pb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
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
                                                        className={`w-full rounded-md px-3 py-2 text-left font-mono text-sm transition-colors ${focusRing} ${
                                                            isSelected
                                                                ? "bg-indigo-600 text-white"
                                                                : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                                                        }`}
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
                            <h3 className="font-mono text-xl font-semibold text-slate-900 dark:text-white">
                                {selected.name}
                            </h3>

                            <dl className="mt-6 space-y-5">
                                <div>
                                    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        What it is
                                    </dt>
                                    <dd className="mt-1 max-w-prose leading-7">
                                        {selected.summary}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        How the AI uses it
                                    </dt>
                                    <dd className="mt-1 max-w-prose leading-7">
                                        {selected.usage}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-8 rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Example question
                                </p>
                                <p className="mt-1 font-medium text-slate-900 dark:text-white">
                                    {selected.question}
                                </p>
                                <p className="mt-4 border-l-4 border-emerald-500 pl-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
                                    {selected.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing note */}
                <p className="mt-16 max-w-prose border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    The AI can misread code or miss files in very large repositories, so
                    check important answers on GitHub. The answers on this page are
                    examples, not real results.
                </p>
            </div>
        </main>
    );
};

export default About;