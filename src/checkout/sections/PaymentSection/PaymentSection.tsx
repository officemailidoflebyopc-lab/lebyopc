import { PaymentMethods } from "./PaymentMethods";
import { DebugPayments } from "./DebugPayments";
import { Divider } from "@/checkout/components/Divider";
import { Title } from "@/checkout/components/Title";

export const PaymentSection = () => {
	return (
		<>
			<Divider />
			<div className="py-4" data-testid="paymentMethods">
				<Title>Payment methods</Title>
				<DebugPayments />
				<PaymentMethods />
			</div>
		</>
	);
};
