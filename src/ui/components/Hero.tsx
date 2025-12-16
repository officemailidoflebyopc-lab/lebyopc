import { LinkWithChannel } from "../atoms/LinkWithChannel";

export function Hero() {
	return (
		<section className="relative overflow-hidden bg-neutral-900 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Summer Collection 2025</h1>
					<p className="mt-6 text-lg leading-8 text-neutral-300">
						Discover our latest arrivals designed for comfort and style. Premium materials, sustainable
						production, and timeless designs.
					</p>
					<div className="mt-10 flex items-center gap-x-6">
						<LinkWithChannel
							href="/products"
							className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						>
							Shop Collection
						</LinkWithChannel>
						<LinkWithChannel href="/about" className="text-sm font-semibold leading-6 text-white">
							Learn more <span aria-hidden="true">→</span>
						</LinkWithChannel>
					</div>
				</div>
			</div>
			<div
				className="absolute left-[calc(50%-40rem)] top-[calc(50%-30rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:left-[calc(50%-18rem)]"
				aria-hidden="true"
			>
				<div
					className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
					style={{
						clipPath:
							"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
					}}
				/>
			</div>
		</section>
	);
}
