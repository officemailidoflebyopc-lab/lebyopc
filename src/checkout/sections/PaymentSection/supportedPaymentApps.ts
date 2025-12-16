import { AdyenDropIn } from "./AdyenDropIn/AdyenDropIn";
import { adyenGatewayId } from "./AdyenDropIn/types";
import { DummyComponent } from "./DummyDropIn/dummyComponent";
import { dummyGatewayId } from "./DummyDropIn/types";
import { StripeComponent } from "./StripeV2DropIn/stripeComponent";
import { stripeV2GatewayId } from "./StripeV2DropIn/types";
import { RazorpayDropIn } from "./RazorpayDropIn/RazorpayDropIn";
import { razorpayGatewayId } from "./RazorpayDropIn/types";
import { CODDropIn } from "./CODDropIn/CODDropIn";
import { codGatewayId } from "./CODDropIn/types";

export const paymentMethodToComponent = {
	[adyenGatewayId]: AdyenDropIn,
	[stripeV2GatewayId]: StripeComponent,
	[dummyGatewayId]: DummyComponent,
	[razorpayGatewayId]: RazorpayDropIn,
	[codGatewayId]: CODDropIn,
};
