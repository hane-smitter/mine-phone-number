import { ke } from "../src";

// it("phone number should be the provided operator name", () => {
// 	const isAirtelSim = ke.isOperator("0739444444", "AIRTEL NETWORKS KENYA LTD");
// 	expect(isAirtelSim).toBe(true);
// });
// it("phone number should be invalid in KENYA", () => {
// 	const isValidNum = ke.isValidNumberForRegion("07691111111");
// 	expect(isValidNum).toBe(false);
// });
// it("Operator name should be `JAMII TELECOMMUNICATION LTD`", () => {
// 	const getOperator = ke.getNetworkOperator("254-747-444444");
// 	expect(getOperator).toBe("JAMII TELECOMMUNICATION LTD");
// });

describe("validateNumbers", () => {
	it("should validate Kenyan Phone Number with valid national phone number", () => {
		const isValidNum = ke.isValidNumberForRegion("0769111111");
		expect(isValidNum).toBe(true);
	});
	it("should validate Kenyan Phone Number with valid International phone number", () => {
		const isValidNum = ke.isValidNumberForRegion("+254769111111");
		expect(isValidNum).toBe(true);
	});

	it("should validate Kenyan Phone Number with invalid national phone number", () => {
		const isValidNum = ke.isValidNumberForRegion("07691111111246");
		expect(isValidNum).toBe(false);
	});
	it("should validate Kenyan Phone Number with invalid International phone number", () => {
		const isValidNum = ke.isValidNumberForRegion("+2547691111111295");
		expect(isValidNum).toBe(false);
	});

	it("should validate Kenyan Phone Number with valid national landline number", () => {
		const isValidNum = ke.isValidNumberForRegion("041 123 4567");
		expect(isValidNum).toBe(true);
	});

	it("should validate Kenyan Phone Number with invalid International landline number", () => {
		const isValidNum = ke.isValidNumberForRegion("041 123 45678765");
		expect(isValidNum).toBe(false);
	});
	// it("should validate Kenyan Mobile Phone Number with valid National mobile number", () => {
	// 	const isValidNum = ke.isValidMobileNumberForRegion("0769111111");
	// 	expect(isValidNum).toBe(true);
	// });
	it("should validate Kenyan Mobile Phone Number with invalid National mobile number", () => {
		const isValidNum = ke.isValidMobileNumberForRegion("041 123 4567");
		expect(isValidNum).toBe(false);
	});
	it("should validate Kenyan Landline Phone Number with valid National Landline number", () => {
		const isValidNum = ke.isValidFixedNumberForRegion("041 123 4567");
		expect(isValidNum).toBe(true);
	});
	it("should validate Kenyan Landline Phone Number with invalid National Landline number", () => {
		const isValidNum = ke.isValidMobileNumberForRegion("041 123 45678765");
		expect(isValidNum).toBe(false);
	});
});

describe("NetworkOperator", () => {
	it("should Get Network Operator Name Operator name should be `JAMII TELECOMMUNICATION`", () => {
		const getOperator = ke.getNetworkOperator("254-747-444444");
		expect(getOperator).toBe("JAMII TELECOMMUNICATION LTD");
	});
});

describe("it operator", () => {
	it("should it oprator name to phone number phone number should be the provided operator name", () => {
		const isAirtelSim = ke.isOperator(
			"0739444444",
			"AIRTEL NETWORKS KENYA LTD"
		);
		expect(isAirtelSim).toBe(true);
	});
	it("should it oprator name to phone number phone number not of th operator name", () => {
		const isAirtelSim = ke.isOperator(
			"0729444444",
			"AIRTEL NETWORKS KENYA LTD"
		);
		expect(isAirtelSim).toBe(false);
	});
});
