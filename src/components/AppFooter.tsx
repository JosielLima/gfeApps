export default function AppFooter() {
	return (
		<footer className="w-full py-12 bg-on-background border-t-4 border-primary flex flex-col md:flex-row justify-between items-center px-10 gap-4">
			<div className="text-[10px] font-bold uppercase tracking-widest text-background">
				©2026 JOSIEL LIMA | AVANT-GARDE CARTOGRAPHER. ALL RIGHTS RESERVED.
			</div>

			<div className="flex gap-8">
				<span className="text-[10px] font-black uppercase tracking-widest text-brand-lime">
					STATUS: OPERATIONAL
				</span>
				<button
					type="button"
					className="text-[10px] font-bold uppercase tracking-widest text-background/60 hover:text-primary cursor-pointer focus-visible:ring-1 focus-visible:ring-brand-lime outline-none bg-transparent border-none p-0"
				>
					LOC: BRAZIL
				</button>
				<button
					type="button"
					className="text-[10px] font-bold uppercase tracking-widest text-background/60 hover:text-primary cursor-pointer focus-visible:ring-1 focus-visible:ring-brand-lime outline-none bg-transparent border-none p-0"
				>
					TIME: UTC-3
				</button>
			</div>
		</footer>
	);
}
