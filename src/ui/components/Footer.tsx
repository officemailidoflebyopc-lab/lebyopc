import Link from "next/link";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer({ channel }: { channel: string }) {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});
	let channels = null;
	try {
		if (process.env.SALEOR_APP_TOKEN) {
			channels = await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			});
		}
	} catch (e) {
		console.error("Failed to fetch channels", e);
	}
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-neutral-800 bg-neutral-900 text-neutral-300">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-3">
					{footerLinks.menu?.items?.map((item) => {
						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-white">{item.name}</h3>
								<ul className="mt-4 space-y-3 [&>li]:text-sm [&>li]:text-neutral-400 [&>li]:transition-colors hover:[&>li]:text-white">
									{item.children?.map((child) => {
										if (child.category) {
											return (
												<li key={child.id}>
													<LinkWithChannel href={`/categories/${child.category.slug}`}>
														{child.category.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.collection) {
											return (
												<li key={child.id}>
													<LinkWithChannel href={`/collections/${child.collection.slug}`}>
														{child.collection.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.page) {
											return (
												<li key={child.id}>
													<LinkWithChannel href={`/pages/${child.page.slug}`}>
														{child.page.title}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.url) {
											return (
												<li key={child.id}>
													<LinkWithChannel href={child.url}>{child.name}</LinkWithChannel>
												</li>
											);
										}
										return null;
									})}
								</ul>
							</div>
						);
					})}
				</div>

				{channels?.channels && (
					<div className="mb-8 flex items-center justify-between border-t border-neutral-800 pt-8 text-neutral-400">
						<label className="flex items-center gap-2">
							<span className="text-sm">Currency:</span> <ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				<div className="flex flex-col justify-between gap-4 border-t border-neutral-800 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center">
					<p>Copyright &copy; {currentYear} Storefront. All rights reserved.</p>
					<p className="flex items-center gap-2">
						Powered by{" "}
						<Link
							target={"_blank"}
							href={"https://saleor.io/"}
							className="font-medium text-white hover:text-neutral-300"
						>
							Saleor
						</Link>{" "}
						<Link
							href={"https://github.com/saleor/saleor"}
							target={"_blank"}
							className={"opacity-50 transition-opacity hover:opacity-100"}
						>
							<Image
								alt="Saleor github repository"
								height={20}
								width={20}
								src={"/github-mark.svg"}
								className="invert"
							/>
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
