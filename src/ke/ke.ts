import { parsePhoneNumberFromString, PhoneNumber } from "libphonenumber-js";
import {
	CountryCode,
	IExtract,
	IMNO,
	IMNOPrefixes,
	OperatorResponse,
	PREFIXES
} from "../types";
import sift from "../utils/sifter";

type MobileNetworkOperators =
	| "SAFARICOM"
	| "AIRTEL KENYA"
	| "TELKOM KENYA"
	| "JAMII TELECOMMUNICATION"
	| "EQUITEL"
	| "MOBILE PAY"
	| "HOMELANDS MEDIA"
	| "SEMA MOBILE"
	| "EFERIO";

const MNOS: IMNO<MobileNetworkOperators>[] = [
	{ name: "SAFARICOM", acronyms: ["SAF"] },
	{
		name: "AIRTEL KENYA",
		acronyms: ["AIRTEL", "ZAIN", "CELTEL", "BHARTI", "BHARTI AIRTEL"]
	},
	{ name: "TELKOM KENYA", acronyms: ["TELKOM", "ORANGE", "TELEKOM"] },
	{ name: "JAMII TELECOMMUNICATION", acronyms: ["JTL", "FAIBA", "FAIBA 4G"] },
	{ name: "HOMELANDS MEDIA", acronyms: [""] },
	{ name: "MOBILE PAY", acronyms: [""] },
	{ name: "EFERIO", acronyms: [""] },
	{ name: "SEMA MOBILE", acronyms: ["SEMA"] },
	{ name: "EQUITEL", acronyms: [""] }
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
		{ from: 110, to: 111 }
	),
	/**
	 * airtel prefixes
	 */
	[MNOS[1].name]: sift(
		{},
		{ from: 730, to: 739 },
		{ from: 750, to: 756 },
		{ from: 780, to: 789 },
		{ from: 100, to: 102 }
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
	 * Eferio prefixes
	 */
	[MNOS[6].name]: sift({ include: [761] }),
	/**
	 * Sema mobile
	 */
	[MNOS[7].name]: sift({ include: [767] }),
	/**
	 * Equitel
	 */
	[MNOS[8].name]: sift({ include: [763, 764, 765, 766] })
};

//functions
export function getNetworkOperator(
	num: string
): OperatorResponse | MobileNetworkOperators {
	const parsedNumber: PhoneNumber | undefined = parsePhoneNumberFromString(
		num,
		countryCode
	);
	const keNumber: string | undefined = parsedNumber?.number;
	const isValidKENumber: RegExp = /^(\+?254|0)\d{9}$/;
	if (!isValidKENumber.test(String(keNumber))) {
		return "INVALID_NUMBER"; //INVALID_NUMBER
	}
	let prefix: string | null = null;
	if (!keNumber) {
		return "INVALID_NUMBER_INPUT"; //INVALID_NUMBER_INPUT
	}
	const capturePrefix = /(\+?254|0)(?<prefix>\d{3})(\d{6})/;
	const extracted: RegExpMatchArray | null = keNumber.match(capturePrefix);
	prefix = extracted && extracted[2];

	let prefixNum: number = 0;
	if (!prefix) {
		return "INVALID_NUMBER"; // INVALID_NUMBER
	}
	prefixNum = parseInt(prefix);

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
	return "UNKNOWN"; //UNKNOWN
}
export function isOperator(
	num: string,
	operator: MobileNetworkOperators
): boolean {
	const networkOperator = String(operator.toUpperCase().trim());
	const parsedNumber: PhoneNumber | undefined = parsePhoneNumberFromString(
		num,
		countryCode
	);
	const keNumber: string | undefined = parsedNumber?.number;
	let prefix: string | null = null;
	if (keNumber) {
		const capturePrefix = /(\+?254|0)(?<prefix>\d{3})(\d{6})/;
		const extracted: RegExpMatchArray | null = keNumber.match(capturePrefix);
		prefix = extracted && extracted[2];
	}
	let prefixNum: number = 0;
	if (prefix) {
		prefixNum = parseInt(prefix);
	}

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
	const parsedNumber: PhoneNumber | undefined = parsePhoneNumberFromString(
		num,
		countryCode
	);
	const keNumber: string | undefined = parsedNumber?.number;
	const isValidKENumber: RegExp = /^(\+?254|0)\d{9}$/;
	return isValidKENumber.test(String(keNumber));
}
// functions END

// for a standard 10 digit phone number
const ke: IExtract<MobileNetworkOperators> = {
	getNetworkOperator,
	isOperator,
	isValidNumberForRegion
};

export { ke };
