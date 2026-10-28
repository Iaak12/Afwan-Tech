/**
 * Central API Configuration
 * Automatically links to the live Hostinger MySQL PHP endpoints
 * with fallback support for custom environment variables.
 */
export function getPhpApiUrl() {
  const envUrl = process.env.PHP_API_URL || process.env.NEXT_PUBLIC_PHP_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/$/, '');
  }
  return 'https://violet-ibis-402728.hostingersite.com/api/backend-php';
}

