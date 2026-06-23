export type Video = {
  id: string;
  title: string;
  subheadline: string;
  src: string;
  thumb: string;
};

export const VIDEOS: Video[] = [
  {
    id: "jak-vznika-cena",
    title: "Jak vzniká cena elektřiny na denním trhu?",
    subheadline: "Princip burzy OTE a tvorby cen elektřiny – základ pro vysvětlení SPOT tarifu zákazníkovi.",
    src: "/videos/jak-vznika-cena.mp4",
    thumb: "/videos/thumb-jak-vznika-cena.jpg",
  },
  {
    id: "fix-vs-spot",
    title: "FIX vs. SPOT",
    subheadline: "Rozdíl mezi fixní a spotovou cenou elektřiny – kdy doporučit který tarif a proč.",
    src: "/videos/fix-vs-spot.mp4",
    thumb: "/videos/thumb-fix-vs-spot.jpg",
  },
  {
    id: "fix-vs-spot-vykup",
    title: "FIX vs. SPOT Výkup",
    subheadline: "Srovnání výkupních tarifů pro FVE přetoky – fixní výkupní cena oproti spotovému výkupu.",
    src: "/videos/fix-vs-spot-vykup.mp4",
    thumb: "/videos/thumb-fix-vs-spot-vykup.jpg",
  },
  {
    id: "nulova-a-zaporne-ceny",
    title: "Nulové a záporné ceny",
    subheadline: "Proč se na trhu objevují nulové a záporné ceny elektřiny a co to znamená pro výkup FVE.",
    src: "/videos/nulova-a-zaporne-ceny.mp4",
    thumb: "/videos/thumb-nulova-a-zaporne-ceny.jpg",
  },
  {
    id: "odchylka-a-rezervni-vykon",
    title: "Odchylka a rezervní výkon",
    subheadline: "Co je odchylka v energetice a jak souvisí s rezervním výkonem v elektrické síti.",
    src: "/videos/odchylka-a-rezervni-vykon.mp4",
    thumb: "/videos/thumb-odchylka-a-rezervni-vykon.jpg",
  },
];

export const VIDEOS_BY_ID = Object.fromEntries(VIDEOS.map(v => [v.id, v]));
