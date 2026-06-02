"use client";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";

type QuizQuestion = { q: string; a: string[]; correct: number; explanation: string };
type LessonDef = { title: string; mins: number; type: "video" | "reading" | "quiz" };
type Module = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  total: number;
  locked?: boolean;
  lessons: LessonDef[];
  content: Record<string, { body?: string; quiz?: QuizQuestion[] }>;
};

// ─── LEVEL A ────────────────────────────────────────────────────────────────

const LEVEL_A: Module[] = [
  {
    id: "kdo-jsme",
    icon: "🏢",
    title: "Kdo jsme",
    subtitle: "Identita Electree, trh, naše síla",
    total: 3,
    lessons: [
      { title: "Co je Electree", mins: 5, type: "reading" },
      { title: "Kde jsme na trhu", mins: 5, type: "reading" },
      { title: "Ověřte znalosti", mins: 8, type: "quiz" },
    ],
    content: {
      "Co je Electree": {
        body: `Electree je moderní energetická firma z Brna. Dodává elektřinu, dodává plyn a vykupuje elektřinu, hlavně z obnovitelných zdrojů. Na svém webu se představuje jako transparentní obchodník se zelenou energií a firma, která staví na chytrém řízení, datech a energetických službách.

Za firmou stojí Lubomír Káňa a Ruben Marada. Electree nevznikla jako obyčejný další dodavatel energií. Od začátku byla postavená na modernějším pohledu na energetiku – na chytrém využití dat, technologií a zejména na práci s výkupem energie a obnovitelnými zdroji.

NA ČEM ELECTREE VYROSTLA
Electree vyrostla hlavně na výkupu elektřiny a na práci s moderní energetikou kolem fotovoltaiky a přebytků. Firma se specializuje na výkup elektřiny ze všech obnovitelných zdrojů, zejména na přetoky z fotovoltaiky.

To je důležité: Electree není jen "dodavatel elektřiny". Je to firma, která má silné kořeny ve výkupu a v moderní práci s energií.

CO ELECTREE DĚLÁ DNES
Dnes Electree stojí na třech hlavních oblastech:
• Výkup elektřiny – hlavně přetoků z fotovoltaiky a dalších obnovitelných zdrojů
• Dodávka elektřiny – pro domácnosti i firmy, včetně fixních i spotových cen
• Dodávka plynu – jako součást kompletního energetického řešení

JAK MLUVÍME O SOBĚ SE ZÁKAZNÍKEM
Electree se zákazníkovi nereprezentuje jako levný sleeper na trhu, ale jako transparentní partner pro moderní energetiku. Komunikujeme jednoduše, férovost a přehlednost jsou naše hodnoty.`,
      },
      "Kde jsme na trhu": {
        body: `NAŠE POZICE NA TRHU

Dodávka elektřiny
Největšími dodavateli elektřiny jsou ČEZ, E.ON a PRE. Electree má přibližně 24–25 tisíc odběrných míst elektřiny. Jsme menší až střední hráč – nejsme v první pětce trhu, ale zároveň nejsme zanedbatelnou firmou.

Dodávka plynu
V plynu jsme zatím malý hráč – přibližně 3 200–3 900 odběrných míst. Největší dodavatelé plynu mají stovky tisíc až více než milion odběrných míst. Plyn je pro Electree novější a rozvojová oblast.

Výkup elektřiny
Electree patří mezi významné výkupce elektřiny v České republice – máme přibližně 17 tisíc výrobních míst. To je naše skutečná síla.

NAŠE VÝHODY OPROTI VELKÝM HRÁČŮM
Největší hráči mají obrovská portfolia, ale my máme jiné silné stránky:

• Silný základ ve výkupu elektřiny – rozumíme FVE lépe než většina konkurence
• Rozumíme moderní energetice – fotovoltaika, přetoky, chytré řízení
• Jsme menší → rychlejší, osobnější a víc servisní
• Zákazníkovi nabídneme srozumitelnější a férovější přístup
• Technologické zázemí – aplikace Electree Connect, automatizace

JAK TO ŘÍCT ZÁKAZNÍKOVI
Nesrovnávejte se s ČEZ nebo E.ON. Mluvte o tom, co Electree umí lépe: férovost, jednoduchost, FVE expertise, osobní přístup. Zákazník nekupuje "kdo je největší" – kupuje toho, komu věří.`,
      },
      "Ověřte znalosti": {
        quiz: [
          { q: "Odkud pochází Electree?", a: ["Praha", "Brno", "Ostrava", "Plzeň"], correct: 1, explanation: "Electree je moderní energetická firma z Brna." },
          { q: "Kdo jsou zakladatelé Electree?", a: ["Jan Novák a Petr Svoboda", "Lubomír Káňa a Ruben Marada", "Martin Dvořák a Jana Procházková", "Tomáš Král a Pavel Krejčí"], correct: 1, explanation: "Za firmou stojí Lubomír Káňa a Ruben Marada." },
          { q: "Na čem Electree primárně vyrostla?", a: ["Dodávce plynu", "Dodávce elektřiny pro firmy", "Výkupu elektřiny z obnovitelných zdrojů a FVE", "Prodeji solárních panelů"], correct: 2, explanation: "Electree vyrostla na výkupu elektřiny a práci s FVE přetoky – to je její skutečná síla." },
          { q: "Kolik odběrných míst pro výkup elektřiny má přibližně Electree?", a: ["5 tisíc", "10 tisíc", "17 tisíc", "50 tisíc"], correct: 2, explanation: "Electree má přibližně 17 tisíc výrobních míst pro výkup – to je klíčová oblast." },
          { q: "Jak velký hráč je Electree v dodávce elektřiny?", a: ["Největší na trhu", "Menší až střední hráč (24–25 tis. odběrných míst)", "Druhý největší za ČEZ", "Pouze regionální firma"], correct: 1, explanation: "Electree má přibližně 24–25 tisíc odběrných míst elektřiny – je to menší až střední hráč." },
          { q: "Kdo jsou největší dodavatelé elektřiny v ČR?", a: ["Electree, Bohemia Energy, MND", "ČEZ, E.ON a PRE", "RWE, Innogy a EON", "Electree, ČEZ a E.ON"], correct: 1, explanation: "Největšími dodavateli elektřiny jsou ČEZ, E.ON a PRE. Electree je menší hráč s jinými silnými stránkami." },
          { q: "Jak je Electree pozicionovaná vůči zákazníkům?", a: ["Jako nejlevnější dodavatel na trhu", "Jako transparentní obchodník se zelenou energií", "Jako největší tuzemský dodavatel", "Jako výhradně firemní dodavatel"], correct: 1, explanation: "Electree se prezentuje jako transparentní obchodník se zelenou energií – férovost a jednoduchost jsou klíčové hodnoty." },
          { q: "Jakou výhodu má Electree oproti velkým hráčům?", a: ["Nižší ceny než ČEZ vždy", "Největší síť distribučních bodů", "Rychlejší, osobnější přístup a FVE expertise", "Nejdelší doba existence na trhu"], correct: 2, explanation: "Naše síla je v rychlosti, osobním přístupu, FVE expertíze a férovosti – ne v objemu." },
          { q: "Kolik odběrných míst plynu má přibližně Electree?", a: ["500 míst", "3 200–3 900 míst", "50 tisíc míst", "Electree plyn nenabízí"], correct: 1, explanation: "V plynu má Electree přibližně 3 200–3 900 odběrných míst – jde o novější a rozvojovou oblast." },
          { q: "Jaké jsou tři hlavní oblasti podnikání Electree?", a: ["FVE výroba, instalace panelů, servis", "Výkup elektřiny, dodávka elektřiny, dodávka plynu", "Dodávka elektřiny, dodávka plynu, prodej tepla", "Obchodování na burze, FVE, plyn"], correct: 1, explanation: "Electree stojí na třech oblastech: výkup elektřiny, dodávka elektřiny a dodávka plynu." },
        ] as QuizQuestion[],
      },
    },
  },
  {
    id: "zaklady-energetiky",
    icon: "⚡",
    title: "Základy energetiky",
    subtitle: "Dodavatel, distributor, fix, spot, FVE",
    total: 4,
    lessons: [
      { title: "Dodavatel vs. distributor", mins: 8, type: "reading" },
      { title: "Fix a Spot – principy a rozdíly", mins: 7, type: "reading" },
      { title: "Výkup přebytků z FVE", mins: 7, type: "reading" },
      { title: "Ověřte znalosti", mins: 10, type: "quiz" },
    ],
    content: {
      "Dodavatel vs. distributor": {
        body: `DODÁVKA ELEKTRICKÉ ENERGIE

Když si zákazník pořizuje elektřinu do domácnosti nebo firmy, vystupují v celém procesu dvě různé role:

DISTRIBUTOR = firma, která vlastní a provozuje elektrickou síť a fyzicky elektřinu dopraví k odběrnému místu.
DODAVATEL = firma, od které si zákazník elektřinu kupuje – má s ní smlouvu, jí platí zálohy a od ní dostává vyúčtování.

Zjednodušeně: distributor elektřinu doveze, dodavatel ji prodá.

KLÍČOVÉ: Distributora si zákazník nevybírá – je určen podle místa, kde se odběrné místo nachází. Dodavatele si zákazník vybrat může.

Cena elektřiny se skládá z více částí:
• Distribuce a regulované služby (dáno distributorem, nelze ovlivnit)
• Obchodní část – závisí na zvoleném dodavateli a tarifu

DODÁVKA PLYNU funguje stejným principem:
• Distributor plyn fyzicky dovede potrubím k zákazníkovi
• Dodavatel ho prodá – zákazník s ním uzavírá smlouvu a platí zálohy
• Zákazník si nevybírá distributora (GasNet, Gas Distribution, Pražská plynárenská) – je daný lokalitou
• Zákazník si vybírá dodavatele

PROČ JE TOTO DŮLEŽITÉ
Zákazníci si pletou distributora a dodavatele. Pochopení tohoto rozdílu je základ pro smysluplný hovor. Bez tohoto zákazník neví, proč by měl vůbec měnit dodavatele.`,
      },
      "Fix a Spot – principy a rozdíly": {
        body: `FIX TARIF
Cena za silovou elektřinu je sjednaná dopředu na určité období. Zákazník ví přesně, za kolik bude platit – žádná překvapení z trhů.

Hlavní výhoda fixu: jistota a předvídatelnost.

FIX DOPORUČUJEME zákazníkovi, který:
• Chce jistotu a předvídatelný účet
• Nechce sledovat burzu
• Je domácnost nebo malá firma bez flexibility spotřeby

SPOT TARIF
Cena elektřiny se odvíjí od trhu. Mění se podle situace na velkoobchodním trhu – nabídky, poptávky, počasí, výroby.

Spot může být výhodný v levných hodinách, ale může i výrazně zdražit při vysoké poptávce nebo výrobním výpadku.

SPOT DOPORUČUJEME zákazníkovi, který:
• Má flexibilní spotřebu (nabíjí auto v noci, provozuje boiler)
• Má domácí FVE nebo baterii
• Sleduje ceny a umí optimalizovat spotřebu

ZÁPORNÉ CENY – důležité vědět
Záporná cena elektřiny nastane, když je na trhu tolik elektřiny a tak malá spotřeba, že někteří výrobci jsou ochotni za odbyt elektřiny zaplatit. Typicky: hodně vyrábějí obnovitelné zdroje (FVE, vítr) + nízká spotřeba. Pro zákazníka se spotovým výkupem to může znamenat, že za přetoky v tu chvíli nedostane nic nebo musí zaplatit.

SHRNUTÍ: Fix = jistota, Spot = variabilita. Zákazníkovi nabídněte fix jako výchozí doporučení, pokud nezná trh nebo nechce řešit výkyvy.`,
      },
      "Výkup přebytků z FVE": {
        body: `CO JE VÝKUP PŘEBYTKŮ
Zákazník s fotovoltaickou elektrárnou část vyrobené elektřiny spotřebuje přímo doma a část mu může zbýt – tomu se říká přebytek nebo přetok. Tento přebytek pošle do sítě a obchodník ho může vykoupit.

DŮLEŽITÝ ROZDÍL:
• Dodávka = zákazník elektřinu NAKUPUJE
• Výkup = zákazník elektřinu PRODÁVÁ

FIXNÍ VÝKUP
Výkupní cena sjednaná dopředu. Zákazník ví, za kolik přetoky prodává. Výhoda: přehlednost, jistota, jednoduchost.

SPOTOVÝ VÝKUP
Výkupní cena se mění podle trhu. Někdy vyšší, někdy nižší. Zákazník musí počítat s kolísáním příjmu.

ZÁPORNÉ CENY A VÝKUP
Pokud je na trhu nulová nebo záporná cena, zákazník se spotovým výkupem za přetoky nedostane nic (nebo musí platit podle podmínek produktu). To je nejdůležitější věc, kterou zákazník o spotu musí vědět.

Zákazníci si nesprávně myslí: "čím více vyrobím, tím více vydělám". To neplatí vždy. U spotového výkupu záleží na tom, kdy vyrábí – pokud vyrábí ve chvíli, kdy je trh přesycený, cena bude nízká nebo nulová.

SHRNUTÍ
Electree patří mezi největší výkupce elektřiny v ČR – máme 17 tisíc výrobních míst. Výkup je naše silná stránka. Zákazníkovi s FVE vždy nabídněte výkupní produkt jako součást komplexního řešení.`,
      },
      "Ověřte znalosti": {
        quiz: [
          { q: "Co dělá distributor elektřiny?", a: ["Prodává elektřinu zákazníkovi a fakturuje ji", "Fyzicky dopravuje elektřinu přes síť k odběrnému místu", "Stanovuje cenu elektřiny na trhu", "Spravuje zákaznické smlouvy"], correct: 1, explanation: "Distributor vlastní a provozuje elektrickou síť – fyzicky elektřinu dopraví. Zákazník si ho nevybírá." },
          { q: "Může zákazník vybrat svého distributora elektřiny?", a: ["Ano, vždy si vybírá sám", "Ano, ale jen jednou za rok", "Ne – je určen lokalitou odběrného místa", "Ano, pokud má FVE"], correct: 2, explanation: "Distributora si zákazník nevybírá – je daný tím, kde se odběrné místo nachází. Vybírat si může pouze dodavatele." },
          { q: "Co je hlavní výhoda fixního tarifu?", a: ["Vždy nejnižší cena na trhu", "Jistota – cena se nemění po celou dobu fixace", "Možnost odejít kdykoli bez pokuty", "Žádný měsíční paušál"], correct: 1, explanation: "Fix přináší zákazníkovi jistotu – ví přesně, za kolik bude platit. Není překvapen výkyvy trhu." },
          { q: "Pro koho je vhodný spotový tarif?", a: ["Pro každého zákazníka", "Pro zákazníka, který chce co největší jistotu", "Pro zákazníka s flexibilní spotřebou nebo FVE/baterií", "Pro zákazníka bez smart metru"], correct: 2, explanation: "Spot dává smysl, když zákazník dokáže přizpůsobit spotřebu levným hodinám – elektromobil, FVE, baterie." },
          { q: "Kdy nastávají záporné ceny elektřiny?", a: ["Vždy v noci", "Při vysoké výrobě z OZE a nízké spotřebě", "V létě vždy", "Nikdy – cena nemůže být záporná"], correct: 1, explanation: "Záporné ceny nastávají při přebytku elektřiny na trhu – typicky když hodně vyrábějí FVE/větrné a poptávka je nízká." },
          { q: "Co je přebytek (přetok) z FVE?", a: ["Elektřina, která se nestihne spotřebovat a jde do sítě", "Energie uložená v baterii", "Zpětná dodávka od distributora", "Kompenzace za výpadek dodávky"], correct: 0, explanation: "Přebytek = část vyrobené elektřiny, kterou zákazník nespotřebuje doma – pošle ji do sítě a může ji prodat." },
          { q: "Jaký je rozdíl mezi dodávkou a výkupem elektřiny?", a: ["Žádný – jde o totéž", "Dodávka = zákazník nakupuje, výkup = zákazník prodává", "Dodávka je pro firmy, výkup pro domácnosti", "Výkup je dražší forma dodávky"], correct: 1, explanation: "Dodávka = zákazník elektřinu kupuje. Výkup = zákazník elektřinu prodává (přetoky z FVE). Jiný směr toku i peněz." },
          { q: "Co se stane zákazníkovi se spotovým výkupem při záporné ceně?", a: ["Dostane extra bonus", "Výkupní cena může být nulová nebo záporná – nezíská nic nebo musí platit", "Smlouva se automaticky zruší", "Nic – záporné ceny se výkupu netýkají"], correct: 1, explanation: "Záporná cena je riziko spotového výkupu. Zákazník musí vědět, že vysoká výroba neznamená automaticky vysoký výnos." },
          { q: "Jak funguje dodávka plynu – kdo je distributor?", a: ["Zákazník si ho vybírá sám", "Je daný lokalitou – GasNet (sever/střed), Gas Distribution (jih), Pražská plynárenská (Praha)", "Electree je distributor plynu", "Každý zákazník má jiného distributora dle tarifu"], correct: 1, explanation: "Distributor plynu je dán lokalitou. GasNet: sever/střed ČR. Gas Distribution: jih. Pražská plynárenská: Praha." },
          { q: "Proč je Electree silná ve výkupu elektřiny?", a: ["Protože je největší dodavatel elektřiny", "Protože má přibližně 17 tisíc výrobních míst a je to naše historická silná stránka", "Protože nabízí nejvyšší výkupní ceny na trhu", "Protože provozuje vlastní fotovoltaické elektrárny"], correct: 1, explanation: "Výkup je kořen Electree – máme ~17 tisíc výrobních míst a dlouhodobou expertízu v práci s FVE." },
        ] as QuizQuestion[],
      },
    },
  },
  {
    id: "produkty",
    icon: "📦",
    title: "Naše hlavní produkty",
    subtitle: "HOME FIX, SPOT, Solar výkup, Plyn",
    total: 4,
    lessons: [
      { title: "Fixní tarify – HOME FIX", mins: 10, type: "reading" },
      { title: "Spotové tarify a Solar výkup", mins: 10, type: "reading" },
      { title: "Dodávka plynu – přehled", mins: 5, type: "reading" },
      { title: "Ověřte znalosti", mins: 10, type: "quiz" },
    ],
    content: {
      "Fixní tarify – HOME FIX": {
        body: `FIXNÍ TARIFY ELECTREE – DODÁVKA ELEKTŘINY

HOME FIX 12 — 2 549 Kč/MWh bez DPH
• Vázanost: 12 měsíců
• Cena s DPH: 3 084,29 Kč/MWh
• Pro koho: zákazník chce kratší závazek, testuje Electree poprvé
• Výhody: jistota na 1 rok, jednoduchost, možnost odejít po 12 měsících bez sankce
• Nevýhody: kratší fixace, dražší než delší varianty

HOME FIX 24 — 2 349 Kč/MWh bez DPH ⭐ DOPORUČENÝ
• Vázanost: 24 měsíců
• Cena s DPH: 2 842,29 Kč/MWh
• Pro koho: zákazník chce dobrý poměr ceny a jistoty – nejoblíbenější produkt
• Výhody: nižší cena než FIX 12, jistota na 2 roky, nejlepší poměr cena/jistota
• Nevýhody: delší závazek než FIX 12

HOME FIX 36 — 2 299 Kč/MWh bez DPH
• Vázanost: 36 měsíců
• Cena s DPH: 2 781,79 Kč/MWh
• Pro koho: zákazník chce maximální klid a nejnižší cenu na delší dobu
• Výhody: nejnižší cena z fixních variant, jistota na 3 roky
• Nevýhody: nejdelší závazek, nejmenší flexibilita

EXPERT FIX 24 — 2 449 Kč/MWh bez DPH
• Vázanost: 24 měsíců
• Pro koho: podnikatelé a firmy s C-sazbou distributora
• Zákazník s D-sazbou → HOME FIX. Zákazník s C-sazbou (IČO) → EXPERT FIX

PAMATUJ: Zákazník nekupuje MWh. Kupuje jistotu, klid a předvídatelný účet.`,
      },
      "Spotové tarify a Solar výkup": {
        body: `SPOTOVÉ TARIFY – DODÁVKA ELEKTŘINY

HOME SPOT — spotová cena OTE + 349 Kč/MWh bez DPH
• Měsíční poplatek: 99 Kč bez DPH
• Pro koho: zákazník s FVE nebo flexibilní spotřebou
• Podmínka: nutný smart metr AMM
• Pozor: nutnost hlídat trh, riziko výkyvů cen

HOME ELECTREE DRIVE — spotová cena OTE + 319 Kč/MWh bez DPH
• Měsíční poplatek: 130 Kč bez DPH
• Určeno PRO MAJITELE ELEKTROMOBILŮ
• Automatické nabíjení v nejlevnějších hodinách přes Electree Connect
• Možnost nabíjet při záporných cenách
• Nižší přirážka než HOME SPOT

VÝKUPNÍ PRODUKTY – SOLAR FIX

Home Solar FIX MINI — 1 000 Kč/MWh | limit: do 1 MWh/rok | paušál: 39 Kč/měs.
• Podmínka: zákazník musí mít zároveň fixní dodávku u Electree

Home Solar FIX — 500 Kč/MWh | limit: 1–10 MWh/rok | paušál: 59 Kč/měs.
• Nejpopulárnější – pro standardní střešní FVE na rodinném domě

Home Solar FIX MAXI — 400 Kč/MWh | limit: nad 10 MWh/rok | paušál: 99 Kč/měs.
• Velké FVE – zemědělské areály, komerční budovy

VÝKUPNÍ PRODUKTY – SOLAR SPOT

Home Solar SPOT FREE — čistá spotová cena bez srážky | limit: do 5 MWh | 199 Kč/měs.
Home Solar SPOT — spotová cena − 390 Kč/MWh | limit: do 15 MWh | 99 Kč/měs.
Home Solar SPOT FREE MAXI — čistá spotová cena | limit: nad 5 MWh | 299 Kč/měs.`,
      },
      "Dodávka plynu – přehled": {
        body: `DODÁVKA PLYNU U ELECTREE

Electree nabízí fixní tarify pro dodávku zemního plynu domácnostem. Zákazník plyn odebírá pro svou spotřebu a vybírá si tarif podle délky závazku.

HOME FIX PLYN 12 — 1 349 Kč/MWh bez DPH (1 632,29 Kč s DPH)
• Vázanost 12 měsíců | Paušál 156,09 Kč/měsíc
• Pro zákazníka, který chce kratší závazek nebo testuje Electree

HOME FIX PLYN 24 — 1 299 Kč/MWh bez DPH (1 571,79 Kč s DPH) ⭐
• Vázanost 24 měsíců | Paušál 180,29 Kč/měsíc
• Doporučený – nejlepší poměr cena/závazek

HOME FIX PLYN 36 — 1 299 Kč/MWh bez DPH (stejná cena jako 24M!)
• Vázanost 36 měsíců | Paušál 180,29 Kč/měsíc
• Cena je totožná s FIX 24 – rozdíl je jen v délce závazku

DISTRIBUTOŘI PLYNU:
• GasNet – sever a střed ČR
• Gas Distribution – jih ČR
• Pražská plynárenská – Praha

CROSS-SELL TIP
Zákazník řeší elektřinu → vždy zkus nabídnout i plyn. Formulace: "Máme výhodné podmínky i na plyn – vše v jedné smlouvě, jedna faktura."`,
      },
      "Ověřte znalosti": {
        quiz: [
          { q: "Jaká je cena HOME FIX 24 bez DPH?", a: ["2 299 Kč/MWh", "2 549 Kč/MWh", "2 349 Kč/MWh", "2 449 Kč/MWh"], correct: 2, explanation: "HOME FIX 24 stojí 2 349 Kč/MWh bez DPH (2 842,29 Kč s DPH). Je to doporučený produkt." },
          { q: "Který HOME FIX tarif je nejdražší z hlediska ceny komodity?", a: ["HOME FIX 24", "HOME FIX 36", "HOME FIX 12", "EXPERT FIX 24"], correct: 2, explanation: "HOME FIX 12 je nejdražší (2 549 Kč/MWh bez DPH), protože zákazník platí za nejkratší závazek." },
          { q: "Pro koho je určen EXPERT FIX 24?", a: ["Domácnosti s vysokou spotřebou", "Zákazníci s D-sazbou distributora", "Podnikatelé a firmy s C-sazbou distributora", "Majitelé elektromobilů"], correct: 2, explanation: "EXPERT FIX je pro podnikatele a firmy s C-sazbou distributora (IČO). D-sazba = HOME FIX." },
          { q: "Pro koho je HOME ELECTREE DRIVE?", a: ["Zákazníci s fotovoltaikou", "Majitelé elektromobilů – chytré nabíjení v levných hodinách", "Firmy s vysokou spotřebou", "Zákazníci v Praze"], correct: 1, explanation: "Electree Drive je speciálně pro majitele elektromobilů. Automaticky nabíjí v nejlevnějších hodinách přes Electree Connect." },
          { q: "Jaká je výkupní cena Home Solar FIX (standard)?", a: ["1 000 Kč/MWh", "400 Kč/MWh", "500 Kč/MWh", "750 Kč/MWh"], correct: 2, explanation: "Home Solar FIX (standard) vykupuje za 500 Kč/MWh. Je nejoblíbenější pro standardní střešní FVE." },
          { q: "Pro jaký rozsah přetoků je Home Solar FIX (standard)?", a: ["Do 1 MWh/rok", "1–10 MWh/rok", "Nad 10 MWh/rok", "Do 5 MWh/rok"], correct: 1, explanation: "Home Solar FIX pokrývá přetoky 1–10 MWh/rok – ideální pro standardní rodinný dům s FVE." },
          { q: "Co je podmínkou pro Home Solar FIX MINI?", a: ["Zákazník musí mít baterii", "Zákazník musí mít zároveň fixní dodávku elektřiny u Electree", "FVE musí být větší než 5 kWp", "Zákazník musí mít smart metr"], correct: 1, explanation: "FIX MINI vyžaduje, aby zákazník měl zároveň fixní odběrovou smlouvu na elektřinu u Electree." },
          { q: "Jaká je cena HOME FIX PLYN 24 bez DPH?", a: ["1 349 Kč/MWh", "1 299 Kč/MWh", "1 571 Kč/MWh", "1 200 Kč/MWh"], correct: 1, explanation: "HOME FIX PLYN 24 stojí 1 299 Kč/MWh bez DPH (1 571,79 Kč s DPH). Je to doporučený produkt pro plyn." },
          { q: "Jak se liší cena HOME FIX PLYN 36 oproti HOME FIX PLYN 24?", a: ["Je o 100 Kč levnější", "Je o 50 Kč dražší", "Je totožná – liší se jen délkou závazku", "Záleží na distributorovi"], correct: 2, explanation: "HOME FIX PLYN 36 má stejnou cenu komodity jako FIX 24. Rozdíl je pouze v délce závazku (36 vs. 24 měsíců)." },
          { q: "Jak začít cross-sell na plyn po uzavření elektřiny?", a: ["Neprodávej dvě věci najednou – nikdy", "Až na dalším hovoru", "Pojďme se podívat i na plyn – máme výhodné podmínky, vše v jedné smlouvě", "Pouze pokud zákazník sám zeptá"], correct: 2, explanation: "Cross-sell přichází po uzavření hlavního tématu. Formulace: výhodné podmínky, jedna smlouva, jedna faktura." },
        ] as QuizQuestion[],
      },
    },
  },
  {
    id: "prodejni-hovor",
    icon: "📞",
    title: "Základní prodejní hovor",
    subtitle: "Struktura, výpočet úspory, argumentace",
    total: 3,
    lessons: [
      { title: "Struktura hovoru od A do Z", mins: 10, type: "reading" },
      { title: "Výpočet úspory a argumentace", mins: 8, type: "reading" },
      { title: "Ověřte znalosti", mins: 8, type: "quiz" },
    ],
    content: {
      "Struktura hovoru od A do Z": {
        body: `ZÁKLADNÍ PRODEJNÍ HOVOR – STRUKTURA

Cílem hovoru je rychle spočítat orientační úsporu, vytvořit u zákazníka pocit, že dnes zbytečně přeplácí, a dostat ho do fáze nabídka nebo podpis.

Z leadu máme (VĚTŠINOU) 4 klíčové údaje: stávající dodavatel, cena za MWh, výše měsíčních záloh, roční spotřeba.

1. OTEVŘENÍ HOVORU
Hovor musí začít rychle, lidsky a jasně. Zákazník má okamžitě vědět, kdo volá, proč volá a že hovor nebude dlouhý.

Formulace: "Dobrý den, paní Nováková? Tady Petra z Electree. Volám vám, protože jste si u nás žádala o cenovou nabídku na elektřinu. Hodí se vám teď chvilka? Zabere to maximálně 10 minut."

2. OZNÁMENÍ NAHRÁVÁNÍ
"Pro pořádek vás chci informovat, že je hovor z důvodu kvality nahráván. Souhlasíte? Děkuji."

Nezdržuj se – jakmile zákazník souhlasí, okamžitě navazuj.

3. POTVRZENÍ DAT
"V dotazníku jste uvedla, že máte teď cenu přibližně X Kč za MWh, zálohy Y Kč měsíčně a roční spotřebu Z MWh. Sedí to?"

Nikdy neslibuješ konkrétní úsporu bez všech 4 vstupních dat.

4. VÝPOČET ÚSPORY A ARGUMENTACE
Nestačí říct částku. Zákazník musí pochopit, co pro něj úspora znamená v životě.

Formulace: "Ročně byste u nás s tarifem HOME FIX 24 ušetřila přibližně 3 800 Kč. K tomu vám klesnou měsíční zálohy o cca 320 Kč – každý měsíc vám zůstane víc peněz. A navíc máte na 2 roky jistotu, že se cena nezmění."

CO ZÁKAZNÍK OPRAVDU KUPUJE
Zákazník nekupuje MWh. Kupuje:
• Úsporu (konkrétní číslo v Kč)
• Jistotu (cena se nezmění)
• Klid (nemusí řešit trh)
• Jednoduché řešení (všechno zařídíme za něj)`,
      },
      "Výpočet úspory a argumentace": {
        body: `JAK SPOČÍTAT ÚSPORU

Vstupní data z leadu:
• Stávající cena zákazníka za MWh (bez DPH)
• Roční spotřeba v MWh
• Měsíční zálohy

Orientační výpočet komoditní úspory za rok:
(Stávající cena/MWh − Naše cena/MWh) × roční spotřeba = roční úspora na komoditě

Příklad:
Zákazník platí 3 200 Kč/MWh, roční spotřeba 10 MWh.
My nabídneme HOME FIX 24 za 2 349 Kč/MWh.
Úspora: (3 200 − 2 349) × 10 = 8 510 Kč/rok

EMOCIONÁLNÍ ARGUMENTACE
Nestačí říct "ušetříte 8 510 Kč". Přelož to do života:
• "To jsou zálohy přibližně o 700 Kč měsíčně nižší."
• "To jsou víkendové výlety navíc každý rok."
• "To je jistota, že vám cena nepůjde nahoru."

CO NESMÍŠ SLÍBIT:
• Slevy nebo změny cen, které nejsou v platném ceníku
• Konkrétní úsporu bez všech 4 vstupních dat
• Že fix bude vždy nejlevnější řešení
• Cokoliv, co není kryto obchodními podmínkami

KLÍČOVÁ ZÁSADA
Operátorka musí působit jistě, stručně a srozumitelně. Zákazník nekupuje tabulku, ale lepší rozhodnutí.`,
      },
      "Ověřte znalosti": {
        quiz: [
          { q: "Jaké jsou 4 klíčové údaje z leadu, se kterými pracujeme?", a: ["Jméno, telefon, e-mail, adresa", "Dodavatel, cena MWh, měsíční zálohy, roční spotřeba", "Dodavatel, typ tarifu, jistič, sazba", "Spotřeba, sazba, EAN, IČO"], correct: 1, explanation: "Z leadu potřebujeme: stávající dodavatel, cena za MWh, výše zálohy, roční spotřeba – z toho spočítáme úsporu." },
          { q: "Co zákazník opravdu kupuje (ne elektřinu)?", a: ["Nejnižší cenu na trhu", "Jistotu, klid, úsporu a jednoduché řešení", "Smlouvu na 24 měsíců", "Technické parametry tarifu"], correct: 1, explanation: "Zákazník nekupuje MWh – kupuje jistotu, klid, úsporu v Kč a jednoduché vyřízení bez starostí." },
          { q: "Jak správně zahájit hovor?", a: ["Okamžitě nabídnout úsporu bez představení", "Rychle, lidsky a jasně – kdo volá, proč a jak dlouho to zabere", "Zeptat se na EAN číslo", "Přečíst smluvní podmínky"], correct: 1, explanation: "Otevření má být rychlé, lidské, jasné. Zákazník musí hned vědět kdo volá, proč a že to nebude trvat dlouho." },
          { q: "Co musí operátorka oznámit hned na začátku hovoru?", a: ["Přesnou cenu produktu", "Délku smlouvy a sankce", "Nahrávání hovoru z důvodu kvality", "Jméno a příjmení zákazníka"], correct: 2, explanation: "Nahrávání je nutné oznámit a získat souhlas na začátku. Po souhlasu okamžitě navazujeme na důvod hovoru." },
          { q: "Kdy smíš slíbit konkrétní úsporu zákazníkovi?", a: ["Vždy, bez ohledu na dostupná data", "Pouze pokud má zákazník více než 10 MWh roční spotřebu", "Pouze pokud máš všechna 4 vstupní data z leadu", "Nikdy – úspory se nesmí slibovat"], correct: 2, explanation: "Konkrétní úsporu lze slíbit pouze pokud máme všechna 4 data. Bez nich hovoříme pouze orientačně." },
          { q: "Jak spočítáme orientační roční komoditní úsporu?", a: ["(Naše cena − zákazníkova cena) × spotřeba", "(Zákazníkova cena − naše cena) × roční spotřeba v MWh", "Zákazníkovy zálohy − naše zálohy × 12", "Zákazníkova spotřeba × naše paušál"], correct: 1, explanation: "Správný vzorec: (zákazníkova cena/MWh − naše cena/MWh) × roční spotřeba. Výsledek je roční úspora na komoditě." },
          { q: "Jak správně přeložit úsporu pro zákazníka?", a: ["Říci jen číslo v Kč ročně", "Přeložit do každodenního přínosu: nižší zálohy, méně starostí, konkrétní částky", "Ukázat tabulku s cenami", "Porovnat s cenami konkurence"], correct: 1, explanation: "Nestačí říct číslo. Zákazník musí pochopit dopad: nižší zálohy každý měsíc, jistota na 2 roky, méně starostí." },
          { q: "Co nesmíš zákazníkovi nikdy slíbit?", a: ["Datum zahájení dodávky", "Jméno kontaktní osoby", "Slevy nebo změny cen, které nejsou v ceníku", "Výši zálohy"], correct: 2, explanation: "Operátorka nesmí slíbit: slevy mimo ceník, úsporu bez dat, že fix je vždy nejlevnější, nic bez krytí podmínkami." },
          { q: "Co je cílem otevření hovoru?", a: ["Uzavřít smlouvu ihned v první větě", "Zákazníka uklidnit, zaujmout a otevřít prostor pro dialog", "Přečíst zákazníkovi všechny produkty", "Zjistit EAN číslo odběrného místa"], correct: 1, explanation: "První věty mají zákazníka uklidnit a otevřít prostor. Ne prodávat – nejdřív musíme pochopit jeho situaci." },
          { q: "Jak dlouhý má být hovor dle otevírací formulace?", a: ["30 minut", "Maximálně 10 minut", "1 hodina", "Záleží na zákazníkovi, hovor nekončíme"], correct: 1, explanation: "Při otevření řekneme: 'Zabere to maximálně 10 minut.' Zákazník ví, že to nebude zdlouhavé." },
        ] as QuizQuestion[],
      },
    },
  },
  {
    id: "namitky",
    icon: "🛡️",
    title: "Základní námitky",
    subtitle: "Klidná reakce, argumentace, návrat k řešení",
    total: 3,
    lessons: [
      { title: "Námitky 1–5 a jak na ně", mins: 10, type: "reading" },
      { title: "Námitky 6–10 a compliance", mins: 10, type: "reading" },
      { title: "Ověřte znalosti", mins: 10, type: "quiz" },
    ],
    content: {
      "Námitky 1–5 a jak na ně": {
        body: `NÁMITKA 1 – Musím si to rozmyslet
Reakce: "Rozumím. A co konkrétně si nejste jistá? Úsporu jsme spočítali, ceny vám potvrdím e-mailem a výpověď u stávajícího dodavatele zařídíme my. Co vám ještě chybí k rozhodnutí?"
Proč: Tato věta je často jen obranná reakce. Zjisti skutečný důvod nejistoty.

NÁMITKA 2 – Mám smlouvu u jiného dodavatele
Reakce: "To není problém. Výpověď za vás zajistíme my na základě plné moci. Vy se o nic nemusíte starat, stačí jen podepsat."
Proč: Zákazník nesmí mít pocit, že ho čeká složité papírování. Přechod je jednoduchý a vyřešený za něj.

NÁMITKA 3 – Nemám teď čas
Reakce: "Chápu. Kdy se vám hodí, abych zavolala zpátky? Zabere to jen pár minut a potom už jen podepíšete nabídku."
Proč: Nepusť zákazníka bez dalšího kroku. Domluv konkrétní termín zpětného volání.

NÁMITKA 4 – Nejste příliš drazí?
Reakce: "Naopak, z výpočtu vyšlo, že oproti tomu, co platíte teď, ušetříte přibližně X Kč ročně. A navíc máte cenu zafixovanou."
Proč: Nevracej se do obecné debaty o trhu. Vrať zákazníka ke konkrétním číslům.

NÁMITKA 5 – Slyšela jsem o vás něco špatného
Reakce: "Děkuji za upřímnost. Část podobných reakcí bývá od zákazníků, pro které byl přechod náročný. U vás ale vše poběží přesně podle nabídky, kterou jsme společně spočítali a kterou vám pošlu i e-mailem."
Proč: Nikdy neshoď zákazníka ani mu neříkej, že se mýlí. Uznej obavu, pak vrať hovor k faktům.`,
      },
      "Námitky 6–10 a compliance": {
        body: `NÁMITKA 6 – Když se ceny sníží, budu mít fix zbytečně drahý
Reakce: "To je fér úvaha. Fix ale není o tom, že musí být v každém momentu nejnižší. Je o jistotě, že vás nepřekvapí růst ceny a dopředu víte, s čím počítat."
Proč: Nevysvětluj fix jako univerzálně nejlevnější – vysvětluj ho jako jistotu a ochranu před výkyvy.

NÁMITKA 7 – Chci nejdřív porovnat více nabídek
Reakce: "To je rozumné. Právě proto vám chci dát co nejkonkrétnější podklad. Pošlu vám nabídku pro vaši domácnost, kterou budete moct férově porovnat s ostatními."
Proč: Nevystupuj proti srovnávání – buď tím, kdo dá nejkonkrétnější a nejčitelnější materiál.

NÁMITKA 8 – Mám to doma na partnerovi
Reakce: "Rozumím. Dává smysl, abyste měli oba stejné informace. Pošlu vám vše přehledně e-mailem a případně se domluvme, kdy se vám ozvu znovu, až to proberete."
Proč: Cílem je dostat hovor do konkrétního dalšího kroku, ne tlačit na rozhodnutí bez druhé osoby.

NÁMITKA 9 – Jednou jsem měnila dodavatele a bylo to hrozné
Reakce: "Chápu, po špatné zkušenosti je člověk opatrný. Právě proto vám chci vše popsat jednoduše – přesně co se bude dít, kdy to proběhne a co za vás zařídíme my."
Proč: Nezpochybňuj minulou zkušenost. Ukažte, že tentokrát bude zákazník vědět vše předem.

NÁMITKA 10 – Bojím se, že zůstanu bez elektřiny
Reakce: "Toho se bát nemusíte. Přechod probíhá administrativně a po celou dobu zůstáváte připojena. Mění se jen firma na faktuře."
Proč: Toto je silná emoční obava. Nejprve zákazníka uklidni, teprve pak pokračuj dál.

CO OPERÁTORKA NESMÍ NIKDY SLÍBIT
• Slevy nebo změny cen, které nejsou v platném ceníku
• Konkrétní úsporu bez všech 4 vstupních dat
• Že fix bude vždy nejlevnější řešení
• Jakýkoli slib, který není krytý obchodními podmínkami`,
      },
      "Ověřte znalosti": {
        quiz: [
          { q: "Jak reagovat na námitku 'Musím si to rozmyslet'?", a: ["Souhlasit a ukončit hovor", "Zjistit konkrétní důvod nejistoty a nabídnout řešení", "Opakovat úsporu dokud zákazník nesouhlasí", "Říct, že nabídka platí jen dnes"], correct: 1, explanation: "'Musím si to rozmyslet' je často obranná reakce. Zjistěte skutečný důvod – ptejte se: 'Co vám konkrétně chybí k rozhodnutí?'" },
          { q: "Jak reagovat na 'Mám smlouvu u jiného dodavatele'?", a: ["Říct, že nemůžeme pomoci dokud smlouva neskončí", "Vysvětlit, že výpověď za zákazníka zařídíme my na základě plné moci", "Přejít na jiný produkt", "Počkat, až smlouva vyprší"], correct: 1, explanation: "Zákazník se nemusí bát papírování. Výpověď u stávajícího dodavatele za něj zařídíme my na základě plné moci." },
          { q: "Zákazník říká 'Nemám teď čas'. Co uděláš?", a: ["Rychle dokončit celý hovor v 1 minutě", "Domluvit konkrétní termín zpětného volání", "Říct, ať zavolá sám až bude mít čas", "Ukončit hovor a přejít na dalšího zákazníka"], correct: 1, explanation: "Nikdy nepusť zákazníka bez konkrétního dalšího kroku. Domluv přesný čas zpětného volání." },
          { q: "Zákazník říká 'Nejste příliš drazí?'. Co odpovíš?", a: ["Přiznat, že možná máme vyšší ceny", "Vrátit zákazníka ke konkrétní spočítané úspoře v jeho situaci", "Zahájit debatu o vývoji cen na trhu", "Nabídnout extra slevu"], correct: 1, explanation: "Nevracej se do abstraktní diskuse o trhu. Vrať zákazníka ke konkrétním číslům a úspoře, kterou jsi spočítal/a." },
          { q: "Zákazník říká 'Slyšela jsem o vás něco špatného'. Co neuděláš?", a: ["Poděkovat za upřímnost", "Říct zákazníkovi, že se mýlí a ta negativní info je lež", "Uznat obavu a vrátit hovor k faktům a konkrétní nabídce", "Vysvětlit, co zákazník ve svém případě může očekávat"], correct: 1, explanation: "Nikdy neshazuj zákazníka nebo neříkej, že se mýlí. Uznej obavu, vrať se k faktům a k jistotě procesu." },
          { q: "Jak správně vysvětlit zákazníkovi, proč je fix dobrá volba i když ceny mohou klesnout?", a: ["Slíbit, že fix bude vždy nejlevnější na trhu", "Říct, že ceny stejně půjdou nahoru", "Vysvětlit, že fix přináší jistotu a ochranu před výkyvy – ne nutně absolutní minimum", "Nabídnout jiný produkt"], correct: 2, explanation: "Fix není o absolutně nejnižší ceně. Je o jistotě a předvídatelnosti. To je jeho hodnota, ne garancia nejlevnější ceny." },
          { q: "Zákazník chce porovnat více nabídek. Jak reaguješ?", a: ["Odradit ho od porovnávání", "Říct, že ostatní nabídky jsou horší bez konkrétních dat", "Přijmout to a poskytnout nejkonkrétnější podklad pro srovnání", "Přejít okamžitě na jiný produkt"], correct: 2, explanation: "Přijmi srovnávání jako logický krok. Cíl: být tím, kdo dá nejkonkrétnější a nejčitelnější nabídku pro zákazníkovu situaci." },
          { q: "Zákazník říká 'Mám to doma na manželu'. Co je cílem reakce?", a: ["Přesvědčit zákazníka, aby rozhodl sám/a bez partnera", "Dostat hovor do konkrétního dalšího kroku – poslat info + domluvit termín", "Zavolat přímo na manžela/manželku", "Ukončit hovor – bez partnera nelze smlouvu uzavřít"], correct: 1, explanation: "Cíl není tlačit na rozhodnutí bez partnera, ale zajistit konkrétní další krok: e-mail + domluvený termín dalšího hovoru." },
          { q: "Zákazník se bojí, že zůstane bez elektřiny při přechodu. Co řekneš JAKO PRVNÍ?", a: ["Vysvětlit celý technický proces přechodu", "Nejprve zákazníka uklidnit – přechod je administrativní, dodávka běží nepřetržitě", "Říct, že se to stát nemůže a jít dál", "Přejít na jiné téma"], correct: 1, explanation: "Nejprve uklidni – toto je silná emoční obava. Teprve po uklidnění vysvětluj, jak přechod funguje." },
          { q: "Co nesmíš zákazníkovi nikdy slíbit?", a: ["Datum zpětného volání", "Výši orientační úspory při dostupných datech", "Slevy nebo změny cen, které nejsou v platném ceníku", "Dobu trvání hovoru"], correct: 2, explanation: "Compliance: nikdy neslibuj slevy mimo ceník, úsporu bez dat, že fix je vždy nejlevnější, ani nic bez krytí podmínkami." },
        ] as QuizQuestion[],
      },
    },
  },
  {
    id: "uzavreni",
    icon: "✅",
    title: "Uzavření hovoru a zápis",
    subtitle: "CTA, plná moc, cross-sell, co zapsat",
    total: 3,
    lessons: [
      { title: "Call to action a závěr hovoru", mins: 8, type: "reading" },
      { title: "Zápis a cross-sell", mins: 6, type: "reading" },
      { title: "Ověřte znalosti", mins: 8, type: "quiz" },
    ],
    content: {
      "Call to action a závěr hovoru": {
        body: `UZAVŘENÍ HOVORU

Po výpočtu úspory a zpracování námitek musí operátorka jasně vést zákazníka k dalšímu kroku. Nesmí čekat, až zákazník sám navrhne pokračování.

SPRÁVNÉ UZAVŘENÍ = říci, co se stane teď, co udělá operátorka a co udělá zákazník.

CALL TO ACTION – FORMULACE
Po výpočtu a vyřešení námitek musí zaznít jasná výzva:

"Co říkáte, pojďme to zafixovat? Pošlu vám nabídku ke kontrole na e-mail, vy se podíváte a hned ji podepíšete online. Celé to zabere jen pár minut."

Nebo: "Vyplatí se vám to. Připravím vám to rovnou teď, ať to máte hned z krku."

Závěr nesmí být pasivní. Ty vedeš další krok.

UZAVŘENÍ SMLOUVY A PLNÁ MOC
Jakmile zákazník souhlasí:
1. Okamžitě pošli nabídku a plnou moc
2. Vysvětli, že Electree za zákazníka vyřídí výpověď u stávajícího dodavatele
3. Ujisti zákazníka, že po celou dobu zůstane připojen – mění se pouze firma na faktuře

Formulace: "Super. Pošlu vám nabídku na e-mail. Spolu s ní přijde i plná moc, díky které za vás vyřídíme výpověď u stávajícího dodavatele. Vy pouze podepíšete a my se postaráme o zbytek."

CO SE DĚJE PO HOVORU
Po podpisu zákazník obdrží nabídku a plnou moc online. Electree podá výpověď u stávajícího dodavatele, zajistí přepis odběrného místa a zákazník je informován o datu zahájení dodávky.`,
      },
      "Zápis a cross-sell": {
        body: `CO ZAPSAT PO HOVORU

Zápis musí být stručný, ale úplný. Když se ke zákazníkovi vrátí kolegyně nebo zákazník zavolá zpět, musí být zapsáno vše důležité.

POVINNÉ POLOŽKY ZÁPISU:
1. Zda byl zákazník zastižen a zda hovor mohl proběhnout
2. Zda byla potvrzena vstupní data z leadu (cena, spotřeba, zálohy, dodavatel)
3. Jaká orientační úspora byla komunikována (číslo v Kč)
4. Jaká námitka zazněla
5. Jak na ni operátorka reagovala
6. Zda zákazník souhlasil se zasláním nabídky
7. Zda byla odeslána nabídka a plná moc
8. Jaký je další krok nebo termín kontaktu

CROSS-SELL NA KONCI HOVORU
Pokud zákazník souhlasí s elektřinou, je možné otevřít další produkty. Cross-sell přichází vždy AŽ PO uzavření hlavního tématu – nikdy ne místo něj.

Formulace pro plyn:
"Topíte plynem? Můžeme vám spočítat úsporu i tam."

Formulace pro výkup FVE:
"Máte fotovoltaiku? Electree patří mezi nejvýznamnější výkupce přebytků."

PRAVIDLO: Neprodávej dvě hlavní věci najednou. Nejprve uzavři elektřinu, teprve pak otevři další možnost.`,
      },
      "Ověřte znalosti": {
        quiz: [
          { q: "Kdo má vést závěr hovoru k dalšímu kroku?", a: ["Zákazník sám navrhne, co chce dělat", "Operátorka aktivně vede závěr a navrhuje konkrétní další krok", "Vedoucí smlouvy", "Zákazník i operátorka společně"], correct: 1, explanation: "Závěr nesmí být pasivní. Operátorka vede hovor k výsledku – zákazník musí po hovoru přesně vědět, co bude následovat." },
          { q: "Co je plná moc v kontextu přechodu dodavatele?", a: ["Dokument pro změnu tarifu", "Autorizace, aby Electree za zákazníka vyřídila výpověď u stávajícího dodavatele", "Souhlas s nahráváním hovoru", "Zákazníkův podpis na smlouvě"], correct: 1, explanation: "Plná moc umožňuje Electree za zákazníka podat výpověď u stávajícího dodavatele. Zákazník jen podepíše – vše ostatní zařídíme my." },
          { q: "Co se mění při přechodu k Electree z pohledu zákazníka?", a: ["Zákazník dostane nový elektroměr", "Přeruší se dodávka na dobu přepisu", "Mění se jen firma na faktuře – fyzická dodávka elektřiny pokračuje bez přerušení", "Zákazník musí podepsat dohodu s distributorem"], correct: 2, explanation: "Fyzická dodávka elektřiny nikdy nepřestane. Mění se pouze firma, od které zákazník kupuje elektřinu – jinak se nic nemění." },
          { q: "Kdy je správný čas pro cross-sell (nabídnutí plynu nebo výkupu)?", a: ["Na začátku hovoru jako úvod", "Souběžně s elektřinou – oboje najednou", "Až po uzavření hlavního tématu – nikdy místo něj", "Pouze v dalším hovoru"], correct: 2, explanation: "Cross-sell přichází vždy po uzavření hlavního tématu. Nejprve uzavři elektřinu, teprve pak otevři plyn nebo FVE výkup." },
          { q: "Co musí být v zápisu vždy uvedeno? (vyber nejúplnější odpověď)", a: ["Pouze výsledek hovoru – souhlasil nebo nesouhlasil", "Dat zákazníka, úspora, námitka, reakce, souhlas se zasláním, odeslána nabídka, další krok", "Jen jméno zákazníka a datum hovoru", "EAN číslo a cena tarifu"], correct: 1, explanation: "Zápis musí zachytit: zastižení, potvrzení dat, komunikovaná úspora, námitka, reakce, souhlas, odeslání nabídky, další krok." },
          { q: "Jak začít cross-sell na plyn?", a: ["Přejít na plyn bez varování uprostřed hovoru", "Nejprve uzavřít elektřinu, pak se zeptat 'Topíte plynem? Můžeme spočítat úsporu i tam.'", "Nesmím nabízet plyn při hovoru o elektřině", "Počkat na iniciativu zákazníka"], correct: 1, explanation: "Nejprve elektřinu, pak plyn. Formulace: 'Topíte plynem? Můžeme vám spočítat úsporu i tam.' Jednoduché a přirozené." },
          { q: "Zákazník souhlasí s nabídkou. Co uděláš okamžitě?", a: ["Zapsat si to a zavolat zpět zítra", "Okamžitě odeslat nabídku a plnou moc e-mailem", "Přejít na cross-sell plynu", "Čekat, zda zákazník sám zeptá na e-mail"], correct: 1, explanation: "Po souhlasu okamžitě odesíláme nabídku a plnou moc. Neotálíme – zákazník může do rána rozmyslet." },
          { q: "Co zákazníkovi zdůrazníme při uzavírání k překonání strachu ze změny?", a: ["Že ostatní dodavatelé jsou nespolehliví", "Jednoduchost přechodu – zákazník jen podepíše, vše ostatní zařídíme my", "Výhodnost nízké ceny za každou cenu", "Délku smlouvy a sankce za předčasné ukončení"], correct: 1, explanation: "Zákazník se bojí změny. Klíčové je zdůraznit jednoduchost: zákazník jen podepíše – výpověď, přepis i komunikaci s distributorem řešíme my." },
          { q: "Proč je stručný ale úplný zápis důležitý?", a: ["Pouze pro interní statistiky firmy", "Aby kolegyně nebo zákazník, kteří se vrátí, měli všechny důležité informace", "Jen jako právní ochrana", "Zápis ve skutečnosti není potřeba"], correct: 1, explanation: "Zápis je pro kontinuitu péče o zákazníka. Kdokoli, kdo se zákazníkem dále pracuje, musí mít plný kontext." },
          { q: "Jak formulovat CTA (call to action) po zvládnutí námitky?", a: ["Čekat, zda zákazník sám rozhodne", "Aktivně navrhnutí dalšího kroku: 'Pojďme to zafixovat – pošlu vám nabídku na e-mail'", "Říct zákazníkovi ať si rozmyslí a zavolá", "Přejít na jiný produkt"], correct: 1, explanation: "CTA musí být aktivní a konkrétní. Operátorka navrhuje krok, popisuje co se stane a snižuje bariéru rozhodnutí." },
        ] as QuizQuestion[],
      },
    },
  },
  {
    id: "wiki-praxe",
    icon: "🔍",
    title: "Samostatná práce s Electree Wiki",
    subtitle: "Vyhledávání, SOPs, správný zdroj",
    total: 2,
    lessons: [
      { title: "Jak pracovat s Electree Wiki", mins: 5, type: "reading" },
      { title: "Ověřte znalosti", mins: 5, type: "quiz" },
    ],
    content: {
      "Jak pracovat s Electree Wiki": {
        body: `ELECTREE WIKI – VÁŠ PRACOVNÍ NÁSTROJ

Electree Wiki je centrální místo pro všechny informace, které potřebujete při práci. Obsahuje:

KATEGORIE VE WIKI:
• Produkt – popisy produktů, ceny, pro koho se hodí, kdy nabídnout
• Distribuce – distribuční sazby D a C, VT/NT, jistič
• Pojmy – EAN, odstoupení od smlouvy, výpověď, základní pojmy
• SOP (Standardní operační postup) – přesný postup krok za krokem pro konkrétní akce v EIS
• Retence – jak reagovat, gdy zákazník chce odejít, námitky

JAK VYHLEDÁVAT
Vyhledávání funguje chytře:
• Hledej bez diakritiky: napsat "distribucni sazby" najde "Distribuční sazby"
• Zkus různá klíčová slova: "EAN", "výrobce", "PPP"
• Pokud nic nenajdeš – zkus jiné slovo nebo méně slov

SOP vs. WIKI – KDY CO POUŽÍT
Wiki vysvětluje "co to je a jak to funguje" – vhodné pro pochopení pojmu nebo situace.
SOP říká přesně "jak postupovat krok za krokem v systému" – vhodné při konkrétní akci v EIS.

Příklad:
• "Co je EAN výrobce?" → Wiki, kategorie Pojmy
• "Jak uzavřít smlouvu na výkup v EIS?" → Wiki, kategorie SOP

CÍL TOHOTO MODULU
Umět si samostatně najít správnou odpověď a použít ji v praxi – bez závislosti na kolegyních nebo vedoucím.`,
      },
      "Ověřte znalosti": {
        quiz: [
          { q: "Kde ve Wiki najdeš popisy produktů a jejich ceny?", a: ["Kategorie SOP", "Kategorie Distribuce", "Kategorie Produkt", "Kategorie Pojmy"], correct: 2, explanation: "Kategorie Produkt obsahuje popisy všech produktů, ceny, pro koho se hodí a kdy je nabídnout." },
          { q: "Co je SOP?", a: ["Souhrn produktových podmínek", "Standardní operační postup – přesný krok za krokem návod pro akci v EIS", "Systém oceňování produktů", "Sazba od distributora"], correct: 1, explanation: "SOP = Standardní Operační Postup. Říká přesně jak postupovat v systému EIS při konkrétní akci." },
          { q: "Jaký je rozdíl mezi Wiki a SOP?", a: ["Nejsou žádný rozdíl", "Wiki vysvětluje pojmy a principy, SOP popisuje přesný postup v systému krok za krokem", "SOP je pro manažery, Wiki pro operátorky", "Wiki je online, SOP je tištěný"], correct: 1, explanation: "Wiki = pochopení situace a pojmů. SOP = jak přesně postupovat v konkrétním případě v EIS." },
          { q: "Hledáš info o EAN výrobce. Kde to najdeš?", a: ["SOP – Změna ceníku", "Produkt – HOME SOLAR FIX", "Pojmy – EAN odběratele vs EAN výrobce", "Distribuce – distribuční sazby C"], correct: 2, explanation: "EAN a jeho typy jsou vysvětleny v kategorii Pojmy. Hledej 'EAN' nebo 'výrobce' ve vyhledávacím poli." },
          { q: "Funguje vyhledávání ve Wiki bez diakritiky?", a: ["Ne – musíš psát přesně s háčky a čárkami", "Ano – napsat 'distribucni sazby' najde 'Distribuční sazby'", "Pouze pro názvy produktů", "Pouze v části SOP"], correct: 1, explanation: "Wiki má chytré vyhledávání – funguje i bez diakritiky. 'distribucni sazby' najde 'Distribuční sazby D'." },
          { q: "Potřebuješ vědět, jak zadat novou smlouvu na dodávku elektřiny v EIS. Kam jdeš?", a: ["Kategorie Produkt – HOME FIX 24", "Kategorie SOP – Smlouva na dodávku elektřiny", "Kategorie Pojmy – Odstoupení od smlouvy", "Kategorie Retence"], correct: 1, explanation: "Pro postup v EIS jdi do kategorie SOP. Tam je přesný krok za krokem návod pro konkrétní akce v systému." },
          { q: "Co uděláš, pokud vyhledávání nic nenajde?", a: ["Zeptat se kolegyně místo hledání", "Zkusit jiné nebo méně slov ve vyhledávacím poli", "Přijmout, že informace neexistuje", "Zavolat vedoucímu"], correct: 1, explanation: "Zkus jiné slovo nebo méně slov. Wiki může mít informaci pod jiným termínem – experimentuj s hledáním." },
          { q: "Zákazník se ptá na postup při přepisu výrobny FVE. Kde to najdeš?", a: ["Kategorie Produkt", "Kategorie SOP – Přepis výrobny", "Kategorie Pojmy – EAN", "Kategorie Distribuce"], correct: 1, explanation: "Přepis výrobny je konkrétní postup v EIS – jde do kategorie SOP. Hledej 'přepis' nebo 'výrobna'." },
          { q: "Proč je důležité umět pracovat s Wiki samostatně?", a: ["Jen pro interní hodnocení výkonu", "Abys mohla rychle najít správnou odpověď bez závislosti na kolegyních", "Wiki je povinná součást každého hovoru", "Protože vedoucí to nechce vysvětlovat znova"], correct: 1, explanation: "Cíl je nezávislost – rychle najít správnou informaci sám/sama a použít ji v praxi bez ptaní se ostatních." },
          { q: "Zákazník se ptá na podmínky odstoupení od smlouvy. Kde to najdeš rychle?", a: ["SOP – Změna ceníku", "Pojmy – Odstoupení od smlouvy", "Produkt – HOME FIX 24", "Retence – zákazník chce odejít"], correct: 1, explanation: "Odstoupení od smlouvy je pojmové vysvětlení – najdeš ho v kategorii Pojmy. Hledej 'odstoupení' nebo '14 dní'." },
        ] as QuizQuestion[],
      },
    },
  },
];

// ─── LEVEL B (zamčeno) ───────────────────────────────────────────────────────

const LEVEL_B: Module[] = [
  { id: "b-energetika", icon: "⚡", title: "Rozšířená energetika", subtitle: "Trh, kontext, situace zákazníků", total: 0, locked: true, lessons: [], content: {} },
  { id: "b-produkty", icon: "📦", title: "Pokročilé produkty a služby", subtitle: "Vhodnost řešení, srovnání, limity", total: 0, locked: true, lessons: [], content: {} },
  { id: "b-hovor", icon: "📞", title: "Pokročilé vedení hovoru", subtitle: "Tok hovoru, přechody, kontrola", total: 0, locked: true, lessons: [], content: {} },
  { id: "b-diagnostika", icon: "🔎", title: "Diagnostika potřeb zákazníka", subtitle: "Otázky, motivace, situace", total: 0, locked: true, lessons: [], content: {} },
  { id: "b-sales", icon: "💼", title: "Pokročilé sales dovednosti", subtitle: "Hodnota, argumentace, přínos", total: 0, locked: true, lessons: [], content: {} },
  { id: "b-odpor", icon: "🛡️", title: "Námitky a práce s odporem", subtitle: "Typy odporu, obava, nejistota", total: 0, locked: true, lessons: [], content: {} },
  { id: "b-closing", icon: "✅", title: "Uzavírání obchodu", subtitle: "Closing, signály readiness, next step", total: 0, locked: true, lessons: [], content: {} },
  { id: "b-komunikace", icon: "🗣️", title: "Komunikace a přesvědčivost", subtitle: "Jistota, jazyk, rytmus, stručnost", total: 0, locked: true, lessons: [], content: {} },
  { id: "b-wiki", icon: "🔍", title: "Práce s Electree Wiki v praxi", subtitle: "Vyhledávání, ověřování, návaznosti", total: 0, locked: true, lessons: [], content: {} },
];

// ─── LEVEL C (zamčeno) ───────────────────────────────────────────────────────

const LEVEL_C: Module[] = [
  { id: "c-role", icon: "👥", title: "Role teamleadra", subtitle: "Odpovědnost, výkon, lidé, provoz", total: 0, locked: true, lessons: [], content: {} },
  { id: "c-vedeni", icon: "🎯", title: "Vedení lidí", subtitle: "Leadership styly, motivace", total: 0, locked: true, lessons: [], content: {} },
  { id: "c-coaching", icon: "💬", title: "Coaching operátorek", subtitle: "Rozvoj po hovorech, zpětná vazba", total: 0, locked: true, lessons: [], content: {} },
  { id: "c-qa", icon: "📊", title: "QA a hodnocení kvality", subtitle: "Poslech, kalibrace, scorecards", total: 0, locked: true, lessons: [], content: {} },
  { id: "c-kpi", icon: "📈", title: "Výkon a KPI", subtitle: "Metriky, trendy, interpretace", total: 0, locked: true, lessons: [], content: {} },
  { id: "c-vykon", icon: "⚠️", title: "Práce s problémovým výkonem", subtitle: "Slabý výkon, nápravný plán", total: 0, locked: true, lessons: [], content: {} },
  { id: "c-eskalace", icon: "🔥", title: "Eskalace a rozhodování", subtitle: "Výjimky, konflikty, složité situace", total: 0, locked: true, lessons: [], content: {} },
  { id: "c-onboarding", icon: "🌱", title: "Rozvoj týmu a onboarding", subtitle: "Zaškolení, plánování růstu, mentoring", total: 0, locked: true, lessons: [], content: {} },
];

type Level = "A" | "B" | "C";

const ALL_MODULES: Record<Level, Module[]> = { A: LEVEL_A, B: LEVEL_B, C: LEVEL_C };

const LEVEL_META: Record<Level, { label: string; desc: string; color: string }> = {
  A: { label: "Level A", desc: "Ready na základní prodejní provoz", color: "#D7FF00" },
  B: { label: "Level B", desc: "Pokročilejší prodej a širší orientace", color: "#B8E8D0" },
  C: { label: "Level C", desc: "Vedení lidí a výkon", color: "#D1DFD8" },
};

const typeIcon: Record<string, string> = { video: "▶️", reading: "📄", quiz: "📝" };

function QuizCard({ quiz, onFinish }: { quiz: QuizQuestion[]; onFinish?: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const optLabels = ["A", "B", "C", "D"];
  const q = quiz[step];

  const handleSelect = (idx: number) => { if (confirmed) return; setSelected(idx); setConfirmed(true); };

  const handleNext = () => {
    const newResults = [...results, selected === q.correct];
    if (step + 1 >= quiz.length) { setResults(newResults); setDone(true); }
    else { setResults(newResults); setStep(step + 1); setSelected(null); setConfirmed(false); }
  };

  const handleReset = () => { setStep(0); setSelected(null); setConfirmed(false); setResults([]); setDone(false); };

  if (done) {
    const score = results.filter(Boolean).length;
    const pct = Math.round((score / quiz.length) * 100);
    const passed = pct >= 70;
    return (
      <div className="space-y-4">
        <div className={`rounded-2xl p-6 text-center ${passed ? "bg-[#D7FF00]" : "bg-red-50 border border-red-200"}`}>
          <div className="text-4xl mb-2">{passed ? "🎉" : "📚"}</div>
          <div className={`text-2xl font-bold mb-1 ${passed ? "text-[#0D3D34]" : "text-red-700"}`}>{score}/{quiz.length} správně</div>
          <div className={`text-sm font-semibold mb-4 ${passed ? "text-[#0D3D34]/70" : "text-red-600"}`}>{pct} % — {passed ? "Výborně!" : "Zkus to ještě jednou."}</div>
          <div className="flex gap-2 justify-center">
            <button onClick={handleReset} className={`px-4 py-2 rounded-xl text-sm font-bold hover:opacity-80 ${passed ? "bg-[#0D3D34]/10 text-[#0D3D34]" : "bg-red-600 text-white"}`}>Zkusit znovu</button>
            {onFinish && <button onClick={onFinish} className="px-4 py-2 rounded-xl text-sm font-bold bg-[#0D3D34] text-[#D7FF00] hover:opacity-90">Dokončit lekci →</button>}
          </div>
        </div>
        <div className="space-y-2">
          {quiz.map((question, i) => (
            <div key={i} className={`rounded-xl p-3 border ${results[i] ? "bg-[#EBF7F1] border-[#B8E8D0]" : "bg-red-50 border-red-200"}`}>
              <div className="flex items-start gap-2">
                <span className={`text-sm flex-shrink-0 mt-0.5 ${results[i] ? "text-[#1A6B5A]" : "text-red-600"}`}>{results[i] ? "✓" : "✗"}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#0D3D34] leading-snug">{question.q}</p>
                  {!results[i] && <p className="text-xs text-[#1A6B5A] mt-1">Správně: <span className="font-semibold">{question.a[question.correct]}</span></p>}
                  <p className="text-[10px] text-[#0D3D34]/50 mt-1 leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isCorrect = selected === q.correct;
  return (
    <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-[#D1DFD8]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#0D3D34]/50">Otázka {step + 1} z {quiz.length}</span>
          <span className="text-xs text-[#0D3D34]/30">{Math.round((step / quiz.length) * 100)} %</span>
        </div>
        <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
          <div className="h-full bg-[#D7FF00] rounded-full transition-all duration-300" style={{ width: `${(step / quiz.length) * 100}%` }} />
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-[#0D3D34] mb-4 leading-snug">{q.q}</p>
        <div className="space-y-2">
          {q.a.map((opt, i) => {
            const isSel = selected === i; const isCo = i === q.correct;
            let cls = "border-[#D1DFD8] hover:border-[#0D3D34]/30 bg-white text-[#0D3D34]";
            if (confirmed) { if (isCo) cls = "border-[#1A6B5A] bg-[#EBF7F1] text-[#1A6B5A] font-semibold"; else if (isSel) cls = "border-red-400 bg-red-50 text-red-700"; else cls = "border-[#D1DFD8] bg-[#F7FAF9] text-[#0D3D34]/40"; }
            return (
              <button key={i} onClick={() => handleSelect(i)} disabled={confirmed} className={`w-full text-left text-xs px-3 py-2.5 rounded-xl border transition-all flex items-center gap-3 ${cls}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${confirmed && isCo ? "bg-[#1A6B5A] text-white" : confirmed && isSel && !isCo ? "bg-red-500 text-white" : "bg-[#EBF7F1] text-[#0D3D34]/50"}`}>{optLabels[i]}</span>
                {opt}
              </button>
            );
          })}
        </div>
        {confirmed && (
          <div className={`mt-4 rounded-xl p-3 ${isCorrect ? "bg-[#EBF7F1]" : "bg-red-50"}`}>
            <p className={`text-xs font-bold mb-1 ${isCorrect ? "text-[#1A6B5A]" : "text-red-700"}`}>{isCorrect ? "✓ Správně!" : `✗ Správně je: ${q.a[q.correct]}`}</p>
            <p className="text-xs text-[#0D3D34]/60 leading-relaxed">{q.explanation}</p>
          </div>
        )}
        {confirmed && <button onClick={handleNext} className="mt-4 w-full bg-[#0D3D34] text-[#D7FF00] py-2.5 rounded-xl text-sm font-bold hover:opacity-90">{step + 1 < quiz.length ? "Další otázka →" : "Zobrazit výsledky"}</button>}
      </div>
    </div>
  );
}

function LessonWizard({ module: mod, onBack }: { module: Module; onBack: () => void }) {
  const { markLesson, isDone } = useProgress();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"content" | "quiz">("content");
  const [courseComplete, setCourseComplete] = useState(false);

  const lesson = mod.lessons[idx];
  const content = mod.content[lesson.title];
  const hasBody = !!content?.body;
  const hasQuiz = !!content?.quiz;

  const advance = () => {
    if (!isDone(mod.id, idx)) markLesson(mod.id, idx);
    if (idx + 1 >= mod.lessons.length) setCourseComplete(true);
    else { setIdx(idx + 1); setPhase("content"); }
  };

  if (courseComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold text-[#0D3D34] mb-2">Modul dokončen!</h2>
          <p className="text-[#0D3D34]/50 text-sm mb-6">{mod.title}</p>
          <div className="bg-[#D7FF00] rounded-2xl p-4 mb-6">
            <div className="text-[#0D3D34] font-bold">+{mod.total * 50} bodů získáno</div>
            <div className="text-[#0D3D34]/60 text-xs mt-0.5">za dokončení modulu</div>
          </div>
          <button onClick={onBack} className="bg-[#0D3D34] text-[#D7FF00] px-6 py-3 rounded-xl font-bold hover:opacity-90">Zpět na moduly</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      <div className="bg-white border-b border-[#D1DFD8] px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-[#0D3D34]/40 text-sm hover:text-[#0D3D34] transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Moduly
          </button>
          <span className="text-xs text-[#0D3D34]/40 font-medium">{mod.icon} {mod.title}</span>
          <span className="text-xs font-bold text-[#0D3D34]/50">Lekce {idx + 1} / {mod.total}</span>
        </div>
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-1.5 mt-2.5">
          {mod.lessons.map((_, i) => (
            <div key={i} className={`rounded-full transition-all ${i < idx ? "w-2 h-2 bg-[#D7FF00]" : i === idx ? "w-3 h-3 bg-[#0D3D34]" : "w-2 h-2 bg-[#D1DFD8]"}`} />
          ))}
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{typeIcon[lesson.type]}</span>
              <span className="text-xs text-[#0D3D34]/40">{lesson.mins} min</span>
              {isDone(mod.id, idx) && <span className="text-[10px] bg-[#D7FF00] text-[#0D3D34] font-bold px-2 py-0.5 rounded-full ml-auto">✓ Splněno</span>}
            </div>
            <h2 className="font-bold text-[#0D3D34] text-base">{lesson.title}</h2>
          </div>
          <div className="p-6">
            {phase === "content" && (
              <>
                {hasBody ? (
                  <pre className="text-sm text-[#0D3D34]/80 leading-relaxed whitespace-pre-wrap font-sans mb-6">{content.body}</pre>
                ) : lesson.type === "video" ? (
                  <div className="bg-[#0D3D34] rounded-2xl aspect-video flex items-center justify-center mb-6">
                    <div className="text-center"><div className="text-4xl mb-2">▶️</div><div className="text-white/60 text-sm">Video lekce</div><div className="text-white/30 text-xs mt-1">Obsah dostupný v LMS systému</div></div>
                  </div>
                ) : (
                  <div className="bg-[#EBF7F1] rounded-2xl p-8 text-center mb-6"><div className="text-3xl mb-2">📄</div><div className="text-[#0D3D34]/50 text-sm">Obsah lekce se připravuje</div></div>
                )}
                <button onClick={() => hasQuiz ? setPhase("quiz") : advance()} className="w-full bg-[#0D3D34] text-[#D7FF00] py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                  {hasQuiz ? "Přejít ke kvízu →" : isDone(mod.id, idx) ? (idx + 1 < mod.total ? "Pokračovat →" : "Dokončit modul →") : "Dokončit lekci · +50 b →"}
                </button>
              </>
            )}
            {phase === "quiz" && hasQuiz && <QuizCard quiz={content.quiz!} onFinish={advance} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AkademieePage() {
  const [activeLevel, setActiveLevel] = useState<Level>("A");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const { isDone, countDone } = useProgress();

  const modules = ALL_MODULES[activeLevel];
  const mod = modules.find((m) => m.id === selectedModule);

  if (selectedModule && mod && !mod.locked) {
    return <LessonWizard module={mod} onBack={() => setSelectedModule(null)} />;
  }

  const totalLessons = LEVEL_A.reduce((s, m) => s + m.total, 0);
  const doneLessons = LEVEL_A.reduce((s, m) => s + countDone(m.id), 0);
  const donePct = Math.round((doneLessons / totalLessons) * 100);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Akademie</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Vzdělávací program ve třech úrovních</p>
      </div>

      {/* Level tabs */}
      <div className="flex gap-2 mb-6">
        {(["A", "B", "C"] as Level[]).map((lvl) => {
          const meta = LEVEL_META[lvl];
          const locked = lvl !== "A";
          const active = activeLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${active ? "bg-[#0D3D34] text-[#D7FF00] border-[#0D3D34]" : "bg-white border-[#D1DFD8] text-[#0D3D34]/60 hover:border-[#0D3D34]/30"}`}
            >
              {locked && <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>}
              {meta.label}
              <span className={`text-[9px] font-normal ${active ? "text-[#D7FF00]/70" : "text-[#0D3D34]/40"}`}>{meta.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Level A progress bar */}
      {activeLevel === "A" && (
        <div className="bg-[#0D3D34] rounded-2xl p-5 mb-6 flex items-center gap-6">
          <div className="flex-1">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Celkový pokrok – Level A</div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#D7FF00] transition-all" style={{ width: `${donePct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-1"><span>{doneLessons} / {totalLessons} lekcí</span><span>{donePct} %</span></div>
          </div>
          <div className="text-right">
            <div className="text-[#D7FF00] text-2xl font-bold">{LEVEL_A.filter(m => countDone(m.id) === m.total && m.total > 0).length}/{LEVEL_A.length}</div>
            <div className="text-white/40 text-xs">modulů dokončeno</div>
          </div>
        </div>
      )}

      {/* Locked level message */}
      {activeLevel !== "A" && (
        <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-8 text-center mb-6">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-bold text-[#0D3D34] mb-1">{LEVEL_META[activeLevel].label} – brzy k dispozici</h3>
          <p className="text-[#0D3D34]/50 text-sm">Obsah pro tuto úroveň se připravuje. Nejprve dokončete Level A.</p>
        </div>
      )}

      {/* Module grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((m) => {
          const done = countDone(m.id);
          const pct = m.total > 0 ? Math.round((done / m.total) * 100) : 0;
          return (
            <button
              key={m.id}
              onClick={() => !m.locked && setSelectedModule(m.id)}
              className={`bg-white border border-[#D1DFD8] rounded-2xl p-5 text-left transition-all ${m.locked ? "opacity-50 cursor-not-allowed" : "hover:shadow-md hover:border-[#0D3D34]/20 group"}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF7F1] flex items-center justify-center text-xl flex-shrink-0">{m.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className={`font-bold text-[#0D3D34] text-sm ${!m.locked ? "group-hover:text-[#1A6B5A] transition-colors" : ""}`}>{m.title}</div>
                  <div className="text-xs text-[#0D3D34]/45 mt-0.5">{m.subtitle}</div>
                </div>
                {m.locked && (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-[#0D3D34]/30 flex-shrink-0 mt-1">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              {m.total > 0 && (
                <>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#0D3D34]/40 mb-1">
                      <span>{done}/{m.total} lekcí</span><span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct === 100 ? "#D7FF00" : "#B8E8D0" }} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    {m.lessons.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full flex-shrink-0 ${isDone(m.id, i) ? "bg-[#D7FF00]" : "bg-[#D1DFD8]"}`} />
                    ))}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
