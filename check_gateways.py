import requests
import json
import sys

API_URL = "https://mystore-api-92b06062958f.herokuapp.com/graphql/"
CHECKOUT_ID = "Q2hlY2tvdXQ6MDEzNjRkODctNWQ2OC00MmFiLTkyNTQtMzAyMzEzMTBiNGVj"

query = """
query CheckGateways($checkoutId: ID!) {
  checkout(id: $checkoutId) {
    availablePaymentGateways {
      id
      name
      config {
        field
        value
      }
    }
  }
}
"""

print(f"Checking gateways for Checkout ID: {CHECKOUT_ID}")
response = requests.post(API_URL, json={'query': query, 'variables': {'checkoutId': CHECKOUT_ID}})

if response.status_code != 200:
    print(f"Error: {response.status_code}")
    print(response.text)
    sys.exit(1)

data = response.json()
if "errors" in data:
    print("GraphQL Errors:", json.dumps(data["errors"], indent=2))
    sys.exit(1)

gateways = data.get("data", {}).get("checkout", {}).get("availablePaymentGateways", [])
print(json.dumps(gateways, indent=2))

found = False
for gw in gateways:
    if "razorpay" in gw["id"].lower():
        found = True
        print("FOUND: Razorpay gateway is present.")
        break

if not found:
    print("NOT FOUND: Razorpay gateway is NOT in the list.")
