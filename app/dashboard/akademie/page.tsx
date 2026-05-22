"use client";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";

type QuizQuestion = { q: string; a: string[]; correct: number; explanation: string };

const COURSES = [
  {
    id: "elektrina",
    icon: "⚡",
    title: "Dodávka elektřiny",
    subtitle: "Tarify, produkty, distribuce",
    total: 8,
    lessons: [
      { title: "Jak funguje trh s elektřinou", mins: 6, type: "video" },
      { title: "FIX vs SPOT – zásadní rozdíl", mins: 8, type: "reading" },
      { title: "HOME FIX – produkty a ceny", mins: 10, type: "reading" },
      { title: "EXPERT FIX – produkty pro firmy", mins: 8, type: "reading" },
      { title: "HOME vs EXPERT – kdy co použít", mins: 5, type: "quiz" },
      { title: "Distribuční sazby D-sazby", mins: 12, type: "video" },
      { title: "Distribuční sazby C-sazby", mins: 10, type: "video" },
      { title: "VT/NT, jistič a typový diagram", mins: 8, type: "quiz" },
    ],
    content: {
      "FIX vs SPOT – zásadní rozdíl": {
        body: `FIX tarif: cena komodity je pevně daná na celou dobu smlouvy. Zákazník ví přesně, za kolik bude platit. Žádná překvapení z burzovních výkyvů.

SPOT tarif: cena kopíruje hodinové burzové ceny OTE. Může být výhodný při levné elektřině, ale v drahých obdobích může výrazně zdražit.

Kdy doporučit FIX:
• Zákazník chce jistotu a předvídatelný účet
• Zákazník nechce sledovat burzu
• Domácnost nebo malá firma bez flexibility spotřeby

Kdy doporučit SPOT:
• Zákazník má flexibilní spotřebu (nabíjí auto v noci)
• Zákazník má domácí FVE nebo baterii
• Zákazník sleduje ceny a umí optimalizovat spotřebu

Klíčová formulace: "Na FIXu máte garantovanou cenu po celou dobu smlouvy – nezávisle na tom, co se děje na burze."`,
        quiz: [
          { q: "Kdy SPOT tarif může výrazně zdražit?", a: ["Nikdy, SPOT je vždy levnější", "Pouze v létě", "Při vysokých burzovních cenách", "Vždy v poledne"], correct: 2, explanation: "SPOT cena kopíruje hodinové ceny OTE. Při energetické krizi nebo vysoké poptávce může výrazně zdražit – to je hlavní riziko SPOTu." },
          { q: "Co je hlavní výhoda FIX tarifu?", a: ["Vždy nejnižší cena na trhu", "Garantovaná cena po celou dobu smlouvy", "Žádný paušál", "Neomezená flexibilita"], correct: 1, explanation: "FIX zaručuje neměnnou cenu komodity po celou dobu smlouvy – bez ohledu na vývoj cen na burze. Zákazník má jistotu." },
          { q: "Pro koho je SPOT tarif nejvhodnější?", a: ["Zákazník chce jistotu", "Zákazník s flexibilní spotřebou a FVE nebo baterií", "Zákazník, který nesleduje ceny", "Všechny domácnosti"], correct: 1, explanation: "SPOT je výhodný pro zákazníky, kteří umí přesunout spotřebu do levných hodin nebo mají baterii/FVE." },
          { q: "Co SPOT tarif sleduje?", a: ["Ceny podle distributora", "Hodinové burzové ceny OTE", "Průměr za poslední rok", "Pevnou sazbu Tramaco"], correct: 1, explanation: "SPOT tarif kopíruje hodinové ceny na burze OTE (Operátor trhu s elektřinou). Cena se mění každou hodinu." },
          { q: "Zákazník říká: Nechci překvapení v účtu. Co doporučíš?", a: ["SPOT – bývá levnější", "FIX – garantovaná cena", "Počkat na lepší nabídku", "Přejít ke konkurenci"], correct: 1, explanation: "FIX je přesně pro zákazníky, kteří chtějí předvídatelný účet. Klíčová formulace: garantovaná cena nezávisle na burze." },
          { q: "Zákazník má elektromobil a nabíjí ho v noci. Co doporučíš?", a: ["HOME FIX 12", "HOME FIX 36", "SPOT tarif", "Plyn"], correct: 2, explanation: "SPOT je výhodný pro zákazníky s flexibilní spotřebou. Nabíjení EV v noci v levných hodinách může výrazně snížit náklady." },
          { q: "Co je nutné mít pro SPOT tarif?", a: ["Pouze EAN kód", "Smart metr AMM", "Souhlas ERÚ", "FVE na střeše"], correct: 1, explanation: "SPOT tarif vyžaduje smart metr AMM (automatické měření) pro měření hodinové spotřeby. Bez AMM nelze SPOT aktivovat." },
          { q: "Jak se FIX cena mění v průběhu smlouvy?", a: ["Roste každý rok o inflaci", "Kopíruje burzu OTE", "Nemění se – je fixní", "Záleží na distributorovi"], correct: 2, explanation: "FIX cena je garantovaná a neměnná po celou dobu smlouvy. To je definice fixního tarifu." },
          { q: "Zákazník má FVE a baterii. Jaký tarif zvážit?", a: ["Pouze FIX 12", "Pouze FIX 36", "SPOT pro odběr a Solar FIX pro výkup", "Pouze plyn"], correct: 2, explanation: "Zákazník s FVE a baterií může optimalizovat odběr přes SPOT a prodávat přes Solar FIX produkt." },
          { q: "Jak popsat FIX zákazníkovi jednou větou?", a: ["Cena závisí na burze", "Garantovaná cena po celou dobu smlouvy – bez ohledu na burzu", "Levnější než SPOT vždy", "Mění se každý měsíc"], correct: 1, explanation: "Klíčová formulace: garantovaná cena nezávisle na burze. Zákazník ví přesně, co bude platit." },
        ] as QuizQuestion[],
      },
      "HOME FIX – produkty a ceny": {
        body: `Tramaco nabízí tři varianty fixního tarifu pro domácnosti. Ceny jsou platné od 22. 4. 2026.

HOME FIX 12 — 3 084,29 Kč/MWh s DPH (2 549,00 bez DPH)
• Vázanost 12 měsíců | Paušál 156,09 Kč/měsíc
• Nejkratší závazek, vhodné pro zákazníky, kteří chtějí flexibilitu

HOME FIX 24 — 2 842,29 Kč/MWh s DPH (2 349,00 bez DPH) ⭐ Doporučený
• Vázanost 24 měsíců | Paušál 180,29 Kč/měsíc
• Nejlepší poměr cena/jistota. Nejoblíbenější produkt.

HOME FIX 36 — 2 781,79 Kč/MWh s DPH (2 299,00 bez DPH)
• Vázanost 36 měsíců | Paušál 180,29 Kč/měsíc
• Nejnižší komodita, ale delší závazek

Tip: Zákazník chce jistotu → doporuč FIX 24. Zákazník váhá kvůli závazku → připomeň, že po uplynutí může odejít bez sankce.`,
        quiz: [
          { q: "Kolik stojí HOME FIX 24 s DPH?", a: ["2 781,79 Kč/MWh", "3 084,29 Kč/MWh", "2 842,29 Kč/MWh", "2 349,00 Kč/MWh"], correct: 2, explanation: "HOME FIX 24 stojí 2 842,29 Kč/MWh s DPH. Je to doporučený produkt s nejlepším poměrem cena/jistota." },
          { q: "Jaký je paušál u HOME FIX 12?", a: ["180,29 Kč/měs.", "156,09 Kč/měs.", "129,00 Kč/měs.", "200,00 Kč/měs."], correct: 1, explanation: "HOME FIX 12 má paušál 156,09 Kč/měsíc. HOME FIX 24 a 36 mají shodně 180,29 Kč/měsíc." },
          { q: "Který produkt má nejnižší cenu komodity?", a: ["HOME FIX 12", "HOME FIX 24", "HOME FIX 36", "Všechny jsou stejné"], correct: 2, explanation: "HOME FIX 36 má cenu 2 781,79 Kč/MWh – nejnižší ze všech tří variant." },
          { q: "Kolik stojí HOME FIX 12 s DPH?", a: ["2 842,29 Kč/MWh", "2 781,79 Kč/MWh", "3 084,29 Kč/MWh", "3 205,29 Kč/MWh"], correct: 2, explanation: "HOME FIX 12 stojí 3 084,29 Kč/MWh s DPH – nejdražší, ale nejkratší vázanost 12 měsíců." },
          { q: "Jaká je vázanost HOME FIX 24?", a: ["12 měsíců", "18 měsíců", "24 měsíců", "36 měsíců"], correct: 2, explanation: "HOME FIX 24 má vázanost přesně 24 měsíce. Po uplynutí může zákazník odejít bez sankce." },
          { q: "Jaký je paušál u HOME FIX 24?", a: ["156,09 Kč/měs.", "180,29 Kč/měs.", "199,00 Kč/měs.", "129,00 Kč/měs."], correct: 1, explanation: "HOME FIX 24 i HOME FIX 36 mají paušál 180,29 Kč/měsíc. Pouze HOME FIX 12 má nižší paušál 156,09 Kč." },
          { q: "Zákazník chce jistotu bez ohledu na cenu. Co doporučíš?", a: ["HOME FIX 12", "HOME FIX 24", "HOME FIX 36", "SPOT tarif"], correct: 1, explanation: "HOME FIX 24 je doporučený produkt – nejlepší poměr cena/jistota. Závazek 2 roky je přijatelný kompromis." },
          { q: "Kolik stojí HOME FIX 36 bez DPH?", a: ["2 349,00 Kč/MWh", "2 299,00 Kč/MWh", "2 549,00 Kč/MWh", "2 100,00 Kč/MWh"], correct: 1, explanation: "HOME FIX 36 stojí 2 299,00 Kč/MWh bez DPH (tj. 2 781,79 Kč/MWh s DPH)." },
          { q: "Co se stane po uplynutí fixace HOME FIX?", a: ["Zákazník musí platit pokutu", "Smlouva prodlouží za stejných podmínek automaticky", "Zákazník může odejít nebo smlouvu obnovit bez sankce", "Zákazník přejde automaticky na SPOT"], correct: 2, explanation: "Po uplynutí fixace může zákazník bez sankce odejít nebo smlouvu prodloužit – důležitý argument při prodeji." },
          { q: "Který produkt má vázanost 36 měsíců a stejný paušál jako HOME FIX 24?", a: ["HOME FIX 12", "HOME FIX 24", "HOME FIX 36", "EXPERT FIX 24"], correct: 2, explanation: "HOME FIX 36 má vázanost 36 měsíců a paušál 180,29 Kč/měs – stejný jako HOME FIX 24." },
        ] as QuizQuestion[],
      },
    } as Record<string, { body?: string; quiz?: QuizQuestion[] }>,
  },
  {
    id: "fve",
    icon: "☀️",
    title: "FVE & Výkup elektřiny",
    subtitle: "Fotovoltaika, produkty, EAN",
    total: 6,
    lessons: [
      { title: "Co je FVE a jak funguje výkup", mins: 7, type: "video" },
      { title: "EAN odběratele vs EAN výrobce", mins: 5, type: "reading" },
      { title: "Home Solar FIX MINI / FIX / FIX MAXI", mins: 8, type: "reading" },
      { title: "SPOT výkup a Electree Pulse", mins: 10, type: "video" },
      { title: "Sdílení elektřiny a komunitní energie", mins: 8, type: "reading" },
      { title: "Checklist uzavření smlouvy výkup", mins: 6, type: "quiz" },
    ],
    content: {
      "Home Solar FIX MINI / FIX / FIX MAXI": {
        body: `Tramaco nabízí tři varianty fixního výkupního produktu dle roční výroby FVE.

Home Solar FIX MINI — 1 000 Kč/MWh výkup
• Limit: do 1 MWh/rok | Paušál: 39 Kč/měs.
• Podmínka: zákazník musí mít zároveň odběr u Tramaco

Home Solar FIX — 500 Kč/MWh výkup ⭐ Nejpopulárnější
• Limit: do 10 MWh/rok | Paušál: 59 Kč/měs.
• Ideální pro standardní střešní FVE na rodinném domě

Home Solar FIX MAXI — 400 Kč/MWh výkup
• Limit: nad 10 MWh/rok | Paušál: 99 Kč/měs.
• Velká FVE, vysoká výroba (zemědělské areály, komerční budovy)

Pozor: Pokud je výroba menší než paušál, pohledávka se převádí do dalšího měsíce. Zákazník vždy dostane nezápornou fakturu.`,
        quiz: [
          { q: "Jaká je výkupní cena Home Solar FIX (standard)?", a: ["1 000 Kč/MWh", "500 Kč/MWh", "400 Kč/MWh", "2 100 Kč/MWh"], correct: 1, explanation: "Home Solar FIX (standard) vykupuje elektřinu za 500 Kč/MWh. Je to nejoblíbenější produkt pro běžné střešní FVE." },
          { q: "Jaký je limit výroby pro Home Solar FIX MAXI?", a: ["do 1 MWh/rok", "do 5 MWh/rok", "do 10 MWh/rok", "nad 10 MWh/rok"], correct: 3, explanation: "FIX MAXI je pro velké FVE s výrobou nad 10 MWh/rok – zemědělství, průmyslové budovy." },
          { q: "Jaká je výkupní cena Home Solar FIX MINI?", a: ["400 Kč/MWh", "500 Kč/MWh", "1 000 Kč/MWh", "750 Kč/MWh"], correct: 2, explanation: "FIX MINI vykupuje za 1 000 Kč/MWh – nejvyšší výkupní cena. Je pro malé FVE do 1 MWh/rok." },
          { q: "Kolik je paušál u Home Solar FIX (standard)?", a: ["39 Kč/měs.", "59 Kč/měs.", "99 Kč/měs.", "79 Kč/měs."], correct: 1, explanation: "Home Solar FIX (standard) má paušál 59 Kč/měsíc. FIX MINI má 39 Kč, FIX MAXI má 99 Kč." },
          { q: "Jaká je podmínka pro Home Solar FIX MINI?", a: ["FVE musí být nad 5 kWp", "Zákazník musí mít odběr elektřiny u Tramaco", "Zákazník musí mít baterii", "Smlouva na 5 let"], correct: 1, explanation: "FIX MINI podmínkou je, že zákazník musí mít zároveň odběrovou smlouvu na elektřinu u Tramaco." },
          { q: "Co se stane, když výroba FVE je nižší než paušál?", a: ["Zákazník platí rozdíl hotově", "Pohledávka se převádí do dalšího měsíce", "Smlouva se automaticky ruší", "Zákazník dostane fakturu s mínusem"], correct: 1, explanation: "Pokud výroba nestačí na paušál, pohledávka přechází do dalšího měsíce. Zákazník vždy obdrží nezápornou fakturu." },
          { q: "Pro koho je Home Solar FIX MAXI určen?", a: ["Zákazníci s malou FVE do 3 kWp", "Standardní rodinný dům", "Velké FVE – zemědělské areály, komerční budovy", "Pouze pro firmy"], correct: 2, explanation: "FIX MAXI je pro velké FVE s výrobou nad 10 MWh/rok – zemědělství, průmysl, komerční areály." },
          { q: "Jaký je paušál u Home Solar FIX MINI?", a: ["59 Kč/měs.", "99 Kč/měs.", "39 Kč/měs.", "79 Kč/měs."], correct: 2, explanation: "FIX MINI má nejnižší paušál 39 Kč/měsíc, ale nejvyšší výkupní cenu 1 000 Kč/MWh." },
          { q: "Zákazník má standardní střešní FVE (6 kWp, ~6 MWh/rok). Který produkt doporučíš?", a: ["Home Solar FIX MINI", "Home Solar FIX (standard)", "Home Solar FIX MAXI", "SPOT výkup"], correct: 1, explanation: "6 MWh/rok je pod limitem 10 MWh → FIX (standard) je správná volba." },
          { q: "Jaký je paušál u Home Solar FIX MAXI?", a: ["39 Kč/měs.", "59 Kč/měs.", "79 Kč/měs.", "99 Kč/měs."], correct: 3, explanation: "FIX MAXI má paušál 99 Kč/měsíc – nejvyšší ze všech tří variant." },
        ] as QuizQuestion[],
      },
      "EAN odběratele vs EAN výrobce": {
        body: `EAN odběratele (spotřební EAN): identifikuje odběrné místo – kam elektřina přichází do domu. 18místné číslo. Zákazník ho najde na faktuře od distributora.

EAN výrobce (výrobní EAN): identifikuje místo, odkud elektřina odchází do sítě (výrobní FVE). Bez tohoto EAN nelze smlouvu o výkupu aktivovat!

Kde zákazník výrobní EAN najde:
✅ Dokument PPP (první paralelní připojení)
✅ Smlouva o připojení (SoP) u nově připojených FVE
✅ Předchozí vyúčtování od výkupce
✅ E-mail od distributora (ČEZ, E.ON, PRE)

⚠️ POZOR: V dokumentu UTP (uvedení do trvalého provozu) je VŽDY uveden EAN spotřební, NE výrobní!`,
        quiz: [
          { q: "Kde zákazník NESMÍ hledat výrobní EAN?", a: ["Smlouva o připojení (SoP)", "Dokument PPP", "Dokument UTP", "E-mail od distributora"], correct: 2, explanation: "UTP (uvedení do trvalého provozu) obsahuje vždy spotřební EAN, ne výrobní. Je to klasická chyba zákazníků." },
          { q: "Co identifikuje EAN odběratele?", a: ["Výrobní místo FVE", "Odběrné místo – kam elektřina přichází", "Zákazníkovo rodné číslo", "Typ tarifu"], correct: 1, explanation: "EAN odběratele (spotřební EAN) identifikuje odběrné místo – tj. kam elektřina přichází do objektu." },
          { q: "Co identifikuje EAN výrobce?", a: ["Odběrné místo", "Zákazníkův účet v EIS", "Výrobní místo – odkud elektřina odchází do sítě", "Typ FVE panelů"], correct: 2, explanation: "EAN výrobce identifikuje výrobní místo – odkud přebytková elektřina z FVE odchází do distribuční sítě." },
          { q: "Kolik číslic má EAN?", a: ["10 číslic", "13 číslic", "18 číslic", "20 číslic"], correct: 2, explanation: "EAN má 18 číslic – standardní délka identifikátoru odběrného nebo výrobního místa v ČR." },
          { q: "Co se stane, pokud zákazník nemá výrobní EAN?", a: ["Smlouva jde uzavřít i bez něj", "Nelze aktivovat smlouvu o výkupu", "Postačí spotřební EAN", "Stačí fotografie FVE"], correct: 1, explanation: "Bez výrobního EAN nelze smlouvu o výkupu aktivovat. Je to povinný identifikátor výrobního místa." },
          { q: "Kde zákazník může najít výrobní EAN?", a: ["Pouze v UTP dokumentu", "Pouze na elektroměru", "V PPP dokumentu nebo SoP nebo předchozím vyúčtování", "V katastru nemovitostí"], correct: 2, explanation: "Výrobní EAN najde zákazník v: PPP dokumentu, SoP, předchozím vyúčtování od výkupce, nebo e-mailu od distributora." },
          { q: "Co je dokument PPP?", a: ["Plán pro případ poruchy", "První paralelní připojení – dokument při spuštění FVE", "Potvrzení o platbě paušálu", "Přihlášení k produktu Premium"], correct: 1, explanation: "PPP = první paralelní připojení. Dokument vystavený distributorem při prvním připojení FVE do sítě. Obsahuje výrobní EAN." },
          { q: "Zákazník říká, že našel EAN v UTP dokumentu. Co uděláš?", a: ["Použiješ to číslo", "Upozorníš, že UTP obsahuje spotřební EAN, ne výrobní", "Zavoláš na ERÚ", "Požádáš o rodné číslo"], correct: 1, explanation: "UTP obsahuje vždy spotřební EAN! Zákazník musí hledat výrobní EAN jinde – v PPP, SoP nebo vyúčtování." },
          { q: "SoP dokument obsahuje výrobní EAN u jakých FVE?", a: ["Všechny FVE", "Pouze velké FVE nad 100 kWp", "Nově připojené FVE", "Pouze solární farmy"], correct: 2, explanation: "SoP (smlouva o připojení) obsahuje výrobní EAN zejména u nově připojených FVE." },
          { q: "Zákazník nemá PPP ani SoP. Kde ještě hledat výrobní EAN?", a: ["V občanském průkazu", "Předchozí vyúčtování od výkupce nebo e-mail od distributora", "V záručním listu FVE panelů", "Nelze zjistit"], correct: 1, explanation: "Výrobní EAN může být v předchozím vyúčtování od výkupce nebo v e-mailu od distributora (ČEZ, E.ON, PRE)." },
        ] as QuizQuestion[],
      },
    } as Record<string, { body?: string; quiz?: QuizQuestion[] }>,
  },
  {
    id: "plyn",
    icon: "🔥",
    title: "Zemní plyn",
    subtitle: "Distributoři, produkty, pásma",
    total: 5,
    lessons: [
      { title: "Jak funguje trh se zemním plynem", mins: 6, type: "video" },
      { title: "HOME FIX plyn – produkty a ceny", mins: 8, type: "reading" },
      { title: "Distribuční pásma a zálohy", mins: 10, type: "reading" },
      { title: "Sezónnost a výpočet zálohy", mins: 7, type: "video" },
      { title: "Quiz: Plyn celkový", mins: 12, type: "quiz" },
    ],
    content: {
      "HOME FIX plyn – produkty a ceny": {
        body: `Tramaco nabízí tři varianty fixního tarifu na zemní plyn pro domácnosti.

HOME FIX plyn 12 — 1 632,29 Kč/MWh s DPH (1 349,00 bez DPH)
• Vázanost 12 měsíců | Paušál 156,09 Kč/měsíc

HOME FIX plyn 24 — 1 571,79 Kč/MWh s DPH (1 299,00 bez DPH) ⭐ Doporučený
• Vázanost 24 měsíců | Paušál 180,29 Kč/měsíc

HOME FIX plyn 36 — 1 571,79 Kč/MWh s DPH (1 299,00 bez DPH)
• Vázanost 36 měsíců – stejná cena jako 24M!
• Paušál 180,29 Kč/měsíc

Cross-sell tip: Zákazník řeší elektřinu → nabídni i plyn! "Máme výhodné podmínky i na plyn, vše v jedné smlouvě."

Distributoři plynu v ČR:
• GasNet – sever a střed ČR
• Gas Distribution – jih ČR
• Pražská plynárenská – Praha`,
        quiz: [
          { q: "Kolik stojí HOME FIX plyn 24 s DPH?", a: ["1 632,29 Kč/MWh", "1 571,79 Kč/MWh", "1 299,00 Kč/MWh", "1 800,00 Kč/MWh"], correct: 1, explanation: "HOME FIX plyn 24 stojí 1 571,79 Kč/MWh s DPH – doporučený produkt." },
          { q: "Kolik stojí HOME FIX plyn 12 s DPH?", a: ["1 571,79 Kč/MWh", "1 299,00 Kč/MWh", "1 632,29 Kč/MWh", "1 400,00 Kč/MWh"], correct: 2, explanation: "HOME FIX plyn 12 stojí 1 632,29 Kč/MWh s DPH. Je dražší než 24M a 36M kvůli kratšímu závazku." },
          { q: "Jak se liší cena HOME FIX plyn 36 oproti 24?", a: ["Je o 100 Kč levnější", "Je o 50 Kč dražší", "Je totožná – 1 571,79 Kč/MWh", "Záleží na distributorovi"], correct: 2, explanation: "HOME FIX plyn 36 má stejnou cenu jako HOME FIX plyn 24. Liší se pouze délkou závazku." },
          { q: "Který distributor zásobuje plyn v Praze?", a: ["GasNet", "Gas Distribution", "Pražská plynárenská", "E.ON"], correct: 2, explanation: "Pražská plynárenská je distributor zemního plynu v Praze. GasNet pokrývá sever a střed ČR." },
          { q: "Jaký je paušál u HOME FIX plyn 12?", a: ["180,29 Kč/měs.", "156,09 Kč/měs.", "129,00 Kč/měs.", "200,00 Kč/měs."], correct: 1, explanation: "HOME FIX plyn 12 má paušál 156,09 Kč/měsíc. FIX 24 a FIX 36 mají 180,29 Kč/měsíc." },
          { q: "Zákazník volá kvůli elektřině. Jak mu nabídneš plyn?", a: ["Nesmíš nabízet plyn při hovoru o elektřině", "Zákazník to odmítne – nekombinuj", "Máme výhodné podmínky i na plyn, vše v jedné smlouvě", "Pouze pokud zákazník sám zeptá"], correct: 2, explanation: "Cross-sell je klíčový! Zákazník ocení pohodlí jedné faktury a výhodné podmínky na plyn." },
          { q: "Který distributor pokrývá jih ČR?", a: ["GasNet", "Gas Distribution", "Pražská plynárenská", "ČEZ Gas"], correct: 1, explanation: "Gas Distribution zásobuje jih ČR. GasNet pokrývá sever a střed. Pražská plynárenská je pouze Praha." },
          { q: "Jaký je paušál u HOME FIX plyn 36?", a: ["156,09 Kč/měs.", "129,00 Kč/měs.", "180,29 Kč/měs.", "199,00 Kč/měs."], correct: 2, explanation: "HOME FIX plyn 36 má paušál 180,29 Kč/měsíc – stejný jako HOME FIX plyn 24." },
          { q: "Zákazník chce plyn, ale bojí se závazku. Co nabídneš?", a: ["HOME FIX plyn 36 – nejlevnější", "HOME FIX plyn 12 – nejkratší závazek", "HOME FIX plyn 24 – nejlepší poměr", "SPOT plyn"], correct: 1, explanation: "HOME FIX plyn 12 má nejkratší závazek (12 měsíců). Pro zákazníka váhajícího kvůli závazku je to správná volba." },
          { q: "GasNet distribuuje plyn v jaké oblasti?", a: ["Pouze Praha", "Jih ČR", "Sever a střed ČR", "Celá ČR"], correct: 2, explanation: "GasNet pokrývá sever a střed ČR – je to největší distributor zemního plynu." },
        ] as QuizQuestion[],
      },
    } as Record<string, { body?: string; quiz?: QuizQuestion[] }>,
  },
  {
    id: "retence",
    icon: "🛡️",
    title: "Retence & komunikace",
    subtitle: "Callscripty, námitky, techniky",
    total: 7,
    lessons: [
      { title: "Úvod do retenčního hovoru", mins: 5, type: "video" },
      { title: "Otevření hovoru a zjištění důvodu", mins: 8, type: "reading" },
      { title: "Reakce na různé důvody odchodu", mins: 12, type: "reading" },
      { title: "Překonání námitek po nabídce", mins: 10, type: "reading" },
      { title: "Zákazník podepsal jinde – co dělat", mins: 6, type: "reading" },
      { title: "Nabídka a závěr hovoru", mins: 8, type: "video" },
      { title: "Quiz: Retence celkový", mins: 15, type: "quiz" },
    ],
    content: {
      "Reakce na různé důvody odchodu": {
        body: `Každý zákazník odchází z jiného důvodu. Nejprve ho nechte mluvit – čím víc řekne sám, tím lépe víte, co nabídnout.

CENA / chce ušetřit:
"Rozumím, cena je samozřejmě důležitá. Mohu se zeptat, jakou nabídku jste dostal/a?" → Pokud řekne číslo: porovnejte s vaší nabídkou.

NESPOKOJENOST se službami:
"To mě mrzí a beru to vážně. Mohu se zeptat, co konkrétně se stalo?" → Nabídněte nápravu, pak teprve přejděte na cenu.

CHCE ODEJÍT K JINÉ FIRMĚ:
"Chápu. Mohu se zeptat, co vás u té druhé nabídky zaujalo nejvíc?" → Odpověď vám přesně řekne, co musíte nabídnout.

ZÁKAZNÍK UŽ PODEPSAL JINDE:
• Do 14 dnů od podpisu → může od nové smlouvy odstoupit
• Do 15 dnů od zahájení dodávky → stále možné odstoupení
• Dodávka ještě nezačala → možnost zpětvzetí výpovědi u nás`,
        quiz: [
          { q: "Co uděláš jako první při retenčním hovoru?", a: ["Rovnou nabídneš lepší cenu", "Nechte zákazníka mluvit a nepřerušuj ho", "Sdělíš výpovědní lhůtu", "Zeptáš se na e-mail"], correct: 1, explanation: "Zákazník nejlépe poradí, co potřebujete nabídnout. Čím víc řekne sám, tím přesnější nabídku mu dáte." },
          { q: "Zákazník říká, že dostal levnější nabídku. Co uděláš?", a: ["Okamžitě nabídneš slevu", "Zeptáš se, o kolik levnější – pak porovnáš s vaší nabídkou", "Řekneš, že konkurence je nespolehlivá", "Skončíš hovor"], correct: 1, explanation: "Nejprve zjistěte konkrétní číslo. Pak teprve porovnejte s vaší kalkulací." },
          { q: "Do kolika dní od podpisu může zákazník odstoupit od nové smlouvy?", a: ["7 dní", "14 dní", "30 dní", "60 dní"], correct: 1, explanation: "Zákon dává zákazníkovi 14 dní na odstoupení od smlouvy uzavřené na dálku (telefon, e-mail)." },
          { q: "Zákazník je nespokojený se službami. Co uděláš nejdříve?", a: ["Nabídneš okamžitě nižší cenu", "Zeptáš se, co konkrétně se stalo, a nabídneš nápravu", "Řekneš, že za to nemůžete", "Přepojíš na reklamace"], correct: 1, explanation: "Zákazník potřebuje cítit, že ho berete vážně. Nejprve zjistěte problém a nabídněte nápravu." },
          { q: "Zákazník chce odejít ke konkurenci. Co se zeptáš?", a: ["Proč nás opouštíte?", "Co vás u té druhé nabídky zaujalo nejvíc – cena nebo něco jiného?", "Kdy to podepíšete?", "Znáte tu firmu?"], correct: 1, explanation: "Tato otázka přesně odhalí, co zákazník potřebuje. Jde-li o cenu – porovnáte. Jde-li o něco jiného – řešíte to." },
          { q: "Zákazník podepsal smlouvu s konkurencí před 10 dny. Může ji zrušit?", a: ["Ne, smlouva je závazná", "Ano, má ještě 4 dny na odstoupení", "Pouze pokud požádá ERÚ", "Záleží na dodavateli"], correct: 1, explanation: "14denní lhůta ještě plyne (10 < 14 dní). Zákazník může od nové smlouvy odstoupit – klíčový argument." },
          { q: "Zákazník říká: Přecházím, protože jste drazí. Co neříkáš?", a: ["Rozumím, podívám se, co pro vás dokážu udělat", "Mohu se zeptat, jakou nabídku jste dostal/a?", "Tak to je vaše volba, to respektujeme", "Naše cena je 2 842,29 Kč/MWh – kde máte levněji?"], correct: 2, explanation: "Vzdát se bez boje je špatná praxe. Vždy se ptejte na konkrétní nabídku a porovnejte." },
          { q: "Co nabídneš zákazníkovi nespokojenci po vyřešení problému?", a: ["Nic navíc – problém byl vyřešen", "Poděkuješ a zavěsíš", "Po nápravě přejdeš na cenovou nabídku pro udržení", "Přepojíš na obchodní tým"], correct: 2, explanation: "Sekvence: empatie → zjistit problém → napravit → pak nabídnout lepší cenu. Zákazník, jehož problém byl vyřešen, je otevřenější." },
          { q: "Co znamená zpětvzetí výpovědi?", a: ["Zákazník požádá o novou smlouvu", "Zákazník odvolá výpověď podanou u Tramaco, dodávka pokračuje", "Zákazník odstoupí od smlouvy s konkurencí", "Zákazník zaplatí pokutu"], correct: 1, explanation: "Zpětvzetí výpovědi = zákazník stáhne výpověď podanou u nás. Dodávka pokračuje bez přerušení." },
          { q: "Zákazník říká: Chci přejít, protože je to levnější. Jak začneš?", a: ["Rovnou nabídneš slevu 10 %", "Zeptáš se: Mohu se zeptat, o kolik levnější?", "Popřeješ mu hodně štěstí", "Přepojíš na vedoucího"], correct: 1, explanation: "Zákazníci tyto nabídky přehání nebo si nejsou jistí čísly. Vždy zjistěte konkrétní částku – pak argumentujte fakty." },
        ] as QuizQuestion[],
      },
    } as Record<string, { body?: string; quiz?: QuizQuestion[] }>,
  },
  {
    id: "systemy",
    icon: "💻",
    title: "Systémy & CRM (EIS)",
    subtitle: "Postupy v systému, formuláře",
    total: 6,
    lessons: [
      { title: "Úvod do EIS – orientace v systému", mins: 10, type: "video" },
      { title: "Založení zákazníka krok za krokem", mins: 12, type: "reading" },
      { title: "Smlouva na dodávku elektřiny v EIS", mins: 15, type: "reading" },
      { title: "Smlouva na výkup elektřiny v EIS", mins: 12, type: "reading" },
      { title: "Přepis výrobny – postup", mins: 8, type: "reading" },
      { title: "Změna ceníku – postup", mins: 6, type: "reading" },
    ],
    content: {} as Record<string, { body?: string; quiz?: QuizQuestion[] }>,
  },
];

const typeIcon: Record<string, string> = { video: "▶️", reading: "📄", quiz: "📝" };

function QuizCard({ quiz, onFinish }: { quiz: QuizQuestion[]; onFinish?: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const optLabels = ["A", "B", "C", "D"];
  const q = quiz[step];

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelected(idx);
    setConfirmed(true);
  };

  const handleNext = () => {
    const newResults = [...results, selected === q.correct];
    if (step + 1 >= quiz.length) {
      setResults(newResults);
      setDone(true);
    } else {
      setResults(newResults);
      setStep(step + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const handleReset = () => {
    setStep(0); setSelected(null); setConfirmed(false); setResults([]); setDone(false);
  };

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
            <button onClick={handleReset} className={`px-4 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-80 ${passed ? "bg-[#0D3D34]/10 text-[#0D3D34]" : "bg-red-600 text-white"}`}>
              Zkusit znovu
            </button>
            {onFinish && (
              <button onClick={onFinish} className="px-4 py-2 rounded-xl text-sm font-bold bg-[#0D3D34] text-[#D7FF00] hover:opacity-90 transition-opacity">
                Dokončit lekci →
              </button>
            )}
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
            const isSelected = selected === i;
            const isCorrectOpt = i === q.correct;
            let cls = "border-[#D1DFD8] hover:border-[#0D3D34]/30 bg-white text-[#0D3D34]";
            if (confirmed) {
              if (isCorrectOpt) cls = "border-[#1A6B5A] bg-[#EBF7F1] text-[#1A6B5A] font-semibold";
              else if (isSelected && !isCorrectOpt) cls = "border-red-400 bg-red-50 text-red-700";
              else cls = "border-[#D1DFD8] bg-[#F7FAF9] text-[#0D3D34]/40";
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} disabled={confirmed}
                className={`w-full text-left text-xs px-3 py-2.5 rounded-xl border transition-all flex items-center gap-3 ${cls}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${confirmed && isCorrectOpt ? "bg-[#1A6B5A] text-white" : confirmed && isSelected && !isCorrectOpt ? "bg-red-500 text-white" : "bg-[#EBF7F1] text-[#0D3D34]/50"}`}>
                  {optLabels[i]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        {confirmed && (
          <div className={`mt-4 rounded-xl p-3 ${isCorrect ? "bg-[#EBF7F1]" : "bg-red-50"}`}>
            <p className={`text-xs font-bold mb-1 ${isCorrect ? "text-[#1A6B5A]" : "text-red-700"}`}>
              {isCorrect ? "✓ Správně!" : `✗ Správně je: ${q.a[q.correct]}`}
            </p>
            <p className="text-xs text-[#0D3D34]/60 leading-relaxed">{q.explanation}</p>
          </div>
        )}
        {confirmed && (
          <button onClick={handleNext} className="mt-4 w-full bg-[#0D3D34] text-[#D7FF00] py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
            {step + 1 < quiz.length ? "Další otázka →" : "Zobrazit výsledky"}
          </button>
        )}
      </div>
    </div>
  );
}

function LessonWizard({ course, onBack }: {
  course: typeof COURSES[0];
  onBack: () => void;
}) {
  const { markLesson, isDone } = useProgress();
  const [idx, setIdx] = useState(() => {
    // start at first undone lesson
    return 0;
  });
  const [phase, setPhase] = useState<"content" | "quiz">("content");
  const [courseComplete, setCourseComplete] = useState(false);

  const lesson = course.lessons[idx];
  const content = course.content[lesson.title];
  const hasBody = !!content?.body;
  const hasQuiz = !!content?.quiz;

  const advance = () => {
    if (!isDone(course.id, idx)) markLesson(course.id, idx);
    if (idx + 1 >= course.lessons.length) {
      setCourseComplete(true);
    } else {
      setIdx(idx + 1);
      setPhase("content");
    }
  };

  if (courseComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold text-[#0D3D34] mb-2">Kurz dokončen!</h2>
          <p className="text-[#0D3D34]/50 text-sm mb-6">{course.title}</p>
          <div className="bg-[#D7FF00] rounded-2xl p-4 mb-6">
            <div className="text-[#0D3D34] font-bold">+{course.total * 50} bodů získáno</div>
            <div className="text-[#0D3D34]/60 text-xs mt-0.5">za dokončení kurzu</div>
          </div>
          <button onClick={onBack} className="bg-[#0D3D34] text-[#D7FF00] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
            Zpět na kurzy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#D1DFD8] px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-[#0D3D34]/40 text-sm hover:text-[#0D3D34] transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kurzy
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#0D3D34]/40 font-medium">{course.icon} {course.title}</span>
          </div>
          <span className="text-xs font-bold text-[#0D3D34]/50">Lekce {idx + 1} / {course.total}</span>
        </div>
        {/* Progress dots */}
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-1.5 mt-2.5">
          {course.lessons.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i < idx
                  ? "w-2 h-2 bg-[#D7FF00]"
                  : i === idx
                  ? "w-3 h-3 bg-[#0D3D34]"
                  : "w-2 h-2 bg-[#D1DFD8]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{typeIcon[lesson.type]}</span>
              <span className="text-xs text-[#0D3D34]/40">{lesson.mins} min</span>
              {isDone(course.id, idx) && (
                <span className="text-[10px] bg-[#D7FF00] text-[#0D3D34] font-bold px-2 py-0.5 rounded-full ml-auto">✓ Splněno</span>
              )}
            </div>
            <h2 className="font-bold text-[#0D3D34] text-base">{lesson.title}</h2>
          </div>

          <div className="p-6">
            {phase === "content" && (
              <>
                {hasBody ? (
                  <pre className="text-sm text-[#0D3D34]/80 leading-relaxed whitespace-pre-wrap font-sans mb-6">
                    {content.body}
                  </pre>
                ) : lesson.type === "video" ? (
                  <div className="bg-[#0D3D34] rounded-2xl aspect-video flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">▶️</div>
                      <div className="text-white/60 text-sm">Video lekce</div>
                      <div className="text-white/30 text-xs mt-1">Obsah dostupný v LMS systému</div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#EBF7F1] rounded-2xl p-8 text-center mb-6">
                    <div className="text-3xl mb-2">📄</div>
                    <div className="text-[#0D3D34]/50 text-sm">Obsah lekce se připravuje</div>
                  </div>
                )}

                <button
                  onClick={() => hasQuiz ? setPhase("quiz") : advance()}
                  className="w-full bg-[#0D3D34] text-[#D7FF00] py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  {hasQuiz ? "Přejít ke kvízu →" : isDone(course.id, idx) ? (idx + 1 < course.total ? "Pokračovat na další lekci →" : "Dokončit kurz →") : "Dokončit lekci · +50 b →"}
                </button>
              </>
            )}

            {phase === "quiz" && hasQuiz && (
              <QuizCard quiz={content.quiz!} onFinish={advance} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AkademieePage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { isDone, countDone } = useProgress();

  const course = COURSES.find((c) => c.id === selectedCourse);

  if (selectedCourse && course) {
    return <LessonWizard course={course} onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Akademie</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">5 kurzů · obsah z reálných školení Tramaco Energy</p>
      </div>

      <div className="bg-[#0D3D34] rounded-2xl p-5 mb-6 flex items-center gap-6">
        <div className="flex-1">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Celkový pokrok</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#D7FF00]" style={{ width: "56%" }} />
          </div>
          <div className="flex justify-between text-xs text-white/50 mt-1"><span>18 / 32 lekcí</span><span>56 %</span></div>
        </div>
        <div className="text-right">
          <div className="text-[#D7FF00] text-2xl font-bold">2/5</div>
          <div className="text-white/40 text-xs">kurzů dokončeno</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {COURSES.map((c) => {
          const done = countDone(c.id);
          const pct = Math.round((done / c.total) * 100);
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCourse(c.id)}
              className="bg-white border border-[#D1DFD8] rounded-2xl p-5 text-left hover:shadow-md hover:border-[#0D3D34]/20 transition-all group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF7F1] flex items-center justify-center text-xl flex-shrink-0">{c.icon}</div>
                <div className="min-w-0">
                  <div className="font-bold text-[#0D3D34] text-sm group-hover:text-[#1A6B5A] transition-colors">{c.title}</div>
                  <div className="text-xs text-[#0D3D34]/45 mt-0.5">{c.subtitle}</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-[#0D3D34]/40 mb-1">
                  <span>{done}/{c.total} lekcí</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct === 100 ? "#D7FF00" : "#B8E8D0" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {c.lessons.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full flex-shrink-0 ${isDone(c.id, i) ? "bg-[#D7FF00]" : "bg-[#D1DFD8]"}`} />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
