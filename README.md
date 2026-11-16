# La Cuisine de Clément

Site de Clément Bahr, batch cooking à domicile à Mulhouse. Astro (statique), déployé sur GitHub Pages à chaque push sur `main`.

```bash
npm install
npm run dev      # http://localhost:4321/Clement/
npm run build
```

## À remplir avant de lancer les annonces

Tout se règle dans [`src/config.ts`](src/config.ts) :

| Clé | Quoi | Où le trouver |
|---|---|---|
| `business.whatsapp` | numéro WhatsApp de Clément, format `336…` | — |
| `business.phone`, `business.email` | contact affiché | — |
| `business.sapNumber`, `business.siret` | n° de déclaration SAP (Nova) et SIRET | nova.entreprises.gouv.fr |
| `forms.web3formsKey` | clé du formulaire (reçoit les demandes par e-mail) | web3forms.com, avec l'e-mail de Clément |
| `tracking.ga4` | ID de mesure GA4 `G-…` | analytics.google.com |
| `tracking.googleAds` + labels | `AW-…` et labels de conversion | Google Ads › Objectifs › Conversions |

Tant qu'un champ est vide, la fonction correspondante est simplement désactivée (pas de bouton WhatsApp, pas de bannière cookies, etc.).

## Mesure

- Bannière de consentement (CNIL) : rien de Google ne se charge avant « Accepter ». Consent Mode v2.
- Événements envoyés (dataLayer + GA4) : `generate_lead`, `whatsapp_click`, `phone_click`, `cta_click`, `form_start`, `semainier_interaction`.
- Conversions Google Ads : `generate_lead` (avec valeur), `whatsapp_click`, `phone_click`, via les labels de `config.ts`.
- Le gclid et les UTM sont joints à chaque demande de devis (champ `attribution`) pour rattacher un client à une campagne.
- Page `/merci/` après envoi du formulaire (non indexée) : utilisable comme objectif de secours.

## Domaine

`lacuisinedeclement.fr` est libre (15/11/2026). Une fois acheté : ajouter `public/CNAME` avec le domaine, régler le domaine dans *Settings › Pages*, et passer `SITE_URL=https://lacuisinedeclement.fr` et `BASE_PATH=/` dans `.github/workflows/deploy.yml` (et `robots.txt`).

## Photos

Les plats sont détourés depuis les photos de Clément (voir `src/assets/dishes/PROVENANCE.md`). Pour en ajouter : déposer un PNG détouré dans `src/assets/dishes/` et l'utiliser avec le composant `Plate`.

## Photos des plats sur la carte « Sa carte »

Déposez une photo détourée (PNG transparent de préférence, ou JPG/WebP) dans
`src/assets/dishes/carte/`, nommée d'après le plat en minuscules sans accents :
`poule-au-pot.png`, `papillotes-de-saumon.png`, `chorba.png`, `aloo-gobi.png`,
`poitrine-de-porc-braisee.png`, `riz-cantonais.png`, `curry-vert-au-poulet.png`,
`soupe-de-poulet-a-la-thaie.png`, `pad-thai.png`, `tom-yum-kung.png`,
`porc-au-caramel.png`, `poulet-a-la-jamaicaine.png`, `chili-con-carne.png`.
Le plat devient cliquable et sa photo apparaît au survol. La liste des plats se modifie dans
`src/components/TasteMap.astro`.
