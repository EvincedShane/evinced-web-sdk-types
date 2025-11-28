// scripts/generate-types.ts
import fs from "fs";
import path from "path";

async function generateEvincedTypes(): Promise<string> {
  return `
// AUTO-GENERATED — DO NOT EDIT

/* ------------------------------------------------------------
   Shared Platform Types
------------------------------------------------------------- */

export interface Severity {
  id: string;
  name: string;
  newId: string;
}

export interface ValidationRef {
  id: string;
}

export interface Tag {
  id: string;
  name: string;
  newId: string;
}

export interface ElementReference {
  xpath?: string;
  selector?: string;
  html?: string;
  boundingClientRect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  screenshotId?: string;
}

export interface IssueType {
  id: string;
  newId: string;
  name: string;
}

export interface Issue {
  id: string;
  index: string;
  hidden: boolean;
  validation: ValidationRef;
  metadata?: any;
  skipIssue: boolean;
  elements: ElementReference[];
  type: IssueType;
  firstSeenTime: number;
  lastSeenTime: number;
  additionalInformation: Record<string, any>;
  summary: string;
  description: string;
  severity: Severity;
  originalSeverity: Severity;
  tags: Tag[];
  knowledgeBaseLink: string;
  customKnowledgeBaseLinks?: string[];
  wcagLevels: string[];
  signature: string;
  canonicalSignature: string;
  version: string;
  isNeedsReview: boolean;
  isEvincedRecommended: boolean;
  screenshotId?: string;
}

/* ------------------------------------------------------------
   Credentials & Common Options
------------------------------------------------------------- */

export interface Credentials {
  serviceId: string;
  secret: string;
}

export interface OfflineCredentials {
  serviceId: string;
  token: string;
}

export interface UploadToPlatformOptions {
  enableUploadToPlatform: boolean;
  setUploadToPlatformDefault?: boolean;
}

/* ------------------------------------------------------------
   Evinced Analysis Options (Playwright/Selenium/Web)
------------------------------------------------------------- */

export interface EvAnalyzeOptions {
  includeScreenshots?: boolean;
  strict?: boolean;
  axeConfig?: Record<string, any>;
}

export interface EvInitOptions {
  debug?: boolean;
  strict?: boolean;
  axeConfig?: Record<string, any>;
}

/* ---------------------------------------
   Analysis Report formats (Playwright)
---------------------------------------- */

export type AnalysisReport = {
  issues: Issue[];
  engine?: string;
  timestamp?: number;
};

export type ReportWithAxePassed = {
  issues: Issue[];
  axePassed: boolean;
};

/* ------------------------------------------------------------
   Test Run Information (Playwright + Selenium)
------------------------------------------------------------- */

export interface CustomLabelInterface {
  [key: string]: string;
}

export interface TestRunInfoInterface {
  userAgent?: string;
  enginesVersion?: string;
  viewportWidth?: string;
  viewportHeight?: string;
  productVersion?: string;
  testName?: string;
  testFile?: string;
  environment?: string;
  flow?: string;
  gitUserName?: string;
  gitBranch?: string;
  gitVersion?: string;
  customLabel?: CustomLabelInterface;
}

export class TestRunInformation {
  constructor(runInfo?: TestRunInfoInterface);

  testRunId: string;

  customLabel(customParameter: CustomLabelInterface): void;
  addLabel(parameter: TestRunInfoInterface): void;

  getRunInfo?(): TestRunInfoInterface;
  getTestId?(): string;
  updateTestId?(testId: string): void;
  getUploadTestId?(): string;
  getUploadTestUrl?(): string;
  prepareDataToUpload?(
    issues: any[],
    url: string,
    screenshotsMap?: Record<string, string>
  ): any;
}

/* ------------------------------------------------------------
   Cypress SDK
------------------------------------------------------------- */

export namespace CypressEvinced {
  export function init(options?: EvInitOptions): void;
  export function setCredentials(credentials: Credentials): void;
  export function setOfflineCredentials(credentials: OfflineCredentials): void;
  export function setUploadToPlatformConfig(config: UploadToPlatformOptions): void;

  export function cyEvTask(): void;
  export function cyTaskUploadToPlatform(): void;

  export function getUploadTestId(): string;
  export function getUploadTestUrl(): string;
}

/* ------------------------------------------------------------
   Playwright SDK
------------------------------------------------------------- */

export interface EvPage {
  [key: string]: any;
}

export class EvincedSDK {
  page: EvPage;

  constructor(
    page: any,
    uploadToPlatform?: { setUploadToPlatformDefault?: boolean }
  );

  evAnalyze(
    options?: EvAnalyzeOptions
  ): Promise<Issue[] | AnalysisReport | any>;

  evStart(initOptions?: EvInitOptions): Promise<void>;

  evStop(options?: {
    uploadToPlatform: boolean;
  }): Promise<Issue[] | any>;

  evSaveFile(
    issues: Issue[] | AnalysisReport | ReportWithAxePassed | any,
    format: "json" | "html" | "sarif" | "csv",
    destination: string
  ): Promise<void>;

  testRunInfo: TestRunInformation;
}

export function setOfflineCredentials(credentials: OfflineCredentials): void;
export function setCredentials(credentials: Credentials): void;
export function setUploadToPlatformConfig(
  config: UploadToPlatformOptions
): void;

/* ------------------------------------------------------------
   Selenium JS SDK
------------------------------------------------------------- */

export namespace SeleniumEvinced {
  export class EvincedSDK {
    constructor(driver: any);

    evAnalyze(options?: {
      initOptions?: EvInitOptions;
      uploadToPlatform?: boolean;
    }): Promise<Issue[]>;

    evStart(options?: { initOptions?: EvInitOptions }): Promise<void>;

    evStop(options?: { uploadToPlatform?: boolean }): Promise<Issue[]>;

    evSaveFile(
      issues: Issue[],
      format: "json" | "html" | "sarif" | "csv",
      destination: string
    ): Promise<void>;

    testRunInfo: TestRunInformation;
  }

  export function setOfflineCredentials(credentials: OfflineCredentials): void;
  export function setCredentials(credentials: Credentials): void;
  export function setUploadToPlatformConfig(
    config: UploadToPlatformOptions
  ): void;
}

/* ------------------------------------------------------------
   WDIO JS SDK
------------------------------------------------------------- */

export namespace WDIOEvinced {
  export const WdioService: any;
  export const WebDriverIOSdk: any;

  export const setCredentials: (c: Credentials) => void;
  export const setOfflineCredentials: (c: OfflineCredentials) => void;

  export const setUploadToPlatformConfig: (
    cfg: UploadToPlatformOptions
  ) => void;
}
`;
}

async function main() {
  const outDir = path.join(__dirname, "..", "dist");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  const typeDefs = await generateEvincedTypes();
  fs.writeFileSync(path.join(outDir, "index.d.ts"), typeDefs);

  console.log("✔ Evinced types generated successfully.");
}

main().catch((err) => {
  console.error("❌ Failed to generate Evinced types:", err);
  process.exit(1);
});
