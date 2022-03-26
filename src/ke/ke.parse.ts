import { parsePhoneNumberFromString, PhoneNumber } from "libphonenumber-js";
import {
	CountryCode,
	IMineNumber,
	CountryCallingCode,
	E164Number,
	PhoneNumberTypeResponse
} from "../types";

const areaCodes: { area: string[]; code: number }[] = [
	{ area: ["Nairobi"], code: 20 },
	{ area: ["Kwale"], code: 40 },
	{ area: ["Mombasa"], code: 41 },
	{ area: ["Malindi", "Lamu", "Garsen"], code: 42 },
	{ area: ["Voi"], code: 43 },
	{ area: ["Machakos", "Makueni", "Kitui"], code: 44 },
	{ area: ["Athi-River", "Kajiado", "Loitokitok"], code: 45 },
	{ area: ["Garissa", "Wajir", "Mandera"], code: 46 },
	{ area: ["Naivasha", "Gilgil", "Narok"], code: 50 },
	{ area: ["Nakuru", "Njoro", "Molo"], code: 51 },
	{ area: ["Kericho", "Bomet"], code: 52 },
	{ area: ["Eldoret", "Turbo", "Kapsabet", "Iten", "Kabarnet"], code: 53 },
	{ area: ["Kitale", "Moisbridge", "Kapenguria", "Lodwar"], code: 54 },
	{ area: ["Bungoma", "Busia"], code: 55 },
	{ area: ["Kakamega", "Vihiga"], code: 56 },
	{ area: ["Kisumu", "Siaya"], code: 57 },
	{ area: ["Kisii", "Kilgoris", "Oyugis", "Nyamira"], code: 58 },
	{ area: ["Homabay", "Migori"], code: 59 },
	{ area: ["Muranga", "Kirinyaga"], code: 60 },
	{ area: ["Nyeri"], code: 61 },
	{ area: ["Nanyuki"], code: 62 },
	{ area: ["Muranga", "Kirinyaga"], code: 63 },
	{ area: ["Meru", "Maua", "Chuka"], code: 64 },
	{ area: ["Thika", "Ruiru"], code: 66 },
	{ area: ["Kiambu", "Kikuyu"], code: 67 },
	{ area: ["Embu"], code: 68 },
	{ area: ["Marsabit", "Moyale"], code: 69 }
];

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
		/* 
			Overview:
			Minimum number length (excluding the country code): seven (7) digits
			Maximum number length (excluding the country code): twelve (12) digits
		*/
		const testValid: RegExp = /^(\+?254|0)\d{7,12}$/;
		const isValidKENumber: boolean = testValid.test(this.number || "");
		// const isValidKEGeographicalNumber: RegExp = /^(\+?254|0)\d{2}\d{7,9}$/;
		// return isValidKENumber.test(String(this?.number));
		return (
			this.isValidMobileNumber() || this.isValidFixedNumber() || isValidKENumber
		);
	}
	isValidFixedNumber(nonstrict?: "less_strict"): boolean {
		// Valid ke fixed number is 7 to 9 digits excluding country code
		const areacCodeExp: RegExp = /^(?<cc>\+?254|0)(?<ac>\d{2})\d{5,7}$/;
		const AC = this.number?.match(areacCodeExp);
		const areaCode: number = parseInt(AC?.groups?.ac || "");
		// Search if such an area code exists in ke
		if (nonstrict !== "less_strict") {
			const foundArea: object | undefined = areaCodes.find(
				area => area.code === areaCode
			);
			if (!foundArea) return false;
		}
		return areacCodeExp.test(this.number || "");
	}
	isValidMobileNumber(nonstrict?: "less_strict"): boolean {
		// valid ke mobile number is 9 digits excluding country code
		const isValidKEMobileNumber: RegExp = /^(\+?254|0)([71]\d{8})$/;
		const isValidKEMobileNumberNonStrict: RegExp = /^(\+?254|0)(\d{9})$/;
		if (nonstrict === "less_strict")
			return isValidKEMobileNumberNonStrict.test(String(this?.number));
		return isValidKEMobileNumber.test(String(this?.number));
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

	getType(strict?: "less_strict"): PhoneNumberTypeResponse {
		if (this.isValidFixedNumber(strict)) return "LAND_LINE_PHONE_NUMBER";
		if (this.isValidMobileNumber(strict)) return "MOBILE_PHONE_NUMBER";
		return "UNKNOWN";
	}
}
