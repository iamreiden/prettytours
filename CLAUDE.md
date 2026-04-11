# INSTRUCTIONS CLAUDE - PRETTY TOURS PROJECT

## CONTEXTE DU PROJET

**Client :** Pretty, guide touristique mauricienne
- Née à Maurice en 1980, fille d'un guide-taxi
- Passionnée, authentique, connaît les moindres recoins de l'île
- Société fondée en 2019, se développe par bouche-à-oreille
- Proximité client, personnalisation, storytelling émotionnel

**Objectif :** Site web premium ultra-professionnel pour se démarquer totalement de la concurrence et booster la visibilité via le SEO.

**Contact :**
- Tel/WhatsApp : +230 5904 2969
- Email : prettytours@outlook.com

---

## STACK TECHNIQUE

**Technologies imposées :**
- HTML5 sémantique (SEO-first)
- CSS moderne (Grid, Flexbox, Custom Properties, Container Queries, Animations CSS)
- JavaScript Vanilla — pas de framework, code propre et modulaire
- GSAP pour animations premium
- Lazy loading natif pour images
- Intersection Observer API pour animations au scroll

**Performance obligatoire :**
- Temps de chargement < 2 secondes
- Core Web Vitals optimaux
- Images WebP + fallback JPG
- Code minifié en production

**Responsive (NON-NÉGOCIABLE) :**
- Mobile-first approach
- Breakpoints : 375px (mobile) / 768px (tablet) / 1024px (desktop) / 1440px+ (large)
- Tout doit être parfait sur tous les écrans

---

## DESIGN SYSTEM

### Palette couleurs

```css
--color-turquoise: #00CED1;       /* Lagon mauricien */
--color-coral: #FF6B6B;           /* Coucher de soleil */
--color-sand: #FAFAFA;            /* Sable blanc */
--color-ocean-dark: #1A2B3C;      /* Texte marine foncé */
--color-gold: #FFD700;            /* Or tropical pour CTAs premium */
--color-green-tropical: #2ECC71;  /* Végétation */
```

### Typographie premium

- Titres (h1, h2, h3) : **Playfair Display** (élégant, serif, émotionnel)
- Corps de texte : **Inter** (moderne, très lisible)
- Poids : 300 (light), 400 (regular), 600 (semibold), 700 (bold)

### Espacement (système 8pt)

```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-xxl: 64px;
--space-xxxl: 96px;
```

### Animations

- Subtiles et fluides (pas d'exagéré)
- Durée : 0.3s (micro) / 0.6s (standard) / 1.2s (hero)
- Easing : `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design)
- Parallax doux sur hero
- Fade-in + slide-up au scroll pour sections
- Micro-interactions sur hover (scale 1.05, shadow)

**IMPORTANT : Ne jamais hardcoder une couleur, une font ou un spacing. Toujours utiliser les variables CSS.**

---

## SYSTÈME MULTILINGUE (CRITIQUE)

**Langues obligatoires :** Français / English / Créole Mauricien

### Système de traduction

- Fichiers JSON séparés : `lang-fr.json`, `lang-en.json`, `lang-mau.json`
- Switch langue en header avec drapeaux + codes (FR / EN / MU)
- LocalStorage pour mémoriser préférence utilisateur
- Tags `<html lang="fr">` / `<html lang="en">` / `<html lang="mau">`
- Balises hreflang pour chaque version (SEO international)

### Qualité traductions (ZERO Google Translate)

- **FR :** Vouvoiement, chaleureux, émotionnel, storytelling
- **EN :** Professional warm tone, engaging, emotional
- **Créole mauricien :** Authentique, expressions locales vraies

---

## SYSTÈME URLs SEO-OPTIMISÉES (CRITIQUE)

**PRINCIPE FONDAMENTAL :**
Chaque page doit avoir une URL descriptive, unique et lisible qui contient les mots-clés principaux. Les URLs sont un facteur de ranking Google majeur.

### Structure URLs complète

**URLs Français :**
```
/fr/                                              → Accueil FR
/fr/excursions/                                   → Liste excursions FR
/fr/excursions/mahebourg-domaine-saint-aubin/     → Détail excursion
/fr/excursions/diner-romantique-flic-en-flac/     → Détail excursion
/fr/excursions/wedding-planner-maurice/           → Détail excursion
/fr/excursions/ile-aux-cerfs-catamaran/           → Détail excursion
/fr/excursions/chamarel-terre-sept-couleurs/      → Détail excursion
/fr/services/                                     → Services FR
/fr/services/excursions-personnalisees/           → Service spécifique
/fr/services/organisation-evenements/             → Service spécifique
/fr/mon-histoire/                                 → Histoire Pretty FR
/fr/contact/                                      → Contact FR
```

**URLs English :**
```
/en/                                              → Home EN
/en/excursions/                                   → Excursions list EN
/en/excursions/mahebourg-saint-aubin-estate/      → Excursion detail
/en/excursions/romantic-dinner-flic-en-flac/      → Excursion detail
/en/excursions/wedding-planner-mauritius/         → Excursion detail
/en/excursions/ile-aux-cerfs-catamaran/           → Excursion detail
/en/excursions/chamarel-seven-colored-earth/      → Excursion detail
/en/services/                                     → Services EN
/en/services/personalized-tours/                  → Specific service
/en/services/event-planning/                      → Specific service
/en/my-story/                                     → Pretty's story EN
/en/contact/                                      → Contact EN
```

**URLs Créole Mauricien :**
```
/mau/                                             → Lakaz kreol
/mau/excursions/                                  → List excursions kreol
/mau/excursions/mahebourg-domaine-saint-aubin/    → Detail excursion
/mau/excursions/dine-romantik-flic-en-flac/       → Detail excursion
/mau/excursions/wedding-planner-moris/            → Detail excursion
/mau/services/                                    → Services kreol
/mau/mo-listwar/                                  → Listwar Pretty kreol
/mau/contact/                                     → Contact kreol
```

### Règles strictes formation URLs

**FORMAT OBLIGATOIRE :**

✅ Correct :
- Lowercase uniquement : `/fr/excursions/` (PAS `/Fr/Excursions/`)
- Tirets pour séparer mots : `-` (PAS `_` underscore)
- Pas de caractères spéciaux : pas d'accents, apostrophes, espaces
- Descriptif et concis : 3-5 mots maximum
- Trailing slash : toujours terminer par `/`
- Cohérent avec titre H1 de la page

❌ Interdits :
- `/fr/excursions/page.php?id=123`
- `/fr/excursions/Mahébourg_Domaine`
- `/fr/excursions/ex1/`
- `/fr/page-2/`
- `/fr/excursions` (sans trailing slash)

**Règles de conversion Titre → URL :**
1. Supprimer tous les accents : é→e, è→e, à→a, ç→c, ô→o
2. Supprimer articles : "le", "la", "les", "à", "de", "des"
3. Remplacer espaces et symboles (+, &, /) par tirets `-`
4. Tout en minuscules
5. Pas de double tiret `--`
6. Terminer par `/`

Exemples :
```
"Mahébourg + Domaine Saint-Aubin"  →  /fr/excursions/mahebourg-domaine-saint-aubin/
"Dîner Romantique à Flic-en-Flac" →  /fr/excursions/diner-romantique-flic-en-flac/
"Île aux Cerfs en Catamaran"       →  /fr/excursions/ile-aux-cerfs-catamaran/
"Wedding Planner à Maurice"        →  /fr/excursions/wedding-planner-maurice/
```

### Balises hreflang (obligatoires)

Sur **chaque page**, inclure les balises hreflang pour toutes les versions linguistiques :

```html
<!-- Exemple : page détail excursion Mahebourg -->
<link rel="alternate" hreflang="fr" href="https://pretty-tours.com/fr/excursions/mahebourg-domaine-saint-aubin/" />
<link rel="alternate" hreflang="en" href="https://pretty-tours.com/en/excursions/mahebourg-saint-aubin-estate/" />
<link rel="alternate" hreflang="mau" href="https://pretty-tours.com/mau/excursions/mahebourg-domaine-saint-aubin/" />
<link rel="alternate" hreflang="x-default" href="https://pretty-tours.com/fr/excursions/mahebourg-domaine-saint-aubin/" />
```

Règles :
- Une balise par langue disponible
- URLs absolues complètes (avec https://)
- `x-default` pointe vers la version FR
- Cohérence totale entre les 3 versions linguistiques

### Canonical URLs

Sur chaque page, déclarer l'URL canonique pour éviter le duplicate content :

```html
<!-- Page FR -->
<link rel="canonical" href="https://pretty-tours.com/fr/excursions/mahebourg-domaine-saint-aubin/" />
```

### Navigation interne (Breadcrumbs)

Implémenter des breadcrumbs sur toutes les pages :

```html
<nav aria-label="Fil d'Ariane" class="breadcrumbs">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/fr/"><span itemprop="name">Accueil</span></a>
      <meta itemprop="position" content="1" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/fr/excursions/"><span itemprop="name">Excursions</span></a>
      <meta itemprop="position" content="2" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Mahebourg + Domaine Saint-Aubin</span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>
```

### Redirections .htaccess (si Apache)

```apache
# Force trailing slash
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ /$1/ [L,R=301]

# Redirect root vers /fr/ par défaut
RewriteRule ^$ /fr/ [R=302,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

---

## STRUCTURE DU SITE

### Page 1 — ACCUEIL / HOME / LAKAZ

- Animation d'entrée immersive "arrivée sur l'île Maurice" (vagues, fade-in cinématique)
- Hero full-screen avec image/vidéo background Maurice
- Headline émotionnel fort
- Section "Qui est Pretty" avec photo + storytelling authentique
- Aperçu Top 3 excursions (cards avec hover effect)
- Section témoignages clients (carousel élégant)
- CTAs WhatsApp multiples et évidents

### Page 2 — EXCURSIONS

- Système de filtres élégant (Toutes / Maritime / Terrestre / Prestations)
- Grille responsive des excursions (cards avec image, titre, durée, prix, badge catégorie)
- **Page détail excursion :**
  - Hero image full-width
  - Titre + description émotionnelle
  - Infos clés (durée, groupe max, niveau, tarif)
  - Section "Points forts" avec icons
  - Itinéraire timeline si applicable
  - Section "Inclus / Non inclus"
  - CTA WhatsApp "Réserver cette excursion" avec message pré-rempli

### Page 3 — SERVICES

- Ce qui différencie Pretty Tours
- Services proposés (personnalisation, flexibilité, Wedding Planner, prestations sur-mesure)
- Pourquoi choisir Pretty (authenticité, passion, connaissance locale)
- Témoignages spécifiques

### Page 4 — CONTACT

- PAS de formulaire (WhatsApp uniquement)
- Gros CTA WhatsApp central
- Infos pratiques : Tel, Email, Zone d'intervention, Langues parlées
- Map interactive Google Maps (position Maurice)

### Page 5 — MON HISTOIRE / MY STORY / MO LISTWAR

- Storytelling ultra-émotionnel de Pretty à la première personne
- Photo personnelle de Pretty
- Narration authentique, touchante, à donner la chair de poule
- Section "Pourquoi nous choisir" intégrée
- Témoignages clients sous forme de lettres ouvertes
- Screenshots de messages WhatsApp testimonials (design WhatsApp officiel)
- Objectif : émouvoir, créer connexion émotionnelle forte, finir en apothéose

---

## WHATSAPP CTAs (OMNIPRÉSENTS)

**Numéro :** +230 5904 2969

**Emplacements obligatoires :**
- Floating button (bottom-right, toujours visible, suit le scroll)
- Header (icône WhatsApp cliquable)
- Hero section de chaque page
- End-of-section après chaque excursion/service
- Page Contact (CTA central énorme)

**Messages pré-remplis contextuels :**

```javascript
// Depuis page Excursions
`https://wa.me/23059042969?text=Bonjour%20Pretty,%20je%20souhaite%20réserver%20l'excursion%20[NOM_EXCURSION]`

// Depuis page Services
`https://wa.me/23059042969?text=Bonjour%20Pretty,%20j'aimerais%20en%20savoir%20plus%20sur%20vos%20services%20personnalisés`

// Depuis page Mon Histoire
`https://wa.me/23059042969?text=Bonjour%20Pretty,%20votre%20histoire%20m'a%20touché(e),%20j'aimerais%20découvrir%20Maurice%20avec%20vous`

// Générique
`https://wa.me/23059042969?text=Bonjour%20Pretty,%20je%20souhaite%20découvrir%20vos%20excursions`
```

---

## SEO — RÈGLES STRICTES

### Meta tags uniques par page/langue

```html
<!-- Exemple Accueil FR -->
<title>Pretty Tours - Guide Touristique Locale à Maurice | Découvrez l'Île Authentique</title>
<meta name="description" content="Découvrez l'île Maurice avec Pretty, guide mauricienne passionnée. Excursions personnalisées, expériences authentiques, storytelling local. Réservez sur WhatsApp.">
<meta name="keywords" content="guide touristique maurice, excursions maurice, pretty tours, guide local mauricien, visiter maurice, tourisme authentique maurice">

<!-- hreflang sur chaque page -->
<link rel="alternate" hreflang="fr" href="https://pretty-tours.com/fr/" />
<link rel="alternate" hreflang="en" href="https://pretty-tours.com/en/" />
<link rel="alternate" hreflang="mau" href="https://pretty-tours.com/mau/" />
<link rel="alternate" hreflang="x-default" href="https://pretty-tours.com/fr/" />
```

### Schema.org (JSON-LD obligatoire)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pretty Tours",
  "description": "Guide touristique locale mauricienne - Excursions personnalisées à Maurice",
  "telephone": "+230-5904-2969",
  "email": "prettytours@outlook.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MU",
    "addressLocality": "Mauritius"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-20.1609",
    "longitude": "57.5012"
  },
  "url": "https://pretty-tours.com",
  "sameAs": ["https://wa.me/23059042969"],
  "priceRange": "€€",
  "founder": {
    "@type": "Person",
    "name": "Pretty",
    "jobTitle": "Guide Touristique",
    "birthPlace": "Île Maurice"
  }
}
```

### Images SEO

- Alt text descriptifs et uniques (jamais "image1.jpg")
- Noms fichiers parlants : `excursion-mahebourg-plage-maurice.webp`
- Format WebP prioritaire + fallback JPG via `<picture>`
- `loading="lazy"` sur toutes les images
- Dimensions explicites (éviter CLS)

### Sitemap.xml multilingue complet

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Accueil FR -->
  <url>
    <loc>https://pretty-tours.com/fr/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://pretty-tours.com/fr/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://pretty-tours.com/en/"/>
    <xhtml:link rel="alternate" hreflang="mau" href="https://pretty-tours.com/mau/"/>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
    <lastmod>2026-04-10</lastmod>
  </url>

  <!-- Liste excursions FR -->
  <url>
    <loc>https://pretty-tours.com/fr/excursions/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://pretty-tours.com/fr/excursions/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://pretty-tours.com/en/excursions/"/>
    <xhtml:link rel="alternate" hreflang="mau" href="https://pretty-tours.com/mau/excursions/"/>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>

  <!-- Détail excursion Mahebourg FR -->
  <url>
    <loc>https://pretty-tours.com/fr/excursions/mahebourg-domaine-saint-aubin/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://pretty-tours.com/fr/excursions/mahebourg-domaine-saint-aubin/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://pretty-tours.com/en/excursions/mahebourg-saint-aubin-estate/"/>
    <xhtml:link rel="alternate" hreflang="mau" href="https://pretty-tours.com/mau/excursions/mahebourg-domaine-saint-aubin/"/>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>

  <!-- ... répéter pour chaque page ... -->

</urlset>
```

**Priorités sitemap :**
- Accueil : `1.0`
- Pages principales (Excursions, Services, Mon Histoire, Contact) : `0.9`
- Pages détail excursions : `0.9`
- Pages détail services : `0.8`

**Fréquence :**
- Accueil + Pages principales : `weekly`
- Pages détail : `monthly`

---

## TON & STYLE DE CONTENU

**Français (vouvoiement professionnel mais chaleureux) :**
- "Découvrez Maurice à travers mes yeux de fille du pays"
- "Je vous partage les secrets de mon île avec passion"
- Émotionnel, storytelling, proximité sans familiarité excessive

**English (warm professional) :**
- "Experience Mauritius through the eyes of a true local"
- "Let me share my island's hidden treasures with you"

**Créole mauricien (authentique) :**
- "Vinn dekouver Moris ek enn dimounn pei"
- "Mo pou montre zot bote mo lezie"

---

## STRUCTURE FICHIERS

```
/pretty-tours/
├── index.html                              (redirect langue navigateur)
├── fr/
│   ├── index.html
│   ├── excursions/
│   │   ├── index.html
│   │   ├── mahebourg-domaine-saint-aubin/index.html
│   │   ├── diner-romantique-flic-en-flac/index.html
│   │   ├── wedding-planner-maurice/index.html
│   │   ├── ile-aux-cerfs-catamaran/index.html
│   │   └── chamarel-terre-sept-couleurs/index.html
│   ├── services/
│   │   ├── index.html
│   │   ├── excursions-personnalisees/index.html
│   │   └── organisation-evenements/index.html
│   ├── mon-histoire/index.html
│   └── contact/index.html
├── en/
│   ├── index.html
│   ├── excursions/
│   │   ├── index.html
│   │   ├── mahebourg-saint-aubin-estate/index.html
│   │   ├── romantic-dinner-flic-en-flac/index.html
│   │   └── wedding-planner-mauritius/index.html
│   ├── services/
│   │   ├── index.html
│   │   ├── personalized-tours/index.html
│   │   └── event-planning/index.html
│   ├── my-story/index.html
│   └── contact/index.html
├── mau/
│   └── [même structure adaptée au créole]
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── animations.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── lang-switcher.js
│   │   ├── animations.js
│   │   ├── whatsapp-cta.js
│   │   └── lazyload.js
│   ├── lang/
│   │   ├── fr.json
│   │   ├── en.json
│   │   └── mau.json
│   ├── images/
│   │   ├── hero/
│   │   ├── excursions/
│   │   ├── testimonials/
│   │   └── icons/
│   └── fonts/
├── sitemap.xml
└── robots.txt
```

---

## CODE — STANDARDS DE QUALITÉ

**CSS :**
- Variables CSS pour TOUT (couleurs, espacements, typos, transitions)
- Naming BEM : `.block__element--modifier`
- Mobile-first media queries
- Pas de `!important` sauf cas extrême justifié
- Grid/Flexbox moderne (pas de float)

**JavaScript :**
- Vanilla JS uniquement (ES6+ OK)
- Code modulaire (fonctions réutilisables)
- Pas de jQuery
- Event delegation pour performance
- Gestion erreurs avec try/catch
- Pas de `console.log` en production

**Accessibilité (WCAG 2.1 AA minimum) :**
- Contraste texte/background >= 4.5:1
- Navigation clavier complète
- ARIA labels sur tous les CTAs
- Alt text sur toutes les images
- Touch targets 44px minimum sur mobile

**Performance :**
- Minification CSS/JS en production
- Lazy loading images
- Defer non-critical JS
- Preload fonts critiques

---

## EXCURSIONS — DONNÉES

**Excursion 1 : Mahebourg + Domaine Saint-Aubin**
- Catégorie : Terrestre | Durée : 6h | Groupe max : 8 personnes
- Tarif : 55€/groupe
- Points forts : Village Mahebourg, Maison coloniale Saint-Aubin, Distillerie rhum artisanal, Vanilleraie, Déjeuner créole
- Itinéraire : 09h00 départ → 10h00 Mahebourg → 11h30 Saint-Aubin → 12h00 distillerie → 13h00 déjeuner → 15h00 retour

**Excursion 2 : Dîner Romantique Flic-en-Flac**
- Catégorie : Prestation | Durée : 3h | Groupe max : 2 personnes
- Tarif : 120€/personne
- Inclus : Table privée plage, menu 4 plats, champagne, décoration romantique, photographe 30min

**Excursion 3 : Wedding Planner**
- Catégorie : Prestation | Groupe max : 100 personnes
- Tarif : Sur devis
- Services : Choix lieu, coordination prestataires, coordination jour J, suivi personnalisé

---

## ÉLÉMENTS RÉCURRENTS

**Header (sticky, toutes pages) :**
- Logo Pretty Tours (gauche)
- Navigation : Accueil / Excursions / Services / Mon Histoire / Contact
- Switcher langue avec drapeaux (droite)
- Icône WhatsApp cliquable (droite)
- Background blanc 95% opacité + blur backdrop
- Shadow douce au scroll

**Footer (toutes pages) :**
- Logo + navigation secondaire
- Contact : Tel, Email, WhatsApp
- Réseaux sociaux si applicable
- `© 2026 Pretty Tours - Tous droits réservés`

**WhatsApp Floating Button :**
- `position: fixed` bottom-right, toujours visible
- Icône WhatsApp officiel vert
- Animation pulse subtile
- Tooltip au hover
- Visible sur toutes pages sauf page Contact

---

## ASSETS

**Logo Pretty Tours :**
- À créer (moderne, élégant, évoque Maurice)
- Versions : couleur / blanc / noir
- SVG vectoriel prioritaire

**Photos :**
- Unsplash queries : "mauritius beach", "tropical island sunset", "turquoise lagoon", "local guide mauritius", "mahebourg village"
- À remplacer par vraies photos Pretty ultérieurement

**Témoignages :**
- Inventer 5-6 témoignages ultra-authentiques et émotionnels
- Noms fictifs mais crédibles (prénoms internationaux)
- Screenshots WhatsApp fictifs mais réalistes (design WhatsApp officiel)

---

## ANIMATION D'ENTRÉE HERO

Concept "Arrivée sur l'île Pretty" :
1. Fond bleu océan fade-in (0.5s)
2. Vagues douces animation SVG (1s)
3. Logo Pretty Tours scale + fade (0.8s)
4. Transition vers hero image (0.8s)
5. Headline slide-up + fade-in (0.6s)

- Skip button discret (éviter frustration)
- Une seule fois par session (localStorage)

---

## DIFFÉRENCIATION ABSOLUE

Ce qui rend Pretty Tours unique (à mettre en avant partout) :
- Guide mauricienne de naissance (authenticité)
- Fille d'un guide-taxi (l'île dans le sang)
- Petits groupes (max 8 pers, proximité)
- Personnalisation totale (pas de circuit usine)
- Storytelling passionné (histoire, anecdotes, secrets)
- Flexibilité horaires (s'adapte au client)
- Langues FR/EN/Créole (communication fluide)
- Bouche-à-oreille 100% (confiance clients)

---

## PRINCIPES DIRECTEURS

1. **Émotion avant information** — Pretty vend de l'émotion, pas juste des excursions
2. **Authenticité absolue** — Pas de bullshit corporate, vraie connexion humaine
3. **SEO = croissance** — Chaque mot, chaque balise compte
4. **WhatsApp = conversion** — Faciliter au maximum le contact direct
5. **Mobile-first** — La plupart des touristes réservent depuis leur smartphone
6. **Storytelling partout** — Transformer chaque section en micro-histoire
7. **ZERO hardcode** — Toutes les données dans les fichiers JSON/config
8. **ZERO framework CSS** — Pas de Tailwind, Bootstrap, etc.
9. **ZERO nouvelle librairie** — GSAP uniquement pour les animations

---

## MISSION CRITIQUE — PSYCHOLOGIE DE CONVERSION

Tu es le meilleur copywriter/designer web spécialisé en tourisme émotionnel. Tu connais Maurice comme ta poche — tu es né là-bas, tu as grandi entre les plages de Flic-en-Flac et les montagnes de Chamarel. Tu as étudié le neuromarketing, la psychologie de la conversion et le storytelling émotionnel.

**OBJECTIF UNIQUE :**
Créer une page d'accueil qui, en 10 secondes de scroll, fait passer un visiteur de "je browse" à "JE DOIS ALLER À MAURICE AVEC PRETTY".

**Résultats attendus :**
- Visiteur sans projet Maurice → décide de partir à Maurice
- Visiteur qui hésite entre guides → choisit Pretty sans réfléchir
- Visiteur déjà conquis → réserve immédiatement sur WhatsApp

### Psychologie du visiteur (à exploiter)

**Premier regard (0-3 secondes) — Cerveau reptilien :**
- Question inconsciente : "Ça vaut le coup de rester ?"
- Besoin : beauté visuelle immédiate + image de rêve + headline qui frappe
- Déclencheur : émotion pure avant tout texte

**Scan rapide (3-10 secondes) — Cerveau limbique :**
- Question : "Qui est cette personne ? Puis-je lui faire confiance ?"
- Besoin : visage humain, authenticité, preuve sociale visible
- Déclencheur : photo de Pretty + une phrase qui crée la connexion

**Lecture attentive (10-30 secondes) — Cortex préfrontal :**
- Questions : "Pourquoi elle ? Qu'est-ce que j'y gagne ? C'est dans mon budget ?"
- Besoin : différenciation claire, bénéfices tangibles, prix affichés
- Déclencheur : les points de différenciation Pretty + témoignages

**Décision (30-60 secondes) — Système de récompense :**
- Question finale : "Comment je réserve MAINTENANT ?"
- Besoin : CTA WhatsApp ultra-évident, friction zéro
- Déclencheur : bouton WhatsApp immédiat, message pré-rempli, sentiment d'urgence douce

### Règles de copywriting émotionnel

- **Jamais "Je propose"** → Toujours "Vous vivrez"
- **Jamais "Excursion de 6h"** → Toujours "6 heures qui vont changer votre regard sur Maurice"
- **Jamais "Guide locale"** → Toujours "Fille de l'île, héritière de ses secrets"
- **Jamais "Contactez-moi"** → Toujours "Écrivez-moi, je réponds en moins d'1h"
- Chaque section doit se terminer par une micro-émotion ou un CTA
- Le lecteur doit se voir dans la scène décrite

## CHECKLIST QUALITE AVANT LIVRAISON

**Code :**
- [ ] HTML valide W3C
- [ ] Aucune erreur console JS
- [ ] Variables CSS utilisées partout (zéro hardcode)

**SEO :**
- [ ] Meta title/description uniques par page
- [ ] Schema.org implémenté (LocalBusiness + BreadcrumbList)
- [ ] Sitemap.xml complet + robots.txt configuré
- [ ] hreflang tags corrects sur toutes les pages
- [ ] Canonical tags sur toutes les pages
- [ ] Alt text sur toutes les images
- [ ] Breadcrumbs Schema.org implémentés

**URLs :**
- [ ] Toutes les URLs en lowercase avec tirets
- [ ] Trailing slash sur toutes les URLs
- [ ] Pas d'accents ni caractères spéciaux
- [ ] Cohérence URLs entre FR/EN/Créole
- [ ] Test 404 : toutes les URLs accessibles
- [ ] Redirections 301 configurées

**Performance :**
- [ ] Lighthouse score > 90
- [ ] Images optimisées WebP + lazy loading
- [ ] Core Web Vitals OK

**Responsive :**
- [ ] Testé mobile 375px, tablet 768px, desktop 1024px+
- [ ] Pas de scroll horizontal
- [ ] Touch targets >= 44px

**Accessibilité :**
- [ ] Navigation clavier OK
- [ ] ARIA labels présents
- [ ] Contraste suffisant (>= 4.5:1)

**Multilingue :**
- [ ] Switch langue fonctionnel (FR/EN/Créole)
- [ ] LocalStorage mémorise le choix
- [ ] Traductions complètes et authentiques

**WhatsApp :**
- [ ] Tous les CTAs WhatsApp fonctionnels avec messages pré-remplis
- [ ] Floating button visible sur toutes les pages sauf Contact
