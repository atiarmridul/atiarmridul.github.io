import { parseBusinessTestCases } from './core/parser/test-case-parser';

const input = process.argv[2] || 'qa-engine/ai/definitions/business-test-cases.json';
const cases = await parseBusinessTestCases(input);
console.log(JSON.stringify(cases, null, 2));
