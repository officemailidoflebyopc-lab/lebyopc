import { FC } from "react";
import { Button } from "@/checkout/components";
import { useCOD } from "./useCOD";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { ParsedPaymentGateway } from "../types";

export interface CODDropInProps {
	config: ParsedPaymentGateway<string, any>;
}

export const CODDropIn: FC<CODDropInProps> = ({ config }) => {
	const { handleCODPayment, loading, calculateCODFee, calculateTotalWithCOD } = useCOD({ config });
	const { checkout } = useCheckout();

	if (!checkout?.totalPrice?.gross?.amount) {
		return null;
	}

	const baseAmount =
		typeof checkout.totalPrice.gross.amount === "string"
			? parseFloat(checkout.totalPrice.gross.amount)
			: checkout.totalPrice.gross.amount;
	const codFee = calculateCODFee(baseAmount);
	const totalWithCOD = calculateTotalWithCOD(baseAmount);
	const currency = checkout.totalPrice.gross.currency;
	const currencySymbol = currency === "INR" ? "₹" : currency;

	return (
		<div className="rounded-lg border bg-gray-50 p-4">
			<div className="mb-4">
				<h3 className="mb-2 text-lg font-semibold text-gray-900">💰 Cash on Delivery (COD)</h3>
				<div className="space-y-1 text-sm text-gray-600">
					<p>• Pay only 5% now, rest on delivery</p>
					<p>• Convenient and secure payment option</p>
					<p>• No need for online payment details</p>
				</div>
			</div>

			<div className="mb-4 rounded-md border bg-white p-3">
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span>Order Total:</span>
						<span className="font-medium">
							{currencySymbol}
							{baseAmount.toFixed(2)}
						</span>
					</div>
					<div className="flex justify-between text-orange-600">
						<span>COD Service Fee (5%):</span>
						<span className="font-medium">
							+ {currencySymbol}
							{codFee.toFixed(2)}
						</span>
					</div>
					<hr className="my-2" />
					<div className="flex justify-between text-lg font-semibold">
						<span>Total COD Amount:</span>
						<span className="text-green-600">
							{currencySymbol}
							{totalWithCOD.toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			<div className="mb-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
				<p className="mb-1 font-medium">Payment Breakdown:</p>
				<p>
					• Pay now: {currencySymbol}
					{codFee.toFixed(2)} (Service fee)
				</p>
				<p>
					• Pay on delivery: {currencySymbol}
					{baseAmount.toFixed(2)} (Order amount)
				</p>
			</div>

			<Button
				variant="primary"
				onClick={handleCODPayment}
				disabled={loading}
				label={loading ? "Processing..." : `Pay ${currencySymbol}${codFee.toFixed(2)} Now`}
				className="w-full"
			/>
		</div>
	);
};
