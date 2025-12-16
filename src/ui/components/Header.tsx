import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl transition-all supports-[backdrop-filter]:bg-white/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4 md:gap-8">
					<Logo />
					<Nav channel={channel} />
				</div>
			</div>
		</header>
	);
}
