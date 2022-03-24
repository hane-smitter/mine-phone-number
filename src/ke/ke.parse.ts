import { parsePhoneNumberFromString, PhoneNumber } from "libphonenumber-js";
import {
	CountryCode,
	IMineNumber,
	CountryCallingCode,
	E164Number
} from "../types";

export class MineNumber implements IMineNumber {
	countryCode: CountryCode = "KE";
	private num: PhoneNumber | undefined;
	rawInp: string;
	number: E164Number | undefined;
	callingCode: CountryCallingCode | undefined;
	constructor(num: string) {
		this.rawInp = num;
		this.num = parsePhoneNumberFromString(this.rawInp, this.countryCode);
		this.number = this.num?.number;
		this.callingCode = this.num?.countryCallingCode;
	}

	isValidNumber(): boolean {
		const isValidKENumber: RegExp = /^(\+?254|0)\d{9}$/;
		return isValidKENumber.test(String(this?.number));
	}

	getPrefix(): number {
		// 0o0 implies an error
		if (!this.isValidNumber()) return 0o0;
		const capturePrefix = /(\+?254|0)(?<prefix>\d{3})(\d{6})/;
		const extracted: RegExpMatchArray | null | undefined =
			this.number && this.number.match(capturePrefix);
		const prefix: string = (extracted && extracted[2]) || "";

		return parseInt(prefix);
	}
}
