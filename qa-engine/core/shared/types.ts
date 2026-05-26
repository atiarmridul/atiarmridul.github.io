export type TestPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type LocatorStrategy =
  | 'data-testid'
  | 'aria-label'
  | 'role'
  | 'name'
  | 'placeholder'
  | 'text'
  | 'css'
  | 'xpath';

export interface BusinessTestCaseInput {
  testCaseId?: string;
  title?: string;
  module: string;
  scenario: string;
  steps: string[];
  expectedResults?: string[];
  priority?: TestPriority;
  tags?: string[];
  preconditions?: string[];
  testData?: Record<string, unknown>;
  aiValidation?: string[];
  testType?: string;
  automationMode?: 'automated' | 'ai-assisted' | 'manual';
}

export interface StructuredTestStep {
  id: string;
  businessText: string;
  action: 'navigate' | 'fill' | 'click' | 'assertVisible' | 'assertUrl' | 'assertText' | 'unknown';
  targetHint?: string;
  valueHint?: string;
  expectedResult?: string;
}

export interface AiTestDefinition {
  id: string;
  sourceTestCaseId?: string;
  module: string;
  scenario: string;
  title: string;
  priority: TestPriority;
  riskLevel: RiskLevel;
  tags: string[];
  preconditions: string[];
  generatedAt: string;
  confidenceScore: number;
  testData: Record<string, unknown>;
  aiValidation: string[];
  testType?: string;
  automationMode: 'automated' | 'ai-assisted' | 'manual';
  steps: StructuredTestStep[];
}

export interface LocatorCandidate {
  strategy: LocatorStrategy;
  selector: string;
  score: number;
  source: 'dom' | 'source' | 'generated' | 'healed';
}

export interface ComponentMapping {
  componentName: string;
  filePath: string;
  exported: boolean;
  props: string[];
  selectors: LocatorCandidate[];
  textHints: string[];
}

export interface LocatorCatalogEntry {
  key: string;
  label: string;
  tagName?: string;
  testId?: string | null;
  name?: string | null;
  role?: string | null;
  ariaLabel?: string | null;
  placeholder?: string | null;
  text?: string | null;
  component?: string;
  sourceFile?: string;
  primary: LocatorCandidate;
  fallbacks: LocatorCandidate[];
  lastSeenAt: string;
}

export interface LocatorCatalog {
  baseUrl?: string;
  generatedAt: string;
  entries: LocatorCatalogEntry[];
  components: ComponentMapping[];
}

export interface LocatorRepairResult {
  repaired: boolean;
  oldLocator: LocatorCandidate;
  repairedLocator?: LocatorCandidate;
  confidenceScore: number;
  reason: string;
  timestamp?: string;
}
