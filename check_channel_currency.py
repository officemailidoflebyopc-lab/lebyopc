import requests
import json

API_URL = "https://mystore-api-92b06062958f.herokuapp.com/graphql/"

query = """
query {
  channels {
    id
    slug
    name
    currencyCode
  }
}
"""

print("Checking 'in' channel configuration...")
response = requests.post(API_URL, json={'query': query})

if response.status_code != 200:
    print(f"Error: {response.status_code}")
    print(response.text)
    exit(1)

data = response.json()
if "errors" in data:
    print("GraphQL Errors:", json.dumps(data["errors"], indent=2))
    exit(1)

channels = data.get("data", {}).get("channels", [])
if not channels:
    print("No channels found")
    exit(1)

print(json.dumps(channels, indent=2))

in_channel = next((ch for ch in channels if ch.get('slug') == 'in'), None)
if in_channel:
    print(f"\n=> 'in' channel currency: {in_channel.get('currencyCode')}")
else:
    print("\n=> 'in' channel NOT FOUND")
