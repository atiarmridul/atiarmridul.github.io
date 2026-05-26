import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export interface QaRuntimeConfig {
  baseUrl: string;
  skipWebServer: boolean;
  routeStaticAssetsToOrigin: boolean;
}

export function resolveQaConfig(envName = process.env.QA_ENV || 'local'): QaRuntimeConfig {
  const profile = readEnvFile(path.resolve(process.cwd(), 'qa-engine', 'environments', `${envName}.env`));
  const get = (key: string, fallback: string) => process.env[key] || profile[key] || fallback;

  return {
    baseUrl: get('PLAYWRIGHT_BASE_URL', get('BASE_URL', 'http://127.0.0.1:5173')),
    skipWebServer: toBoolean(get('PLAYWRIGHT_SKIP_WEBSERVER', 'false')),
    routeStaticAssetsToOrigin: toBoolean(get('ROUTE_STATIC_ASSETS_TO_ORIGIN', 'false')),
  };
}

function readEnvFile(filePath: string): Record<string, string> {
  if (!existsSync(filePath)) {
    return {};
  }

  return readFileSync(filePath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce<Record<string, string>>((values, line) => {
      const separator = line.indexOf('=');
      if (separator === -1) return values;
      const key = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^["']|["']$/g, '');
      values[key] = value;
      return values;
    }, {});
}

function toBoolean(value: string): boolean {
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}
