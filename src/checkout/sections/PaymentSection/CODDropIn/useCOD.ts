import { useState } from "react";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useCheckoutPaymentCreateMutation } from "@/checkout/graphql";
import { ParsedPaymentGateway } from "../types";

interface UseCODProps {
	config: ParsedPaymentGateway<string, any>;
}

export const useCOD = ({ config }: UseCODProps) => {
	const [loading, setLoading] = useState(false);
	const { checkout } = useCheckout();
	const [, checkoutPaymentCreate] = useCheckoutPaymentCreateMutation();

	const calculateCODFee = (amount: number): number => {
		return amount * 0.05; // 5% fee
	};

	const calculateTotalWithCOD = (amount: number): number => {
		return amount + calculateCODFee(amount);
	};

	const handleCODPayment = async () => {
		if (!checkout?.totalPrice?.gross?.amount) {
			console.error("No checkout total available");
			return;
		}

		setLoading(true);

		try {
			const baseAmount = parseFloat(checkout.totalPrice.gross.amount);
			const codFee = calculateCODFee(baseAmount);
			const totalWithCOD = calculateTotalWithCOD(baseAmount);

			// Create payment for the 5% COD fee only
			const result = await checkoutPaymentCreate({
				checkoutId: checkout.id,
				input: {
					gateway: config.id,
					amount: codFee, // Only pay the 5% fee upfront
					token: "cod_payment",
				},
			});

			if (result.error) {
				console.error("COD payment creation failed:", result.error);
				return;
			}

			console.log("COD payment created successfully");
			// The checkout will be completed with COD status
			// Remaining amount will be collected on delivery
		} catch (error) {
			console.error("COD payment error:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		handleCODPayment,
		loading,
		calculateCODFee,
		calculateTotalWithCOD,
	};
};
