export const codGatewayId = "lebyopc.payments.cod";

export interface CODConfig {
	id: string;
	name: string;
	config: Array<{
		field: string;
		value: string | number;
	}>;
}
