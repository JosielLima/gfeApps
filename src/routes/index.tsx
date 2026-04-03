import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="relative overflow-hidden rounded-[2rem] border border-border-primary bg-bg-secondary px-6 py-10 sm:px-10 sm:py-14">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fg-tertiary">TanStack Start Base Template</p>
        <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight text-fg-primary sm:text-6xl">
          Start simple, ship quickly.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-fg-secondary sm:text-lg">
          This base starter intentionally keeps things light: two routes, clean
          structure, and the essentials you need to build from scratch.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/about"
            className="rounded-full border border-brand-700 bg-bg-brand px-5 py-2.5 text-sm font-semibold text-fg-on-brand no-underline transition hover:-translate-y-0.5 hover:bg-brand-800"
          >
            About This Starter
          </a>
          <a
            href="https://tanstack.com/router"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border-strong bg-bg-primary px-5 py-2.5 text-sm font-semibold text-fg-primary no-underline transition hover:-translate-y-0.5 hover:border-border-strong"
          >
            Router Guide
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            'Type-Safe Routing',
            'Routes and links stay in sync across every page.',
          ],
          [
            'Server Functions',
            'Call server code from your UI without creating API boilerplate.',
          ],
          [
            'Streaming by Default',
            'Ship progressively rendered responses for faster experiences.',
          ],
          [
            'Tailwind Native',
            'Design quickly with utility-first styling and reusable tokens.',
          ],
        ].map(([title, desc]) => (
          <article
            key={title}
            className="rounded-2xl border border-border-primary bg-bg-secondary p-5"
          >
            <h2 className="mb-2 text-base font-semibold text-fg-primary">
              {title}
            </h2>
            <p className="m-0 text-sm text-fg-secondary">{desc}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-border-primary bg-bg-secondary p-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-fg-tertiary">Quick Start</p>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-fg-secondary">
          <li>
            Edit <code>src/routes/index.tsx</code> to customize the home page.
          </li>
          <li>
            Update <code>src/components/Header.tsx</code> and{' '}
            <code>src/components/Footer.tsx</code> for brand links.
          </li>
          <li>
            Add routes in <code>src/routes</code> and tweak visual tokens in{' '}
            <code>src/styles.css</code>.
          </li>
        </ul>
      </section>
    </main>
  )
}
