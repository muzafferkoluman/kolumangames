import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
const en = {
  translation: {
    nav: {
      action: "Action",
      strategy: "Strategy",
      puzzle: "Puzzle",
      search: "Search games..."
    },
    hero: {
      badge: "The Next Generation Gaming Portal",
      title_1: "Discover ",
      title_epic: "Epic",
      title_2: "Worlds & Adventures",
      subtitle: "Welcome to Koluman Games. Experience an exclusive collection of mind-bending puzzles, action-packed adventures, and strategic battles on one platform.",
      playNow: "Play Now",
      exploreCatalog: "Explore Catalog"
    },
    featured: {
      title: "Trending ",
      title_highlight: "Games",
      subtitle: "The most played games on Koluman Games this week.",
      viewAll: "View All",
      active: "Active",
      playNow: "Play Now"
    },
    games: {
      space_war: "Space War",
      online_football: "Online Football",
      neon_runner: "Neon Cyber Runner",
      quantum_chess: "Quantum Chess",
      astro_racers: "Astro Racers Pro",
      categories: {
        action: "Action",
        strategy: "Strategy",
        puzzle: "Puzzle",
        sports: "Sports"
      }
    },
    footer: {
      copyright: "© {{year}} Koluman Games. All rights reserved."
    }
  }
};

// Turkish
const tr = {
  translation: {
    nav: {
      action: "Aksiyon",
      strategy: "Strateji",
      puzzle: "Bulmaca",
      search: "Oyun ara..."
    },
    hero: {
      badge: "Yeni Nesil Oyun Portalı",
      title_1: "Keşfedin: ",
      title_epic: "Epik",
      title_2: "Dünyalar ve Maceralar",
      subtitle: "Koluman Games'e hoş geldiniz. Zihin bükücü bulmacalar, aksiyon dolu maceralar ve stratejik savaşların özel koleksiyonunu tek bir platformda deneyimleyin.",
      playNow: "Hemen Oyna",
      exploreCatalog: "Kataloğu Keşfet"
    },
    featured: {
      title: "Popüler ",
      title_highlight: "Oyunlar",
      subtitle: "Koluman Games'te bu hafta en çok oynanan oyunlar.",
      viewAll: "Tümünü Gör",
      active: "Aktif",
      playNow: "Hemen Oyna"
    },
    games: {
      space_war: "Uzay Savaşı",
      online_football: "Online Futbol",
      neon_runner: "Neon Cyber Runner",
      quantum_chess: "Kuantum Satranç",
      astro_racers: "Astro Yarışçıları",
      categories: {
        action: "Aksiyon",
        strategy: "Strateji",
        puzzle: "Bulmaca",
        sports: "Spor"
      }
    },
    footer: {
      copyright: "© {{year}} Koluman Games. Tüm hakları saklıdır."
    }
  }
};

// Swedish
const sv = {
  translation: {
    nav: {
      action: "Action",
      strategy: "Strategi",
      puzzle: "Pussel",
      search: "Sök spel..."
    },
    hero: {
      badge: "Nästa generations spelportal",
      title_1: "Upptäck ",
      title_epic: "Episka",
      title_2: "Världar & Äventyr",
      subtitle: "Välkommen till Koluman Games. Upplev en exklusiv samling hisnande pussel, actionfyllda äventyr och strategiska strider på en och samma plattform.",
      playNow: "Spela Nu",
      exploreCatalog: "Utforska Katalog"
    },
    featured: {
      title: "Populära ",
      title_highlight: "Spel",
      subtitle: "De mest spelade spelen på Koluman Games denna vecka.",
      viewAll: "Visa Alla",
      active: "Aktiva",
      playNow: "Spela Nu"
    },
    games: {
      space_war: "Rymdkrig",
      online_football: "Online Fotboll",
      neon_runner: "Neon Cyber Runner",
      quantum_chess: "Kvantschack",
      astro_racers: "Astro Racers Pro",
      categories: {
        action: "Action",
        strategy: "Strategi",
        puzzle: "Pussel",
        sports: "Sport"
      }
    },
    footer: {
      copyright: "© {{year}} Koluman Games. Alla rättigheter förbehållna."
    }
  }
};

// German
const de = {
  translation: {
    nav: {
      action: "Action",
      strategy: "Strategie",
      puzzle: "Rätsel",
      search: "Spiele suchen..."
    },
    hero: {
      badge: "Das Gaming-Portal der nächsten Generation",
      title_1: "Entdecke ",
      title_epic: "Epische",
      title_2: "Welten & Abenteuer",
      subtitle: "Willkommen bei Koluman Games. Erlebe eine exklusive Sammlung verrückter Rätsel, actiongeladener Abenteuer und strategischer Schlachten auf einer Plattform.",
      playNow: "Jetzt Spielen",
      exploreCatalog: "Katalog Durchsuchen"
    },
    featured: {
      title: "Angesagte ",
      title_highlight: "Spiele",
      subtitle: "Die meistgespielten Spiele auf Koluman Games diese Woche.",
      viewAll: "Alle Ansehen",
      active: "Aktiv",
      playNow: "Jetzt Spielen"
    },
    games: {
      space_war: "Weltraumkrieg",
      online_football: "Online-Fussball",
      neon_runner: "Neon Cyber Runner",
      quantum_chess: "Quantenschach",
      astro_racers: "Astro Racers Pro",
      categories: {
        action: "Action",
        strategy: "Strategie",
        puzzle: "Rätsel",
        sports: "Sport"
      }
    },
    footer: {
      copyright: "© {{year}} Koluman Games. Alle Rechte vorbehalten."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      tr,
      sv,
      de
    },
    lng: "tr", // Set default to Turkish as user is chatting in TR
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
