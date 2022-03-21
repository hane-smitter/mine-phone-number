import { ke } from "../src";

test("phone number should be the provided operator name", () => {
	const isAirtelSim = ke.isOperator("0739444444", "AIRTEL KENYA");
	expect(isAirtelSim).toBe(true);
});
test("phone number should be invalid in KENYA", () => {
	const isValidNum = ke.isValidNumberForRegion("07691111111");
	expect(isValidNum).toBe(false);
});
test("Operator name should be `JAMII TELECOMMUNICATION`", () => {
	const getOperator = ke.getNetworkOperator("254-747-444444");
	expect(getOperator).toBe("JAMII TELECOMMUNICATION");
});
