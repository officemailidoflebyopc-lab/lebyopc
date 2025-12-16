import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	return (
		<li data-testid="ProductElement" className="group">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div className="overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-lg">
					<div className="relative aspect-square overflow-hidden bg-neutral-100">
						{product?.thumbnail?.url && (
							<ProductImageWrapper
								loading={loading}
								src={product.thumbnail.url}
								alt={product.thumbnail.alt ?? ""}
								width={512}
								height={512}
								sizes={"512px"}
								priority={priority}
								className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
							/>
						)}
					</div>
					<div className="p-4">
						<h3 className="line-clamp-1 text-sm font-medium text-neutral-900">{product.name}</h3>
						<p className="mt-1 line-clamp-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
							{product.category?.name}
						</p>
						<div className="mt-4 flex items-center justify-between">
							<p className="text-sm font-semibold text-neutral-900" data-testid="ProductElement_PriceRange">
								{formatMoneyRange({
									start: product?.pricing?.priceRange?.start?.gross,
									stop: product?.pricing?.priceRange?.stop?.gross,
								})}
							</p>
							<span className="text-xs font-medium text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100">
								View Details
							</span>
						</div>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
