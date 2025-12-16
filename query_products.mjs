const query = JSON.stringify({
	query: `
    query {
      products(first: 1, channel: "in") {
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

async function run() {
	try {
		const res = await fetch("https://mystore-api-92b06062958f.herokuapp.com/graphql/", {
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
