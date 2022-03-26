type Tagged<A, T> = A & { __tag?: T };

export type E164Number = Tagged<string, "E164Number">;
export type NationalNumber = Tagged<string, "NationalNumber">;
export type Extension = Tagged<string, "Extension">;
export type CarrierCode = Tagged<string, "CarrierCode">;
export type CountryCallingCode = Tagged<string, "CountryCallingCode">;

export type OperatorResponse =
	| "INVALID"
	| "INVALID_NUMBER"
	| "INVALID_NUMBER_INPUT"
	| "NOT_AVAILABLE_IN_REGION"
	| "UNKNOWN";
export type PhoneNumberTypeResponse =
	| "LAND_LINE_PHONE_NUMBER"
	| "MOBILE_PHONE_NUMBER"
	| "UNKNOWN";
export interface IExtract<T> {
	/**
	 * Get name of Mobile Network Operator
	 * @param {string} num - Phone number in national or `International` format
	 * @returns {string} - This is the name of the Mobile Network Operator
	 */
	getNetworkOperator(num: string): OperatorResponse | T;
	getPhoneNumberType(
		num: string,
		nonstrict?: "less_strict"
	): PhoneNumberTypeResponse;
	/**
	 * Match a phone number against a Mobile Network Operator specified
	 * @param num - Phone number in `National` or `International` format
	 * @param operator - Name of Mobile Network Provider, may also be the ISP
	 */
	isOperator(num: string, operator: T): boolean;
	/**
	 * Check if phone number is valid in the configured country code
	 * @param num - Phone number in `National` or `International` format
	 */
	isValidNumberForRegion(num: string): boolean;
	/**
	 * Check if the provided number is a valid Mobile Phone Number
	 * @param num - Phone number in `National` or `International` format
	 */
	isValidMobileNumberForRegion(num: string): boolean;
	/**
	 * Check if the provided number is a valid Fixed Line Number
	 * @param num - Phone number in `National` or `International` format
	 */
	isValidFixedNumberForRegion(num: string): boolean;
}
export interface IMineNumber {
	countryCode: CountryCode;
	rawInp: string;
	number: E164Number | undefined;
	isValidNumber(): boolean;
	getPrefix(): number;
}
export type PREFIXES = number[];
// export interface ISiftPrefixes {
// 	(): number[];
// }
export type IMNO<T> = { name: T; acronyms: string[] };
export interface IMNOPrefixes {
	[operator: string]: number[];
}
export type CountryCode =
	| "AC"
	| "AD"
	| "AE"
	| "AF"
	| "AG"
	| "AI"
	| "AL"
	| "AM"
	| "AO"
	| "AR"
	| "AS"
	| "AT"
	| "AU"
	| "AW"
	| "AX"
	| "AZ"
	| "BA"
	| "BB"
	| "BD"
	| "BE"
	| "BF"
	| "BG"
	| "BH"
	| "BI"
	| "BJ"
	| "BL"
	| "BM"
	| "BN"
	| "BO"
	| "BQ"
	| "BR"
	| "BS"
	| "BT"
	| "BW"
	| "BY"
	| "BZ"
	| "CA"
	| "CC"
	| "CD"
	| "CF"
	| "CG"
	| "CH"
	| "CI"
	| "CK"
	| "CL"
	| "CM"
	| "CN"
	| "CO"
	| "CR"
	| "CU"
	| "CV"
	| "CW"
	| "CX"
	| "CY"
	| "CZ"
	| "DE"
	| "DJ"
	| "DK"
	| "DM"
	| "DO"
	| "DZ"
	| "EC"
	| "EE"
	| "EG"
	| "EH"
	| "ER"
	| "ES"
	| "ET"
	| "FI"
	| "FJ"
	| "FK"
	| "FM"
	| "FO"
	| "FR"
	| "GA"
	| "GB"
	| "GD"
	| "GE"
	| "GF"
	| "GG"
	| "GH"
	| "GI"
	| "GL"
	| "GM"
	| "GN"
	| "GP"
	| "GQ"
	| "GR"
	| "GT"
	| "GU"
	| "GW"
	| "GY"
	| "HK"
	| "HN"
	| "HR"
	| "HT"
	| "HU"
	| "ID"
	| "IE"
	| "IL"
	| "IM"
	| "IN"
	| "IO"
	| "IQ"
	| "IR"
	| "IS"
	| "IT"
	| "JE"
	| "JM"
	| "JO"
	| "JP"
	| "KE"
	| "KG"
	| "KH"
	| "KI"
	| "KM"
	| "KN"
	| "KP"
	| "KR"
	| "KW"
	| "KY"
	| "KZ"
	| "LA"
	| "LB"
	| "LC"
	| "LI"
	| "LK"
	| "LR"
	| "LS"
	| "LT"
	| "LU"
	| "LV"
	| "LY"
	| "MA"
	| "MC"
	| "MD"
	| "ME"
	| "MF"
	| "MG"
	| "MH"
	| "MK"
	| "ML"
	| "MM"
	| "MN"
	| "MO"
	| "MP"
	| "MQ"
	| "MR"
	| "MS"
	| "MT"
	| "MU"
	| "MV"
	| "MW"
	| "MX"
	| "MY"
	| "MZ"
	| "NA"
	| "NC"
	| "NE"
	| "NF"
	| "NG"
	| "NI"
	| "NL"
	| "NO"
	| "NP"
	| "NR"
	| "NU"
	| "NZ"
	| "OM"
	| "PA"
	| "PE"
	| "PF"
	| "PG"
	| "PH"
	| "PK"
	| "PL"
	| "PM"
	| "PR"
	| "PS"
	| "PT"
	| "PW"
	| "PY"
	| "QA"
	| "RE"
	| "RO"
	| "RS"
	| "RU"
	| "RW"
	| "SA"
	| "SB"
	| "SC"
	| "SD"
	| "SE"
	| "SG"
	| "SH"
	| "SI"
	| "SJ"
	| "SK"
	| "SL"
	| "SM"
	| "SN"
	| "SO"
	| "SR"
	| "SS"
	| "ST"
	| "SV"
	| "SX"
	| "SY"
	| "SZ"
	| "TA"
	| "TC"
	| "TD"
	| "TG"
	| "TH"
	| "TJ"
	| "TK"
	| "TL"
	| "TM"
	| "TN"
	| "TO"
	| "TR"
	| "TT"
	| "TV"
	| "TW"
	| "TZ"
	| "UA"
	| "UG"
	| "US"
	| "UY"
	| "UZ"
	| "VA"
	| "VC"
	| "VE"
	| "VG"
	| "VI"
	| "VN"
	| "VU"
	| "WF"
	| "WS"
	| "XK"
	| "YE"
	| "YT"
	| "ZA"
	| "ZM"
	| "ZW";
