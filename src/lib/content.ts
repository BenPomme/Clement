import { business, pricing, zone, euro, afterCredit } from '../config';

const D = pricing.formulas.decouverte;
const S = pricing.formulas.semaine;
const G = pricing.formulas.grande;

export const faq = [
  {
    q: 'Qui fait les courses ?',
    a: `Au choix. Vous recevez la liste quelques jours avant et vous faites les courses vous-même, ou Clément s'en charge le matin de la séance pour ${euro(pricing.shopping)} (${euro(afterCredit(pricing.shopping))} après crédit d'impôt). Dans ce cas, les ingrédients vous sont refacturés au prix du ticket de caisse, que vous recevez avec la facture.`,
  },
  {
    q: 'Combien de plats et de portions pour une séance ?',
    a: `Une règle simple : Clément facture ${euro(pricing.hourly)} de l'heure. La formule Découverte, c'est ${D.dishes} plats, jusqu'à ${D.portions} portions, en ${D.hours} heures. La Semaine, ${S.dishes} plats, jusqu'à ${S.portions} portions, en ${S.hours} heures : de quoi couvrir les dîners du lundi au vendredi pour une famille de quatre. La Grande semaine, ${G.dishes} plats, jusqu'à ${G.portions} portions, en ${G.hours} heures. Au-delà, une heure de plus par tranche de ${pricing.extraHour.portions} portions.`,
  },
  {
    q: 'Comment choisit-on les plats ?',
    a: "Après un premier appel pour connaître vos goûts, vos contraintes et l'équipement de votre cuisine, Clément vous propose un menu de saison. Vous changez ce que vous voulez jusqu'à trois jours avant la séance. Vous pouvez aussi lui donner vos classiques à vous, ou lui laisser carte blanche.",
  },
  {
    q: 'Allergies, sans gluten, végétarien : c\'est possible ?',
    a: "Oui. Signalez-le dès le premier échange : le menu est construit autour, et les plats concernés sont clairement étiquetés. Pour une allergie sévère, dites-le aussi au téléphone pour que Clément organise la séance en conséquence.",
  },
  {
    q: 'Combien de temps se conservent les plats ?',
    a: "Trois à quatre jours au réfrigérateur pour la plupart des plats. Ceux prévus pour la fin de semaine peuvent être congelés : Clément vous indique lesquels sur l'étiquette, avec la date et le conseil de réchauffage.",
  },
  {
    q: 'Faut-il une cuisine bien équipée ?',
    a: "Non. Des plaques, un four, un réfrigérateur et un peu de place suffisent. Au premier appel, Clément vous dit s'il faut prévoir quelque chose, et combien de boîtes de conservation préparer.",
  },
  {
    q: 'Dois-je être présent pendant la séance ?',
    a: "Comme vous voulez. Vous pouvez laisser une clé, ou travailler dans la pièce d'à côté. Vous retrouvez la cuisine rangée, la vaisselle faite et le frigo rempli.",
  },
  {
    q: 'Comment fonctionne le crédit d\'impôt de 50 % ?',
    a: `La préparation de repas à domicile, temps de courses compris, fait partie des services à la personne qui ouvrent droit à un crédit d'impôt de 50 %. Une séance Semaine à ${euro(S.price)} vous revient donc à ${euro(afterCredit(S.price))}. C'est un crédit, pas une réduction : même si vous ne payez pas d'impôt sur le revenu, la somme vous est versée. Les ingrédients ne sont pas concernés. Sous réserve : la déclaration Services à la personne de La Cuisine de Clément est en cours.`,
  },
  {
    q: 'Comment se passe le paiement ?',
    a: "Rien à payer avant : vous réglez après la séance, sur facture. Trois possibilités. Par virement. En espèces, mais un paiement en espèces n'ouvre pas droit au crédit d'impôt. Ou directement par l'Urssaf, avec l'avance immédiate : vous ne payez que la moitié, prélevée par l'Urssaf, et le crédit d'impôt n'est plus à attendre. Sous réserve : l'avance immédiate sera proposée dès que La Cuisine de Clément est inscrite à ce service.",
  },
  {
    q: 'Je travaille en Suisse, j\'y ai droit ?',
    a: "Si vous habitez en France et y déclarez vos revenus, oui : le crédit d'impôt dépend de votre résidence fiscale, pas du pays où vous travaillez. Les foyers domiciliés en Suisse ou en Allemagne peuvent réserver une séance, mais sans crédit d'impôt français.",
  },
  {
    q: 'Et si je dois annuler ?',
    a: "Prévenez Clément le plus tôt possible. Les conditions d'annulation sont indiquées sur votre devis ; si des courses ont déjà été faites pour vous, les ingrédients achetés vous reviennent.",
  },
  {
    q: 'Où intervenez-vous ?',
    a: `À Mulhouse et dans toute l'agglomération (${zone[0].towns.slice(1, 7).join(', ')}…), ainsi qu'à Saint-Louis, Altkirch, Cernay, Thann et Guebwiller. Le déplacement est compris dans ces communes. Un peu plus loin ? Demandez, ça se discute.`,
  },
];

export const faqLd = (items = faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const businessLd = (site: URL | undefined, base: string) => {
  const home = new URL(base, site).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${home}#business`,
    name: business.name,
    description: 'Batch cooking à domicile : un chef cuisinier prépare chez vous les repas de la semaine, à Mulhouse et dans le Haut-Rhin.',
    servesCuisine: ['Française', 'Alsacienne', 'Asiatique', 'Indienne', 'Thaïlandaise', 'Vietnamienne', 'Chinoise'],
    url: home,
    image: new URL(`${base.replace(/\/$/, '')}/og.jpg`, site).href,
    founder: { '@type': 'Person', name: business.chef, jobTitle: 'Chef cuisinier' },
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    priceRange: `${euro(D.price)}–${euro(G.price)}`,
    address: { '@type': 'PostalAddress', addressLocality: business.city, postalCode: business.postalCode, addressRegion: 'Grand Est', addressCountry: 'FR' },
    areaServed: zone.flatMap((z) => z.towns).map((t) => ({ '@type': 'City', name: t })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Formules de batch cooking à domicile',
      itemListElement: [D, S].map((F) => ({
        '@type': 'Offer',
        name: `Formule ${F.label}`,
        description: `${F.dishes} plats, environ ${F.portions} portions, cuisinés chez vous en ${F.hours} heures environ.`,
        price: F.price,
        priceCurrency: 'EUR',
      })),
    },
  };
};

export const crumbsLd = (site: URL | undefined, items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: new URL(it.path, site).href })),
});
