const fetch = require("node-fetch"); // Assuming node-fetch is available, or use native fetch in Node 18+

async function run() {
	try {
		const query = JSON.stringify({
			query: `
        query {
          products(first: 1, channel: "default-channel") {
            edges {
              node {
                slug
                name
              }
            }
          }
        }
      `,
		});

		// Fallback to fetch if global (Node 18+) or require
		const f = global.fetch || require("node-fetch");

		const res = await f("https://mystore-api-92b06062958f.herokuapp.com/graphql/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: query,
		});

		const data = await res.json();
		console.log(JSON.stringify(data, null, 2));
	} catch (e) {
		console.error(e);
	}
}

run();
