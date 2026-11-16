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

## Conversions pour la pub

Une seule action principale partout sur le site : **« Essayez une séance »**. Elle mène au formulaire
(`#devis`), réglé par défaut sur « Une séance d'essai ». Le semainier, le bouton flottant, la section
Clément et le formulaire disent tous la même chose.

| Conversion Google Ads | Événement | Quand | Réglage dans Ads |
|---|---|---|---|
| **Demande d'essai** | `generate_lead` | le formulaire est envoyé (ou, sans clé Web3Forms, WhatsApp s'ouvre avec la demande pré-remplie) | **Principale**, valeur = prix Semaine (`tracking.leadValue`), compter « une » par clic |
| Clic WhatsApp | `whatsapp_click` | un bouton WhatsApp (en-tête, bouton flottant, formulaire, pied de page) | **Secondaire** (observation), pour ne pas compter deux fois le même client |
| Clic téléphone | `phone_click` | lien `tel:` (quand `business.phone` est rempli) | Secondaire |

Suivi seulement dans GA4 (pas des conversions Ads) : `cta_click` (bouton « Essayez », avec `link_location` :
`floating`, `semainier-hero`, `chef`…), `form_start`, `semainier_interaction`, `dish_photo`.

À savoir :
- Tant que `forms.web3formsKey` est vide, « Demande d'essai » se déclenche quand WhatsApp s'ouvre, même si la
  personne n'envoie pas le message. Avec la clé, elle ne compte que les formulaires vraiment reçus : à faire avant de lancer les annonces.
- La campagne optimise sur « Demande d'essai » uniquement ; les clics WhatsApp restent visibles dans les rapports.

## Mesure

- Bannière de consentement (CNIL) : rien de Google ne se charge avant « Accepter ». Consent Mode v2.
- Événements envoyés (dataLayer + GA4) : `generate_lead`, `whatsapp_click`, `phone_click`, `cta_click`, `form_start`, `semainier_interaction`, `dish_photo`.
- Le gclid et les UTM sont joints à chaque demande (champ `attribution`) pour rattacher un client à une campagne.
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
Le plat devient cliquable et sa photo apparaît au survol. Les fichiers `*.ai.png` actuels sont des illustrations générées par IA (affichées « Photo d'illustration ») : une vraie photo `<plat>.png` les remplace automatiquement. La liste des plats se modifie dans
`src/components/TasteMap.astro`.
