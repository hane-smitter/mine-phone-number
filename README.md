<div id="top"></div>
<!--
*** Thanks for checking out the Mine-Phone-Number. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again!
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<!-- <br />
<div align="center">
  <a href="https://github.com/hane-smitter/mine-phone-number">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h1 align="center"><strong>Mine Phone Number</strong></h1>

  <p align="center">
    Mine Phone Number is a tool that helps you retrieve information about a phone number (phone number's calling code and mobile network operator). You can also validate a phone number with <strong>rules/conventions</strong> for a specific country, identified by <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements">2 Character ISO code</a>.
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
	isValidNumberForRegion
} = require("mine-phone-number/dist/ke");
// ---- or, alternative way of loading the library ----
/* 
const { KE } = require("mine-phone-number");

--- use as ---
const isAirtelSim = KE.isOperator("0739444444", "AIRTEL KENYA"); // outputs TRUE
 */
const isAirtelSim = isOperator("0739444444", "AIRTEL KENYA");
const isValidNum = isValidNumberForRegion("07691111111");
const getOperator = getNetworkOperator("254-747-444444");

console.log("isAirtelSim:: ", isAirtelSim); // outputs TRUE (boolean)
console.log("retrieved operator:: ", getOperator); // outputs "JAMII TELECOMMUNICATION" (string)
console.log("isValidNum", isValidNum); // outputs FALSE (boolean)
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

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
