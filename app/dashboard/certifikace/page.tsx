"use client";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";

type Q = { q: string; options: string[]; correct: number; explanation: string };

type Cert = {
  id: string;
  title: string;
  desc: string;
  progress: number;
  badge: string;
  color: string;
  status: "done" | "active" | "locked";
  skills: string[];
  questions: Q[];
};

const CERTS: Cert[] = [
  {
    id: "zaklady-energetiky",
    title: "Základy energetiky",
    desc: "Pojmy, EAN/EIC, instituce trhu, distribuce a FVE výkup – základ pro každého nového operátora.",
    progress: 0,
    badge: "⚡",
    color: "#EBF7F1",
    status: "active",
    skills: ["EAN a EIC", "ČEPS / ERÚ / OTE", "Distribuční sazby", "FVE výkup"],
    questions: [
      { q: "Kdo zajišťuje distribuci elektřiny na území Jižní Moravy?", options: ["ČEZ Distribuce", "EG.D", "PRE Distribuce", "GasNet"], correct: 1, explanation: "Jižní Morava patří do distribučního území EG.D (dříve E.ON Distribuce). ČEZ Distribuce kryje většinu zbytku ČR, PRE jen Prahu." },
      { q: "Je Electree obchodník (dodavatel), nebo distributor?", options: ["Distributor – vlastní distribuční síť", "Obchodník (dodavatel) – prodává elektřinu a plyn, síť nevlastní", "Výrobce elektřiny", "Regulační orgán trhu"], correct: 1, explanation: "Electree je dodavatel (obchodník) – nakupuje a prodává elektřinu/plyn a vykupuje přetoky z FVE. Síť vlastní a provozují distributoři (ČEZ Distribuce, EG.D, PRE Distribuce)." },
      { q: "Co znamená zkratka EAN?", options: ["Evidenční adresa nemovitosti", "Identifikační číslo odběrného/výrobního místa elektřina (18místné)", "Energetický audit nemovitosti", "Evropská asociace dodavatelů"], correct: 1, explanation: "EAN jednoznačně identifikuje konkrétní odběrné nebo výrobní místo elektřiny – 18místné číslo, začínající 859182400." },
      { q: "Kdo stanovuje cenu za distribuci elektřiny a plynu?", options: ["Každý distributor si ji určuje sám", "ERÚ – Energetický regulační úřad", "OTE", "Dodavatel (obchodník)"], correct: 1, explanation: "ERÚ reguluje cenu za distribuci – ta je stejná pro všechny dodavatele v daném území při stejné sazbě a jističi. Dodavatel ji neovlivní." },
      { q: "Co znamená zkratka OTE?", options: ["Operátor trhu s energiemi", "Obchodní tarif elektřiny", "Odbor technické energetiky", "Organizace trhu s elektřinou"], correct: 0, explanation: "OTE = Operátor trhu s energiemi. Zajišťuje zúčtování odchylek, správu trhu a stanovuje spotovou cenu." },
      { q: "Kdo zajišťuje odečet elektroměru?", options: ["Dodavatel (Electree)", "Distributor (např. EG.D, ČEZ Distribuce)", "OTE", "Zákazník si odečet vždy dělá sám"], correct: 1, explanation: "Odečet zajišťuje distributor – elektroměr fyzicky vlastní a provozuje, bez ohledu na to, kdo je dodavatel." },
      { q: "U jaké komodity používáme EIC kód?", options: ["Elektřina", "Plyn", "Voda", "Teplo"], correct: 1, explanation: "EIC je identifikační číslo odběrného místa PLYNU. U elektřiny se používá EAN." },
      { q: "Kdo vykupuje přetoky z FVE?", options: ["Vždy jen distributor", "Obchodník (dodavatel) na základě smlouvy o výkupu – např. Electree", "OTE automaticky", "Přetoky nelze prodávat"], correct: 1, explanation: "Přetoky vykupuje obchodník na základě uzavřené smlouvy o výkupu. Distributor síť jen provozuje, výkup nezajišťuje." },
      { q: "Co je přetok do sítě?", options: ["Výpadek dodávky elektřiny", "Elektřina vyrobená FVE, kterou domácnost nespotřebuje a odešle do sítě", "Porucha na elektroměru", "Zvýšení napětí v síti"], correct: 1, explanation: "Přetok je přebytek výroby FVE nad aktuální spotřebou domácnosti. Se smlouvou o výkupu na něm zákazník vydělá." },
      { q: "Kdo stanovuje cenu SPOTu pro výkup elektřiny z FVE?", options: ["Electree", "ERÚ", "OTE – Operátor trhu s energiemi", "Distributor"], correct: 2, explanation: "Cena spotu se odvíjí od situace na trhu a je stanovena OTE. Mění se každou hodinu, ve špičkách může klesnout i do záporu." },
      { q: "Jaký elektroměr musí mít zákazník, který má FVE?", options: ["Jednotarifový", "Čtyřkvadrantní (měří odběr i dodávku do sítě)", "Žádný speciální elektroměr není potřeba", "Mechanický indukční"], correct: 1, explanation: "Čtyřkvadrantní elektroměr měří odebranou i dodanou (přetokovou) elektřinu – nutné pro správné vyúčtování výkupu." },
      { q: "Na jakém distribučním území se nachází zákazník s EAN 859182400405238965?", options: ["EG.D", "PRE Distribuce", "ČEZ Distribuce", "GasNet"], correct: 2, explanation: "Po prefixu 859182400 následuje rozlišovací číslice: 1–2 = EG.D, 3 = PRE, 4–9 = ČEZ Distribuce. Zde je to číslice 4 → ČEZ Distribuce." },
      { q: "Na jakém distribučním území se nachází zákazník s EIC 27ZG700Z20516964?", options: ["EG.D", "Pražská plynárenská Distribuce", "GasNet", "ČEZ Distribuce"], correct: 2, explanation: "U EIC plynu prefix 27ZG + číslo určuje distributora: 900 = EG.D, 100 = Pražská plynárenská Distribuce, 200–700 = GasNet. Zde 700 → GasNet." },
      { q: "Co znamená zkratka SoP?", options: ["Smlouva o připojení", "Souhlas o platbě", "Smlouva o prodeji", "Stav odběrného místa"], correct: 0, explanation: "SoP = smlouva o připojení. Bývá v ní uveden i výrobní EAN, pokud se připojuje FVE." },
      { q: "Co znamená zkratka PM?", options: ["Provozní manuál", "Plná moc", "Platební metoda", "Přenosová mapa"], correct: 1, explanation: "PM = plná moc. Zákazník jí zmocňuje Electree, aby za něj vyřídilo např. výpověď u stávajícího dodavatele." },
      { q: "Jak se značí distribuční sazba, když je zákazník podnikatel?", options: ["Vždy stejně jako domácnost – sazby D", "Sazbami s prefixem C (např. C01d, C02d)", "Sazbami s prefixem P", "Podnikatelé sazbu nemají"], correct: 1, explanation: "Domácnosti mají sazby D (D01d, D25d…), podnikatelé a firmy sazby C (C01d, C02d…)." },
      { q: "Má zákazník s FVE stejný EAN pro odběr elektřiny i pro odesílání přetoků?", options: ["Ano, je to jedno a totéž EAN", "Ne – odběrné místo má spotřební EAN, výrobna má samostatný výrobní EAN", "Záleží na výkonu FVE", "EAN se u FVE nepřiděluje"], correct: 1, explanation: "Odběr a výroba jsou dvě různá místa se dvěma různými EAN. Výrobní EAN najdeme v PPP dokumentu nebo smlouvě o připojení – nikdy v dokumentu UTP." },
      { q: "Co znamená zkratka ZD?", options: ["Změna dodavatele", "Zákaznická data", "Zúčtovací doklad", "Zápis distributora"], correct: 0, explanation: "ZD = změna dodavatele. Používá se např. při zápisu důvodu hovoru do EIS." },
      { q: "Jaký je rozdíl mezi zákaznickým účtem MOP a MOO?", options: ["MOP a MOO je totéž", "MOP = maloodběr podnikatel, MOO = maloodběr obyvatelstvo/domácnost", "MOP je pro elektřinu, MOO pro plyn", "MOO je pro firmy, MOP pro domácnosti"], correct: 1, explanation: "MOP = maloodběr podnikatel (firmy, IČO). MOO = maloodběr obyvatelstvo (domácnosti)." },
      { q: "Jaké ceníky na výkup elektřiny z FVE Electree aktuálně nabízí?", options: ["Pouze jeden univerzální ceník pro všechny", "Home Solar FIX (MINI/standard/MAXI) a se zapnutým chytrým řízením Solar FREE nebo Solar PLUS", "Pouze SPOT bez možnosti FIX", "Výkup vůbec nenabízíme"], correct: 1, explanation: "Bez chytrého řízení nabízíme FIX tarify dle velikosti výroby (MINI/standard/MAXI). Se zapnutým chytrým řízením (Electree Pulse) nabízíme Solar FREE (cca 4–10 MWh/rok přetoků) nebo Solar PLUS (mimo toto rozpětí)." },
      { q: "Může mít zákazník – domácnost u plynu produkt SPOT?", options: ["Ano, Electree nabízí SPOT i pro plyn", "Ne, aktuálně nabízíme u plynu pouze fixní ceníky (HOME FIX PLYN 12/24/36)", "Pouze pokud má FVE", "Pouze firmy s IČO"], correct: 1, explanation: "U plynu Electree v současnosti nabízí jen fixní produkty HOME FIX PLYN. SPOT plyn není v nabídce." },
    ],
  },
  {
    id: "produktovy-specialista",
    title: "Produktový specialista",
    desc: "Zvládnutí celého portfolia Tramaco Energy – elektřina, plyn, FVE výkup.",
    progress: 100,
    badge: "🏅",
    color: "#D7FF00",
    status: "done",
    skills: ["HOME FIX ceníky", "EXPERT FIX portfolio", "Plyn HOME FIX", "FVE výkupní produkty"],
    questions: [
      { q: "HOME FIX 24 – cena s DPH za MWh?", options: ["2 781,79 Kč", "3 084,29 Kč", "2 842,29 Kč", "2 963,29 Kč"], correct: 2, explanation: "HOME FIX 24 = 2 842,29 Kč/MWh s DPH. Nejoblíbenější produkt – nejlepší poměr cena/jistota." },
      { q: "HOME FIX 12 – cena s DPH za MWh?", options: ["2 842,29 Kč", "3 084,29 Kč", "2 781,79 Kč", "3 205,29 Kč"], correct: 1, explanation: "HOME FIX 12 = 3 084,29 Kč/MWh s DPH. Nejkratší vázanost, ale nejvyšší cena komodity." },
      { q: "HOME FIX 36 – cena s DPH za MWh?", options: ["2 842,29 Kč", "3 084,29 Kč", "2 963,29 Kč", "2 781,79 Kč"], correct: 3, explanation: "HOME FIX 36 = 2 781,79 Kč/MWh s DPH. Nejnižší komodita v elektřině, ale závazek na 3 roky." },
      { q: "Jaký je paušál HOME FIX 24 a HOME FIX 36?", options: ["156,09 Kč/měs.", "180,29 Kč/měs.", "200,00 Kč/měs.", "129,00 Kč/měs."], correct: 1, explanation: "Paušál HOME FIX 24 a 36 = 180,29 Kč/měsíc. HOME FIX 12 má nižší paušál 156,09 Kč/měs." },
      { q: "EXPERT FIX 24 – cena s DPH za MWh?", options: ["2 842,29 Kč", "3 205,29 Kč", "2 963,29 Kč", "2 902,79 Kč"], correct: 2, explanation: "EXPERT FIX 24 = 2 963,29 Kč/MWh. EXPERT produkty jsou pro firmy s IČO – dražší než HOME." },
      { q: "HOME FIX plyn 24 – cena s DPH za MWh?", options: ["1 632,29 Kč", "1 800,00 Kč", "1 299,00 Kč", "1 571,79 Kč"], correct: 3, explanation: "HOME FIX plyn 24 = 1 571,79 Kč/MWh s DPH. Stejná cena jako FIX 36!" },
      { q: "HOME FIX plyn 12 – cena s DPH za MWh?", options: ["1 571,79 Kč", "1 800,00 Kč", "1 632,29 Kč", "1 399,00 Kč"], correct: 2, explanation: "HOME FIX plyn 12 = 1 632,29 Kč/MWh. O 60,50 Kč/MWh dražší než FIX 24/36." },
      { q: "Home Solar FIX – výkupní cena za MWh?", options: ["1 000 Kč/MWh", "500 Kč/MWh", "400 Kč/MWh", "300 Kč/MWh"], correct: 1, explanation: "Home Solar FIX (standard) = 500 Kč/MWh výkup, limit do 10 MWh/rok. Nejoblíbenější." },
      { q: "Home Solar FIX MAXI – výkupní cena za MWh?", options: ["500 Kč/MWh", "1 000 Kč/MWh", "400 Kč/MWh", "600 Kč/MWh"], correct: 2, explanation: "FIX MAXI = 400 Kč/MWh, pro FVE s výrobou nad 10 MWh/rok. Paušál 99 Kč/měs." },
      { q: "Paušál Home Solar FIX (standard)?", options: ["39 Kč/měs.", "99 Kč/měs.", "79 Kč/měs.", "59 Kč/měs."], correct: 3, explanation: "Home Solar FIX paušál = 59 Kč/měsíc. MINI = 39 Kč, MAXI = 99 Kč." },
      { q: "Zákazník chce jistotu a nejlepší cenu elektřiny. Který produkt doporučíte?", options: ["HOME FIX 12", "HOME FIX 24", "EXPERT FIX 36", "HOME FIX 36"], correct: 1, explanation: "HOME FIX 24 = nejlepší poměr cena/jistota. Nejoblíbenější produkt Tramaco pro domácnosti." },
      { q: "Zákazník je firma s IČO. Který produkt použijete?", options: ["HOME FIX 24", "HOME FIX 36", "EXPERT FIX 24", "Nelze – firmy neobsluhujeme"], correct: 2, explanation: "EXPERT FIX produkty jsou určeny pro firmy a podnikatele s IČO. HOME FIX je pro domácnosti." },
    ],
  },
  {
    id: "retencni-expert",
    title: "Retenční expert",
    desc: "Zákaznická retence, řešení námitek a zvládání obtížných situací.",
    progress: 68,
    badge: "🛡️",
    color: "#EBF7F1",
    status: "active",
    skills: ["Aktivní naslouchání", "Námitka na cenu", "Námitka na konkurenci", "Zákon o zákaznících"],
    questions: [
      { q: "Co uděláte jako první při retenčním hovoru?", options: ["Okamžitě nabídnete nižší cenu", "Nechte zákazníka mluvit – zjistíte skutečný důvod", "Sdělíte výpovědní lhůtu", "Přepojíte na vedoucího"], correct: 1, explanation: "Vždy nejprve naslouchejte. Čím víc zákazník řekne, tím lépe víte, co nabídnout." },
      { q: "Do kolika dnů od podpisu u jiné firmy může zákazník zákonně odstoupit?", options: ["7 dní", "14 dní", "30 dní", "Nelze odstoupit"], correct: 1, explanation: "14 dní – zákon o spotřebitelích. Zákazník může od nové smlouvy odstoupit bez udání důvodu." },
      { q: "Zákazník říká, že dostal lepší nabídku od konkurence. Jaký je první krok?", options: ["Okamžitě nabídnout slevu", "Zjistit detaily nabídky – jaká cena, jak dlouho", "Říct, že naše ceny jsou nejlepší", "Zpochybnit pravdivost nabídky"], correct: 1, explanation: "Nejprve zjistěte detaily – konkrétní cenu a délku fixace. Bez dat nemůžete srovnávat." },
      { q: "Co NESMÍTE nabídnout zákazníkovi bez souhlasu vedoucího?", options: ["Delší fixaci", "Přechod na jiný produkt", "Individuální cenovou slevu", "Informaci o výpovědní lhůtě"], correct: 2, explanation: "Individuální slevy vyžadují schválení vedoucího. Jinak narušíte ceníkovou politiku firmy." },
      { q: "Zákazník odchází k ČEZ. Váš klíčový argument?", options: ["ČEZ je lepší firma", "Distribuce se nemění – zákazník pořád platí ČEZ Distribuci", "Naše ceny jsou nižší", "ČEZ má horší zákaznický servis"], correct: 1, explanation: "Distribuce (kabely, jističe) zajišťuje ČEZ Distribuce vždy, bez ohledu na dodavatele." },
      { q: "Zákazník je naštvaný a křičí. Jak reagujete?", options: ["Zvýšíte hlas také", "Okamžitě nabídnete slevu", "Zůstanete klidní, necháte ho mluvit, pak nabídnete řešení", "Zavěsíte a zavoláte zpět"], correct: 2, explanation: "Klid je základ. Naštvaný zákazník potřebuje být vyslyšen – přeryvy situaci zhoršují." },
      { q: "Zákazník se stěžuje na vysoký účet. Jaký je první krok?", options: ["Nabídnout kompenzaci", "Ověřit, zda je na SPOT tarifu", "Přepojit na techniku", "Zpochybnit výši účtu"], correct: 1, explanation: "SPOT zákazníci mohou v zimních špičkách platit 2–3× více než na FIX. Vždy zkontrolujte tarif." },
      { q: "Zákazník říká, že nechce dlouhý závazek. Co nabídnout?", options: ["SPOT bez fixace", "HOME FIX 36", "HOME FIX 12 (12 měsíců)", "Nic – bez fixace nelze"], correct: 2, explanation: "HOME FIX 12 = nejkratší fixace. Zákazník se zaváže jen na rok a pak se svobodně rozhodne." },
      { q: "Zákazník říká, že se bude stěhovat. Jak postupujete?", options: ["Smlouvu zrušíte", "Zjistíte kdy a kam, nabídnete přepis smlouvy na novou adresu", "Řeknete, že to nelze", "Přepojíte na techniku"], correct: 1, explanation: "Přepis odběrného místa je standardní postup v EIS. Zákazník nemusí smlouvu rušit." },
      { q: "Co zapíšete do EIS po úspěšném retenčním hovoru?", options: ["Nic – hovor byl úspěšný", "Jen datum hovoru", "Číslo zákazníka a OK", "Důvod pokusu o odchod, nabídnuté řešení, výsledek"], correct: 3, explanation: "Detailní zápis slouží pro reporting a případné budoucí retenční hovory se stejným zákazníkem." },
      { q: "Zákazník říká, že má smlouvu u nás, ale volá ze zahraničí. Jak postupujete?", options: ["Zavěsíte – nemůžete ověřit totožnost", "Ověříte totožnost standardními otázkami (datum nar., adresa)", "Řeknete, že zavolá z ČR", "Okamžitě eskalujete"], correct: 1, explanation: "Ověření totožnosti probíhá standardně bez ohledu na polohu zákazníka." },
      { q: "Zákazník podepsal smlouvu u jiné firmy před 10 dny. Co uděláte?", options: ["Nic – je pozdě", "Upozorníte ho, že stále má 4 dny na zákonné odstoupení", "Zrušíte smlouvu u nás", "Eskalujete okamžitě"], correct: 1, explanation: "14dní lhůta ještě neuplynula – zákazník může novou smlouvu zrušit a zůstat u vás." },
    ],
  },
  {
    id: "fve-specialista",
    title: "FVE & Výkup specialista",
    desc: "Fotovoltaika, výkupní smlouvy, správa výrobny v EIS.",
    progress: 40,
    badge: "☀️",
    color: "#EBF7F1",
    status: "active",
    skills: ["Výkupní produkty", "Přepis výrobny EIS", "Smlouva na výkup", "EAN výrobce"],
    questions: [
      { q: "Home Solar FIX – výkupní cena (standard)?", options: ["1 000 Kč/MWh", "500 Kč/MWh", "400 Kč/MWh", "300 Kč/MWh"], correct: 1, explanation: "500 Kč/MWh pro výrobu do 10 MWh/rok. Nejoblíbenější výkupní produkt." },
      { q: "Home Solar FIX MAXI – výkupní cena?", options: ["500 Kč/MWh", "1 000 Kč/MWh", "400 Kč/MWh", "600 Kč/MWh"], correct: 2, explanation: "400 Kč/MWh pro výrobu nad 10 MWh/rok. Paušál 99 Kč/měs." },
      { q: "Home Solar FIX MINI – výkupní cena?", options: ["400 Kč/MWh", "1 000 Kč/MWh", "500 Kč/MWh", "800 Kč/MWh"], correct: 1, explanation: "1 000 Kč/MWh pro výrobu do 1 MWh/rok. Paušál 39 Kč/měs. Zákazník musí mít odběr u Tramaco." },
      { q: "Zákazník má FVE 8 kWp, odhadovaná výroba 7 MWh/rok. Který produkt?", options: ["FIX MINI (1 000 Kč/MWh)", "Home Solar FIX (500 Kč/MWh)", "FIX MAXI (400 Kč/MWh)", "SPOT výkup"], correct: 1, explanation: "7 MWh/rok → Home Solar FIX (do 10 MWh). FIX MINI jen do 1 MWh, MAXI nad 10 MWh." },
      { q: "Jaký dokument zákazník NESMÍ použít pro výrobní EAN?", options: ["PPP (první paralelní připojení)", "Smlouva o připojení (SoP)", "UTP (uvedení do trvalého provozu)", "E-mail od distributora"], correct: 2, explanation: "V UTP dokumentu je EAN spotřební, NE výrobní. Zákazníci si je pravidelně pletou!" },
      { q: "Co je PPP dokument?", options: ["Potvrzení platby paušálu", "Dokument o prvním paralelním připojení FVE", "Přepis pro podnikatele", "Plán plateb pravidelný"], correct: 1, explanation: "PPP = první paralelní připojení. Zákazník ho dostane od distributora při připojení FVE k síti." },
      { q: "Zákazník má FVE, výroba 18 MWh/rok. Který produkt?", options: ["FIX MINI", "Home Solar FIX (500 Kč/MWh)", "Home Solar FIX MAXI (400 Kč/MWh)", "SPOT výkup"], correct: 2, explanation: "18 MWh > 10 MWh → Home Solar FIX MAXI (400 Kč/MWh, paušál 99 Kč/měs)." },
      { q: "Zákazník dostane v měsíci zápornou fakturu za výkup (výroba < paušál)?", options: ["Ano, vrátíme mu peníze", "Ne, pohledávka se převádí do dalšího měsíce", "Zákazník doplatí rozdíl", "Smlouva se pozastaví"], correct: 1, explanation: "Zákazník nikdy nedostane zápornou fakturu. Pohledávka se převádí do dalšího měsíce." },
      { q: "Paušál Home Solar FIX MAXI?", options: ["39 Kč/měs.", "59 Kč/měs.", "79 Kč/měs.", "99 Kč/měs."], correct: 3, explanation: "MINI = 39, FIX = 59, MAXI = 99 Kč/měs. S rostoucí výrobou roste i paušál." },
      { q: "Co musí mít zákazník navíc pro Home Solar FIX MINI?", options: ["Baterii doma", "Odběr elektřiny u Tramaco", "Licenci ERÚ", "Výkon nad 10 kWp"], correct: 1, explanation: "FIX MINI vyžaduje, aby zákazník měl zároveň smlouvu na odběr elektřiny u Tramaco." },
      { q: "Zákazník neví, kde najít výrobní EAN. Kde NEjprve hledáte?", options: ["Fakturu od silové elektřiny", "Dokument PPP nebo SoP (smlouva o připojení)", "Stavební povolení FVE", "Sériové číslo střídače"], correct: 1, explanation: "PPP nebo SoP jsou primární zdroje výrobního EAN. Faktury od silové elektřiny mají spotřební EAN." },
      { q: "Zákazník má miniaturní FVE, výroba do 0,8 MWh/rok. Který produkt?", options: ["Home Solar FIX (500 Kč/MWh)", "FIX MAXI (400 Kč/MWh)", "Home Solar FIX MINI (1 000 Kč/MWh)", "Bez výkupu – příliš malá výroba"], correct: 2, explanation: "Do 1 MWh/rok → FIX MINI (1 000 Kč/MWh). Vyšší cena za kWh kompenzuje nízkou výrobu." },
    ],
  },
  {
    id: "crm-expert",
    title: "CRM & EIS expert",
    desc: "Plná znalost systému EIS – zakládání zákazníků, změny, přepisy.",
    progress: 0,
    badge: "💻",
    color: "#EBF7F1",
    status: "locked",
    skills: ["Založení zákazníka", "Přepis výrobny", "Změna ceníku", "Smlouvy v EIS"],
    questions: [],
  },
];

const TEAM = [
  { name: "Eva Procházková", certs: 4, initials: "EP" },
  { name: "Martin Novák", certs: 3, initials: "MN" },
  { name: "Petra Vlčková", certs: 2, initials: "PV", active: true },
  { name: "Jana Horáčková", certs: 2, initials: "JH" },
  { name: "Lukáš Dvořák", certs: 1, initials: "LD" },
];

type ExamAnswers = number[];

function FullExam({
  cert, answers, currentIdx, selected, onSelect, onNext, done, onRetry, onBack,
}: {
  cert: Cert;
  answers: ExamAnswers;
  currentIdx: number;
  selected: number | null;
  onSelect: (i: number) => void;
  onNext: () => void;
  done: boolean;
  onRetry: () => void;
  onBack: () => void;
}) {
  const { saveCert } = useProgress();
  const total = cert.questions.length;
  const score = answers.filter((a, i) => a === cert.questions[i]?.correct).length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = pct >= 67;
  const q = cert.questions[currentIdx];
  const isAnswered = selected !== null;

  if (done) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-[#D1DFD8] px-8 py-4 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-[#0D3D34]/50 hover:text-[#0D3D34] text-sm transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Zpět na testy
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-base">{cert.badge}</span>
            <span className="text-sm font-bold text-[#0D3D34]">{cert.title}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto w-full">
          {/* Result hero */}
          <div className={`rounded-3xl p-8 mb-6 text-center ${passed ? "bg-[#D7FF00]" : "bg-red-50 border border-red-200"}`}>
            <div className="text-5xl mb-3">{passed ? "🎉" : "📚"}</div>
            <h2 className="text-2xl font-black text-[#0D3D34] mb-1">{passed ? "Certifikát získán!" : "Zkouška nesplněna"}</h2>
            <p className="text-[#0D3D34]/60 text-sm">{passed ? "Gratulujeme k úspěšnému složení zkoušky." : "Nevadí – prostudujte si nesprávné odpovědi a zkuste to znovu."}</p>
          </div>

          {/* Score stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-[#0D3D34]">{score}/{total}</div>
              <div className="text-xs text-[#0D3D34]/50 mt-1">Správně</div>
            </div>
            <div className={`rounded-2xl p-5 text-center ${passed ? "bg-[#EBF7F1]" : "bg-red-50 border border-red-200"}`}>
              <div className={`text-3xl font-black ${passed ? "text-[#1A6B5A]" : "text-red-600"}`}>{pct}%</div>
              <div className="text-xs text-[#0D3D34]/50 mt-1">Úspěšnost</div>
            </div>
            <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-[#0D3D34]">67%</div>
              <div className="text-xs text-[#0D3D34]/50 mt-1">Minimum</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5 mb-6">
            <div className="flex justify-between text-xs text-[#0D3D34]/50 mb-2">
              <span>Výsledek</span>
              <span>{pct}% {passed ? "✓ splněno" : "✗ nesplněno (min. 67 %)"}</span>
            </div>
            <div className="h-3 bg-[#EBF7F1] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: passed ? "#D7FF00" : "#EF4444" }} />
            </div>
          </div>

          {/* Per-question review */}
          <div className="space-y-3 mb-8">
            <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest">Přehled odpovědí</div>
            {cert.questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correct;
              return (
                <div key={i} className={`rounded-xl border p-4 ${isCorrect ? "bg-[#EBF7F1] border-[#B8E8D0]" : "bg-red-50 border-red-200"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${isCorrect ? "bg-[#1A6B5A] text-white" : "bg-red-500 text-white"}`}>
                      {isCorrect ? "✓" : "✗"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0D3D34] mb-2">{q.q}</p>
                      {!isCorrect && (
                        <div className="space-y-1 mb-2">
                          <div className="text-xs text-red-600">Vaše odpověď: <span className="font-semibold">{q.options[userAnswer]}</span></div>
                          <div className="text-xs text-[#1A6B5A]">Správná odpověď: <span className="font-semibold">{q.options[q.correct]}</span></div>
                        </div>
                      )}
                      <div className="text-xs text-[#0D3D34]/60 italic">{q.explanation}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onRetry} className="flex-1 bg-[#0D3D34] text-[#D7FF00] py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Zkusit znovu
            </button>
            <button onClick={onBack} className="flex-1 bg-white border border-[#D1DFD8] text-[#0D3D34] py-3 rounded-xl font-bold hover:bg-[#EBF7F1] transition-colors">
              Zpět na testy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#D1DFD8] px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="text-[#0D3D34]/40 hover:text-[#0D3D34] transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span>{cert.badge}</span>
              <span className="text-sm font-bold text-[#0D3D34]">{cert.title}</span>
              <span className="text-[10px] text-[#0D3D34]/40 ml-auto">Otázka {currentIdx + 1} / {total}</span>
            </div>
            <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
              <div className="h-full bg-[#0D3D34] rounded-full transition-all" style={{ width: `${((currentIdx + (isAnswered ? 1 : 0)) / total) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center p-8">
        <div className="w-full max-w-3xl">
          <div className="bg-white border border-[#D1DFD8] rounded-3xl overflow-hidden mb-4">
            <div className="p-8">
              <div className="text-[10px] font-bold text-[#0D3D34]/30 uppercase tracking-widest mb-4">Otázka {currentIdx + 1}</div>
              <h2 className="text-xl font-bold text-[#0D3D34] leading-relaxed mb-8">{q.q}</h2>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let cls = "border-[#D1DFD8] bg-white hover:border-[#0D3D34]/30 hover:bg-[#EBF7F1] text-[#0D3D34] cursor-pointer";
                  if (isAnswered) {
                    if (i === q.correct) cls = "border-[#1A6B5A] bg-[#EBF7F1] text-[#1A6B5A] font-semibold cursor-default";
                    else if (i === selected) cls = "border-red-400 bg-red-50 text-red-700 cursor-default";
                    else cls = "border-[#D1DFD8] bg-white text-[#0D3D34]/30 cursor-default";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => onSelect(i)}
                      disabled={isAnswered}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm ${cls}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${isAnswered && i === q.correct ? "bg-[#1A6B5A] border-[#1A6B5A] text-white" : isAnswered && i === selected ? "bg-red-500 border-red-500 text-white" : "border-[#D1DFD8] text-[#0D3D34]/40"}`}>
                          {["A", "B", "C", "D"][i]}
                        </div>
                        {opt}
                        {isAnswered && i === q.correct && <span className="ml-auto text-[#1A6B5A]">✓</span>}
                        {isAnswered && i === selected && i !== q.correct && <span className="ml-auto text-red-500">✗</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {isAnswered && (
              <div className={`px-8 py-5 border-t ${selected === q.correct ? "bg-[#EBF7F1] border-[#B8E8D0]" : "bg-red-50 border-red-200"}`}>
                <div className="flex items-start gap-3">
                  <span className="text-lg">{selected === q.correct ? "✅" : "❌"}</span>
                  <div>
                    <div className={`text-sm font-bold mb-1 ${selected === q.correct ? "text-[#1A6B5A]" : "text-red-700"}`}>
                      {selected === q.correct ? "Správně!" : "Nesprávně"}
                    </div>
                    <p className="text-xs text-[#0D3D34]/70 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isAnswered && (
            <button onClick={onNext} className="w-full bg-[#0D3D34] text-[#D7FF00] py-4 rounded-2xl font-bold text-base hover:opacity-90 transition-opacity">
              {currentIdx + 1 < total ? `Další otázka (${currentIdx + 2}/${total}) →` : "Zobrazit výsledek →"}
            </button>
          )}

          {!isAnswered && (
            <p className="text-center text-xs text-[#0D3D34]/30 mt-3">Vyberte jednu ze čtyř možností</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CertifikacePage() {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswers>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [examActive, setExamActive] = useState(false);
  const [examDone, setExamDone] = useState(false);
  const { progress, saveCert } = useProgress();

  const startExam = (cert: Cert) => {
    setActiveCert(cert);
    setCurrentIdx(0);
    setAnswers([]);
    setSelected(null);
    setExamActive(true);
    setExamDone(false);
  };

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const handleNext = () => {
    if (selected === null || !activeCert) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (currentIdx + 1 >= activeCert.questions.length) {
      const sc = newAnswers.filter((a, i) => a === activeCert.questions[i]?.correct).length;
      saveCert(activeCert.id, sc / activeCert.questions.length >= 0.67, sc);
      setExamDone(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    }
  };

  const handleRetry = () => {
    if (!activeCert) return;
    setCurrentIdx(0);
    setAnswers([]);
    setSelected(null);
    setExamDone(false);
  };

  const handleBack = () => {
    setExamActive(false);
    setExamDone(false);
    setActiveCert(null);
  };

  const getCertStatus = (cert: Cert): "done" | "active" | "locked" => {
    if (progress.certResults[cert.id]?.passed) return "done";
    return cert.status === "locked" ? "locked" : "active";
  };

  if (examActive && activeCert) {
    return (
      <FullExam
        cert={activeCert}
        answers={answers}
        currentIdx={currentIdx}
        selected={selected}
        onSelect={handleSelect}
        onNext={handleNext}
        done={examDone}
        onRetry={handleRetry}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Testy</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Ověř si znalosti a získej certifikát · min. 67 % pro úspěšné složení</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {CERTS.map((cert) => {
            const status = getCertStatus(cert);
            const result = progress.certResults[cert.id];
            return (
              <div key={cert.id} className="bg-white border border-[#D1DFD8] rounded-2xl p-6 hover:border-[#0D3D34]/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: cert.color }}>
                    {cert.badge}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-[#0D3D34] text-base">{cert.title}</h3>
                      {status === "done" && <span className="text-[10px] font-bold bg-[#D7FF00] text-[#0D3D34] px-2 py-0.5 rounded-full">ZÍSKÁNO ✓</span>}
                      {status === "locked" && <span className="text-[10px] font-bold bg-[#D1DFD8] text-[#0D3D34]/50 px-2 py-0.5 rounded-full">UZAMČENO 🔒</span>}
                      {status === "active" && <span className="text-[10px] font-bold bg-[#EBF7F1] text-[#1A6B5A] px-2 py-0.5 rounded-full">K DISPOZICI</span>}
                    </div>
                    <p className="text-xs text-[#0D3D34]/50 mb-3">{cert.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.map((s) => (
                        <span key={s} className="text-[10px] bg-[#EBF7F1] text-[#0D3D34]/60 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                    {result && (
                      <div className={`text-xs mb-3 flex items-center gap-2 ${result.passed ? "text-[#1A6B5A]" : "text-red-600"}`}>
                        <span>{result.passed ? "✓ Složeno" : "✗ Nesloženo"}</span>
                        <span className="text-[#0D3D34]/40">· {result.score}/{cert.questions.length} správně · {result.date}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm text-[#0D3D34]/40 mb-2">{cert.questions.length} otázek</div>
                    {status !== "locked" && cert.questions.length > 0 && (
                      <button
                        onClick={() => startExam(cert)}
                        className="bg-[#0D3D34] text-[#D7FF00] px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
                      >
                        {status === "done" ? "Spustit znovu" : "Zahájit zkoušku"}
                      </button>
                    )}
                    {status === "locked" && (
                      <div className="text-xs text-[#0D3D34]/30 text-center">Odemknout<br />dokončením</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team + info */}
        <div className="space-y-4">
          <div className="bg-[#0D3D34] rounded-2xl p-5 text-white">
            <div className="text-[10px] font-bold text-[#D7FF00] uppercase tracking-widest mb-3">Jak funguje zkouška</div>
            <div className="space-y-2 text-xs text-white/70">
              <div className="flex items-start gap-2"><span className="text-[#D7FF00]">→</span> Každá zkouška má 12 otázek</div>
              <div className="flex items-start gap-2"><span className="text-[#D7FF00]">→</span> Minimum pro úspěch: 67 % (8/12)</div>
              <div className="flex items-start gap-2"><span className="text-[#D7FF00]">→</span> Po každé otázce vidíte vysvětlení</div>
              <div className="flex items-start gap-2"><span className="text-[#D7FF00]">→</span> Na konci kompletní přehled chyb</div>
              <div className="flex items-start gap-2"><span className="text-[#D7FF00]">→</span> Za certifikát získáte 500 bodů</div>
            </div>
          </div>

          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D1DFD8]">
              <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Tým – certifikáty</div>
            </div>
            <div className="divide-y divide-[#D1DFD8]">
              {[...TEAM].sort((a, b) => b.certs - a.certs).map((m) => (
                <div key={m.name} className={`flex items-center gap-3 px-4 py-2.5 ${m.active ? "bg-[#EBF7F1]" : ""}`}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ backgroundColor: m.active ? "#D7FF00" : "#EBF7F1", color: "#0D3D34" }}>{m.initials}</div>
                  <div className="flex-1 text-xs font-semibold text-[#0D3D34] truncate">{m.name}{m.active ? " (vy)" : ""}</div>
                  <div className="flex gap-0.5">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="w-4 h-4 rounded-sm flex items-center justify-center text-[9px]" style={{ backgroundColor: j < m.certs ? "#D7FF00" : "#EBF7F1" }}>
                        {j < m.certs ? "✓" : ""}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-[#0D3D34]">{m.certs}/4</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
