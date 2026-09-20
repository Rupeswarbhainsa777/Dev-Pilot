// About.jsx
// Edit the constants at the top to change the text without touching the layout.

const PROJECT_NAME = "Your Project Name";

const steps = [
    {
        title: "Paste a repository link",
        body: "Enter any public GitHub URL, for example github.com/owner/repo. Private repositories need a GitHub access token.",
    },
    {
        title: "Let the AI scan it",
        body: "The app reads the repository through the GitHub API: files, folders, commits, issues and workflows.",
    },
    {
        title: "Read the summary",
        body: "You get a plain-language overview of what the project does, which technologies it uses, and how the code is organised.",
    },
    {
        title: "Ask follow-up questions",
        body: "Type questions in normal English and the AI answers using the repository's real contents.",
    },
];

const repoParts = [
    {
        name: "README.md",
        note: "What the project is and how to run it. The AI starts here.",
    },
    {
        name: "package.json",
        note: "The libraries and scripts the project depends on.",
    },
    {
        name: "src/",
        note: "The folder structure, so you can see where the main code lives.",
    },
    {
        name: ".github/workflows/",
        note: "GitHub Actions: automatic tests, builds and deployments.",
    },
    {
        name: "Issues & pull requests",
        note: "What people are working on, and why changes were made.",
    },
    {
        name: "Commit history",
        note: "Who changed what, and when.",
    },
    {
        name: "LICENSE",
        note: "What you are allowed to do with the code.",
    },
];

const sampleQuestions = [
    "What does this repository do?",
    "Which frameworks and libraries does it use?",
    "Where should I start reading the code?",
    "What does the GitHub Actions workflow do?",
    "What changed in the last 10 commits?",
];

const About = () => {
    return (
        <main className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-200">
            <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
                {/* Intro */}
                <header>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                        About {PROJECT_NAME}
                    </h1>
                    <p className="mt-6 max-w-prose text-lg leading-8 text-slate-600 dark:text-slate-400">
                        {PROJECT_NAME} uses AI to explain a GitHub repository in plain
                        language. Instead of opening dozens of files to figure out what a
                        project does, you paste a link and ask questions.
                    </p>
                </header>

                {/* What it does */}
                <section className="mt-16" aria-labelledby="what-it-does">
                    <h2
                        id="what-it-does"
                        className="text-2xl font-semibold text-slate-900 dark:text-white"
                    >
                        What this project does
                    </h2>
                    <div className="mt-4 max-w-prose space-y-4 leading-7 text-slate-600 dark:text-slate-400">
                        <p>
                            GitHub holds a lot of information about a project, but it is
                            spread across code, documentation, issues and automation files.
                            This app gathers those pieces and hands them to an AI model, which
                            turns them into a readable explanation.
                        </p>
                        <p>
                            It is built for people who are new to a codebase: students,
                            contributors joining a team, or anyone deciding whether an
                            open-source project is worth using.
                        </p>
                    </div>
                </section>

                {/* How to use with GitHub */}
                <section className="mt-16" aria-labelledby="how-it-works">
                    <h2
                        id="how-it-works"
                        className="text-2xl font-semibold text-slate-900 dark:text-white"
                    >
                        How to use it with a GitHub repository
                    </h2>
                    <ol className="mt-8 space-y-8 border-l-2 border-slate-200 pl-8 dark:border-slate-800">
                        {steps.map((step, index) => (
                            <li key={step.title} className="relative">
                <span
                    aria-hidden="true"
                    className="absolute -left-[3.05rem] flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white"
                >
                  {index + 1}
                </span>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-1 max-w-prose leading-7 text-slate-600 dark:text-slate-400">
                                    {step.body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* What the AI reads */}
                <section className="mt-16" aria-labelledby="what-ai-reads">
                    <h2
                        id="what-ai-reads"
                        className="text-2xl font-semibold text-slate-900 dark:text-white"
                    >
                        What the AI looks at in a repository
                    </h2>
                    <p className="mt-4 max-w-prose leading-7 text-slate-600 dark:text-slate-400">
                        These are the parts of a GitHub repository the AI reads, and what
                        each one tells you about the project.
                    </p>

                    <div className="mt-6 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-lg">
                        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
                            <span className="h-3 w-3 rounded-full bg-slate-700" />
                            <span className="h-3 w-3 rounded-full bg-slate-700" />
                            <span className="h-3 w-3 rounded-full bg-slate-700" />
                            <span className="ml-3 font-mono text-sm text-slate-400">
                owner/repository
              </span>
                        </div>
                        <ul className="divide-y divide-slate-800">
                            {repoParts.map((part) => (
                                <li
                                    key={part.name}
                                    className="grid gap-1 px-4 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6"
                                >
                                    <code className="font-mono text-sm text-emerald-400">
                                        {part.name}
                                    </code>
                                    <span className="text-sm leading-6 text-slate-300">
                    {part.note}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Example questions */}
                <section className="mt-16" aria-labelledby="questions">
                    <h2
                        id="questions"
                        className="text-2xl font-semibold text-slate-900 dark:text-white"
                    >
                        Questions you can ask
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-3">
                        {sampleQuestions.map((question) => (
                            <li
                                key={question}
                                className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
                            >
                                {question}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Limits */}
                <section className="mt-16 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 dark:bg-amber-950/30">
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                        Check important answers
                    </h2>
                    <p className="mt-1 max-w-prose text-sm leading-6 text-slate-700 dark:text-slate-300">
                        The AI can misread code or miss files in very large repositories.
                        For anything important, confirm the answer in the repository on
                        GitHub.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default About;