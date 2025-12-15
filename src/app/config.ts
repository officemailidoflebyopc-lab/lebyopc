import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { getNextServerCookiesStorageAsync } from "@saleor/auth-sdk/next/server";
import { invariant } from "ts-invariant";

export const ProductsPerPage = 12;

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
invariant(saleorApiUrl, "https://mystore-api-92b06062958f.herokuapp.com/graphql/");

export const DefaultChannelSlug =
	process.env.NEXT_PUBLIC_DEFAULT_CHANNEL ?? "in";

export const getServerAuthClient = async () => {
	const nextServerCookiesStorage = await getNextServerCookiesStorageAsync();
	return createSaleorAuthClient({
		saleorApiUrl,
		refreshTokenStorage: nextServerCookiesStorage,
		accessTokenStorage: nextServerCookiesStorage,
	});
};
