import * as process from 'node:process';

export function getProfiles(): string[] {
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const profilesEnv = process.env['NESTJS_PROFILES'];

  if (profilesEnv === null || profilesEnv === undefined || profilesEnv === '') {
    return [];
  }

  return profilesEnv.split(',').map((p) => p.trim().toLowerCase());
}
