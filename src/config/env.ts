/** Where a build is going. Only `production` may be indexed; it also turns on the content gates. */
export type DeployEnv = 'production' | 'preview' | 'development';

type Env = Record<string, string | undefined>;

/**
 * Vercel sets `VERCEL_ENV` (production / preview / development). `DEPLOY_ENV=production` forces a
 * production build anywhere else, e.g. to run the gates locally.
 */
export function resolveDeployEnv(env: Env): DeployEnv {
  const value = env.DEPLOY_ENV ?? env.VERCEL_ENV;
  return value === 'production' || value === 'preview' ? value : 'development';
}

export const deployEnv: DeployEnv = resolveDeployEnv(process.env);
export const isProductionBuild = deployEnv === 'production';

/** Vercel Web Analytics only exists on Vercel; elsewhere the script would 404. */
export const analyticsEnabled = process.env.VERCEL === '1';
