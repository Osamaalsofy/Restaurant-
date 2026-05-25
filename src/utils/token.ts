/**
 * Self-contained token utility to parse and serialize complex states safely in URLs.
 * Fully compatible with all mobile & desktop browsers.
 */

export function encodeToken(data: any): string {
  try {
    const jsonStr = JSON.stringify(data);
    // Use base64 encoding that is URL-safe (replacing +, /, = with -, _, and empty)
    const base64 = btoa(encodeURIComponent(jsonStr));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    console.error('Error encoding ticket token:', e);
    return '';
  }
}

export function decodeToken<T>(token: string | null): T | null {
  if (!token) return null;
  try {
    // Restore standard base64 characters
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonStr = decodeURIComponent(atob(base64));
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error('Error decoding ticket token:', e);
    return null;
  }
}
