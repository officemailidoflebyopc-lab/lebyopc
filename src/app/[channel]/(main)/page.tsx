import {
	ProductListByCollectionDocument,
	ProductListDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { Hero } from "@/ui/components/Hero";

export const metadata = {
	title: "Lebyopc | Summer Collection",
	description: "Discover our premium collection of used PC components.",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	let products: ProductListItemFragment[] = [];

	try {
		const data = await executeGraphQL(ProductListByCollectionDocument, {
			variables: {
				slug: "featured-products",
				channel: params.channel,
			},
			revalidate: 60,
		});
		if (data.collection?.products) {
			products = data.collection.products.edges.map(({ node: product }) => product);
		}
	} catch (error) {
		console.error("Failed to fetch featured collection", error);
	}

	if (products.length === 0) {
		try {
			const data = await executeGraphQL(ProductListDocument, {
				variables: {
					channel: params.channel,
					first: 12,
				},
				revalidate: 60,
			});
			if (data.products?.edges) {
				products = data.products.edges.map(({ node: product }) => product);
			}
		} catch (error) {
			console.error("Failed to fetch products fallback", error);
		}
	}

	return (
		<>
			<Hero />
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mb-10 text-center">
					<h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
						Featured Products
					</h2>
					<p className="mt-4 text-neutral-500">Handpicked selections just for you.</p>
				</div>
				{products.length > 0 ? (
					<ProductList products={products} />
				) : (
					<p className="text-center text-neutral-500">No products found.</p>
				)}
			</section>
		</>
	);
}
