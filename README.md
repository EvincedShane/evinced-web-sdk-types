# Evinced Types

A lightweight, framework-agnostic TypeScript definitions package for all Evinced JavaScript SDKs:

- Cypress
- Playwright
- Selenium WebDriver JS
- WebdriverIO (WDIO)

This package provides a single, unified set of type definitions so you can get full IntelliSense, autocomplete, and type-safety no matter which Evinced SDK you use.

All types are auto-generated and kept in sync with the real Evinced SDK APIs.

---

## 🚀 Installation

```bash
npm install evinced-types
# or
yarn add evinced-types
# or
pnpm add evinced-types
```

## ✨ What You Get

This package exports:

# 🔧 Platform-Wide Types

- Issue
- Severity
- Tag
- ElementReference
- IssueType
- AnalysisReport
- ReportWithAxePassed
- Credentials
- OfflineCredentials
- UploadToPlatformOptions
- TestRunInformation + related metadata types

# 📦 SDK-Specific Namespaces and Classes
- CypressEvinced
- EvincedSDK (Playwright)
- SeleniumEvinced
- WDIOEvinced

You can import only what you need, regardless of which SDK you are using.

# 📦 Importing Types

You can import anything from this package:
```
import { Issue, Credentials, EvincedSDK } from "evinced-types";
```
Or namespace UI imports:
```
import { CypressEvinced } from "evinced-types";

🧪 Playwright Example
import { test } from "@playwright/test";
import { EvincedSDK } from "@evinced/js-playwright-sdk";
import type { Issue } from "evinced-types";

test("Analyze accessibility", async ({ page }) => {
const ev = new EvincedSDK(page);

const issues: Issue[] = await ev.evAnalyze();

console.log("Total issues:", issues.length);
});
```
```
🌲 Cypress Example
/// <reference types="cypress" />
import { CypressEvinced, Credentials } from "evinced-types";

before(() => {
const creds: Credentials = { serviceId: "123", secret: "abc" };
CypressEvinced.setCredentials(creds);
CypressEvinced.init({ debug: true });
});
```
```
🕹 Selenium WebDriver JS Example
import { Builder } from "selenium-webdriver";
import { SeleniumEvinced } from "evinced-types";

(async () => {
const driver = await new Builder().forBrowser("chrome").build();

const ev = new SeleniumEvinced.EvincedSDK(driver);
const issues = await ev.evAnalyze();

console.log(issues.map((i) => i.summary));
})();
```
```
🚗 WebdriverIO (WDIO) Example
import { WDIOEvinced, Credentials } from "evinced-types";

const creds: Credentials = { serviceId: "xxx", secret: "yyy" };
WDIOEvinced.setCredentials(creds);

const ev = new WDIOEvinced.WebDriverIOSdk(browser);
const issues = await ev.evAnalyze();
```
```
📘 Important Types
Issue Example
import { Issue } from "evinced-types";

const example: Issue = {
id: "123",
index: "I1",
summary: "Example summary",
description: "Example description",
severity: { id: "CRITICAL", name: "Critical", newId: "uuid" },
elements: [],
hidden: false,
skipIssue: false,
type: { id: "TYPE_ID", newId: "TYPE_UUID", name: "Type Name" },
additionalInformation: {},
validation: { id: "123" },
tags: [],
wcagLevels: [],
signature: "abc",
canonicalSignature: "abc",
version: "1.0",
isNeedsReview: false,
isEvincedRecommended: true
};

🛠 Credentials Types
import { Credentials, OfflineCredentials } from "evinced-types";

const online: Credentials = {
serviceId: "abc",
secret: "xyz",
};

const offline: OfflineCredentials = {
serviceId: "abc",
token: "offline-token",
};

📊 Upload to Platform Configuration
import { UploadToPlatformOptions } from "evinced-types";

const config: UploadToPlatformOptions = {
enableUploadToPlatform: true,
setUploadToPlatformDefault: false,
};

🧰 Working With Test Run Metadata
import { TestRunInformation } from "evinced-types";

const run = new TestRunInformation({
testName: "Homepage Test",
gitBranch: "main",
environment: "CI",
});

run.addLabel({ customLabel: "SmokeTests" });
```
🧬 How This Package Works

This project generates a single index.d.ts file during publishing via a prepublishOnly script.

Users do not need to run any generators — the types are ready immediately after installation.

The generator pulls from a maintained set of Evinced SDK definitions to ensure accurate and up-to-date types.

❤️ Contributions

Contributions are very welcome!

If an Evinced SDK receives updates or new fields appear in reports, feel free to submit a PR or open an issue and types will be regenerated.

You can open an issue here: https://github.com/EvincedShane/evinced-web-sdk-types
