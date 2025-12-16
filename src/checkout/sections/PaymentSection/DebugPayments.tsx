import { useCheckout } from "@/checkout/hooks/useCheckout";
import { paymentMethodToComponent } from "./supportedPaymentApps";

export const DebugPayments = () => {
	const { checkout } = useCheckout();

	return (
		<div
			style={{
				background: "#f0f0f0",
				padding: "10px",
				margin: "10px 0",
				border: "1px solid #ccc",
				fontSize: "12px",
			}}
		>
			<h4>🔍 Payment Debug Info</h4>
			<p>
				<strong>Checkout ID:</strong> {checkout.id}
			</p>
			<p>
				<strong>Available Gateways:</strong> {checkout.availablePaymentGateways?.length || 0}
			</p>

			{checkout.availablePaymentGateways?.map((gateway, index) => (
				<div key={gateway.id} style={{ marginLeft: "10px", marginBottom: "5px" }}>
					<p>
						<strong>Gateway {index + 1}:</strong> {gateway.name} (ID: {gateway.id})
					</p>
					<p>
						<strong>Has Component:</strong> {gateway.id in paymentMethodToComponent ? "✅ YES" : "❌ NO"}
					</p>
					<p>
						<strong>Config:</strong> {JSON.stringify(gateway.config)}
					</p>
				</div>
			))}

			<p>
				<strong>Supported Components:</strong>
			</p>
			<ul style={{ marginLeft: "20px" }}>
				{Object.keys(paymentMethodToComponent).map((id) => (
					<li key={id}>{id}</li>
				))}
			</ul>
		</div>
	);
};
