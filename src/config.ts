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
  // TODO(Clément): adresse e-mail de contact
  email: '',
  // TODO(Clément): n° de déclaration Services à la personne (SAP…) une fois obtenu sur Nova
  sapNumber: '',
  // TODO(Clément): SIRET une fois la micro-entreprise créée
  siret: '',
  city: 'Mulhouse',
  region: 'Haut-Rhin',
  postalCode: '68100',
  instagram: '',
};

// Prices in euros, before tax credit. Halved on 16/11/2026 to launch well under the
// local market (benchmark: Chou Cuisine, Haut-Rhin); Clément can raise them here.
export const pricing = {
  formulas: {
    decouverte: { id: 'decouverte', label: 'Découverte', dishes: 3, hours: 3, portions: 12, price: 72 },
    semaine: { id: 'semaine', label: 'Semaine', dishes: 5, hours: 4, portions: 20, price: 117 },
  },
  shopping: 18, // Clément fait les courses (temps de courses, hors denrées)
  recurringDiscount: 0.2, // séances régulières (chaque semaine ou toutes les deux semaines)
  taxCredit: 0.5,
  // Une heure de plus sur la formule Semaine, pour les grandes tablées : jusqu'à 8 portions de plus.
  extraHour: { price: 28, portions: 8 },
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
  googleAds: '', // e.g. 'AW-123456789'
  // Google Ads conversion labels (Ads › Objectifs › Conversions › balise)
  adsLeadLabel: '', // conversion "Demande de devis"
  adsWhatsappLabel: '', // conversion "Clic WhatsApp"
  adsPhoneLabel: '', // conversion "Clic téléphone"
  leadValue: pricing.formulas.semaine.price, // valeur estimée d'un lead (EUR) envoyée avec la conversion
};

// Form backend (static hosting). Create a free access key at https://web3forms.com
// with Clément's e-mail address, then paste it here.
export const forms = {
  web3formsKey: '',
};
