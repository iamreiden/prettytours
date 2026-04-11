/**
 * PRETTY TOURS — Configuration Centralisée
 * RÈGLE : Toutes les données du site sont ICI
 * Modifier UNE SEULE FOIS pour mettre à jour partout
 */

const SITE_CONFIG = {
  contact: {
    phone: "+230 5712 3456",
    phoneWhatsApp: "23057123456",
    email: "hello@prettytours.mu",
    address: "Flic-en-Flac, Île Maurice"
  },

  social: {
    instagram: "https://instagram.com/prettytours",
    facebook: "https://facebook.com/prettytours"
  },

  business: {
    name: "Pretty Tours",
    tagline: "Explorez l'Île Maurice Autrement",
    description: "Guide locale certifiée — Excursions intimistes à l'Île Maurice",
    maxGroupSize: 8,
    foundedYear: 2024
  },

  seo: {
    siteName: "Pretty Tours — Excursions Île Maurice",
    domain: "https://prettytours.mu",
    defaultImage: "/assets/og-image.jpg",
    defaultDescription: "Découvrez l'Île Maurice avec une guide locale certifiée. Excursions intimistes max 8 personnes. Réservez votre aventure authentique."
  },

  excursions: [
    {
      id: "ile-aux-cerfs",
      name: "Île aux Cerfs",
      slug: "ile-aux-cerfs",
      tagline: "Paradis Tropical & Plages de Rêve",
      description: "Journée complète sur l'île paradisiaque aux eaux turquoise. Snorkeling, détente et barbecue les pieds dans le sable.",
      duration: 8,
      price: 95,
      priceGroup: 75,
      image: "/assets/excursions/ile-aux-cerfs.jpg",
      imageWebP: "/assets/excursions/ile-aux-cerfs.webp",
      featured: true
    },
    {
      id: "chamarel-7-terres",
      name: "Chamarel & Terres des 7 Couleurs",
      slug: "chamarel-7-terres",
      tagline: "Merveilles Géologiques du Sud",
      description: "Découverte des terres multicolores, cascade de Chamarel et distillerie de rhum. Déjeuner créole inclus.",
      duration: 6,
      price: 85,
      priceGroup: 65,
      image: "/assets/excursions/chamarel.jpg",
      imageWebP: "/assets/excursions/chamarel.webp",
      featured: true
    },
    {
      id: "plongee-recif",
      name: "Plongée Récif Corallien",
      slug: "plongee-recif",
      tagline: "Exploration Sous-Marine",
      description: "Baptême de plongée ou exploration pour certifiés. Découverte de la faune marine exceptionnelle de Maurice.",
      duration: 4,
      price: 120,
      priceGroup: 100,
      image: "/assets/excursions/plongee.jpg",
      imageWebP: "/assets/excursions/plongee.webp",
      featured: false
    },
    {
      id: "catamaran-sunset",
      name: "Catamaran Sunset",
      slug: "catamaran-sunset",
      tagline: "Coucher de Soleil en Mer",
      description: "Croisière romantique en catamaran avec apéritif. Admirez le soleil plonger dans l'océan Indien.",
      duration: 3,
      price: 75,
      priceGroup: 60,
      image: "/assets/excursions/catamaran.jpg",
      imageWebP: "/assets/excursions/catamaran.webp",
      featured: true
    },
    {
      id: "trou-aux-biches",
      name: "Trou aux Biches & Snorkeling",
      slug: "trou-aux-biches",
      tagline: "Plage Idyllique du Nord",
      description: "Journée détente sur l'une des plus belles plages de Maurice. Snorkeling dans les récifs coralliens.",
      duration: 7,
      price: 80,
      priceGroup: 65,
      image: "/assets/excursions/trou-aux-biches.jpg",
      imageWebP: "/assets/excursions/trou-aux-biches.webp",
      featured: false
    },
    {
      id: "trek-montagne",
      name: "Trek Le Morne Brabant",
      slug: "trek-montagne",
      tagline: "Ascension UNESCO Heritage",
      description: "Randonnée guidée au sommet du Morne. Vue panoramique à 360° sur le lagon et l'île entière.",
      duration: 5,
      price: 70,
      priceGroup: 55,
      image: "/assets/excursions/le-morne.jpg",
      imageWebP: "/assets/excursions/le-morne.webp",
      featured: false
    }
  ],

  testimonials: [
    {
      author: "Marie & Thomas",
      location: "Paris, France",
      rating: 5,
      text: "Une expérience inoubliable ! Notre guide connaît chaque recoin de l'île. Authenticité garantie, loin du tourisme de masse.",
      excursion: "Chamarel & Terres des 7 Couleurs"
    },
    {
      author: "Sophie L.",
      location: "Bruxelles, Belgique",
      rating: 5,
      text: "Groupe de 6 personnes, ambiance familiale. Les explications sur la culture mauricienne ont enrichi notre voyage.",
      excursion: "Île aux Cerfs"
    },
    {
      author: "Jean-Marc",
      location: "Genève, Suisse",
      rating: 5,
      text: "Ponctualité, professionnalisme et passion. On sent que notre guide aime vraiment son île. Merci pour ces souvenirs !",
      excursion: "Trek Le Morne Brabant"
    }
  ]
};

function getWhatsAppLink(customMessage = "") {
  const defaultMsg = `Bonjour ${SITE_CONFIG.business.name}, je souhaite des informations sur vos excursions.`;
  const message = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${SITE_CONFIG.contact.phoneWhatsApp}?text=${message}`;
}

function formatPrice(price) {
  return `${price}€`;
}

function getFeaturedExcursions() {
  return SITE_CONFIG.excursions.filter(exc => exc.featured);
}

function getExcursionBySlug(slug) {
  return SITE_CONFIG.excursions.find(exc => exc.slug === slug) || null;
}

// ─── Catalogue complet des excursions ────────────────────────────────────────
// Utilisé par excursions.html uniquement
// RÈGLE : Aucune donnée hardcodée ailleurs

const EXCURSIONS_COMPLETE = {
  maritime: [
    {
      id: 'circuit-sud-ouest',
      name: 'Circuit Sud-Ouest',
      tagline: 'Chamarel, 7 Couleurs, Grand Bassin',
      duration: 8,
      maxPersons: 8,
      price: 65,
      priceGroup: 50,
      image: 'https://images.unsplash.com/photo-1626252617485-c19934efe7f4?w=1200&q=85',
      category: 'terrestre',
      highlights: [
        'Terre des 7 Couleurs',
        'Cascade de Chamarel',
        'Rhumerie de Chamarel (dégustation)',
        'Viewpoint Gorges Rivière Noire',
        'Grand Bassin (Ganga Talao)',
        'Déjeuner créole inclus'
      ],
      itinerary: [
        { time: '08:00', step: 'Départ hôtel' },
        { time: '09:30', step: 'Terres des 7 Couleurs' },
        { time: '10:30', step: 'Cascade de Chamarel' },
        { time: '11:30', step: 'Rhumerie (dégustation)' },
        { time: '13:00', step: 'Déjeuner créole' },
        { time: '14:30', step: 'Viewpoint Gorges' },
        { time: '15:30', step: 'Grand Bassin' },
        { time: '17:00', step: 'Retour hôtel' }
      ],
      included: ['Transport privé', 'Guide francophone', 'Entrées sites', 'Déjeuner'],
      notIncluded: ['Boissons alcoolisées', 'Achats personnels'],
      difficulty: 'facile'
    },
    {
      id: '5-iles',
      name: '5 Îles du Nord',
      tagline: 'Îlot Gabriel, Île Plate, Coin de Mire',
      duration: 8,
      maxPersons: 8,
      price: 75,
      priceGroup: 60,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85',
      category: 'maritime',
      highlights: [
        'Eau la plus cristalline de Maurice',
        'Îlot Gabriel (plage paradisiaque)',
        'Île Plate (snorkeling)',
        'Passage Coin de Mire',
        'BBQ sur l\'île',
        'Open bar (rhum, bière, softs)'
      ],
      itinerary: [
        { time: '08:30', step: 'Départ Grand Baie en speed-boat' },
        { time: '09:30', step: 'Snorkeling Île Plate' },
        { time: '11:00', step: 'Îlot Gabriel — détente plage' },
        { time: '13:00', step: 'BBQ sur l\'île' },
        { time: '14:30', step: 'Passage Coin de Mire (photo)' },
        { time: '15:30', step: 'Snorkeling final' },
        { time: '16:30', step: 'Retour Grand Baie' }
      ],
      included: ['Speed-boat', 'Équipement snorkeling', 'BBQ', 'Open bar'],
      notIncluded: ['Transport hôtel–marina'],
      difficulty: 'facile'
    },
    {
      id: 'port-louis-nord',
      name: 'Port Louis & le Nord',
      tagline: 'Capitale, Jardin Pamplemousses, Cap Malheureux',
      duration: 7,
      maxPersons: 8,
      price: 60,
      priceGroup: 45,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85',
      category: 'terrestre',
      highlights: [
        'Jardin Botanique Pamplemousses (nénuphars géants)',
        'Port-Louis : Marché Central, Caudan Waterfront',
        'Fort Adélaïde (vue panoramique)',
        'Cap Malheureux : Église au toit rouge',
        'Déjeuner local'
      ],
      itinerary: [
        { time: '08:00', step: 'Départ hôtel' },
        { time: '09:00', step: 'Jardin Pamplemousses' },
        { time: '11:00', step: 'Port-Louis : Marché Central' },
        { time: '12:00', step: 'Fort Adélaïde' },
        { time: '13:00', step: 'Déjeuner Caudan' },
        { time: '14:30', step: 'Cap Malheureux' },
        { time: '16:00', step: 'Retour hôtel' }
      ],
      included: ['Transport privé', 'Guide', 'Entrées', 'Déjeuner'],
      notIncluded: ['Achats marché'],
      difficulty: 'facile'
    },
    {
      id: 'mahebourg-saint-aubin',
      name: 'Mahebourg + Domaine Saint-Aubin',
      tagline: 'Sud authentique, maison coloniale, rhum',
      duration: 6,
      maxPersons: 8,
      price: 55,
      priceGroup: 40,
      image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=85',
      category: 'terrestre',
      highlights: [
        'Village Mahebourg (histoire navale)',
        'Domaine Saint-Aubin (maison coloniale)',
        'Distillerie de rhum artisanal',
        'Vanilleraie',
        'Déjeuner créole au domaine'
      ],
      itinerary: [
        { time: '09:00', step: 'Départ hôtel' },
        { time: '10:00', step: 'Mahebourg village' },
        { time: '11:30', step: 'Domaine Saint-Aubin' },
        { time: '12:00', step: 'Visite distillerie' },
        { time: '13:00', step: 'Déjeuner au domaine' },
        { time: '14:30', step: 'Vanilleraie' },
        { time: '15:30', step: 'Retour hôtel' }
      ],
      included: ['Transport', 'Guide', 'Dégustation rhum', 'Déjeuner'],
      notIncluded: ['Achats boutique'],
      difficulty: 'facile'
    }
  ],

  prestations: [
    {
      id: 'diner-flic-en-flac',
      name: 'Dîner Romantique Flic-en-Flac',
      tagline: 'Coucher de soleil, pieds dans le sable',
      duration: 3,
      maxPersons: 2,
      price: 120,
      pricePerPerson: true,
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=85',
      category: 'prestation',
      highlights: [
        'Table privée sur la plage',
        'Menu gastronomique 4 plats',
        'Champagne',
        'Coucher de soleil',
        'Musicien (optionnel +30€)'
      ],
      itinerary: null,
      included: ['Repas complet', 'Champagne', 'Service', 'Décoration table'],
      notIncluded: ['Transport', 'Musicien'],
      difficulty: 'romantique'
    },
    {
      id: 'wedding-planner',
      name: 'Wedding Planner',
      tagline: 'Organisation mariage clé en main',
      duration: null,
      maxPersons: 100,
      price: 'Sur devis',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85',
      category: 'prestation',
      highlights: [
        'Choix du lieu (plage, hôtel, domaine)',
        'Coordination prestataires',
        'Décoration florale',
        'Photographe & Vidéaste',
        'Traiteur',
        'Musique / DJ',
        'Légalisation du mariage'
      ],
      itinerary: null,
      included: ['Coordination complète', 'Suivi personnalisé'],
      notIncluded: ['Prestataires (facturés séparément)'],
      difficulty: 'sur-mesure'
    },
    {
      id: 'demande-mariage',
      name: 'Demande en Mariage',
      tagline: 'Moment inoubliable sur la plage',
      duration: 2,
      maxPersons: 2,
      price: 200,
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf80d3e609?w=1200&q=85',
      category: 'prestation',
      highlights: [
        'Décoration plage (arche florale)',
        'Chemin de pétales',
        'Champagne + fraises',
        'Photographe inclus',
        'Musicien (optionnel)',
        'Vidéo drone (optionnel +50€)'
      ],
      itinerary: null,
      included: ['Décoration', 'Champagne', 'Photos'],
      notIncluded: ['Vidéo drone', 'Musicien'],
      difficulty: 'romantique'
    },
    {
      id: 'anniversaire-sega',
      name: 'Anniversaire Ambiance Séga',
      tagline: 'Fête mauricienne authentique sur la plage',
      duration: 4,
      maxPersons: 20,
      price: 'Sur devis',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=85',
      category: 'prestation',
      highlights: [
        'Groupe Séga traditionnel',
        'Danseurs en costumes',
        'BBQ mauricien',
        'Bar à rhum arrangé',
        'Décoration plage',
        'Gâteau personnalisé'
      ],
      itinerary: null,
      included: ['Groupe Séga', 'BBQ', 'Décoration'],
      notIncluded: ['Transport des invités'],
      difficulty: 'festif'
    }
  ]
};

function getAllExcursions() {
  return EXCURSIONS_COMPLETE.maritime.concat(EXCURSIONS_COMPLETE.prestations);
}

function getExcursionById(id) {
  return getAllExcursions().find(exc => exc.id === id) || null;
}

function formatPriceExc(price) {
  return typeof price === 'number' ? price + '€' : price;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SITE_CONFIG, EXCURSIONS_COMPLETE,
    getWhatsAppLink, formatPrice, formatPriceExc,
    getFeaturedExcursions, getExcursionBySlug,
    getAllExcursions, getExcursionById
  };
}
