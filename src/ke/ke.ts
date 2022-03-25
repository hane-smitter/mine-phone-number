import {
	CountryCode,
	IExtract,
	IMNO,
	IMNOPrefixes,
	OperatorResponse,
	PhoneNumberTypeResponse,
	PREFIXES
} from "../types";
import sift from "../utils/sifter";
import { MineNumber } from "./ke.parse";

type MobileNetworkOperators =
	| "SAFARICOM PLC"
	| "AIRTEL NETWORKS KENYA LTD"
	| "TELKOM KENYA LTD"
	| "JAMII TELECOMMUNICATION LTD"
	| "FINSERVE AFRICA LTD"
	| "MOBILE PAY LTD"
	| "HOMELAND MEDIA LTD"
	// | "SEMA MOBILE"
	| "EFERIO KENYA LTD"
	| "JAMBO TELECOMS LTD"
	| "INFURA LTD";

const MNOS: IMNO<MobileNetworkOperators>[] = [
	{ name: "SAFARICOM PLC", acronyms: ["SAF", "SAFARICOM"] },
	{
		name: "AIRTEL NETWORKS KENYA LTD",
		acronyms: [
			"AIRTEL",
			"AIRTEL KENYA",
			"ZAIN",
			"CELTEL",
			"BHARTI",
			"BHARTI AIRTEL"
		]
	},
	{
		name: "TELKOM KENYA LTD",
		acronyms: ["TELKOM KENYA", "TELKOM", "ORANGE", "TELEKOM"]
	},
	{
		name: "JAMII TELECOMMUNICATION LTD",
		acronyms: [
			"JTL",
			"FAIBA",
			"FAIBA 4G",
			"JAMII TELECOMS LTD",
			"JAMII TELECOMMUNICATION"
		]
	},
	{ name: "HOMELAND MEDIA LTD", acronyms: ["HOMELAND MEDIA"] },
	{ name: "MOBILE PAY LTD", acronyms: ["MOBILE PAY"] },
	{ name: "EFERIO KENYA LTD", acronyms: ["EFERIO"] },
	// { name: "SEMA MOBILE", acronyms: ["SEMA"] },
	{ name: "FINSERVE AFRICA LTD", acronyms: ["EQUITEL"] },
	{ name: "JAMBO TELECOMS LTD", acronyms: ["JAMBO"] },
	{ name: "INFURA LTD", acronyms: ["INFURA"] }
];
const countryCode: CountryCode = "KE";

const AVAILABLEPREFIXES: PREFIXES = [
	...sift({}, { from: 700, to: 800 }),
	...sift({}, { from: 100, to: 150 })
];

const MNOPrefixes: IMNOPrefixes = {
	/**
	 * safaricom prefixes
	 */
	[MNOS[0].name]: sift(
		{ exclude: [744, 747, 749] },
		{ from: 700, to: 729 },
		{ from: 740, to: 749 },
		{ from: 790, to: 799 },
		{ from: 110, to: 115 }
	),
	/**
	 * airtel prefixes
	 */
	[MNOS[1].name]: sift(
		{ include: [767] },
		{ from: 730, to: 739 },
		{ from: 750, to: 756 },
		{ from: 780, to: 789 },
		{ from: 100, to: 106 }
	),
	/**
	 * telkom prefixes
	 */
	[MNOS[2].name]: sift({}, { from: 770, to: 779 }),
	/**
	 * jamii telecommunication prefixes
	 */
	[MNOS[3].name]: sift({ include: [747] }),
	/**
	 * HomelandsMedia prefixes
	 */
	[MNOS[4].name]: sift({ include: [744] }),
	/**
	 * MobilePay prefixes
	 */
	[MNOS[5].name]: sift({ include: [760] }),
	/**
	 * Eferio Kenya Ltd prefixes
	 */
	[MNOS[6].name]: sift({ include: [761] }),
	// /**
	//  * Sema mobile
	//  */
	// [MNOS[7].name]: sift({ include: [767] }),
	/**
	 * Finserve Africa Ltd(Equitel)
	 */
	[MNOS[7].name]: sift({ include: [124, 763, 764, 765, 766] }),
	/**
	 * Jambo telecoms LTD prefixes
	 */
	[MNOS[8].name]: sift({ include: [120] }),
	/**
	 * Infura LTD
	 */
	[MNOS[9].name]: sift({ include: [121] })
};

//functions
export function getNetworkOperator(
	num: string
): OperatorResponse | MobileNetworkOperators {
	const number: MineNumber = new MineNumber(num);

	const keNumber: string | undefined = number?.number;
	if (!keNumber) {
		return "INVALID_NUMBER_INPUT"; //INVALID_NUMBER_INPUT
	}

	if (!number.isValidMobileNumber) {
		return "INVALID_NUMBER"; //INVALID_NUMBER
	}

	const prefixNum: number = isNaN(number.getPrefix()) ? 0 : number.getPrefix();

	const prefixNumAvailable: boolean = AVAILABLEPREFIXES.includes(prefixNum);
	if (!prefixNumAvailable) {
		return "NOT_AVAILABLE_IN_REGION"; //NOT_AVAILABLE_IN_REGION
	}
	// console.log("MNOPrefixes   ::::", MNOPrefixes);
	// console.log("sift machine", sift({ include: [747] }));
	for (let i: number = 0; i < MNOS.length; i++) {
		let operatorPrefixes: number[] = MNOPrefixes[MNOS[i].name];
		if (operatorPrefixes.includes(prefixNum)) {
			return MNOS[i].name;
		}
	}
	return "UNKNOWN";
}
export function getPhoneNumberType(num: string): PhoneNumberTypeResponse {
	const parsedNumber: MineNumber = new MineNumber(num);
	return parsedNumber.getType();
}
export function isOperator(
	num: string,
	operator: MobileNetworkOperators
): boolean {
	const networkOperator = String(operator.toUpperCase().trim());

	const parsedNumber = new MineNumber(num);
	const keNumber: string | undefined = parsedNumber?.number;
	if (!keNumber) {
		return false;
	}
	const prefixNum: number = isNaN(parsedNumber.getPrefix())
		? 0
		: parsedNumber.getPrefix();

	// get the mobile network operator
	const foundOperator: IMNO<MobileNetworkOperators> | undefined = MNOS.find(
		mno => {
			return (
				mno.name === networkOperator || mno.acronyms.includes(networkOperator)
			);
		}
	);
	if (foundOperator) {
		const { name } = foundOperator;
		return MNOPrefixes[name].includes(prefixNum);
	}
	return false;
}
export function isValidNumberForRegion(num: string): boolean {
	const parsedNumber: MineNumber = new MineNumber(num);
	return parsedNumber.isValidNumber();
}
export function isValidMobileNumberForRegion(num: string): boolean {
	const parsedNumber: MineNumber = new MineNumber(num);
	return parsedNumber.isValidMobileNumber();
}
export function isValidFixedNumberForRegion(num: string): boolean {
	const parsedNumber: MineNumber = new MineNumber(num);
	return parsedNumber.isValidFixedNumber();
}
// functions END

// for a standard 10 digit phone number
const ke: IExtract<MobileNetworkOperators> = {
	getNetworkOperator,
	getPhoneNumberType,
	isOperator,
	isValidNumberForRegion,
	isValidMobileNumberForRegion,
	isValidFixedNumberForRegion
};

export { ke };
