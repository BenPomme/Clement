// Consent-gated Google tag (GA4 + Google Ads) with Consent Mode v2.
// CNIL-friendly "basic" mode: nothing from Google loads before the visitor accepts.
import { tracking } from '../config';

type Params = Record<string, unknown>;
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    lcdcTrack: (event: string, params?: Params) => void;
  }
}

const KEY = 'lcdc-consent-v1';
const ATTR_KEY = 'lcdc-attribution';
const enabled = Boolean(tracking.ga4 || tracking.googleAds);

window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
};
window.gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500,
});

let loaded = false;
function loadGoogle() {
  if (loaded || !enabled) return;
  loaded = true;
  window.gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${tracking.ga4 || tracking.googleAds}`;
  document.head.appendChild(s);
  window.gtag('js', new Date());
  if (tracking.ga4) window.gtag('config', tracking.ga4);
  if (tracking.googleAds) window.gtag('config', tracking.googleAds, { allow_enhanced_conversions: true });
  captureAttribution();
}

function getConsent(): 'granted' | 'denied' | null {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!raw || Date.now() - raw.t > 182 * 864e5) return null; // CNIL: ask again after ~6 months
    return raw.v === 'granted' || raw.v === 'denied' ? raw.v : null;
  } catch {
    return null;
  }
}
function setConsent(v: 'granted' | 'denied') {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() }));
  } catch {
    /* storage blocked: consent lasts for this page view */
  }
}

// Keep gclid / UTM for the quote form so each lead can be tied back to a campaign.
function captureAttribution() {
  try {
    const p = new URLSearchParams(location.search);
    const keys = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const found: Record<string, string> = {};
    keys.forEach((k) => {
      const v = p.get(k);
      if (v) found[k] = v.slice(0, 200);
    });
    const prev = JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}');
    const merged = { landing_page: prev.landing_page || location.pathname, ...prev, ...found };
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(merged));
  } catch {
    /* ignore */
  }
}
export function attribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}');
  } catch {
    return {};
  }
}

const adsLabels: Record<string, string> = {
  generate_lead: tracking.adsLeadLabel,
  whatsapp_click: tracking.adsWhatsappLabel,
  phone_click: tracking.adsPhoneLabel,
};

/** Push a named event to the dataLayer (GTM-ready) and, after consent, to GA4 / Google Ads. */
export function track(event: string, params: Params = {}) {
  window.dataLayer.push({ event, ...params });
  if (!loaded) return;
  window.gtag('event', event, params);
  const label = adsLabels[event];
  if (tracking.googleAds && label) {
    window.gtag('event', 'conversion', {
      send_to: `${tracking.googleAds}/${label}`,
      value: event === 'generate_lead' ? tracking.leadValue : undefined,
      currency: 'EUR',
    });
  }
}
window.lcdcTrack = track;

// ── Banner wiring ────────────────────────────────────────────
function initBanner() {
  const banner = document.getElementById('consent');
  const reopen = document.querySelectorAll<HTMLElement>('[data-consent-open]');
  if (!enabled) {
    reopen.forEach((el) => (el.hidden = true));
    return;
  }
  const state = getConsent();
  if (state === 'granted') loadGoogle();
  if (!banner) return;
  if (state === null) banner.hidden = false;
  banner.querySelector('[data-consent="accept"]')?.addEventListener('click', () => {
    setConsent('granted');
    banner.hidden = true;
    loadGoogle();
  });
  banner.querySelector('[data-consent="refuse"]')?.addEventListener('click', () => {
    setConsent('denied');
    banner.hidden = true;
  });
  reopen.forEach((el) =>
    el.addEventListener('click', () => {
      banner.hidden = false;
      (banner.querySelector('button') as HTMLButtonElement | null)?.focus();
    }),
  );
}

// Delegated click tracking: any element with data-track="event_name" (+ data-track-*)
function initClicks() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
    if (!el) return;
    const params: Params = { link_location: el.dataset.trackLocation || 'page' };
    track(el.dataset.track!, params);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initBanner();
    initClicks();
  });
} else {
  initBanner();
  initClicks();
}
