import path from 'node:path';
import { readFile } from 'node:fs/promises';
import xlsx from 'xlsx';
import type {
  AiTestDefinition,
  BusinessTestCaseInput,
  StructuredTestStep,
  TestPriority,
} from '../shared/types';
import { normalizeWhitespace, readJsonFile, slugify } from '../shared/utils';

type ExcelRow = {
  Module?: string;
  module?: string;
  Scenario?: string;
  scenario?: string;
  Step?: string;
  step?: string;
  'Expected Result'?: string;
  expectedResult?: string;
  Priority?: TestPriority;
  priority?: TestPriority;
  Tags?: string;
  tags?: string;
};

export async function parseBusinessTestCases(inputPath: string): Promise<AiTestDefinition[]> {
  const ext = path.extname(inputPath).toLowerCase();

  if (ext === '.json') {
    const parsed = await readJsonFile<BusinessTestCaseInput | BusinessTestCaseInput[]>(inputPath);
    return normalizeInputCases(Array.isArray(parsed) ? parsed : [parsed]);
  }

  if (ext === '.xlsx' || ext === '.xls') {
    const buffer = await readFile(inputPath);
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const cases = workbook.SheetNames.flatMap((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json<ExcelRow>(worksheet, { defval: '' });
      return groupExcelRows(rows);
    });
    return normalizeInputCases(cases);
  }

  throw new Error(`Unsupported test case input format: ${inputPath}`);
}

function groupExcelRows(rows: ExcelRow[]): BusinessTestCaseInput[] {
  const grouped = new Map<string, BusinessTestCaseInput>();

  for (const row of rows) {
    const moduleName = normalizeWhitespace(String(row.Module || row.module || 'General'));
    const scenario = normalizeWhitespace(String(row.Scenario || row.scenario || 'Unnamed scenario'));
    const step = normalizeWhitespace(String(row.Step || row.step || ''));
    const expected = normalizeWhitespace(String(row['Expected Result'] || row.expectedResult || ''));
    const key = `${moduleName}::${scenario}`;

    if (!grouped.has(key)) {
      grouped.set(key, {
        module: moduleName,
        scenario,
        steps: [],
        expectedResults: [],
        priority: row.Priority || row.priority || 'Medium',
        tags: parseTags(row.Tags || row.tags || ''),
      });
    }

    const current = grouped.get(key);
    if (!current) {
      continue;
    }
    if (step) {
      current.steps.push(step);
    }
    if (expected) {
      current.expectedResults?.push(expected);
    }
  }

  return [...grouped.values()];
}

function normalizeInputCases(cases: BusinessTestCaseInput[]): AiTestDefinition[] {
  return cases.map((testCase, index) => {
    const id =
      testCase.testCaseId ||
      `AI_TC_${slugify(testCase.module).toUpperCase().replace(/-/g, '_')}_${String(index + 1).padStart(3, '0')}`;
    const priority = testCase.priority || inferPriority(testCase.steps);

    return {
      id,
      sourceTestCaseId: testCase.testCaseId,
      module: testCase.module,
      scenario: testCase.scenario,
      title: testCase.title || `${testCase.module} - ${testCase.scenario}`,
      priority,
      riskLevel: inferRiskLevel(priority, testCase.steps),
      tags: testCase.tags?.length ? testCase.tags : inferTags(testCase),
      preconditions: testCase.preconditions || [],
      generatedAt: new Date().toISOString(),
      confidenceScore: 0.82,
      testData: testCase.testData || {},
      aiValidation: testCase.aiValidation || [],
      testType: testCase.testType,
      automationMode: testCase.automationMode || 'automated',
      steps: testCase.steps.map((step, stepIndex) =>
        toStructuredStep(step, stepIndex, testCase.expectedResults?.[stepIndex]),
      ),
    };
  });
}

function toStructuredStep(step: string, index: number, expectedResult?: string): StructuredTestStep {
  const cleanStep = normalizeWhitespace(step);
  const lower = cleanStep.toLowerCase();

  if (lower.startsWith('open ') || lower.startsWith('navigate ') || lower.includes('go to ')) {
    return {
      id: `step-${index + 1}`,
      businessText: cleanStep,
      action: 'navigate',
      targetHint: extractTarget(cleanStep),
      expectedResult,
    };
  }
  if (lower.startsWith('enter ') || lower.startsWith('type ') || lower.startsWith('fill ')) {
    return {
      id: `step-${index + 1}`,
      businessText: cleanStep,
      action: 'fill',
      targetHint: extractFillTarget(cleanStep),
      valueHint: extractValueHint(cleanStep),
      expectedResult,
    };
  }
  if (lower.startsWith('click ') || lower.startsWith('tap ') || lower.includes('select ')) {
    return {
      id: `step-${index + 1}`,
      businessText: cleanStep,
      action: 'click',
      targetHint: extractTarget(cleanStep),
      expectedResult,
    };
  }
  if (lower.startsWith('verify ') || lower.startsWith('assert ') || lower.startsWith('validate ')) {
    return {
      id: `step-${index + 1}`,
      businessText: cleanStep,
      action: 'assertVisible',
      targetHint: extractTarget(cleanStep),
      expectedResult,
    };
  }

  return {
    id: `step-${index + 1}`,
    businessText: cleanStep,
    action: 'unknown',
    targetHint: extractTarget(cleanStep),
    expectedResult,
  };
}

function extractTarget(step: string): string {
  return step
    .replace(/^(open|navigate to|go to|click|tap|verify|assert|validate|select)\s+/i, '')
    .replace(/\s+(is|are)\s+visible$/i, '')
    .trim();
}

function extractFillTarget(step: string): string {
  const withoutVerb = step.replace(/^(enter|type|fill)\s+/i, '');
  return withoutVerb
    .replace(/^(valid|invalid)\s+/i, '')
    .replace(/\s+(field|input)$/i, '')
    .trim();
}

function extractValueHint(step: string): string {
  const lower = step.toLowerCase();
  if (lower.includes('email')) return 'validEmail';
  if (lower.includes('password')) return 'validPassword';
  if (lower.includes('name')) return 'validName';
  if (lower.includes('message')) return 'validMessage';
  return 'value';
}

function inferPriority(steps: string[]): TestPriority {
  const text = steps.join(' ').toLowerCase();
  if (text.includes('payment') || text.includes('login') || text.includes('submit')) return 'High';
  return 'Medium';
}

function inferRiskLevel(priority: TestPriority, steps: string[]) {
  const text = steps.join(' ').toLowerCase();
  if (priority === 'Critical' || text.includes('delete') || text.includes('payment')) return 'High';
  if (priority === 'High' || text.includes('login') || text.includes('submit')) return 'Medium';
  return 'Low';
}

function inferTags(testCase: BusinessTestCaseInput): string[] {
  return [slugify(testCase.module), slugify(testCase.scenario)].filter(Boolean);
}

function parseTags(value: string): string[] {
  return value
    .split(',')
    .map((tag) => slugify(tag))
    .filter(Boolean);
}
