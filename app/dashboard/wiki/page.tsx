"use client";
import { useState, useMemo } from "react";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type Category = "Produkt" | "Distribuce" | "SOP" | "Retence" | "Pojmy";

type Article = {
  id: string;
  title: string;
  category: Category;
  tags: string[];
  body: string;
};

const CAT_COLOR: Record<Category, string> = {
  Produkt: "bg-[#D7FF00] text-[#0D3D34]",
  Distribuce: "bg-[#EBF7F1] text-[#1A6B5A]",
  SOP: "bg-[#0D3D34] text-white",
  Retence: "bg-orange-100 text-orange-800",
  Pojmy: "bg-blue-50 text-blue-800",
};

const ARTICLES: Article[] = [
  {
    id: "home-fix-12-el",
    title: "HOME FIX 12 – elektřina",
    category: "Produkt",
    tags: ["home fix 12", "elektrina", "fixni tarif", "domacnosti", "12 mesicu", "kratka vazanost"],
    body: `Cena s DPH: 3 084,29 Kč/MWh
Cena bez DPH: 2 549,00 Kč/MWh
Paušál: 156,09 Kč/měsíc s DPH
Vázanost: 12 měsíců
Segment: domácnosti (D-sazby)

Nejkratší závazek v nabídce. Vhodné pro zákazníky, kteří chtějí flexibilitu nebo nechtějí dlouhý závazek.
Po 12 měsících mohou odejít bez sankce nebo přejít na delší fixaci.

Kdy nabídnout: zákazník váhá kvůli závazku, zákazník testuje Tramaco poprvé.`,
  },
  {
    id: "home-fix-24-el",
    title: "HOME FIX 24 – elektřina",
    category: "Produkt",
    tags: ["home fix 24", "elektrina", "fixni tarif", "domacnosti", "24 mesicu", "doporuceny", "oblibeny"],
    body: `Cena s DPH: 2 842,29 Kč/MWh
Cena bez DPH: 2 349,00 Kč/MWh
Paušál: 180,29 Kč/měsíc s DPH
Vázanost: 24 měsíců
Segment: domácnosti (D-sazby)

⭐ DOPORUČENÝ produkt – nejlepší poměr cena vs. délka závazku. Nejoblíbenější produkt Tramaco.

Klíčový argument: "Na FIXu máte garantovanou cenu po celou dobu smlouvy – nezávisle na tom, co se děje na burze."

Kdy nabídnout: zákazník chce jistotu, nechce sledovat burzu, domácnost s průměrnou spotřebou.`,
  },
  {
    id: "home-fix-36-el",
    title: "HOME FIX 36 – elektřina",
    category: "Produkt",
    tags: ["home fix 36", "elektrina", "fixni tarif", "domacnosti", "36 mesicu", "nejlevnejsi komodita"],
    body: `Cena s DPH: 2 781,79 Kč/MWh
Cena bez DPH: 2 299,00 Kč/MWh
Paušál: 180,29 Kč/měsíc s DPH
Vázanost: 36 měsíců
Segment: domácnosti (D-sazby)

Nejnižší cena komodity ze všech HOME FIX variant. Zákazník přijímá 3letý závazek za nejnižší fixní cenu.

Kdy nabídnout: zákazník chce maximální úsporu a nevadí mu delší závazek.`,
  },
  {
    id: "expert-fix-24-el",
    title: "EXPERT FIX 24 – elektřina pro firmy",
    category: "Produkt",
    tags: ["expert fix", "firmy", "podnikatele", "C-sazby", "24 mesicu", "elektrina", "SME", "ico"],
    body: `Cena s DPH: 2 963,29 Kč/MWh
Cena bez DPH: 2 449,00 Kč/MWh
Paušál: 180,29 Kč/měsíc s DPH
Vázanost: 24 měsíců
Segment: firmy a podnikatelé (C-sazby)

Produkt pro firemní odběrná místa s C-sazbou distributora. Garantovaná cena, předvídatelný účet.

Zákazník s D-sazbou → HOME FIX. Zákazník s C-sazbou (IČO) → EXPERT FIX.`,
  },
  {
    id: "spot-tarif",
    title: "SPOT tarif – elektřina",
    category: "Produkt",
    tags: ["spot", "burzovni cena", "OTE", "flexibilni", "AMM", "smart metr", "elektromobil", "FVE baterie"],
    body: `Cena: kopíruje hodinové burzové ceny OTE (mění se každou hodinu)
Podmínka: nutný smart metr AMM (automatické měření)
Segment: domácnosti s flexibilní spotřebou

Výhodný, když zákazník přesouvá spotřebu do levných hodin nebo má FVE/baterii.

RIZIKO: při vysokých burzovních cenách může výrazně zdražit.

Kdy nabídnout: elektromobil + nabíjení v noci, FVE nebo baterie, zákazník sleduje ceny.
Kdy NENABÍZET: zákazník chce jistotu, nemá AMM metr, nemá flexibilní spotřebu.`,
  },
  {
    id: "home-spot",
    title: "HOME SPOT – spotový tarif elektřina",
    category: "Produkt",
    tags: ["home spot", "spot", "burzovni cena", "OTE", "fotovoltaika", "flexibilni spotreba", "99 kc"],
    body: `Cena: spotová cena OTE + 349 Kč/MWh bez DPH (přirážka)
Měsíční poplatek: 99 Kč bez DPH
Podmínka: nutný smart metr AMM

Cena elektřiny se mění podle aktuálního trhu OTE – každou hodinu jiná. Vhodné pro zákazníky, kteří mají fotovoltaiku nebo dokáží přizpůsobit spotřebu levným hodinám.

Plusy: cena odpovídá trhu, může být výhodné v levných hodinách, vhodné s FVE.
Mínusy: nutnost hlídat ceny, vyšší riziko výkyvů, nemožnost zachytit všechny levné hodiny.

Kdy nabídnout: zákazník má FVE nebo flexibilní spotřebu a chápe princip trhu.
Kdy NENABÍZET: zákazník chce jistotu, nemá AMM metr.`,
  },
  {
    id: "home-electree-drive",
    title: "HOME ELECTREE DRIVE – tarif pro elektromobily",
    category: "Produkt",
    tags: ["electree drive", "elektromobil", "nabijeni", "spot", "automaticke rizeni", "chytre nabijeni", "EV"],
    body: `Cena: spotová cena OTE + 319 Kč/MWh bez DPH (nižší přirážka než HOME SPOT)
Měsíční poplatek: 130 Kč bez DPH
Určeno pro: majitele elektromobilů

Automatické řízení spotřeby přes aplikaci Electree Connect. Nabíjení probíhá automaticky v nejlevnějších hodinách – zákazník nemusí sledovat trh ručně. Možnost nabíjet i při záporných cenách.

Plusy: nižší přirážka než HOME SPOT, automatické řízení, přehled v aplikaci, ideální pro EV.
Mínusy: stále spotový produkt, největší smysl má jen při skutečném využití chytrého nabíjení.

Kdy nabídnout: zákazník má elektromobil a chce optimalizovat náklady na nabíjení.`,
  },
  {
    id: "solar-spot-free",
    title: "HOME SOLAR SPOT FREE – spotový výkup FVE",
    category: "Produkt",
    tags: ["solar spot free", "FVE", "vykup", "spot", "bez srazky", "do 5 MWh"],
    body: `Výkupní cena: čistá spotová cena OTE bez srážky
Limit přetoků: do 5 MWh ročně
Měsíční poplatek: 199 Kč bez DPH
Závazek: na dobu neurčitou

Zákazník prodává přetoky za aktuální tržní cenu bez přirážky ani srážky. Cena se mění podle trhu.

Plusy: čistá spotová cena bez srážky, jednoduché.
Mínusy: příjem kolísá, bez ochrany před zápornými cenami.

Kdy nabídnout: zákazník s nižšími přetoky (do 5 MWh/rok) chce jet podle trhu.`,
  },
  {
    id: "solar-spot",
    title: "HOME SOLAR SPOT – spotový výkup FVE",
    category: "Produkt",
    tags: ["solar spot", "FVE", "vykup", "spot", "do 15 MWh", "15 minut"],
    body: `Výkupní cena: spotová cena OTE − 390 Kč/MWh bez DPH (srážka)
Limit přetoků: do 15 MWh ročně
Měsíční poplatek: 99 Kč bez DPH
Cena se mění každých 15 minut.

Pozor: nutnost hlídat ceny na trhu, vyšší riziko výkyvů příjmů, bez ochrany před zápornými cenami.

Kdy nabídnout: zákazník rozumí spotovému modelu a chce výkup do 15 MWh ročně.`,
  },
  {
    id: "solar-spot-free-maxi",
    title: "HOME SOLAR SPOT FREE MAXI – spotový výkup FVE (velký)",
    category: "Produkt",
    tags: ["solar spot free maxi", "FVE", "vykup", "spot", "nad 5 MWh", "velka vyroba"],
    body: `Výkupní cena: čistá spotová cena OTE bez srážky
Limit přetoků: nad 5 MWh ročně
Měsíční poplatek: 299 Kč bez DPH
Závazek: na dobu neurčitou

Pro zákazníky s vyššími přetoky, kteří chtějí spotový výkup bez srážky.

Plusy: čistá spotová cena bez srážky, pro větší výrobu.
Mínusy: příjem kolísá, vyšší poplatek.

Kdy nabídnout: zákazník s vyššími přetoky (nad 5 MWh/rok) chce spotový model.`,
  },
  {
    id: "plyn-fix-12",
    title: "HOME FIX plyn 12",
    category: "Produkt",
    tags: ["plyn", "home fix 12", "fixni", "zemni plyn", "domacnosti", "kratka vazanost", "12 mesicu"],
    body: `Cena s DPH: 1 632,29 Kč/MWh
Cena bez DPH: 1 349,00 Kč/MWh
Paušál: 156,09 Kč/měsíc s DPH
Vázanost: 12 měsíců

Nejkratší závazek pro plyn. Vyšší cena komodity oproti 24M a 36M variantám.

Kdy nabídnout: zákazník si není jistý, chce nejdříve vyzkoušet Tramaco na krátkou dobu.`,
  },
  {
    id: "plyn-fix-24",
    title: "HOME FIX plyn 24",
    category: "Produkt",
    tags: ["plyn", "home fix 24", "fixni", "zemni plyn", "domacnosti", "doporuceny", "24 mesicu"],
    body: `Cena s DPH: 1 571,79 Kč/MWh
Cena bez DPH: 1 299,00 Kč/MWh
Paušál: 180,29 Kč/měsíc s DPH
Vázanost: 24 měsíců

⭐ DOPORUČENÝ produkt pro plyn. Nejlepší poměr cena vs. závazek.

Cross-sell: zákazník má elektřinu u Electree → nabídni i plyn. "Máme výhodné podmínky i na plyn, vše v jedné smlouvě."

Distributoři: GasNet (sever a střed ČR), Gas Distribution (jih ČR), Pražská plynárenská (Praha).`,
  },
  {
    id: "plyn-fix-36",
    title: "HOME FIX plyn 36",
    category: "Produkt",
    tags: ["plyn", "home fix 36", "fixni", "zemni plyn", "domacnosti", "36 mesicu"],
    body: `Cena s DPH: 1 571,79 Kč/MWh (stejná jako HOME FIX plyn 24!)
Cena bez DPH: 1 299,00 Kč/MWh
Paušál: 180,29 Kč/měsíc s DPH
Vázanost: 36 měsíců

POZOR: cena komodity je totožná s HOME FIX plyn 24. Liší se pouze délkou závazku.

Kdy nabídnout: zákazník chce maximální jistotu na nejdelší dobu a nevadí mu 3letý závazek.`,
  },
  {
    id: "solar-fix-mini",
    title: "Home Solar FIX MINI – výkup FVE",
    category: "Produkt",
    tags: ["solar", "FVE", "vykup", "fotovoltaika", "mini", "do 1 MWh", "mala vyroba", "balkon"],
    body: `Výkupní cena: 1 000 Kč/MWh
Limit výroby: do 1 MWh/rok
Administrativní paušál: 39 Kč/měsíc
Podmínka: zákazník musí mít zároveň odběr elektřiny u Tramaco

Nejvyšší výkupní cena, nejnižší limit. Pro velmi malé FVE nebo balkónové elektrárny.

Pokud výroba nestačí na pokrytí paušálu → pohledávka přechází do dalšího měsíce. Zákazník nikdy nedostane zápornou fakturu.`,
  },
  {
    id: "solar-fix",
    title: "Home Solar FIX – výkup FVE",
    category: "Produkt",
    tags: ["solar", "FVE", "vykup", "fotovoltaika", "standard", "do 10 MWh", "rodinny dum"],
    body: `Výkupní cena: 500 Kč/MWh
Limit výroby: do 10 MWh/rok
Administrativní paušál: 59 Kč/měsíc

⭐ NEJPOPULÁRNĚJŠÍ výkupní produkt. Ideální pro standardní střešní FVE na rodinném domě (3–10 kWp).

Pokud výroba nestačí na pokrytí paušálu → pohledávka přechází do dalšího měsíce.`,
  },
  {
    id: "solar-fix-maxi",
    title: "Home Solar FIX MAXI – výkup FVE",
    category: "Produkt",
    tags: ["solar", "FVE", "vykup", "fotovoltaika", "maxi", "nad 10 MWh", "velka vyroba", "komercni"],
    body: `Výkupní cena: 400 Kč/MWh
Limit výroby: nad 10 MWh/rok
Administrativní paušál: 99 Kč/měsíc

Pro velké FVE s vysokou výrobou – zemědělské areály, komerční budovy, větší instalace.

Pokud výroba nestačí na pokrytí paušálu → pohledávka přechází do dalšího měsíce.`,
  },
  {
    id: "solar-free-plus",
    title: "Solar FREE / Solar PLUS – výkup s chytrým řízením",
    category: "Produkt",
    tags: ["solar free", "solar plus", "FVE", "vykup", "chytre rizeni", "electree pulse", "baterie", "vzorec", "prepocet"],
    body: `Pokud zákazník NEMÁ a NECHCE chytré řízení → nabízíme klasický Solar FIX (MINI/standard/MAXI dle MWh/rok).

Pokud zákazník chytré řízení MÁ nebo si VEZME naše (Electree Pulse) → nabízíme jiný ceník dle velikosti FVE:
• Solar FREE – roční přetoky cca 4–10 MWh
• Solar PLUS – mimo toto rozpětí (méně i více)

Vzoreček pro přibližný výpočet přetoků (MWh/rok):
(velikost baterie v kWh × 180 − velikost FVE v kWp × 1 000) ÷ 2 = záporné číslo, jehož absolutní hodnota je odhad přetoků.

Příklad: baterie 10 kWh, FVE 10 kWp → (10×180 − 10×1000) ÷ 2 = −4 100 → cca 4,1 MWh/rok → Solar FREE.

Když zákazník přechází od jiného obchodníka, poprosíme o sdělení, kolik přetoků za rok reálně dodal do sítě, a podle toho propočítáme všechny ceníky (kalkulačka výpočtu přetoků).

Pokud jde o 1. smlouvu na výkup, zjistíme, zda zákazník chytré řízení má. Pokud ne, nabídneme naše (Electree Pulse). Pokud o chytré řízení nemá zájem, nabídneme FIX.`,
  },
  {
    id: "fve-caste-otazky",
    title: "FVE – licence, výkon, paušál a časté problémy",
    category: "Pojmy",
    tags: ["FVE", "licence", "ERU", "instalovany vykon", "rezervovany vykon", "administrativni pausal", "baterie", "technicky problem", "zaporna cena", "pretok", "1.8.2025"],
    body: `Licence: nad 100 kWp musí zákazník požádat o licenci na ERÚ. Na základě toho mu Electree pošle žádost a nachystá smlouvu.

Navýšení FVE: zákazník musí nejprve zažádat na distribuci a pak nám poslat novou smlouvu o připojení.

Instalovaný výkon vs. rezervovaný výkon: instalovaný výkon = velikost FVE. Rezervovaný výkon určuje distributor podle volné kapacity sítě – zákazník ho nesmí překročit, jinak je pokutován distribucí (pokuta se promítá do faktury na dodávku elektřiny).

Administrativní paušál: obchodní část ceny, kterou si obchodník volí sám. Kryje odpovědnost za odchylku (platby na distribuci) a administrativu. Platí se měsíčně dle cyklu fakturace. Pokud výroba nestačí na pokrytí paušálu, pohledávka přechází do dalšího měsíce – zákazník nikdy nedostane zápornou fakturu.

FVE + baterie: pro zákazníka výhodnější – přes den ukládá vyrobenou elektřinu do baterie a večer ji čerpá zpět, místo odběru ze sítě.

Jak zjistí, kolik vyrobil: v aplikaci, na faktuře/přehledu výkupu, na FVE nebo na elektroměru.

Technický problém FVE (oprava střechy, požár, demolice): potřebujeme doklad nebo čestné prohlášení. Lze nabídnout zrušení administrativního paušálu po dobu opravy, případně po doložení dokladů smlouvu ukončit.

PŘETOK = elektřina odeslaná do sítě, kterou FVE vyrobí a zákazník v domácnosti nespotřebuje. Nulový přetok nastává, když zákazník vše ihned spotřebuje nebo má 0 rezervovaného výkonu.

Záporné ceny: cena na spotu se mění každou hodinu dle situace na trhu – v přetížené síti a ve špičkách (poledne, víkend) může klesnout do záporu. Řešení: sledovat ceny na OTE / v aplikaci Electree Elis, manuálně vypnout přetoky, nainstalovat chytré řízení Electree Pulse, nebo nabídnout Fixovaný produkt.

Od 1. 8. 2025 musí být všechny FVE zasmluvněné – jinak neoprávněně posílají do sítě a hrozí pokuta ze strany distribuce.`,
  },
  {
    id: "sop-ukonceni-prepis-prehled",
    title: "SOP: Ukončení a přepis odběru – přehled situací",
    category: "SOP",
    tags: ["SOP", "ukonceni", "prepis", "stehovani", "umrti", "dedictvi", "vypoved z bytu", "reklamace", "zpetvzeti vypovedi", "FVE"],
    body: `Ukončení výkupu z důvodu stěhování (FVE), nový majitel jde k jinému obchodníkovi: žádost o ukončení, doklad o prodeji nemovitosti, výpis z katastru, předávací protokol. Nový vlastník MUSÍ uzavřít vlastní smlouvu na výkup – jinak hrozí pokuty. Ideálně řešit 11 dní předem.

Přepis FVE na nového zákazníka (dodavatel zůstává): žádost o přepis + doklad (kupní/nájemní smlouva, potvrzení o vlastnictví). Jen změna jména, dodavatel se nemění.

Úmrtí vlastníka FVE – ukončení: úmrtní list + žádost o ukončení. Dědic může pokračovat (pak je to přepis), nebo smlouvu ukončit.

Úmrtí vlastníka FVE – přepis na dědice: žádost o přepis, úmrtní list, doklad o vztahu k nemovitosti.

Výpověď z bytu (nájemce dostal výpověď): žádost o ukončení dohodou e-mailem + přiložená výpověď z nájmu. Ukončení bez pokut.

Ukončení dohodou (odstěhování, vyhoření, prodej domu/bytu): žádost o ukončení + doložení důvodu (čestné prohlášení, kupní smlouva atd.). Bez sankcí.

Přepis se změnou dodavatele (z původního na nás): žádost o přepis, nájemní/kupní smlouva, poslední faktura, výpis z katastru (+ úmrtní list při úmrtí), kdo byl původní obchodník a do kdy, PM původního zákazníka.

Přepis bez změny dodavatele (stěhování, dodavatel zůstává): žádost o přepis, čestné prohlášení, smlouva (nájemní/kupní), stavy elektroměrů, PM původního zákazníka.

Úmrtí odběratele elektřiny/plynu: úmrtní list, čestné prohlášení, stavy měřidel – nutné nahlásit, aby nevznikl neoprávněný odběr.

Zpětvzetí výpovědi: zákazník má již ukončenou smlouvu a rozhodl se zůstat. Potřeba formulář zpětvzetí výpovědi + PM. Vždy se zeptat, zda už nepodepsal smlouvu jinde.

Reklamace (odečet na faktuře): formulář reklamace + fotky měřidla. Podává se na DSO (distributora).`,
  },
  {
    id: "zkratky-prehled",
    title: "Zkratky – rychlý přehled",
    category: "Pojmy",
    tags: ["zkratky", "EDC", "ERU", "OM", "PM", "UL", "ZK", "ZS", "ZD", "DR", "RZ", "CP", "RS", "MOO", "MOP", "SoP", "VOP", "EP", "OTE", "HDO", "LDS", "DSO", "DIP", "DPI", "FVE", "POZE", "PPP", "NMT", "NN", "VN"],
    body: `EDC – energetické datové centrum
ERÚ – energetický regulační úřad
OM – odběrné místo
PM – plná moc
ÚL – úmrtní list
ZK – zákazník
ZS – změna sazby
ZD – změna dodavatele
DŘ – dědické řízení
RZ – revizní zpráva
ČP – čestné prohlášení
RS – rámcová smlouva
MOO – maloodběr obyvatelstvo/domácnost
MOP – maloodběr podnikatel
SoP – smlouva o připojení
VOP – veřejné obchodní podmínky
EP – Electree Pulse (chytré řízení)
OTE – operátor trhu s energiemi
HDO – přepínač vysokého a nízkého tarifu
LDS – lokální distributor
DSO – distributor
DIP – distribuční portál
DPI – dodavatel poslední instance
FVE – fotovoltaika
POZE – podporované zdroje energie
PPP – první paralelní připojení
NN – nízké napětí
VN – vysoké napětí
NMT – nejbližší možný termín`,
  },
  {
    id: "dist-sazby-d",
    title: "Distribuční sazby D – domácnosti",
    category: "Distribuce",
    tags: ["distribucni sazby", "D-sazby", "D01", "D02", "D25", "D26", "D27", "D35", "D56", "domacnosti", "jistic", "VT NT"],
    body: `Distribuční sazby D jsou pro domácnosti (fyzické osoby, bytové jednotky).

D01 – Jednotarifová, jeden elektroměr, spotřeba bez omezení časem.
D02 – Jednotarifová s vyšším příkonem (jistič ≥ 3×25 A).
D25 – Dvoutarifová pro vytápění. NT platí min. 8 h/den.
D26 – Dvoutarifová pro ohřev vody + vytápění. NT min. 8 h/den.
D27 – Dvoutarifová pro přímotopné vytápění. NT min. 20 h/den.
D35 – Pro tepelné čerpadlo. NT min. 22 h/den.
D56 – Pro elektromobily. NT min. 8 h/den.

VT (vysoký tarif) – dražší, přes den.
NT (nízký tarif) – levnější, preferované hodiny.

Sazbu zákazník najde na faktuře od distributora nebo v EIS po vyhledání EAN.`,
  },
  {
    id: "dist-sazby-c",
    title: "Distribuční sazby C – firmy",
    category: "Distribuce",
    tags: ["distribucni sazby", "C-sazby", "C01d", "C02d", "C03d", "C25d", "firmy", "podnikatele", "SME", "ico"],
    body: `Distribuční sazby C jsou pro podnikatele a firmy (IČO, nízké napětí NN).

C01d – Jednotarifová pro malé firmy.
C02d – Dvoutarifová pro firmy.
C03d – Dvoutarifová s vyšším příkonem.
C25d – Dvoutarifová s rozšířenou dobou NT.

Zákazník s C-sazbou → produkt EXPERT FIX.
Zákazník s D-sazbou → produkt HOME FIX.

Sazbu zákazník najde na faktuře od distributora nebo ji vidíte v EIS po vyhledání EAN.`,
  },
  {
    id: "vt-nt",
    title: "VT a NT – vysoký a nízký tarif",
    category: "Pojmy",
    tags: ["VT", "NT", "vysoky tarif", "nizky tarif", "dvoutarifova sazba", "elektroměr", "noc", "boiler"],
    body: `VT (vysoký tarif): platí přes den, v pracovní době. Dražší cena elektřiny.
NT (nízký tarif): platí v nočních hodinách nebo přes víkend (záleží na sazbě). Levnější cena.

Zákazník s dvoutarifovou sazbou (D25, D26, D27, D35, D56) platí za VT a NT odděleně.

Typické využití NT: elektroboiler, přímotopné vytápění, nabíjení elektromobilu, tepelné čerpadlo.

Zákazník s D01 (jednotarifová) – platí jednotnou cenu, nemá NT/VT rozdělení.`,
  },
  {
    id: "jistic",
    title: "Jistič a příkon",
    category: "Pojmy",
    tags: ["jistic", "prikon", "ampery", "faze", "jednofazovy", "trifazovy", "kVA", "ampér", "rozvaděč"],
    body: `Jistič (hlavní jistič): chrání obvod před přetížením. Hodnota v ampérech (A).

Jednofázový: 1×16A, 1×25A, 1×32A → menší byty
Třífázový: 3×16A, 3×25A, 3×32A, 3×40A, 3×63A → domy a firmy

Orientační příkon:
3×25A ≈ 10 kW | 3×32A ≈ 13 kW | 3×40A ≈ 16 kW

Jistič ovlivňuje distribuční sazbu (D01 vs D02) a výši distribučního tarifu.
Zákazník ho najde v elektroměrovém rozvaděči nebo na faktuře od distributora.`,
  },
  {
    id: "ean",
    title: "EAN odběratele vs EAN výrobce",
    category: "Pojmy",
    tags: ["EAN", "odberatel", "vyrobce", "spotrebni EAN", "vyrobni EAN", "FVE", "PPP", "UTP", "SoP", "18 cislic"],
    body: `EAN odběratele (spotřební EAN):
• Identifikuje odběrné místo – kam elektřina přichází
• 18místné číslo
• Zákazník ho najde na faktuře od distributora

EAN výrobce (výrobní EAN):
• Identifikuje výrobní místo FVE – odkud elektřina odchází do sítě
• NUTNÝ pro aktivaci výkupní smlouvy – bez něj nelze smlouvu uzavřít!
• Kde ho najít: PPP dokument, Smlouva o připojení (SoP), předchozí vyúčtování od výkupce, e-mail od distributora

⚠️ POZOR: Dokument UTP (uvedení do trvalého provozu) obsahuje vždy SPOTŘEBNÍ EAN – nikdy výrobní!`,
  },
  {
    id: "odstoupeni",
    title: "Odstoupení od smlouvy – 14denní lhůta",
    category: "Pojmy",
    tags: ["odstoupeni", "14 dni", "lhuta", "zakon", "spotrebitel", "zruseni smlouvy", "pravo", "dalkovy prodej"],
    body: `Zákon o ochraně spotřebitele – zákazník má právo odstoupit od smlouvy uzavřené na dálku (telefon, e-mail) do 14 dní od podpisu. Bez udání důvodu, bez sankce.

V praxi:
• Zákazník podepsal smlouvu s konkurencí → má ještě 14 dní na rozmyšlenou
• Zákazník podepsal smlouvu s Tramaco → také má 14 dní

Jak zákazník odstoupí: e-mailem nebo písemně na adresu dodavatele.

Po uplynutí 14 dní: smlouva je závazná, lze ji ukončit pouze výpovědí.`,
  },
  {
    id: "vypoved",
    title: "Výpověď smlouvy a přechod k jinému dodavateli",
    category: "Pojmy",
    tags: ["vypoved", "prechod", "dodavatel", "lhuta", "konkurence", "zpetkvzeti", "30 dni", "45 dni"],
    body: `Výpověď smlouvy s Tramaco:
• Zákazník může podat výpověď kdykoli (bez čekání na konec fixace)
• Výpovědní lhůta: zpravidla 30–45 dní dle smluvních podmínek
• Po uplynutí lhůty dodávka přechází k novému dodavateli

Zpětvzetí výpovědi:
• Pokud dodávka u nového dodavatele JEŠTĚ nezačala, zákazník může výpověď vzít zpět
• Zákazník pošle e-mail nebo zavolá – my zpracujeme zpětvzetí

Přechod trvá: cca 30–45 dní od podání výpovědi (závisí na distributorovi).`,
  },
  {
    id: "sop-zalozeni",
    title: "SOP: Založení zákazníka v EIS",
    category: "SOP",
    tags: ["SOP", "EIS", "CRM", "novy zakaznik", "zalozeni", "postup", "system", "registrace", "ARES", "domacnost", "podnikatel"],
    body: `1. Otevřeme EIS a nejprve vždy zkontrolujeme, jestli zákazník už v systému není – v Rychlém hledání zadáme např. e-mail a dáme Hledat.

2. Pokud nic nenajde, klikneme dole na "Nový" a vyplníme tabulku Nový zákazník:
• Typ zákazníka: Domácnost nebo Podnikatel
• Domácnost: jméno, příjmení, datum narození, mobil, e-mail, adresa trvalého bydliště → Uložit.
• Podnikatel: název společnosti, IČO → klikneme na zelenou šipku "Ověřit v ARES" (automaticky se natáhnou údaje z ARES – Administrativní registr ekonomických subjektů), doplníme zastupující osobu, telefon, e-mail → Uložit.

Tímto je zákazník založen a může se pokračovat smlouvou na dodávku nebo výkup.`,
  },
  {
    id: "sop-smlouva-dodavka",
    title: "SOP: Smlouva na dodávku elektřiny",
    category: "SOP",
    tags: ["SOP", "EIS", "smlouva", "dodavka", "elektrina", "uzavreni", "postup", "novy odber", "VT NT", "jistic", "typ mereni", "SIGNI"],
    body: `Ke korektnímu uzavření potřebujeme od zákazníka vyplněnou žádost a poslední fakturu od stávajícího obchodníka.

1. Vytvoření smluvního účtu
• U zákazníka → záložka Smlouvy a Odběrná místa → Nový.
• Typ smlouvy: Spotřeba. U čísla smlouvy klikneme na zelené kolečko "Vygenerovat číslo smlouvy".
• Doba neurčitá = ceníky SPOT, Doba určitá = ceníky FIX.
• Datum od: dle stávající smlouvy (najdeme ve faktuře od stávajícího obchodníka). Datum do se natáhne samo.
• Výpovědní doba: SPOT domácnost 1 měsíc, SPOT firma 3 měsíce (vždy od 1. dne následujícího měsíce po obdržení výpovědi – výpověď podaná 7. 1. → konec k 28. 2. domácnost / k 30. 4. firma). FIX domácnost nejpozději 20 dní před koncem fixace (v EIS zadáváme 1), FIX firma nejpozději 3 měsíce před koncem fixace.
• Automatická prolongace jen u smlouvy na dobu určitou. Důvod vyplníme vždy dle žádosti zákazníka. Doplníme číslo účtu, kód banky/SIPO, způsob platby, případně korespondenční adresu → Uložit.

2. Založení smlouvy
• Na smluvním účtu klikneme na tři čárky → Nové OM.
• Vybereme produkt, Partner: Electree interní, BO: Smlouva online, AC/CC/retence: své jméno.
• Perioda záloh (měsíční/čtvrtletní dle přání) a výše zálohy dle kalkulačky.
• Vyplníme tabulku Předchozí dodavatel a do poznámky vložíme EAN + co je u smlouvy potřeba udělat.
• Technické údaje vyplníme podle faktury, kterou zákazník zaslal, a adresu odběrného místa → Uložit.
• Podklady uložíme do záložky Dokumenty a odešleme zákazníkovi e-mail s návodem na podpis v SIGNI (šablona "Smlouva o dodávce").
• Pokud podepisuje partner na základě plné moci nebo chceme plnou moc zaslat se smlouvou: po přepnutí na ANO VŽDY nejprve Uložit a až poté odeslat k podpisu.
• Klikneme na "Vytvořit a odeslat novou smlouvu k podpisu do SIGNI".
• Na záložce Zákazník se automaticky vytvoří úkol Registrace zákazníka – otevřeme ho (tužka vpravo), nastavíme Stav: Dokončený, Typ: Nová smlouva, Přiřadit uživatele: své jméno, do poznámky napíšeme datum odeslání smlouvy → Uložit.

Technické údaje – na co si dát pozor:
• Typ měření: A = vysoké napětí. B = chytrý elektroměr (většinou FVE, měsíční fakturace). C1 = dnes nahrazuje B u FVE, měsíční fakturace. C4 = elektroměr neodesílá data sám, probíhá roční odečet.
• Distribuční sazba: z faktury, určuje se vždy dle spotřebiče s největším příkonem.
• Roční spotřeba VT/NT: z faktury. Pokud máme jen celkovou spotřebu a sazba je dvoutarifní, dopočítáme podle délky NT: 8 h NT → NT tvoří 33 % spotřeby (VT 67 %); 16 h NT → NT 67 % (VT 33 %); 20 h NT → NT 83 % (VT 17 %); 22 h NT → NT 91 % (VT 9 %).
• Způsob připojení: jednofázové/třífázové (z faktury). Hodnota jističe se zadává bez fáze – jistič 3×25A → způsob připojení třífázové, hodnota jističe 25.
• Číslo měřidla = číslo elektroměru.`,
  },
  {
    id: "sop-smlouva-vykup",
    title: "SOP: Smlouva na výkup elektřiny (FVE)",
    category: "SOP",
    tags: ["SOP", "EIS", "smlouva", "vykup", "FVE", "fotovoltaika", "solar", "postup", "EAN vyrobce", "PPP", "UTP", "SIGNI"],
    body: `Ke korektnímu uzavření potřebujeme od zákazníka vyplněnou žádost a doklad s výrobním EAN: dokument o prvním paralelním připojení (PPP), u nově připojených FVE i smlouva o připojení (SoP), předchozí vyúčtování, nebo jakýkoli e-mail od distribuce s výrobním EAN.

POZOR: dokument UTP (uvedení do trvalého provozu) obsahuje vždy EAN SPOTŘEBNÍ – nikdy výrobní!

1. Vytvoření smluvního účtu
• Smlouvy a Odběrná místa → Nový → Typ smlouvy: Výroba → vygenerovat číslo smlouvy.
• Doba neurčitá = ceníky SPOT, Doba určitá = ceník FIX.
• Datum od: dle předchozí smlouvy, u nové FVE 10–14 dní.
• Výpovědní doba 3 měsíce: u SPOTu 3 měsíce od 1. dne následujícího měsíce po obdržení výpovědi. U FIX musí zákazník podat výpověď nejpozději 3 měsíce před koncem fixace (smlouva do 31. 12. → výpověď nejpozději do 30. 9.).
• Automatická prolongace jen u doby určité. Důvod: Nový výkup / Změna dodavatele. Fakturace výroby dle administrativního paušálu, který si zákazník zvolí. Doplníme číslo účtu, kód banky, korespondenční adresu → Uložit.

2. Založení smlouvy
• Na smluvním účtu tři čárky → Nová výroba.
• Vybereme produkt, Partner: Electree interní, BO: Smlouva online, AC/CC/retence: své jméno.
• Do poznámky vložíme EAN a napíšeme, o jakou smlouvu jde a co je potřeba udělat (nová FVE, kam a k jakému datu podat výpověď, akceptace výpovědi).
• Vyplníme technické údaje (instalovaný výkon, baterie, kapacita baterie, typ střídače) a adresu odběrného místa → Uložit.
• Podklady uložíme do Dokumentů a odešleme e-mail s návodem na podpis v SIGNI (šablona "Smlouva o výkupu"). Případně doplníme zastupující osobu.
• Klikneme na "Vytvořit a odeslat novou smlouvu k podpisu do SIGNI".
• Na záložce Zákazník se automaticky vytvoří úkol Registrace zákazníka – otevřeme (tužka vpravo), Stav: Dokončený, Typ: Nová smlouva, Přiřadit uživatele: své jméno, do poznámky datum odeslání → Uložit.

Pokud zákazník v žádosti neuvede, kolik MWh/rok dodá do sítě, propočítáme orientačně: (velikost baterie v kWh × 180 − instalovaný výkon FVE v kWp × 1 000) ÷ 2 = MWh/rok (vezmeme absolutní hodnotu výsledku). Příklad: baterie 14,2 kWh, FVE 10 kWp → (14,2×180 − 10 000) ÷ 2 = 3,722 MWh/rok. Vždy jde pouze o orientační odhad.`,
  },
  {
    id: "sop-prepis-vyrobny",
    title: "SOP: Přepis výrobny (změna majitele FVE)",
    category: "SOP",
    tags: ["SOP", "prepis", "vyrobna", "FVE", "zmena majitele", "smrt", "dedictvi", "prodej domu", "prepis OM"],
    body: `1. Formulář k přepisu
Od zákazníka potřebujeme vyplněný formulář Žádost o změnu zákazníka – část A (původní ZK) i část B (nový ZK), a doklad o nabytí nebo zániku užívacího práva (kupní/nájemní smlouva).

Přepis výrobny se nezadává na distribuci. Snažíme se dodržet datum přepisu do budoucna, není to ale nutnost – při úmrtí nebo zpracování na přelomu měsíce lze přepis udělat k 1. dni měsíce, ve kterém se zpracovává.

2. Dohledání stávajícího zákazníka
Dohledáme ho v EIS a ujistíme se, že smlouva je u nás vedena. Necháme si jeho kartu otevřenou.

3. Nový zákazník
Otevřeme novou kartu, zkontrolujeme, zda už nového zákazníka nemáme založeného – pokud ne, založíme klasicky (viz SOP Založení zákazníka) a založíme pouze smluvní účet.

4. Přepis výrobního EAN
• U stávajícího zákazníka zadáme datum ukončení smlouvy tak, aby smlouvy navazovaly (stejně jako u změny ceníku).
• U smlouvy klikneme na Možnosti → Přepis OM.
• V tabulce Přepis OM napíšeme jméno nového zákazníka a vybereme ho kliknutím (pokud už u nás je, dáme pozor na výběr správného čísla smlouvy).
• Vybereme produkt – NEPONECHÁVÁME stávající, vybíráme z aktuální nabídky. Zkontrolujeme datum začátku výkupu (musí navazovat na původní smlouvu) a do poznámky dopíšeme, na koho se přepisuje.
• Zkontrolujeme technické údaje a adresu OM (natahují se automaticky z původní smlouvy) → Uložit.
• Vytvoříme úkol "Přepis výrobny".

5. Dokončení přepisu
• U nového zákazníka se automaticky vytvoří ve smluvním účtu Nová výrobna.
• Uložíme veškeré podklady ke stávajícímu i novému zákazníkovi.
• Odešleme smlouvu o výkupu k podpisu.
• Uzavřeme úkol registrace zákazníka.`,
  },
  {
    id: "sop-zmena-ceniku",
    title: "SOP: Změna ceníku (přechod na jiný produkt)",
    category: "SOP",
    tags: ["SOP", "zmena ceniku", "prechod", "produkt", "upgrade", "fixace", "EIS"],
    body: `Zákazník přechází z jednoho produktu na jiný:

A) V aktivní fixaci → změna možná až po skončení fixace (nebo s poplatkem)
B) Bez fixace → změna okamžitě možná

Postup v EIS:
1. Zákazník → záložka Smlouvy → zkontrolovat datum konce fixace
2. Nová smlouva → vybrat nový produkt
3. Zákazník potvrdí změnu (SMS nebo e-mail)
4. Nový ceník platí od 1. dne příštího zúčtovacího období

Podmínka: zákazník nesmí mít nedoplatek nad 2 000 Kč nebo probíhat exekuci.`,
  },
  {
    id: "retence-postup",
    title: "Retence – postup při odchodu zákazníka",
    category: "Retence",
    tags: ["retence", "odchod", "vypoved", "postup", "zakaznik", "chce odejit", "konkurence", "zachranit"],
    body: `Postup při retenčním hovoru:

1. NECHTE HO MLUVIT – nejprve zjistěte důvod, nepřerušujte
2. EMPATIE – "Rozumím, to mě mrzí. Mohu se zeptat..."
3. ZJISTĚTE KONKRÉTNÍ DŮVOD:
   • Cena → zjistěte jejich nabídku, pak porovnejte
   • Nespokojenost → co konkrétně se stalo, nabídněte nápravu
   • Konkurence → co je na té nabídce zaujalo nejvíc?
4. NABÍDNĚTE → až po pochopení důvodu
5. Zákazník má 14 dní od podpisu nové smlouvy na odstoupení

Klíč: zákazník nejlépe odhalí, co potřebujete nabídnout.`,
  },
  {
    id: "retence-podepsal",
    title: "Zákazník podepsal smlouvu u konkurence",
    category: "Retence",
    tags: ["retence", "podepsal jinde", "konkurence", "14 dni", "odstoupeni", "zpetkvzeti"],
    body: `Zákazník říká, že podepsal smlouvu u konkurence:

Do 14 dní od podpisu nové smlouvy:
→ Zákazník může od nové smlouvy ODSTOUPIT (bez udání důvodu, bez sankce)
→ "Ještě máte čas. Dokážeme vám nabídnout lepší podmínky."

Do 15 dní od zahájení dodávky u nové firmy:
→ Stále možné řešení, ale složitější

Dodávka u konkurence ještě nezačala:
→ Zákazník může vzít zpět výpověď u Tramaco
→ Zákazník pošle e-mail nebo zavolá – my zpracujeme zpětvzetí

NIKDY neříkejte zákazníkovi, že je pozdě, aniž byste to ověřili.`,
  },
  {
    id: "namitka-cena",
    title: "Námitka: Je to drahé / mám levnější nabídku",
    category: "Retence",
    tags: ["namitka", "cena", "drahe", "levneji", "konkurence", "srovnani", "retence", "uspora"],
    body: `Zákazník říká "Je to drahé" nebo "Mám levnější nabídku":

NEPŘISTUPUJTE OKAMŽITĚ NA SLEVU. Nejprve zjistěte:
"Mohu se zeptat, jakou cenu za MWh vám nabídli?"

Pokud zákazník řekne číslo:
→ Porovnejte celkové náklady (paušál + cena MWh × spotřeba)
→ Celková cena u Tramaco může být nižší i při vyšší ceně/MWh

Pokud zákazník číslo neřekne:
→ "Kolik MWh ročně spotřebujete?" → spusťte kalkulaci

Klíčová formulace: "Mohu vás srovnat, protože někdy ta druhá nabídka vypadá levněji, ale celkově může vyjít dráž."`,
  },
];

const QUICK = [
  { label: "HOME FIX 24 – cena", q: "home fix 24 elektrina" },
  { label: "Distribuční sazby D", q: "distribucni sazby domacnosti" },
  { label: "EAN výrobce vs odběratele", q: "EAN vyrobce odberatel" },
  { label: "Zákazník chce odejít", q: "retence odchazi" },
  { label: "Výkup FVE – Solar produkty", q: "solar FVE vykup" },
  { label: "Odstoupení od smlouvy", q: "odstoupeni 14 dni" },
];

export default function WikiPage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const words = useMemo(
    () => normalize(query).split(" ").filter((w) => w.length > 1),
    [query]
  );

  const results = useMemo(() => {
    if (words.length === 0) return [];
    return ARTICLES.map((a) => {
      const titleN = normalize(a.title);
      const tagsN = normalize(a.tags.join(" "));
      const bodyN = normalize(a.body);
      let score = 0;
      for (const w of words) {
        if (titleN.includes(w)) score += 3;
        else if (tagsN.includes(w)) score += 2;
        else if (bodyN.includes(w)) score += 1;
        else { score = -1; break; }
      }
      return { ...a, score };
    })
      .filter((a) => a.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [words]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#0D3D34] mb-1">Wiki & SOPs</h1>
        <p className="text-[#0D3D34]/45 text-sm mb-6">Produkty, ceníky, postupy, pojmy</p>

        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D3D34]/30" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpenId(null); }}
            placeholder="Napište co potřebujete vědět... (funguje i bez diakritiky)"
            className="w-full bg-white border-2 border-[#D1DFD8] focus:border-[#0D3D34] rounded-2xl pl-11 pr-10 py-4 text-sm text-[#0D3D34] placeholder:text-[#0D3D34]/30 outline-none transition-all shadow-sm"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setOpenId(null); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D3D34]/30 hover:text-[#0D3D34]/60 transition-colors text-xl leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {!query && (
        <div>
          <div className="text-xs font-bold text-[#0D3D34]/30 uppercase tracking-widest mb-3 text-center">Nejčastější témata</div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {QUICK.map((s) => (
              <button
                key={s.q}
                onClick={() => setQuery(s.q)}
                className="text-left bg-white border border-[#D1DFD8] rounded-xl px-4 py-3 text-xs font-medium text-[#0D3D34] hover:border-[#0D3D34]/30 hover:shadow-sm transition-all"
              >
                {s.label} →
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {(["Produkt", "Distribuce", "SOP", "Retence", "Pojmy"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setQuery(cat.toLowerCase())}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80 ${CAT_COLOR[cat]}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-3xl mb-3">🔍</div>
          <div className="text-[#0D3D34]/50 text-sm">Nic nenalezeno pro &quot;{query}&quot;</div>
          <div className="text-[#0D3D34]/30 text-xs mt-1">Zkuste jiné slovo nebo méně slov</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs text-[#0D3D34]/30 mb-2">
            {results.length} {results.length === 1 ? "výsledek" : "výsledky"}
          </div>
          {results.map((article) => (
            <div key={article.id} className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenId(openId === article.id ? null : article.id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#F7FAF9] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="mb-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${CAT_COLOR[article.category]}`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="font-semibold text-[#0D3D34] text-sm">{article.title}</div>
                  <div className="text-xs text-[#0D3D34]/40 mt-0.5 truncate">{article.body.split("\n")[0]}</div>
                </div>
                <svg
                  className={`flex-shrink-0 text-[#0D3D34]/30 transition-transform duration-200 ${openId === article.id ? "rotate-180" : ""}`}
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openId === article.id && (
                <div className="px-5 pb-5 border-t border-[#D1DFD8]">
                  <pre className="text-sm text-[#0D3D34]/80 leading-relaxed whitespace-pre-wrap font-sans mt-4">
                    {article.body}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
