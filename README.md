# OrangeHRM Enterprise Test Automation Framework

A production-ready, highly stable end-to-end test automation framework built using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** architectural pattern. 

This framework has been thoroughly refactored and engineered to address advanced enterprise standards, featuring multi-environment runtime switching, strict secret isolation, dynamic data engines, and screenless CI/CD container optimizations.

---

## 🏗️ Core Architecture & Engineering Upgrades

### 1. Secure Environment-Driven Configuration & Secret Management
* **Zero Plain-Text Credentials**: Successfully extracted all application authentication secrets out of hardcoded source script arrays and plain JSON data stores. 
* **Dynamic Multi-Env Injection**: Integrated `dotenv` to parse operational context securely at runtime. The framework dynamically switches base target locations and environment-specific credentials from `.env.dev`, `.env.qa`, or `.env.stage` manifests using native `process.env` controls.
* **Failsafe Core Settings**: Automatically cascades back to utilize the QA environment configuration profile (`.env.qa`) if no runtime parameters are explicitly mapped.

### 2. Enterprise Page Object Model (POM) Separation
* **Decoupled System Layouts**: Re-architected elements away from monolithic pipelines into single-responsibility page modules (`LoginPage.ts` and `PimPage.ts`).
* **Encapsulated Locators**: Page layers handle structural DOM locators and action abstractions exclusively, leaving test suites (`.spec.ts`) completely clean to handle user validation actions and assertions.

### 3. Dynamic Test Data Management & Lifecycle Actions (Anti-Collision)
* **Data-Driven Randomization**: Integrated an automated runtime random string suffix engine (`Math.random()`) for Employee IDs. This fully isolates data execution rows and completely blocks test run record collisions on heavily shared public demo platforms.
* **Full CRUD Loop Execution**: Validates a strict sequential transaction block: **Create ➡️ Search ➡️ Update ➡️ Re-Verify ➡️ Delete ➡️ Logout**. Enforcing structural inline UI cleanup guarantees sandbox environments remain pristine.

### 4. Continuous Integration (CI/CD) Performance Optimization
* **Dynamic Headless Toggling**: Configured automatic operational engine switches (`headless: process.env.CI ? true : false`) to prevent screensless Linux cloud containers (such as GitHub Actions runners) from crashing, while fully preserving rich UI headed execution locally.
* **Storage Overhead Reduction**: Optimized workspace performance limits by replacing redundant global trace triggers with failure-selective parameters: `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`, and `trace: 'on-first-retry'`.

---

## 📂 Project Structure

```text
├── .github/workflows/    # CI/CD Pipeline Configuration (GitHub Actions)
├── pages/                # Page Object Model Layer (Encapsulated Actions & Elements)
│   ├── LoginPage.ts
│   └── PimPage.ts
├── tests/                # Type-Safe Spec Files
│   ├── LoginPage.spec.ts
│   └── pim.spec.ts
├── testdata/             # Non-Sensitive Test Context Assets
│   ├── testdata.json     # Dynamic name values and descriptive variables
│   └── emp.jpg           # Application-ready file upload binary assets
├── .env.dev              # Development site configurations & credential profiles
├── .env.qa               # QA site configurations & credential profiles (Default Target)
├── .env.stage            # Staging site configurations & credential profiles
├── playwright.config.ts  # Master Runtime Execution Configuration
└── package.json          # Dependency Manifest
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your environment.

### 🛠️ 1. Environmental Secret Setup
Create your environment configurations (e.g., `.env.qa`) at the project root following this syntax blueprint:
```ini
BASE_URL="https://orangehrmlive.com"
ORANGEHRM_USERNAME="Admin"
ORANGEHRM_PASSWORD="admin123"
```

### ⚙️ 2. Package Installation
Clone the repository workspace, enter the root directory, and fetch runtime modules alongside local browser engines:
```bash
# Fetch essential project package extensions
npm install

# Download and link Playwright browser dependencies
npx playwright install
```

### 🏃 3. Executing Test Suites

Direct execution pipelines cleanly against distinct environments locally by appending your environment key variables:

```bash
# Run tests against the default QA profile (Headless mode)
npx playwright test

# Direct execution against Staging target variables
ENV=stage npx playwright test

# Trigger development run mappings in a visual UI browser window for live auditing
ENV=dev npx playwright test --headed

# Launch specific targeted suite modules directly
npx playwright test tests/pim.spec.ts
```

### 📊 4. Reviewing Test Reports & Metrics

Audit execution sequences, logs, timelines, and failures using built-in reporting dashboards:

```bash
# View the self-contained native Playwright HTML report framework
npx playwright show-report

# Serve complete advanced Allure observability tracking dashboards
allure serve allure-results
```

---

## 🛠️ Main Infrastructure Dependencies
* **Playwright Test**: Primary core testing framework managing cross-browser binaries, action timeouts, and assertion blocks.
* **TypeScript**: Enforces compiler safety, data types, and method signature mapping.
* **Dotenv**: Manages externalized environment parameters securely without polluting the code base.
* **Allure Playwright**: Extends baseline metrics into high-visibility graphical project run dashboards.
