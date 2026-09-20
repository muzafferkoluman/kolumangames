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
      playNow: "Play Now",
      comingSoon: "Coming Soon",
      newRelease: "Featured release"
    },
    games: {
      space_war: "Space War",
      space_war_description: "Battle enemy fleets in deep space, dodge asteroid storms, and defend the galaxy.",
      valendor: "Valendor",
      valendor_description: "Build your kingdom, command your army, and fight for glory.",
      online_football: "Online Football",
      online_football_description: "Showcase your football skills against online opponents and rise to the championship.",
      cyber_escape: "Cyber Escape",
      cyber_escape_description: "Navigate high-speed neon highways, dodge security barriers, and escape the grid.",
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
      playNow: "Hemen Oyna",
      comingSoon: "Yakında",
      newRelease: "Öne çıkan sürüm"
    },
    games: {
      space_war: "Uzay Savaşı",
      space_war_description: "Derin uzayda düşman filolarına karşı savaşın, asteroit fırtınalarını aşın ve galaksiyi savunun.",
      valendor: "Valendor",
      valendor_description: "Krallığını kur, orduna komuta et ve zafer için savaş.",
      online_football: "Online Futbol",
      online_football_description: "Çevrimiçi rakiplere karşı futbol yeteneklerinizi sergileyin ve şampiyonluğa ulaşın.",
      cyber_escape: "Cyber Escape",
      cyber_escape_description: "Yüksek hızlı neon otoyolda güvenlik bariyerlerini aş, çekirdekleri topla ve kaç!",
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
      playNow: "Spela Nu",
      comingSoon: "Kommer Snart",
      newRelease: "Utvald release"
    },
    games: {
      space_war: "Rymdkrig",
      space_war_description: "Kämpa mot fiendeflottor i djupa rymden, undvik asteroidstormar och försvara galaxen.",
      valendor: "Valendor",
      valendor_description: "Bygg ditt kungarike, led din armé och kämpa för ära.",
      online_football: "Online Fotboll",
      online_football_description: "Visa dina fotbollskunskaper mot online-motståndare och nå mästerskapet.",
      cyber_escape: "Cyber Escape",
      cyber_escape_description: "Navigera i neonupplysta motorvägar, undvik säkerhetsbarriärer och fly systemet.",
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
      playNow: "Jetzt Spielen",
      comingSoon: "Demnachäst",
      newRelease: "Ausgewählte Veröffentlichung"
    },
    games: {
      space_war: "Weltraumkrieg",
      space_war_description: "Kämpfe gegen feindliche Flotten in den Weiten des Alls und verteidige die Galaxie.",
      valendor: "Valendor",
      valendor_description: "Baue dein Königreich, führe deine Armee und kämpfe um Ruhm.",
      online_football: "Online-Fussball",
      online_football_description: "Zeige dein fußballerisches Können gegen Online-Gegner und hol dir den Meistertitel.",
      cyber_escape: "Cyber Escape",
      cyber_escape_description: "Rase über Neon-Highways, weiche Sicherheitsbarrieren aus und entkomme dem Raster.",
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
