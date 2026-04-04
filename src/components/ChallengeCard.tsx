import { Link } from "@tanstack/react-router";
import type { ChallengeData, Difficulty } from "@/lib/challenges";

const difficultyBadge: Record<Difficulty, string> = {
	Starter: "bg-surface-variant text-on-background",
	Mid: "bg-brand-lime text-black",
	Senior: "bg-primary text-white",
	Nightmare: "bg-red-600 text-white",
};

type ChallengeCardProps = {
	/** Challenge data from the static list */
	challenge: ChallengeData;
	/** 0-based index in the challenges array — used for stagger and position */
	index: number;
};

export default function ChallengeCard({
	challenge,
	index,
}: ChallengeCardProps) {
	const isLast = challenge.id === 12;
	// Column 0 → stagger-1, column 1 → stagger-2, column 2 → stagger-3
	const staggerClass = ["stagger-1", "stagger-2", "stagger-3"][index % 3];
	// Even index: number on left, badge on right. Odd: number on right, badge on left.
	const numberOnLeft = index % 2 === 0;
	const diffLabel = challenge.premium
		? `${challenge.difficulty} Premium`
		: challenge.difficulty;

	return (
		<Link
			to={challenge.route as "/"}
			aria-label={`Desafio ${challenge.number}: ${challenge.title} — ${challenge.difficulty}`}
			className={[
				"group relative flex flex-col no-underline outline-none",
				"focus-visible:ring-4 focus-visible:ring-primary",
				staggerClass,
			].join(" ")}
		>
			{/* Big overlapping number */}
			<div
				aria-hidden="true"
				className={[
					"absolute -top-14 font-black text-9xl z-20",
					"transition-transform group-hover:-translate-y-2 tabular-nums",
					numberOnLeft ? "-left-4" : "-right-4",
					isLast ? "text-primary" : "text-on-background",
				].join(" ")}
			>
				{challenge.number}
			</div>

			{/* Card body */}
			<div
				className={[
					"p-8 pt-16 flex flex-col h-full relative overflow-hidden",
					isLast
						? "bg-surface border-4 border- group-hover:bg-[#333333] transition-colors shadow-2xl"
						: "bg-surface border-4 border-on-background/20 group-hover:border-on-background/30 transition-colors",
				].join(" ")}
			>
				{/* Difficulty badge — absolutely positioned */}
				<span
					className={[
						"absolute top-4 text-[10px] tracking-widest uppercase px-3 py-1 font-black",
						numberOnLeft ? "right-4" : "left-4",
						difficultyBadge[challenge.difficulty],
					].join(" ")}
				>
					{diffLabel}
				</span>

				{/* Title */}
				<h3
					className={[
						"text-3xl font-black mb-4 leading-none uppercase",
						isLast ? "text-primary" : "text-on-background",
					].join(" ")}
				>
					{challenge.title}
				</h3>

				{/* Description */}
				<p
					className={[
						"text-sm mb-6 leading-relaxed",
						isLast ? "text-neutral-400" : "text-on-surface-variant",
					].join(" ")}
				>
					{challenge.description}
				</p>

				{/* Component tags */}
				{challenge.components.length > 0 && (
					<div className="mt-auto space-y-2">
						<p
							className={[
								"text-[9px] uppercase tracking-wider font-bold",
								isLast ? "text-neutral-500" : "text-outline",
							].join(" ")}
						>
							Components:
						</p>
						<div className="flex flex-wrap gap-2">
							{challenge.components.map((comp) => (
								<span
									key={comp}
									className={[
										"text-[10px] font-bold px-2 py-1",
										isLast
											? "bg-neutral-800 text-neutral-300 border border-neutral-700"
											: "bg-surface-variant border border-outline/20",
									].join(" ")}
								>
									{comp}
								</span>
							))}
						</div>
					</div>
				)}
			</div>
		</Link>
	);
}
