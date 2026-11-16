// ─────────────────────────────────────────────────────────────
// La Cuisine de Clément: everything you may need to edit lives here.
// Empty strings switch the corresponding feature off cleanly.
// ─────────────────────────────────────────────────────────────

export const business = {
  name: 'La Cuisine de Clément',
  chef: 'Clément Bahr',
  tagline: 'Batch cooking à domicile à Mulhouse',
  // WhatsApp de Clément, format international sans + ni espaces
  whatsapp: '33649362172',
  // TODO(Clément): numéro affiché, ex. "06 12 34 56 78"
  phone: '',
  // Adresse de contact affichée partout (pied de page, données structurées) : vide = non affichée
  email: '',
  // Adresse affichée seulement sur les pages légales (mentions légales, confidentialité), obligation LCEN/RGPD
  legalEmail: 'c.bahr.restauration@gmail.com',
  // TODO(Clément): n° de déclaration Services à la personne (SAP…) une fois obtenu sur Nova
  sapNumber: '',
  // TODO(Clément): SIRET une fois la micro-entreprise créée
  siret: '',
  city: 'Mulhouse',
  region: 'Haut-Rhin',
  postalCode: '68100',
  instagram: '',
};

// Prices in euros, before tax credit. One rule: Clément bills by the hour at home.
// 32 €/h billed ≈ 25 €/h net for Clément after micro-entrepreneur contributions (~21.5 %),
// i.e. 16 €/h for the client after the 50 % tax credit. Change `hourly` and everything follows.
const hourly = 32;
const formula = (id: string, label: string, hours: number, portions: number, dishes: number) =>
  ({ id, label, hours, portions, dishes, price: hours * hourly });
export const pricing = {
  hourly,
  formulas: {
    decouverte: formula('decouverte', 'Découverte', 3, 12, 3),
    semaine: formula('semaine', 'Semaine', 4, 20, 5),
    grande: formula('grande', 'Grande semaine', 5, 30, 7),
  },
  // Au-delà de la Grande semaine : une heure de plus par tranche de 10 portions.
  extraHour: { price: hourly, portions: 10 },
  shopping: hourly, // Clément fait les courses : une heure (temps de courses, hors denrées)
  recurringDiscount: 0, // remise séances régulières (0 = pas de remise)
  taxCredit: 0.5,
};

export const afterCredit = (n: number) => Math.round(n * (1 - pricing.taxCredit) * 100) / 100;
export const recurring = (n: number) => Math.round(n * (1 - pricing.recurringDiscount));
export const euro = (n: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);

// Communes served, grouped by area. Travel included inside this zone.
export const zone = [
  { area: 'Mulhouse et agglomération', towns: ['Mulhouse', 'Rixheim', 'Riedisheim', 'Illzach', 'Kingersheim', 'Wittenheim', 'Brunstatt-Didenheim', 'Habsheim', 'Pfastatt', 'Lutterbach', 'Sausheim', 'Wittelsheim', 'Morschwiller-le-Bas', 'Zillisheim'] },
  { area: 'Pays de Saint-Louis', towns: ['Saint-Louis', 'Huningue', 'Village-Neuf', 'Hégenheim', 'Kembs', 'Sierentz'] },
  { area: 'Sundgau', towns: ['Altkirch', 'Hirsingue', 'Dannemarie'] },
  { area: 'Thur et Florival', towns: ['Cernay', 'Thann', 'Guebwiller', 'Soultz-Haut-Rhin', 'Bollwiller'] },
];

// Tracking. Leave empty until the accounts exist; nothing loads while empty.
export const tracking = {
  ga4: '', // e.g. 'G-ABC123XYZ'
  googleAds: 'AW-18578921609', // compte Google Ads de Clément, 815-282-4846
  // Google Ads conversion labels (Ads › Objectifs › Conversions › balise)
  adsLeadLabel: 'grvGCJz3ybkdEImxj5tF', // "Demande d'essai", principale
  adsWhatsappLabel: 'ScsbCJ_3ybkdEImxj5tF', // "Clic WhatsApp", secondaire
  adsPhoneLabel: 'JxjCCKL3ybkdEImxj5tF', // "Clic téléphone", secondaire
  leadValue: pricing.formulas.semaine.price, // valeur estimée d'un lead (EUR) envoyée avec la conversion
};

// Form backend (static hosting). Create a free access key at https://web3forms.com
// with Clément's e-mail address, then paste it here.
export const forms = {
  web3formsKey: '35651f74-a2e2-4a37-98b6-c24f4a819998',
};
