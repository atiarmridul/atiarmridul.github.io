import { readFile, writeFile } from 'node:fs/promises';
import { appendLocatorRepairLog } from '../reporting/repair-log';
import type { LocatorCatalog, LocatorRepairResult } from '../shared/types';

export async function recordLocatorRepair(
  catalogPath: string,
  entryKey: string,
  repair: LocatorRepairResult,
): Promise<void> {
  if (!repair.repaired || !repair.repairedLocator) return;
  await appendLocatorRepairLog(entryKey, repair);

  const catalog = JSON.parse(await readFile(catalogPath, 'utf8')) as LocatorCatalog;
  const entry = catalog.entries.find((candidate) => candidate.key === entryKey);
  if (!entry) {
    throw new Error(`Cannot repair missing locator catalog entry: ${entryKey}`);
  }

  entry.fallbacks = [entry.primary, ...entry.fallbacks].filter(
    (candidate, index, candidates) =>
      candidates.findIndex(
        (other) => other.strategy === candidate.strategy && other.selector === candidate.selector,
      ) === index,
  );
  entry.primary = repair.repairedLocator;
  entry.lastSeenAt = new Date().toISOString();
  catalog.generatedAt = new Date().toISOString();

  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
}
