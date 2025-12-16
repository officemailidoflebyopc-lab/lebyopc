import { FC } from "react";
import { Button } from "@/checkout/components";
import { useRazorpay } from "./useRazorpay";
import { ParsedPaymentGateway } from "../types";

export interface RazorpayDropinProps {
	config: ParsedPaymentGateway<string, any>;
}

export const RazorpayDropIn: FC<RazorpayDropinProps> = ({ config }) => {
	const { handlePayment, loading } = useRazorpay({ config });

	return (
		<Button
			variant="primary"
			onClick={handlePayment}
			disabled={loading}
			label={loading ? "Processing..." : "Pay with Razorpay"}
		/>
	);
};
