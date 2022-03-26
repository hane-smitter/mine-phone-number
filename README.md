<div id="top"></div>
<!--
*** Thanks for checking out the Mine-Phone-Number. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again!
-->

<!-- PROJECT LOGO -->
<!-- <br />
<div align="center">
  <a href="https://github.com/hane-smitter/mine-phone-number">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h1 align="center"><strong>Mine Phone Number</strong></h1>

  <p align="center">
    Mine Phone Number is a tool that helps you retrieve information about a phone number (phone number's calling code and mobile network operator). You can also validate a phone number with <strong>rules/conventions</strong> for a specific country, identified by <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements">2 Character ISO code</a>.
    ---<a href="https://www.iban.com/country-codes">Additional reference.</a>---
    <!-- <br />
    <a href="https://github.com/hane-smitter/mine-phone-number"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://github.com/hane-smitter/mine-phone-number">View Demo</a>
    · -->
    <a href="https://github.com/hane-smitter/mine-phone-number/issues">Report Bug</a>
    ·
    <a href="https://github.com/hane-smitter/mine-phone-number/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <!-- <li><a href="#prerequisites">Prerequisites</a></li> -->
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api">API</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<h2 id="about-the-project">About The Project</h2>

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

I started this project when i was experiencing difficulties building a web application that performed STK push to a targeted Mobile Network Operator, native to the region the phone number belongs to. There are ultimate solutions out there, such as [Google's libphonenumber](https://www.npmjs.com/package/google-libphonenumber), which is good at parsing phone numbers, but is way too much of an overkill of some small feature you may want to integrate in your web application.

Additionally, it does not go an inch deeper in trying to get the Mobile Network Operator of the associated phone number.

The project currently supports **Kenya(KE)**. More support coming soon 🔥

<p align="right">(<a href="#top">back to top</a>)</p>

<h3 id="built-with">Built With</h3>

- [Typescript](https://www.typescriptlang.org/)
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

<h2 id="getting-started">Getting Started</h2>

<!-- ### Prerequisites

This is an example of how to list things you need to use the software and how to install them. -->

<h3 id="installation">💽 Installation</h3>

- npm
  ```sh
  npm install mine-phone-number
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<h2 id="usage">🚴 Usage</h2>

```javascript
const {
  getNetworkOperator,
  isOperator,
  isValidNumberForRegion,
  isValidMobileNumberForRegion,
  isValidFixedNumberForRegion,
  getPhoneNumberType,
} = require("mine-phone-number/dist/ke");

// ---- or, alternative way of loading the library ----
/* 
const { ke } = require("mine-phone-number");

--- use as ---
const isAirtelSim = ke.isOperator("0739444444", "AIRTEL NETWORKS KENYA LTD"); // outputs TRUE
 */
const isAirtelSim = isOperator("0739444444", "AIRTEL NETWORKS KENYA LTD");
const getOperator = getNetworkOperator("254-747-444444");

// Valid Mobile Number passed as argument
const isValidNum = isValidNumberForRegion("0711111111");

// Valid FixedLine Number passed as argument
const isValidNum2 = isValidNumberForRegion("+254207641397");

// Invalid Mobile Number passed as argument
const isValidNum3 = isValidNumberForRegion("07111111111111");

// Invalid landline Number passed as argument
const isValidNum4 = isValidNumberForRegion("+254 41 123 4");

const isValidMobileNum = isValidMobileNumberForRegion("+2547492076431");
const isValidFixedNum = isValidFixedNumberForRegion("+2542076416");
const gottenType = getPhoneNumberType("+254201 123 456");
// passed landline number and less strict parameter so as not to validate area code
const gottenTypeLessStrict = getPhoneNumberType(
  "+254911 123 456",
  "less_strict"
);

console.log("isAirtelSim:: ", isAirtelSim); // outputs TRUE (boolean)
console.log("Network Operator: ", getOperator); // outputs "JAMII TELECOMMUNICATION" (string)
console.log("isValidNum (mobile)", isValidNum); // outputs TRUE (boolean)
console.log("isValidNum2 (landline)", isValidNum2); // outputs TRUE (boolean)
console.log("isValidNum3 (invalid mobile)", isValidNum3); // outputs FALSE (boolean)
console.log("isValidNum4 (invalid landline)", isValidNum4); // outputs FALSE (boolean)
console.log("isValidMobileNum", isValidMobileNum); // outputs FALSE (boolean)
console.log("isValidFixedNum", isValidFixedNum); // outputs TRUE (boolean)
console.log("gottenType", gottenType); // outputs "LAND_LINE_PHONE_NUMBER" (boolean)
console.log("gottenType Less Strict", gottenTypeLessStrict); // outputs "LAND_LINE_PHONE_NUMBER" (boolean)
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

<h2 id="api">API</h2>

Parameter Based

- `getNetworkOperator` - Gets the network operator of the **mobile phone number**. Returns a string, i.e:
  - Name of Mobile Network Operator or one of the below strings
  - `INVALID_NUMBER_INPUT` if the provided number is not a valid phone number
  - `INVALID_NUMBER` if the provided number is not a **valid mobile phone number** (It could be a landline number)
  - `NOT_AVAILABLE_IN_REGION` if the provided number prefix is not listed for the region
  - `UNKNOWN` otherwise.
  **Note** `getNetworkOperator` API successfully processes specifically a mobile phone number as parameter and not just any phone number such as landline phone number.
- `getPhoneNumberType` - Gets the type of the phone number. The number needs to be valid for the region(should pass test of `isValidNumberForRegion`).
  
  If you may not want this behaviour, you can pass in a string parameter (`less_strict`).
  This will have the following effect:

  Mobile phone number will only be verified according to the length requirements of the region, and
  areacode in landline number will not be counter checked to ensure that it exists in the region.

  Returns a string, i.e:
  - Type of the phone number, which is either `LAND_LINE_PHONE_NUMBER` or `MOBILE_PHONE_NUMBER`.
  - `UNKNOWN` otherwise
- `isOperator` - Tells you if the phone number is by the specified network operator. `isOperator("phone number", "Network operator")`. Returns a boolean value.
- `isValidNumberForRegion` - Tells you if the phone number is valid. It validates according to rules(numbering plan) by the associated country **ISO Code**. Both landline and mobile numbering plan are tested for validity against the provided phone number. Returns Boolean value.
- `isValidMobileNumberForRegion` - Tells you if the phone number is valid Mobile Phone Number according to rules/conventions of the associated region(country code). Returns Boolean value.
- `isValidFixedNumberForRegion` - Tells you if the phone number is valid Land Line Telephone number according to rules/conventions of the associated region(country code). It additionally ensures that the provided areacode is present in the region. Returns Boolean value.

<p align="right">(<a href="#top">back to top</a>)</p>

<h2 id="features">✅ Features</h2>

- Easy to use
- Country specific phone number validation conventions
- Mine/extract phone number network operator
- Built with Typescript
- Countries currently supported: _Kenya(KE)_

See the [open issues](https://github.com/hane-smitter/mine-phone-number/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

<h2 id="contributing">🔧 Contributing</h2>

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/CoolFeature`)
3. Commit your Changes (`git commit -m 'Add some CoolFeature'`)
4. Push to the Branch (`git push origin feature/CoolFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

<h2 id="license">🔓 License</h2>

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

<h2 id="contact">✉️ Contact</h2>

Zacky - [@SmitterHane](https://twitter.com/SmitterHane) - hanesmitter3@gmail.com

Project Link: [https://github.com/hane-smitter/mine-phone-number](https://github.com/hane-smitter/mine-phone-number)

<p align="right">(<a href="#top">back to top</a>)</p>
