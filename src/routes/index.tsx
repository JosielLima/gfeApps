import { createFileRoute } from "@tanstack/react-router";
import ChallengeCard from "@/components/ChallengeCard";
import { challenges } from "@/lib/challenges";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<>
			{/* ── Hero ─────────────────────────────────────────────── */}
			<section
				className="relative pt-32 pb-20 px-6 md:px-20 overflow-hidden"
				aria-labelledby="hero-heading"
			>
				{/* Dot grid overlay */}
				<div className="absolute inset-0 grid-overlay" aria-hidden="true" />

				<div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
					{/* Left block */}
					<div className="max-w-4xl">
						<p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
							Expedition: Josiel Lima
						</p>
						<h1
							id="hero-heading"
							className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] text-on-background [text-wrap:balance]"
						>
							GREATFRONT PROJECTS <br />
							<span className="text-outline uppercase">
								Component Tracks App
							</span>
						</h1>
					</div>

					{/* Right tagline — desktop only */}
					<div className="text-[10px] uppercase tracking-[0.2em] font-bold text-right border-l-4 border-on-background pl-6 max-w-xs leading-relaxed hidden md:block">
						Mapping the technical landscape through brutalist iteration. Each
						node represents a leap in UI complexity.
					</div>
				</div>
			</section>

			{/* ── Grid de desafios + SVG trail ─────────────────────── */}
			<main
				className="relative px-6 md:px-20 pb-40"
				aria-label="Lista de desafios"
			>
				{/* Animated treasure map trail */}
				<div
					aria-hidden="true"
					className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
				>
					<svg
						aria-hidden="true"
						className="w-full h-full"
						viewBox="0 0 1200 2400"
						preserveAspectRatio="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							className="treasure-path"
							d="M 200 200 L 600 250 L 1000 350 L 900 500 L 600 750 L 200 600 L 200 1000 L 600 1050 L 1000 1000 L 1000 1400 L 600 1450 L 200 1200 L 200 1770 L 800 1950 L 1000 2100"
							fill="none"
							stroke="#4338ca"
							strokeWidth="9"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>

				{/* Cards grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12 relative z-10">
					{challenges.map((challenge, index) => (
						<ChallengeCard
							key={challenge.id}
							challenge={challenge}
							index={index}
						/>
					))}
				</div>
			</main>

			{/* ── Floating action buttons ───────────────────────────── */}
			<div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4">
				<button
					type="button"
					aria-label="Abrir visualização de mapa"
					className="w-16 h-16 bg-on-background text-background flex items-center justify-center border-4 border-brand-lime hover:bg-brand-lime hover:text-on-background transition-all active:scale-95 shadow-xl focus-visible:ring-4 focus-visible:ring-brand-lime outline-none cursor-pointer"
				>
					<span
						className="material-symbols-outlined text-3xl"
						aria-hidden="true"
					>
						map
					</span>
				</button>
				<button
					type="button"
					aria-label="Voltar ao topo"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="w-16 h-16 bg-background text-on-background flex items-center justify-center border-4 border-on-background hover:bg-on-background hover:text-background transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-primary outline-none cursor-pointer"
				>
					<span
						className="material-symbols-outlined text-3xl"
						aria-hidden="true"
					>
						arrow_upward
					</span>
				</button>
			</div>
		</>
	);
}
