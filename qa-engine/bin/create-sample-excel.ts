import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import xlsx from 'xlsx';

const outputPath = process.argv[2] || 'qa-engine/input/excel/sample-business-cases.xlsx';

const rows = [
  {
    Module: 'Homepage',
    Scenario: 'Portfolio landing page loads',
    Step: 'Open homepage',
    'Expected Result': 'Homepage loads successfully',
    Priority: 'High',
    Tags: 'smoke,homepage',
  },
  {
    Module: 'Homepage',
    Scenario: 'Portfolio landing page loads',
    Step: 'Verify Md. Atiar Rahman Chowdhury is visible',
    'Expected Result': 'Owner name is displayed in the hero section',
    Priority: 'High',
    Tags: 'smoke,homepage',
  },
  {
    Module: 'Navigation',
    Scenario: 'Navigate to contact section',
    Step: 'Click Contact',
    'Expected Result': 'The page scrolls to the contact area',
    Priority: 'Medium',
    Tags: 'navigation,contact',
  },
  {
    Module: 'Navigation',
    Scenario: 'Navigate to contact section',
    Step: 'Verify Get In Touch is visible',
    'Expected Result': 'The contact section heading is visible',
    Priority: 'Medium',
    Tags: 'navigation,contact',
  },
];

await mkdir(path.dirname(outputPath), { recursive: true });
const workbook = xlsx.utils.book_new();
const worksheet = xlsx.utils.json_to_sheet(rows);
xlsx.utils.book_append_sheet(workbook, worksheet, 'Business Tests');
xlsx.writeFile(workbook, outputPath);
console.log(`Sample Excel test cases written to ${outputPath}`);
