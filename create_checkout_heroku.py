import requests
import json

API_URL = "https://mystore-api-92b06062958f.herokuapp.com/graphql/"

def run_query(query, variables=None):
    response = requests.post(API_URL, json={'query': query, 'variables': variables})
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Query failed to run by returning code of {response.status_code}. {response.text}")

# 1. Get a product variant
query_products = """
query {
  products(first: 1, channel: "in") {
    edges {
      node {
        id
        variants {
          id
        }
      }
    }
  }
}
"""

print("Fetching product...")
result = run_query(query_products)
edges = result.get("data", {}).get("products", {}).get("edges", [])
if not edges:
    print("No products found in 'in' channel. Trying 'default-channel'...")
    query_products_default = query_products.replace('"in"', '"default-channel"')
    result = run_query(query_products_default)
    edges = result.get("data", {}).get("products", {}).get("edges", [])

if not edges:
    print("No products available.")
    exit(1)

variant_id = edges[0]["node"]["variants"][0]["id"]
print(f"Found Variant ID: {variant_id}")

# 2. Create Checkout
mutation_create_checkout = """
mutation CheckoutCreate($variantId: ID!) {
  checkoutCreate(
    input: {
      channel: "in"
      lines: [{ quantity: 1, variantId: $variantId }]
      email: "test_user@example.com"
      shippingAddress: {
        firstName: "Test"
        lastName: "User"
        streetAddress1: "123 Main St"
        streetAddress2: "Apt 4B"
        city: "Mumbai"
        postalCode: "400001"
        country: IN
        countryArea: "Maharashtra"
        phone: "+919876543210"
      }
      billingAddress: {
        firstName: "Test"
        lastName: "User"
        streetAddress1: "123 Main St"
        streetAddress2: "Apt 4B"
        city: "Mumbai"
        postalCode: "400001"
        country: IN
        countryArea: "Maharashtra"
        phone: "+919876543210"
      }
    }
  ) {
    checkout {
      id
    }
    errors {
      field
      message
      code
    }
  }
}
"""

print("Creating checkout...")
variables = {"variantId": variant_id}
result = run_query(mutation_create_checkout, variables)
checkout_data = result.get("data", {}).get("checkoutCreate", {})

if checkout_data.get("errors"):
    print("Errors creating checkout:", json.dumps(checkout_data["errors"], indent=2))
    exit(1)

checkout_id = checkout_data.get("checkout", {}).get("id")
print(f"Created Checkout ID: {checkout_id}")
print(f"Link: http://localhost:3002/in/checkout?checkout={checkout_id}")
