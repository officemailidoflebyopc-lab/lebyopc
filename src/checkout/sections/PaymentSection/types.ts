import { type StripeV2GatewayId } from "./StripeV2DropIn/types";
import { type DummyGatewayId } from "./DummyDropIn/types";
import { type PaymentGatewayConfig } from "@/checkout/graphql";
import {
	type AdyenGatewayId,
	type AdyenGatewayInitializePayload,
} from "@/checkout/sections/PaymentSection/AdyenDropIn/types";
import { type RazorpayGatewayId } from "./RazorpayDropIn/types";

export type PaymentGatewayId = AdyenGatewayId | StripeV2GatewayId | DummyGatewayId | RazorpayGatewayId;

export type ParsedAdyenGateway = ParsedPaymentGateway<AdyenGatewayId, AdyenGatewayInitializePayload>;
export type ParsedStripeGateway = ParsedPaymentGateway<StripeV2GatewayId, { stripePublishableKey?: string }>;
export type ParsedDummyGateway = ParsedPaymentGateway<DummyGatewayId, {}>;
export type ParsedRazorpayGateway = ParsedPaymentGateway<RazorpayGatewayId, { api_key?: string }>;

export type ParsedPaymentGateways = ReadonlyArray<
	ParsedAdyenGateway | ParsedStripeGateway | ParsedDummyGateway | ParsedRazorpayGateway
>;

export interface ParsedPaymentGateway<ID extends string, TData extends Record<string, any>>
	extends Omit<PaymentGatewayConfig, "data" | "id"> {
	data: TData;
	id: ID;
}

export type PaymentStatus = "paidInFull" | "overpaid" | "none" | "authorized";
