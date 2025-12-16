import requests
import json

# Update this with your actual API URL
API_URL = "https://mystore-api-92b06062958f.herokuapp.com/graphql/"

# You'll need to get an auth token from your dashboard
# Dashboard → Settings → API → Create Token
AUTH_TOKEN = "YOUR_AUTH_TOKEN_HERE"  # Get this from Dashboard → Settings → API → Create Token

mutation = """
mutation PluginUpdate($id: ID!, $input: PluginUpdateInput!) {
  pluginUpdate(id: $id, input: $input) {
    plugin {
      id
      name
      active
      configuration {
        name
        value
      }
    }
    errors {
      field
      message
    }
  }
}
"""

# Enable Razorpay plugin
variables = {
    "id": "mirumee.payments.razorpay",
    "input": {
        "active": True,
        "configuration": [
            {"name": "Public API key", "value": "rzp_live_RV0afIN74hPGf0"},
            {"name": "Secret API key", "value": "7ge4HHoVQFjnClACQu78xnon"},
            {"name": "Store customers card", "value": "false"},
            {"name": "Automatic payment capture", "value": "true"},
            {"name": "Supported currencies", "value": "INR"}
        ]
    }
}

headers = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json"
}

print("Enabling Razorpay plugin...")
response = requests.post(API_URL, json={'query': mutation, 'variables': variables}, headers=headers)

if response.status_code != 200:
    print(f"Error: {response.status_code}")
    print(response.text)
    exit(1)

data = response.json()
if "errors" in data:
    print("GraphQL Errors:", json.dumps(data["errors"], indent=2))
    exit(1)

result = data.get("data", {}).get("pluginUpdate", {})
if result.get("errors"):
    print("Plugin Update Errors:", json.dumps(result["errors"], indent=2))
    exit(1)

print("SUCCESS! Razorpay plugin enabled:")
print(json.dumps(result.get("plugin"), indent=2))
