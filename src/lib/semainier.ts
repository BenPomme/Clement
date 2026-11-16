// Semainier maths, shared by the server first paint and the browser script.
// A portion = one person for one meal; a dish feeds about 4 portions.
import { pricing, euro, afterCredit } from '../config';

export const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export const meals = ['Déjeuner', 'Dîner'] as const; // index 0 = lunch, 1 = dinner
// Example menu shown in the ticked cells, in order of the week (Clément's own dishes).
export const menu = ['Lasagnes', 'Curry vert au poulet', 'Chili con carne, riz', 'Quiche, salade', 'Porc au caramel', 'Poule au pot', 'Pâtes bolognaise'];
export const PORTIONS_PER_DISH = 4;
export const MAX_PEOPLE = 12;

export type Week = { people: [number, number]; on: [boolean[], boolean[]]; courses: boolean };
export type TierId = 'decouverte' | 'semaine' | 'semaine-plus' | 'devis';
export type Tier = { id: TierId; label: string; dishes: number; hours: number; price: number | null; capacity: number };

const weekdays = [true, true, true, true, true, false, false];
const everyday = Array(7).fill(true);
const none = Array(7).fill(false);
// Starting weeks: the home page (a couple's dinners), new parents (both at home, lunch and dinner),
// seniors (lunch every day, a light dinner on weekdays).
export const presets = {
  famille: { people: [0, 2], on: [none, weekdays] },
  parents: { people: [2, 2], on: [weekdays, weekdays] },
  seniors: { people: [1, 1], on: [everyday, weekdays] },
} as const;
export type Preset = keyof typeof presets;

export const defaultWeek = (preset: Preset = 'famille'): Week => {
  const p = presets[preset] ?? presets.famille;
  return { people: [p.people[0], p.people[1]], on: [[...p.on[0]], [...p.on[1]]], courses: false };
};

export function tierFor(portions: number): Tier | null {
  const { decouverte: D, semaine: S } = pricing.formulas;
  const X = pricing.extraHour;
  if (portions <= 0) return null;
  if (portions <= D.portions) return { id: 'decouverte', label: D.label, dishes: D.dishes, hours: D.hours, price: D.price, capacity: D.portions };
  if (portions <= S.portions) return { id: 'semaine', label: S.label, dishes: S.dishes, hours: S.hours, price: S.price, capacity: S.portions };
  if (portions <= S.portions + X.portions)
    return { id: 'semaine-plus', label: `${S.label} + 1 h`, dishes: Math.ceil(portions / PORTIONS_PER_DISH), hours: S.hours + 1, price: S.price + X.price, capacity: S.portions + X.portions };
  return { id: 'devis', label: 'Sur mesure', dishes: Math.min(menu.length, Math.ceil(portions / PORTIONS_PER_DISH)), hours: 0, price: null, capacity: portions };
}

export function plan(w: Week) {
  const list: { d: number; m: 0 | 1 }[] = [];
  for (let d = 0; d < 7; d++) for (const m of [0, 1] as const) if (w.on[m][d] && w.people[m] > 0) list.push({ d, m });
  const portions = list.reduce((s, x) => s + w.people[x.m], 0);
  const tier = tierFor(portions);
  // Spread the dishes over the ticked meals in week order: one dish often covers two meals.
  const nd = tier ? Math.min(tier.dishes, list.length) : 0;
  const dish: (string | null)[][] = [Array(7).fill(null), Array(7).fill(null)];
  list.forEach((x, k) => (dish[x.m][x.d] = menu[Math.floor((k * nd) / list.length) % menu.length]));
  const price = tier && tier.price != null ? tier.price + (w.courses ? pricing.shopping : 0) : null;
  return {
    meals: list.length,
    portions,
    tier,
    dish,
    price,
    hours: tier ? tier.hours + (w.courses ? 1 : 0) : 0,
    room: tier && tier.price != null ? tier.capacity - portions : 0,
  };
}

// One-line recap of the ticked meals, sent with the quote request.
export function describe(w: Week) {
  const p = plan(w);
  const short = (d: number) => days[d].slice(0, 3).toLowerCase();
  const rows = ([1, 0] as const)
    .filter((m) => w.people[m] > 0 && w.on[m].some(Boolean))
    .map((m) => `${meals[m]} ×${w.people[m]} : ${w.on[m].map((on, d) => (on ? short(d) : '')).filter(Boolean).join(', ')}`);
  return rows.length ? `${rows.join(' · ')} (${p.portions} portions)` : '';
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n > 1 ? many : one}`;

// The words under the grid and in the price block.
export function copy(w: Week) {
  const p = plan(w);
  const t = p.tier;
  if (!t) return { summary: 'Cochez au moins un repas et dites combien vous êtes.', after: '—', afterLabel: false, before: '' };
  if (t.id === 'devis')
    return {
      summary: `<strong>${plural(p.meals, 'repas', 'repas')}, ${p.portions} portions :</strong> c'est plus qu'une séance. Clément vous propose deux séances dans la semaine, ou un devis sur mesure.`,
      after: 'Sur devis',
      afterLabel: false,
      before: '',
    };
  const perPortion = Math.round((afterCredit(p.price!) / p.portions) * 100) / 100;
  const room = p.room > 0 ? ` Il reste de la place pour ${plural(p.room, 'portion')} de plus, au même prix.` : '';
  return {
    summary: `<strong>${plural(p.meals, 'repas', 'repas')}, ${p.portions} portions → ${t.dishes} plats</strong>, soit ${euro(perPortion)} la portion après crédit, hors ingrédients.${room}`,
    after: euro(afterCredit(p.price!)),
    afterLabel: true,
    before: `soit ${euro(p.price!)} avant crédit · formule ${t.label}, environ ${p.hours} h${w.courses ? ' courses comprises' : ' chez vous'}`,
  };
}
