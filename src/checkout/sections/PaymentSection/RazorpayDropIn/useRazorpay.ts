import { useCallback, useEffect, useState } from "react";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useCheckoutComplete } from "@/checkout/hooks/useCheckoutComplete";
import { useAlerts } from "@/checkout/hooks/useAlerts";
// import { razorpayGatewayId } from "./types";
import { ParsedPaymentGateway } from "../types";

declare var Razorpay: any;

export const useRazorpay = ({ config }: { config: ParsedPaymentGateway<string, any> }) => {
	const { checkout } = useCheckout();
	const { showCustomErrors } = useAlerts();
	const { onCheckoutComplete, completingCheckout } = useCheckoutComplete();
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.async = true;
		script.onload = () => setScriptLoaded(true);
		document.body.appendChild(script);
		return () => {
			if (document.body.contains(script)) {
				document.body.removeChild(script);
			}
		};
	}, []);

	const handlePayment = useCallback(async () => {
		if (!scriptLoaded) {
			showCustomErrors([{ message: "Razorpay SDK not loaded yet." }]);
			return;
		}

		setLoading(true);

		// Get API key from config
		let apiKey = "rzp_live_RV0afIN74hPGf0"; // Fallback to your live key

		if (config.data && typeof config.data === "object") {
			if ("api_key" in config.data) {
				apiKey = config.data.api_key;
			} else if (Array.isArray(config.data)) {
				const keyField = config.data.find((f: any) => f.field === "api_key");
				if (keyField) apiKey = (keyField as any).value;
			}
		}

		const options = {
			key: apiKey,
			amount: Math.round(checkout.totalPrice.gross.amount * 100), // Razorpay expects paisa
			currency: checkout.totalPrice.gross.currency,
			name: "Lebyopc Store",
			description: `Order ${checkout.id}`,
			handler: async function (response: any) {
				console.log("Razorpay payment successful:", response);
				setLoading(false);
				void onCheckoutComplete();
			},
			prefill: {
				email: checkout.email || "",
			},
			theme: {
				color: "#3399cc",
			},
			modal: {
				ondismiss: function () {
					setLoading(false);
				},
			},
		};

		const rzp = new Razorpay(options);
		rzp.open();
	}, [checkout, config, scriptLoaded, showCustomErrors, onCheckoutComplete]);

	return {
		handlePayment,
		loading: loading || completingCheckout || !scriptLoaded,
	};
};
