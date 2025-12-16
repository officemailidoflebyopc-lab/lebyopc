import { useState, useEffect } from "react";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useCheckoutComplete } from "@/checkout/hooks/useCheckoutComplete";
import { useAlerts } from "@/checkout/hooks/useAlerts";
import { usePaymentGatewaysInitializeMutation } from "@/checkout/graphql";
import { ParsedPaymentGateway } from "../types";
import { codGatewayId } from "./types";

declare var Razorpay: any;

interface UseCODProps {
	config: ParsedPaymentGateway<string, any>;
}

export const useCOD = ({ config }: UseCODProps) => {
	const [loading, setLoading] = useState(false);
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const { checkout } = useCheckout();
	const { onCheckoutComplete, completingCheckout } = useCheckoutComplete();
	const { showCustomErrors } = useAlerts();
	const [, paymentGatewaysInitialize] = usePaymentGatewaysInitializeMutation();

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

	const calculateCODFee = (amount: number): number => {
		return amount * 0.05; // 5% fee
	};

	const calculateTotalWithCOD = (amount: number): number => {
		return amount + calculateCODFee(amount);
	};

	const handleCODPayment = async () => {
		if (!checkout?.totalPrice?.gross?.amount) {
			showCustomErrors([{ message: "No checkout total available" }]);
			return;
		}

		if (!scriptLoaded) {
			showCustomErrors([{ message: "Payment system not loaded yet." }]);
			return;
		}

		setLoading(true);

		try {
			// First, initialize COD payment gateway
			const initResult = await paymentGatewaysInitialize({
				checkoutId: checkout.id,
				paymentGateways: [{ id: codGatewayId }],
			});

			if (initResult.error) {
				console.error("COD gateway initialization failed:", initResult.error);
				showCustomErrors([{ message: "Failed to initialize COD payment" }]);
				setLoading(false);
				return;
			}

			const baseAmount = checkout.totalPrice.gross.amount;
			const codFee = calculateCODFee(baseAmount);

			// Pay only the 5% COD fee upfront via Razorpay
			const options = {
				key: "rzp_live_RV0afIN74hPGf0", // Your Razorpay key
				amount: Math.round(codFee * 100), // Only COD fee in paisa
				currency: checkout.totalPrice.gross.currency,
				name: "Lebyopc Store",
				description: `COD Service Fee for Order ${checkout.id}`,
				handler: async function (response: any) {
					console.log("COD fee payment successful:", response);
					// After successful payment of COD fee, complete the checkout
					void onCheckoutComplete();
					setLoading(false);
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
				notes: {
					payment_type: "cod_fee",
					order_id: checkout.id,
				},
			};

			const rzp = new Razorpay(options);
			rzp.open();
		} catch (error) {
			console.error("COD payment error:", error);
			showCustomErrors([{ message: "Failed to process COD payment" }]);
			setLoading(false);
		}
	};

	return {
		handleCODPayment,
		loading: loading || completingCheckout || !scriptLoaded,
		calculateCODFee,
		calculateTotalWithCOD,
	};
};
