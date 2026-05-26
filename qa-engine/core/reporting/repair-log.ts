import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import type { LocatorRepairResult } from '../shared/types';

export async function appendLocatorRepairLog(
  entryKey: string,
  repair: LocatorRepairResult,
  logPath = 'qa-engine/output/reports/locator-repairs.jsonl',
): Promise<void> {
  await mkdir(path.dirname(logPath), { recursive: true });
  await appendFile(
    logPath,
    `${JSON.stringify({
      entryKey,
      repaired: repair.repaired,
      oldLocator: repair.oldLocator,
      repairedLocator: repair.repairedLocator,
      confidenceScore: repair.confidenceScore,
      reason: repair.reason,
      timestamp: new Date().toISOString(),
    })}\n`,
    'utf8',
  );
}
