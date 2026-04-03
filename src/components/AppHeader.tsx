import { Link, useRouterState } from "@tanstack/react-router";

const NAV_LINKS = [
	{ label: "CHALLENGES", to: "/" },
	{
		label: "RESOURCES",
		href: "https://www.greatfrontend.com/projects/tracks/apps",
	},
	{ label: "SYSTEMS", href: "https://www.greatfrontend.com/design-system" },
] as const;

export default function AppHeader() {
	const { location } = useRouterState();
	const isHome = location.pathname === "/";

	return (
		<nav
			className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b-4 border-on-background flex justify-between items-center px-6 py-4"
			aria-label="Navegação principal"
		>
			{/* Branding */}
			<Link
				to="/"
				className="font-black text-xl tracking-tighter text-on-background no-underline hover:text-on-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				aria-label="JOSIEL LIMA — voltar para home"
			>
				JOSIEL LIMA
			</Link>

			{/* Nav links + icon buttons */}
			<div className="flex items-center gap-4">
				<div className="hidden md:flex gap-6">
					{NAV_LINKS.map((link) => {
						const isActive = "to" in link && link.to === "/" && isHome;
						const baseClass =
							"uppercase tracking-widest text-[11px] font-bold hover:bg-primary hover:text-white px-2 py-1 transition-colors duration-200 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
						const activeClass = "text-primary font-black";
						const defaultClass = "text-on-background";

						if ("to" in link) {
							return (
								<Link
									key={link.label}
									to={link.to}
									className={[
										baseClass,
										isActive ? activeClass : defaultClass,
									].join(" ")}
									aria-label={`Ir para ${link.label}`}
								>
									{link.label}
								</Link>
							);
						}
						return (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className={[baseClass, defaultClass].join(" ")}
								aria-label={`Abrir ${link.label} em nova aba`}
							>
								{link.label}
							</a>
						);
					})}
				</div>

				{/* Icon buttons */}
				<div className="flex gap-4">
					<button
						type="button"
						aria-label="Abrir configurações"
						className="material-symbols-outlined text-on-background cursor-pointer scale-95 active:scale-90 focus-visible:ring-2 focus-visible:ring-primary outline-none"
					>
						settings
					</button>
					<button
						type="button"
						aria-label="Mudar visualização para grade"
						className="material-symbols-outlined text-on-background cursor-pointer scale-95 active:scale-90 focus-visible:ring-2 focus-visible:ring-primary outline-none"
					>
						grid_view
					</button>
				</div>
			</div>
		</nav>
	);
}
