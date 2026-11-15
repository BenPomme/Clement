import { business } from '../config';

/** Prefix a site path with the deploy base (e.g. /Clement/ on GitHub Pages). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^https?:|^mailto:|^tel:/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** wa.me click-to-chat link with a prefilled message, or '' if no number is configured. */
export function waLink(message: string): string {
  if (!business.whatsapp) return '';
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
