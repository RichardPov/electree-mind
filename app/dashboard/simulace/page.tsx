"use client";
import { useState, useRef } from "react";

type StepCategory = "struktura" | "spravnost" | "namitka" | "cta" | "uzavreni";

type StepOption = {
  text: string;
  score: 0 | 1 | 2;
  feedback: string;
};

type SimStep = {
  situation: string;
  category: StepCategory;
  options: [StepOption, StepOption, StepOption];
};

type Scenario = {
  id: string;
  clientName: string;
  mainObjection: string;
  context: string;
  steps: SimStep[];
};

const CAT_LABEL: Record<StepCategory, string> = {
  struktura: "Zahájení a struktura",
  spravnost: "Odborná správnost",
  namitka: "Práce s námitkou",
  cta: "CTA a závěr",
  uzavreni: "Uzavření",
};

const SCENARIOS: Scenario[] = [
  {
    id: "rozmyslet",
    clientName: "Tereza Horáková",
    mainObjection: "Musím si to rozmyslet",
    context: "Lead: ČEZ, 3 200 Kč/MWh, zálohy 1 800 Kč/měs, 12 MWh/rok",
    steps: [
      {
        situation: "Telefon zákaznice vyzvání. Je 9:30. Zahajte hovor.",
        category: "struktura",
        options: [
          { text: "Dobrý den, paní Horáková? Tady Petra z Electree. Volám vám, protože jste si u nás žádala o cenovou nabídku na elektřinu. Hodí se vám teď chvilka? Zabere to maximálně 10 minut.", score: 2, feedback: "Správně – rychlé, lidské, jasné. Zákaznice hned ví, kdo volá, proč a jak dlouho to potrvá." },
          { text: "Dobrý den, tady Petra z Electree. Volám kvůli nabídce elektřiny, máte chvilku?", score: 1, feedback: "Základní představení je OK, ale chybí propojení s žádostí zákaznice a délka hovoru – zákaznice neví, do čeho jde." },
          { text: "Dobrý den, chci vám nabídnout přechod k nám, ušetříte spoustu peněz!", score: 0, feedback: "Špatně – hned prodejní tlak bez představení. Zákaznice neví, kdo volá a proč. Hovor začíná špatně." },
        ],
      },
      {
        situation: "Zákaznice souhlasí s hovorem. Oznamte nahrávání.",
        category: "struktura",
        options: [
          { text: "Pro pořádek vás chci informovat, že je hovor z důvodu kvality nahráván. Souhlasíte? Děkuji. Takže – v dotazníku jste uvedla...", score: 2, feedback: "Správně – stručné, formální, a okamžitě navazuje na důvod hovoru bez zbytečného zdržování." },
          { text: "Jen tak pro vědomí, nahrávám si to.", score: 1, feedback: "Informace padla, ale chybí formální souhlas zákaznice. Takto to nevyhovuje standardu." },
          { text: "Nahrávání vás nemusí zajímat, to je jen pro nás. Takže, pojďme k nabídce.", score: 0, feedback: "Špatně – nahrávání musíte oznámit a získat souhlas. Přeskakování tohoto kroku je compliance problém." },
        ],
      },
      {
        situation: "Data z leadu: ČEZ, 3 200 Kč/MWh, zálohy 1 800 Kč/měsíc, 12 MWh/rok. Potvrďte data se zákaznicí.",
        category: "struktura",
        options: [
          { text: "V dotazníku jste uvedla dodavatele ČEZ, cenu kolem 3 200 Kč za MWh, zálohy 1 800 Kč měsíčně a roční spotřebu 12 MWh. Sedí to?", score: 2, feedback: "Výborně – potvrzení všech čtyř klíčových dat. Zákaznice ví, že vám jde o přesnost, ne jen o prodej." },
          { text: "Vidím, že jste u ČEZ a platíte zálohy 1 800 Kč. Chci vám ukázat lepší nabídku.", score: 1, feedback: "Částečně správně – ale potvrzujete jen část dat. Bez ceny za MWh a spotřeby nemůžete počítat přesnou úsporu." },
          { text: "Dobře, takže hned vám ukážu naši nejlepší nabídku – HOME FIX 24 za 2 349 Kč za MWh!", score: 0, feedback: "Špatně – přeskakujete potvrzení dat a rovnou prodáváte. Zákaznice nerozumí proč a co jste spočítali." },
        ],
      },
      {
        situation: "Data potvrzena. Zákaznice má ČEZ 3 200 Kč/MWh, 12 MWh/rok. Nabídněte HOME FIX 24 (2 349 Kč/MWh) a prezentujte úsporu.",
        category: "spravnost",
        options: [
          { text: "Oproti vaší stávající ceně byste s HOME FIX 24 ušetřila přibližně 10 200 Kč ročně – to jsou zálohy přibližně o 850 Kč měsíčně nižší. A navíc máte cenu zafixovanou na 2 roky.", score: 2, feedback: "Výborně – správný výpočet (3 200 – 2 349) × 12 = 10 212 Kč. Číslo přeloženo do měsíčního přínosu a jistoty fixace." },
          { text: "Ušetříte zhruba tisíc korun měsíčně, takže ročně okolo 12 000 Kč.", score: 1, feedback: "Úmysl správný, ale číslo je nadhodnocené. Správná úspora je ~10 200 Kč/rok. Neslibuj víc, než je reálné." },
          { text: "Naše cena je 2 349 Kč za MWh, takže je levnější než vaše 3 200 Kč.", score: 0, feedback: "Příliš technické – zákaznice neví, co to pro ni znamená. Musíte přeložit do konkrétní roční nebo měsíční úspory." },
        ],
      },
      {
        situation: "Zákaznice říká: 'To je hezké, ale musím si to rozmyslet.' Jak zareagujete?",
        category: "namitka",
        options: [
          { text: "Rozumím. A co konkrétně si nejste jistá? Úsporu jsme spočítali, ceny vám pošlu e-mailem a výpověď u ČEZ zařídíme my. Co vám ještě chybí k rozhodnutí?", score: 2, feedback: "Správně – nezavíráš hovor, zjišťuješ skutečný důvod nejistoty a nabízíš konkrétní řešení každé potenciální bariéry." },
          { text: "Jistě, dejte si čas. Ozvu se za týden.", score: 1, feedback: "Zdvořilé, ale pasivní. Zákaznice odchází bez vyřešení skutečné bariéry a může ji do týdne zapomenout." },
          { text: "Ale paní Horáková, ta nabídka platí jen do pátku! Měla byste se rozhodnout co nejdříve.", score: 0, feedback: "Špatně – tlak a lhůta, která pravděpodobně není pravdivá. Compliance porušení. Zákaznice ztratí důvěru." },
        ],
      },
      {
        situation: "Zákaznice říká: 'Hlavně se bojím, že při tom přechodu bude nějak přerušena dodávka.' Jak odpovíte?",
        category: "namitka",
        options: [
          { text: "Toho se bát nemusíte. Přechod probíhá administrativně a po celou dobu zůstáváte připojená k síti. Nemění se nic na dodávce – mění se jen firma na faktuře. Výpověď za vás zařídíme my na základě plné moci.", score: 2, feedback: "Správně – nejprve uklidnění, pak jasné vysvětlení. Zákaznice slyší, že se nic fyzicky nepřeruší a že nemusí nic řešit." },
          { text: "To bývá normálně do 14 dní hotové a problémy mívají jen firmy.", score: 1, feedback: "Částečně pomáhá, ale je nepřesné a nevysvětluje, že dodávka pokračuje bez přerušení. Zákaznice stále neví, jestli bude tma." },
          { text: "Tím se nemusíte trápit, to je zákonem dáno.", score: 0, feedback: "Vyhýbavé – zákaznice se ptá na konkrétní věc a dostane obecnou odpověď. Obava zůstane nevyřešená." },
        ],
      },
      {
        situation: "Zákaznice se uklidnila. Přejděte k výzvě k akci (CTA).",
        category: "cta",
        options: [
          { text: "Co říkáte, pojďme to zafixovat? Pošlu vám nabídku na e-mail ke kontrole a spolu s ní i plnou moc pro výpověď u ČEZ. Vy jen podepíšete online – zabere to pár minut.", score: 2, feedback: "Výborně – aktivní CTA, popis konkrétního dalšího kroku, zmínka o plné moci snižuje bariéru. Zákaznice ví přesně, co se stane." },
          { text: "Tak co, berete to?", score: 1, feedback: "CTA je tam, ale příliš přímé bez kontextu. Chybí vysvětlení co se stane dál – zákaznice neví, co po 'ano' následuje." },
          { text: "Dobře, pošlu vám informace e-mailem a pokud budete chtít, ozvěte se nám.", score: 0, feedback: "Pasivní závěr – zákaznice dostane e-mail, ale žádný konkrétní závazek ani krok. Pravděpodobně se neozve." },
        ],
      },
      {
        situation: "Zákaznice souhlasí. Uzavřete hovor profesionálně.",
        category: "uzavreni",
        options: [
          { text: "Skvěle, paní Horáková! Pošlu vám nabídku a plnou moc na e-mail. Vy jen podepíšete a my zařídíme zbytek včetně výpovědi u ČEZ. Datum zahájení dodávky vám přijde e-mailem. Děkuji za váš čas a těším se na spolupráci!", score: 2, feedback: "Profesionální uzavření – zákaznice ví co dostane, co se stane dál a co nemusí řešit. Poděkování je přirozené." },
          { text: "Výborně, tak pošlu e-mail. Nashledanou.", score: 1, feedback: "Základní uzavření, ale chybí zmínka o plné moci, datu zahájení a ujištění o jednoduchosti procesu." },
          { text: "Dobře. Tak někdy příště zavolám a uvidíme jak to dopadlo.", score: 0, feedback: "Špatně – zákaznice souhlasila, ale závěr vůbec nepotvrzuje, co se stane. Smlouva pravděpodobně nevznikne." },
        ],
      },
    ],
  },
  {
    id: "smlouva-jinde",
    clientName: "Martin Dvořák",
    mainObjection: "Mám smlouvu u jiného dodavatele",
    context: "Lead: E.ON, 3 100 Kč/MWh, zálohy 2 200 Kč/měs, 18 MWh/rok",
    steps: [
      {
        situation: "Zahajte hovor s panem Dvořákem.",
        category: "struktura",
        options: [
          { text: "Dobrý den, pan Dvořák? Tady Petra z Electree. Volám vám, protože jste si u nás vyžádal cenovou nabídku na elektřinu. Hodí se vám teď pár minut?", score: 2, feedback: "Správně – jasné představení, propojení s žádostí a nastavení očekávání." },
          { text: "Dobrý den, mám pro vás výbornou nabídku na elektřinu!", score: 0, feedback: "Špatně – skočit rovnou na nabídku bez představení a zjištění potřeby je prodejní tlak. Zákazník neví, kdo volá." },
          { text: "Ahoj, tady Electree. Máte zájem o novou nabídku na elektřinu?", score: 1, feedback: "Příliš neformální a vágní. Zákazník neví, zda to má spojitost s jeho žádostí. Chybí jméno a přesný důvod volání." },
        ],
      },
      {
        situation: "Zákazník souhlasí. Potvrďte data: E.ON, 3 100 Kč/MWh, zálohy 2 200 Kč/měsíc, 18 MWh/rok.",
        category: "struktura",
        options: [
          { text: "Máte u nás vyplněný dotazník s dodavatelem E.ON, cenou zhruba 3 100 Kč za MWh, zálohy 2 200 Kč měsíčně a roční spotřeba 18 MWh. Všechno sedí?", score: 2, feedback: "Správně – všechna čtyři data potvrzena, zákazník může opravit případnou nepřesnost." },
          { text: "Vidím, že jste u E.ON – ti jsou dost drazí. My máme mnohem lepší ceny.", score: 0, feedback: "Srovnávání dodavatelů negativním způsobem je neprofesionální a může zákazníka odradit. Soustřeďte se na fakta." },
          { text: "Takže E.ON, zálohy 2 200 a spotřeba 18 MWh. Správně?", score: 1, feedback: "Skoro dobré, ale chybí potvrzení ceny za MWh – bez toho nemůžete spočítat přesnou úsporu." },
        ],
      },
      {
        situation: "Spočítejte a prezentujte úsporu: HOME FIX 24 (2 349 Kč/MWh) vs E.ON 3 100 Kč/MWh, 18 MWh/rok.",
        category: "spravnost",
        options: [
          { text: "S HOME FIX 24 byste ušetřil přibližně 13 500 Kč ročně oproti současné ceně. Zálohy vám klesnou zhruba o 1 100 Kč měsíčně a cena bude fixovaná na 2 roky.", score: 2, feedback: "Správný výpočet: (3 100 – 2 349) × 18 = 13 518 Kč/rok. Přeloženo do měsíčního přínosu. Výborně." },
          { text: "Ušetříte asi 700 Kč měsíčně, je to výhodné.", score: 1, feedback: "Číslo je přibližně správné, ale chybí roční výpočet a zmínka o fixaci. Úspora je komunikována, ale nekompletně." },
          { text: "Naše cena je o 751 Kč levnější za MWh.", score: 0, feedback: "Technické číslo bez kontextu. Zákazník neví, co to pro něj znamená v reálných penězích." },
        ],
      },
      {
        situation: "Zákazník říká: 'Ale já mám smlouvu s E.ON – nemůžu jen tak odejít.' Jak zareagujete?",
        category: "namitka",
        options: [
          { text: "To není problém. Výpověď za vás zajistíme my na základě plné moci. Vy se o nic nestaráte – stačí jen podepsat naši smlouvu a my zařídíme zbytek.", score: 2, feedback: "Výborně – přesná reakce. Zákazník slyší, že přechod je jednoduchý a plně zajištěný naší stranou." },
          { text: "To nevadí, smlouva u E.ON vás nezavazuje, můžete kdykoli odejít.", score: 1, feedback: "Trochu nepřesné – zákazník má smlouvu a je potřeba ji řádně vypovědět. Ale výpověď za zákazníka je správný argument." },
          { text: "Musíte si to vyřešit sami s E.ON, my pak smlouvu podepíšeme.", score: 0, feedback: "Špatně – zákazník dostane složitý úkol místo jednoduchého řešení. Ztrácíte konkurenční výhodu plné moci." },
        ],
      },
      {
        situation: "Zákazník: 'A co když mám ještě rok do konce smlouvy?' Jak odpovíte?",
        category: "namitka",
        options: [
          { text: "To záleží na podmínkách vašeho tarifu. Někdy lze odejít i v průběhu fixace – podíváme se na to spolu. I pokud by byl poplatek za odchod, může být nižší než roční úspora, kterou jsme spočítali.", score: 2, feedback: "Věcné a upřímné – nenadhodnocujete situaci, ale nabízíte konkrétní kalkulaci. Zákazník to ocení." },
          { text: "Žádný problém, u E.ON za odchod nikdy nic neplatíte.", score: 0, feedback: "Lhaní nebo nepřesnost – nemůžete tohle tvrdit bez znalosti smlouvy zákazníka. Compliance porušení." },
          { text: "Ale s námi ušetříte tolik, že se to rozhodně vyplatí.", score: 1, feedback: "Optimistické, ale bez konkrétního výpočtu a bez ověření podmínek stávající smlouvy je to prázdné tvrzení." },
        ],
      },
      {
        situation: "Zákazník se uklidnil. Je čas na CTA.",
        category: "cta",
        options: [
          { text: "Pojďme to spočítat a připravit. Pošlu vám nabídku na e-mail i plnou moc – vy jen podepíšete a my vyřídíme výpověď u E.ON. Výpočet jsme udělali, pojďme to dotáhnout.", score: 2, feedback: "Aktivní CTA s jasným dalším krokem a připomínkou hodnoty plné moci. Zákazník ví, co přijde." },
          { text: "Tak co říkáte, máme dohodu?", score: 1, feedback: "CTA je přítomné, ale příliš abruptní. Zákazník nví, co konkrétně se stane po 'ano'." },
          { text: "Dám vám čas, rozmyslete si to a zavolejte zpět.", score: 0, feedback: "Pasivní závěr – žádný konkrétní krok. Zákazník se pravděpodobně neozve a nedojde k uzavření." },
        ],
      },
      {
        situation: "Zákazník souhlasí. Uzavřete hovor.",
        category: "uzavreni",
        options: [
          { text: "Výborně, pane Dvořáku! Pošlu vám e-mailem nabídku a plnou moc. Vy podepíšete online a my podáme výpověď u E.ON a zajistíme přepis. Budete informován o datu zahájení. Děkuji za váš čas!", score: 2, feedback: "Profesionální uzavření – zákazník ví přesně co dostane, co se stane a co nemusí řešit." },
          { text: "Dobře, posílám e-mail. Na slyšenou.", score: 1, feedback: "Základní, ale chybí zmínka o plné moci a procesu výpovědi – klíčové pro zákazníkovu jistotu." },
          { text: "Tak jo, nějak to dopadne. Mějte se.", score: 0, feedback: "Naprostý neprofesionalismus. Zákazník nemá žádnou jistotu, že smlouva skutečně vznikne." },
        ],
      },
      {
        situation: "Zákazník má zájem i o plyn. Jak reagujete?",
        category: "cta",
        options: [
          { text: "Skvěle! Electree nabízí i dodávku plynu za výhodných podmínek. Jakmile máme elektřinu vyřešenou, rád/a se podívám i na plyn – vše v jedné smlouvě, jedna faktura.", score: 2, feedback: "Správný cross-sell po uzavření elektřiny. Jedna smlouva, jedna faktura – srozumitelné a pohodlné pro zákazníka." },
          { text: "Plyn teď nechte – nejdřív musíte vyřešit elektřinu, pak na to zavolejte znovu.", score: 1, feedback: "Správná prioritizace (elektřina první), ale zbytečně odvracíte zákazníka místo toho, aby věděl, že vás může poprosit o obojí." },
          { text: "Na plyn nemáme teď speciální nabídky, ale můžeme to někdy probrat.", score: 0, feedback: "Špatně – Electree plyn nabízí. Toto je ztracená cross-sell příležitost i nesprávná informace." },
        ],
      },
    ],
  },
  {
    id: "drahe",
    clientName: "Jana Procházková",
    mainObjection: "Nejste příliš drazí?",
    context: "Lead: ČEZ, 3 400 Kč/MWh, zálohy 1 600 Kč/měs, 10 MWh/rok",
    steps: [
      {
        situation: "Zahajte hovor s paní Procházkovou.",
        category: "struktura",
        options: [
          { text: "Dobrý den, paní Procházková? Tady Petra z Electree. Volám vám k vaší žádosti o cenovou nabídku na elektřinu. Máte teď chvilku? Bude to rychlé.", score: 2, feedback: "Správně – propojení s žádostí zákaznice, nastavení délky hovoru a příjemné otevření." },
          { text: "Dobrý den, jste paní Procházková z Prahy 4?", score: 1, feedback: "Ověření identity OK, ale bez představení a bez důvodu volání. Zákaznice neví kdo volá ani proč." },
          { text: "Dobrý den, máme pro vás super nabídku která vám ušetří tisíce!", score: 0, feedback: "Přehnaný prodejní tlak bez představení. Zákaznice neví kdo volá a takové otevření působí jako spam." },
        ],
      },
      {
        situation: "Data potvrzena: ČEZ, 3 400 Kč/MWh, zálohy 1 600 Kč/měs, 10 MWh/rok. Prezentujte úsporu s HOME FIX 24.",
        category: "spravnost",
        options: [
          { text: "S HOME FIX 24 za 2 349 Kč/MWh byste ušetřila přibližně 10 500 Kč ročně – zálohy by klesly o necelých 900 Kč měsíčně. A cena bude fixovaná na 2 roky, takže žádné překvapení.", score: 2, feedback: "Správný výpočet: (3 400 – 2 349) × 10 = 10 510 Kč/rok. Přeloženo do měsíčního přínosu a fixace. Výborně." },
          { text: "Naše cena je 2 349 Kč/MWh, vaše je 3 400 Kč/MWh, takže jsme levnější.", score: 1, feedback: "Srovnání proběhlo, ale zákaznice neví, co to pro ni znamená v konkrétních penězích ročně nebo měsíčně." },
          { text: "Ušetříte asi 1 000 Kč za MWh, což je skvělé!", score: 0, feedback: "Technické číslo bez kontextu – zákaznice neví, co to znamená pro její roční rozpočet nebo zálohy." },
        ],
      },
      {
        situation: "Zákaznice říká: 'Ale to je hodně keců, slyšela jsem, že Electree je dražší než ČEZ.' Jak reagujete?",
        category: "namitka",
        options: [
          { text: "Rozumím, takové informace kolují. Ale my jsme právě spočítali, že pro vaši konkrétní situaci ušetříte přibližně 10 500 Kč ročně. To jsou reálná čísla pro vaši domácnost, ne obecná tvrzení.", score: 2, feedback: "Správně – bez konfrontace, odmítnutí obranného postoje, vrácení zákaznice ke konkrétním číslem z její situace." },
          { text: "Electree určitě není dražší, to jsou nesmysly.", score: 0, feedback: "Konfrontační – říkáte zákaznici, že se mýlí. To ji postaví do obrany a ztratíte hovor." },
          { text: "To možná platilo dříve, teď máme výborné ceny.", score: 1, feedback: "Obhajoba bez důkazu. Lepší je vrátit zákaznici ke konkrétním číslem z její situace, ne k obecným výrokům." },
        ],
      },
      {
        situation: "Zákaznice: 'Ale nejste příliš drazí? Mám pocit, že to není výhodné.' Jak odpovíte?",
        category: "namitka",
        options: [
          { text: "Naopak – právě jsme spočítali, že oproti tomu, co platíte teď, ušetříte přibližně 10 500 Kč ročně. To jsou zálohy o necelých 900 Kč nižší každý měsíc. Porovnáváme vaši konkrétní situaci, ne obecné ceny.", score: 2, feedback: "Přesné – vrácení k fakty podložené kalkulaci. Zákaznice slyší konkrétní čísla, ne obhajoby." },
          { text: "Jsme naopak jedni z nejlevnějších na trhu.", score: 0, feedback: "Nepodložené tvrzení. Zákaznice ho nezaregistruje jako důvěryhodné bez konkrétního srovnání." },
          { text: "Ceny závisí na mnoha faktorech a trh se mění. Teď je to výhodné.", score: 1, feedback: "Pravda, ale vyhýbavé. Zákaznice chce slyšet čísla pro svou situaci, ne obecný výrok o trhu." },
        ],
      },
      {
        situation: "Zákaznice: 'Co když ceny na trhu klesnou a já budu mít fix zbytečně drahý?' Jak reagujete?",
        category: "namitka",
        options: [
          { text: "To je fér úvaha. Fix ale není o tom, že musí být v každém momentu absolutně nejnižší. Je o jistotě – víte přesně, za kolik budete platit, a nemusíte sledovat trh ani se bát nárůstu. Pro spoustu lidí je ta jistota důležitější než honba za nejnižší cenou.", score: 2, feedback: "Výborně – respektujete úvahu zákaznice, vysvětlujete hodnotu fixu jako jistotu, ne jako nejnižší cenu. Compliance v pořádku." },
          { text: "Ceny určitě nepůjdou dolů, takže se to nestane.", score: 0, feedback: "Compliance porušení – nemůžete předpovídat vývoj cen. Zákaznice může ztratit důvěru, pokud to tak nebude." },
          { text: "Máte pravdu, je to riziko. Ale většina zákazníků je s fixem spokojená.", score: 1, feedback: "Přiznáváte riziko, ale bez vysvětlení hodnoty fixu. Zákaznice odchází bez přesvědčení." },
        ],
      },
      {
        situation: "Zákaznice se uklidnila. Přejděte k CTA.",
        category: "cta",
        options: [
          { text: "Co říkáte, pojďme to zafixovat? Pošlu vám nabídku na e-mail a spolu s ní plnou moc. Vy jen podepíšete online a my vyřídíme přechod od ČEZ. Celé to zabere pár minut.", score: 2, feedback: "Aktivní, konkrétní CTA s jasným dalším krokem. Zákaznice ví přesně, co se stane." },
          { text: "Tak to berete?", score: 1, feedback: "CTA přítomné, ale velmi abruptní bez kontextu dalšího kroku." },
          { text: "Rozmyslete si to a dejte mi vědět.", score: 0, feedback: "Pasivní závěr – zákaznice pravděpodobně zapomene nebo se neozve." },
        ],
      },
      {
        situation: "Zákaznice souhlasí. Uzavřete hovor.",
        category: "uzavreni",
        options: [
          { text: "Výborně, paní Procházková! Pošlu nabídku a plnou moc e-mailem. Vy podepíšete a my zařídíme výpověď u ČEZ i přepis odběrného místa. O datu zahájení vás budeme informovat. Děkuji a těším se na spolupráci!", score: 2, feedback: "Profesionální a kompletní uzavření. Zákaznice ví, co dostane a co nemusí řešit." },
          { text: "Super, tak to zasílám.", score: 1, feedback: "Základní, ale chybí zmínka o plné moci, procesu přechodu a datu zahájení." },
          { text: "Dobře, uvidíme. Na slyšenou.", score: 0, feedback: "Nevhodné – zákaznice souhlasila, ale závěr vůbec nepotvrzuje uzavřenou dohodu." },
        ],
      },
    ],
  },
  {
    id: "spatna-povest",
    clientName: "Věra Kolářová",
    mainObjection: "Slyšela jsem o vás něco špatného",
    context: "Lead: ČEZ, 3 050 Kč/MWh, zálohy 2 000 Kč/měs, 15 MWh/rok",
    steps: [
      {
        situation: "Zahajte hovor s paní Kolářovou.",
        category: "struktura",
        options: [
          { text: "Dobrý den, paní Kolářová? Tady Petra z Electree. Volám vám k vaší žádosti o cenovou nabídku na elektřinu. Hodí se vám teď chvilka – bude to rychlé?", score: 2, feedback: "Správně – propojení s žádostí, nastavení délky a příjemné otevření." },
          { text: "Dobrý den, chci vám nabídnout přechod od ČEZ. Je to výhodné.", score: 0, feedback: "Přeskakujete představení a rovnou prodáváte. Zákaznice neví kdo volá a proč zrovna ji." },
          { text: "Dobrý den, paní Kolářová? Electree, voláme ke smlouvě.", score: 1, feedback: "Stručné a trochu neosobní. Zákaznice neví konkrétně co a proč – propojení s její žádostí chybí." },
        ],
      },
      {
        situation: "Data potvrzena. Spočítejte úsporu s HOME FIX 24 (2 349 Kč/MWh vs 3 050 Kč, 15 MWh/rok).",
        category: "spravnost",
        options: [
          { text: "S HOME FIX 24 byste ušetřila přibližně 10 500 Kč ročně oproti vaší stávající ceně. Zálohy by vám klesly zhruba o 875 Kč měsíčně a cena je fixovaná na 2 roky.", score: 2, feedback: "Správný výpočet: (3 050 – 2 349) × 15 = 10 515 Kč/rok. Přeloženo do měsíčního přínosu. Výborně." },
          { text: "Ušetříte zhruba 700 Kč za MWh.", score: 0, feedback: "Technické číslo bez kontextu. Zákaznice neví, co to znamená pro její roční nebo měsíční výdaje." },
          { text: "Zálohy vám klesnou asi o 200 Kč měsíčně.", score: 1, feedback: "Číslo je podhodnocené (správně je ~875 Kč/měs). Zákaznice dostane zkreslený dojem o výhodnosti nabídky." },
        ],
      },
      {
        situation: "Zákaznice říká: 'Ale já slyšela od sousedky, že s Electree mívají lidi problémy.' Jak reagujete?",
        category: "namitka",
        options: [
          { text: "Děkuji za upřímnost, to oceňuji. Část takových reakcí bývá od zákazníků, pro které byl přechod složitější – ale to se týká i jiných dodavatelů. U vás by vše probíhalo přesně podle nabídky, kterou jsme spočítali a kterou dostanete e-mailem.", score: 2, feedback: "Výborně – poděkování za upřímnost, kontextualizace bez shazování zákaznice, přechod na fakta." },
          { text: "To je nesmysl, sousedka se mýlí.", score: 0, feedback: "Zákaznici říkáte, že je zdroj informací špatný – staví ji do obrany. Důvěra se neobnoví tímto způsobem." },
          { text: "Ano, možná byl v minulosti problém, ale teď je vše lepší.", score: 1, feedback: "Přiznání problémů bez konkrétního vysvětlení proč to teď bude jinak. Zákaznice zůstane skeptická." },
        ],
      },
      {
        situation: "Zákaznice: 'A co když nastane problém s přechodem nebo fakturou?' Jak odpovíte?",
        category: "namitka",
        options: [
          { text: "Právě proto vám chci vše popsat konkrétně – přesně co se bude dít, v jakém pořadí a co za vás zařídíme my. Cílem je, abyste tentokrát nemusela nic složitě řešit ani hlídat sama.", score: 2, feedback: "Respekt k obavě, konkrétní příslib transparentnosti a jednoduchost – přesně to zákaznice potřebuje slyšet." },
          { text: "Problémy se nestanou, máme skvělý zákaznický servis.", score: 1, feedback: "Nekonkrétní ujištění. Zákaznice chce vědět jak a proč, ne jen obecné 'bude dobře'." },
          { text: "Pokud nastane problém, zavolejte nám a vyřešíme to.", score: 0, feedback: "Poukazuje na možnost problému bez prevence. Zákaznice si vybaví přesně to, čeho se bojí." },
        ],
      },
      {
        situation: "Zákaznice se uklidnila a ptá se: 'A jak dlouho ten přechod trvá?' Odpovězte věcně.",
        category: "spravnost",
        options: [
          { text: "Přechod zpravidla trvá 30 až 45 dní od podpisu smlouvy. Po celou dobu jste připojena – fyzicky se nic nemění, distributor je stále stejný. Mění se jen dodavatel na faktuře.", score: 2, feedback: "Přesná a kompletní odpověď. Zákaznice ví co čekat a je ujištěna, že dodávka nepřeruší." },
          { text: "Do 14 dní máte hotovo.", score: 0, feedback: "Nepřesné – přechod trvá zpravidla 30–45 dní. Pokud zákaznice čeká 14 dní a nic se nestane, ztratíte důvěru." },
          { text: "Záleží na distributorovi, ale celkem rychle.", score: 1, feedback: "Vyhýbavé a nepřesné. Zákaznice chce konkrétní číslo, ne vágní odpověď." },
        ],
      },
      {
        situation: "Zákaznice je připravená. Přejděte k CTA.",
        category: "cta",
        options: [
          { text: "Co říkáte, pojďme to připravit? Pošlu vám nabídku e-mailem – budete tam vidět vše konkrétně, co jsme spočítali. Spolu s ní přijde plná moc a my za vás vyřídíme výpověď u ČEZ.", score: 2, feedback: "Aktivní CTA s konkrétním dalším krokem. Zmínka o transparentnosti e-mailu navazuje na zákazniciny obavy." },
          { text: "Tak to berete?", score: 1, feedback: "CTA přítomné, ale abruptní a bez kontextu co se stane." },
          { text: "Rozmyslete si to a zavolejte nám.", score: 0, feedback: "Pasivní závěr – zákaznice pravděpodobně zavolá sousedce, ne nám." },
        ],
      },
      {
        situation: "Zákaznice souhlasí. Uzavřete hovor.",
        category: "uzavreni",
        options: [
          { text: "Výborně, paní Kolářová! Pošlu vám nabídku a plnou moc e-mailem. Vy podepíšete a my zajistíme výpověď u ČEZ i přepis. O celém průběhu vás budeme informovat. Děkuji za důvěru!", score: 2, feedback: "Profesionální uzavření s důrazem na transparentnost. 'Děkuji za důvěru' je vhodné zejména po zákaznicině námitce o pověsti." },
          { text: "OK, posílám e-mail. Na slyšenou.", score: 1, feedback: "Základní závěr. Chybí potvrzení procesu a zmínka o plné moci." },
          { text: "Tak jo, uvidíme jak to dopadne.", score: 0, feedback: "Naprostý neprofesionalismus – zvláště u zákaznice, která měla obavy z předchozích zkušeností." },
        ],
      },
    ],
  },
  {
    id: "cas-porovnat",
    clientName: "Pavel Krejčí",
    mainObjection: "Nemám teď čas / Chci porovnat nabídky",
    context: "Lead: E.ON, 3 200 Kč/MWh, zálohy 2 500 Kč/měs, 20 MWh/rok",
    steps: [
      {
        situation: "Zahajte hovor s panem Krejčím.",
        category: "struktura",
        options: [
          { text: "Dobrý den, pan Krejčí? Tady Petra z Electree. Volám vám k vaší žádosti o cenovou nabídku na elektřinu. Hodí se vám teď pár minut?", score: 2, feedback: "Správně – jasné, propojené s žádostí a s respektem k zákazníkovu času." },
          { text: "Dobrý den, mám pro vás nabídku která vám ušetří přes 15 000 Kč ročně!", score: 0, feedback: "Přehnaný slib na začátku bez potvrzení dat – pokud číslo nesedí, zákazník ztratí důvěru okamžitě." },
          { text: "Dobrý den, Electree. Máte zájem o elektřinu?", score: 1, feedback: "Příliš stručné – zákazník neví proč voláte právě jemu ani že iniciativu projevil on sám." },
        ],
      },
      {
        situation: "Zákazník říká hned: 'Nemám teď čas, jsem v práci.' Jak zareagujete?",
        category: "namitka",
        options: [
          { text: "Chápu. Kdy se vám hodí, abych zavolala zpátky? Spočítali bychom konkrétní úsporu pro vaši domácnost – zabere to jen pár minut.", score: 2, feedback: "Správně – respektujete čas zákazníka, neztrácíte ho, domlouváte konkrétní termín a připomínáte přínos zpětného volání." },
          { text: "Dobře, dejte mi vědět až budete mít čas.", score: 0, feedback: "Pasivní – zákazník se pravděpodobně neozve. Bez domluvení termínu je to ztracený lead." },
          { text: "Ale bude to jen rychle, za 2 minuty hotovo.", score: 1, feedback: "Snaha pokračovat OK, ale zákazník jasně říká ne. Lepší je domluvit čas, ne naléhat." },
        ],
      },
      {
        situation: "Zákazník souhlasí se zpětným voláním za hodinu. Zavoláte znovu. Potvrďte data a spočítejte úsporu (E.ON, 3 200 Kč/MWh, 20 MWh/rok, HOME FIX 24).",
        category: "spravnost",
        options: [
          { text: "S HOME FIX 24 za 2 349 Kč/MWh byste ušetřil přibližně 17 000 Kč ročně oproti vaší stávající ceně. To jsou zálohy přibližně o 1 400 Kč měsíčně nižší. Plus máte cenu garantovanou na 2 roky.", score: 2, feedback: "Správný výpočet: (3 200 – 2 349) × 20 = 17 020 Kč/rok. Výborně přeloženo do měsíčního přínosu." },
          { text: "Ušetříte asi 851 Kč za každou MWh co spotřebujete.", score: 0, feedback: "Technické číslo bez celkového kontextu. Zákazník neví, co to znamená pro jeho roční náklady." },
          { text: "Zálohy by vám klesly o pár set korun měsíčně.", score: 1, feedback: "Podhodnocené – správně je ~1 400 Kč/měs. Zákazník by mohl nabídku odmítnout jako nedostatečnou." },
        ],
      },
      {
        situation: "Zákazník říká: 'To je zajímavé, ale chci se nejdřív podívat na více nabídek.' Jak reagujete?",
        category: "namitka",
        options: [
          { text: "To je rozumné. Právě proto vám chci dát co nejkonkrétnější podklad – nabídku na míru vaší spotřeby a situaci, ne jen obecnou cenu. Pošlu vám to e-mailem, abyste mohl porovnat se skutečnými čísly.", score: 2, feedback: "Výborně – nevystupujete proti srovnávání, naopak se snažíte být nejkonkrétnějším zdrojem pro porovnání." },
          { text: "Ale naše nabídka je nejlepší na trhu, proč porovnávat?", score: 0, feedback: "Nepodložené tvrzení a odrazování od srovnávání. Zákazník ztratí důvěru." },
          { text: "Jistě, porovnejte. Naše ceny jsou transparentní.", score: 1, feedback: "Nekonkrétní – nevyužíváte příležitost stát se nejlepším zdrojem pro porovnání." },
        ],
      },
      {
        situation: "Zákazník: 'A jak se dá přejít od E.ON? Není to složité?' Jak odpovíte?",
        category: "namitka",
        options: [
          { text: "Ne, přechod je jednoduchý. My za vás zajistíme výpověď u E.ON na základě plné moci. Vy jen podepíšete naši smlouvu online – celý přechod za vás vyřídíme.", score: 2, feedback: "Přesné a uklidňující. Zákazník slyší, že nemusí nic složitého řešit sám." },
          { text: "Trochu administrativy to obnáší, ale zvládnete to.", score: 0, feedback: "Říkáte zákazníkovi, že bude mít práci. Toto je přesně argument, který zákazníky odradí od přechodu." },
          { text: "Stačí nám zavolat a poradíme vám jak postupovat.", score: 1, feedback: "Nápomocné, ale nevyužíváte klíčový argument: výpověď za zákazníka zařídíme MY na základě plné moci." },
        ],
      },
      {
        situation: "Zákazník: 'A kdybych se po čase chtěl vrátit nebo odejít, mohu?' Jak odpovíte?",
        category: "spravnost",
        options: [
          { text: "Po uplynutí doby fixace – v případě HOME FIX 24 jsou to 2 roky – můžete odejít bez sankce, nebo smlouvu prodloužit za aktuálních podmínek. V průběhu fixace lze odejít, ale může být poplatek za předčasné ukončení.", score: 2, feedback: "Přesné a věcné. Zákazník dostane transparentní informaci bez přikrášlování." },
          { text: "Samozřejmě, kdykoli můžete odejít zcela zdarma.", score: 0, feedback: "Nepřesné – v průběhu fixace obvykle existuje poplatek. Zákazník může být překvapen, compliance problém." },
          { text: "To záleží na podmínkách, o tom se bavíme až příště.", score: 1, feedback: "Vyhýbavé – zákazník má legitimní otázku a zaslouží věcnou odpověď teď, ne přesun na jindy." },
        ],
      },
      {
        situation: "Zákazník je připravený. Přejděte k CTA.",
        category: "cta",
        options: [
          { text: "Co říkáte, pojďme to připravit? Pošlu vám nabídku konkrétně pro vaši situaci – budete mít přesná čísla pro porovnání. Spolu s ní přijde i plná moc pro výpověď u E.ON.", score: 2, feedback: "Aktivní CTA s konkrétním krokem a napojením na zákazníkův zájem porovnávat – dáváme mu nástroj pro srovnání." },
          { text: "Tak to berete, nebo ne?", score: 1, feedback: "CTA je přítomné, ale příliš abruptní. Zákazník se cítí pod tlakem místo aby se cítil podpořen." },
          { text: "Dobře, pošlu vám informace e-mailem a zavolám příští týden.", score: 0, feedback: "Pasivní bez konkrétního závazku. Zákazník neví, co má s e-mailem udělat." },
        ],
      },
      {
        situation: "Zákazník souhlasí. Uzavřete hovor.",
        category: "uzavreni",
        options: [
          { text: "Výborně, pane Krejčí! Pošlu vám nabídku a plnou moc e-mailem. Podepíšete online a my zařídíme výpověď u E.ON i celý přechod. O datu zahájení dodávky vás informujeme. Děkuji za váš čas!", score: 2, feedback: "Kompletní profesionální uzavření. Zákazník ví přesně co dostane a co nemusí řešit." },
          { text: "Super, pošlu e-mail. Mějte se.", score: 1, feedback: "Základní, ale chybí zmínka o plné moci a procesu přechodu." },
          { text: "Dobře, tak se uvidíme někdy. Na slyšenou.", score: 0, feedback: "Neurčité – zákazník neví zda smlouva vznikne nebo ne." },
        ],
      },
    ],
  },
];

const CAT_ORDER: StepCategory[] = ["struktura", "spravnost", "namitka", "cta", "uzavreni"];

type SimState = "intro" | "sim" | "results";

const TIMER_SECONDS = 12;

function playDing() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } catch {}
}

export default function SimulacePage() {
  const [state, setState] = useState<SimState>("intro");
  const [attemptCount, setAttemptCount] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scenario = SCENARIOS[attemptCount % SCENARIOS.length];
  const totalSteps = scenario.steps.length;
  const currentStep = scenario.steps[stepIdx];

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(TIMER_SECONDS);
    playDing();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          // auto-select correct answer on timeout
          setTimedOut(true);
          setCurrentAnswer((curr) => {
            if (curr === null) {
              setConfirmed(true);
              return -1; // sentinel: timed out
            }
            return curr;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startSim = () => {
    setStepIdx(0);
    setAnswers([]);
    setCurrentAnswer(null);
    setConfirmed(false);
    setTimedOut(false);
    setState("sim");
    setTimeout(resetTimer, 100);
  };

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setTimedOut(false);
    setCurrentAnswer(idx);
    setConfirmed(true);
  };

  const handleNext = () => {
    // -1 = timed out → score 0
    const effectiveAnswer = (currentAnswer === null || currentAnswer === -1) ? 0 : currentAnswer;
    const newAnswers = [...answers, effectiveAnswer];
    if (stepIdx + 1 >= totalSteps) {
      setAnswers(newAnswers);
      setState("results");
    } else {
      setAnswers(newAnswers);
      setStepIdx(stepIdx + 1);
      setCurrentAnswer(null);
      setConfirmed(false);
      setTimedOut(false);
      resetTimer();
    }
  };

  const handleRetry = () => {
    setAttemptCount(attemptCount + 1);
    setState("intro");
  };

  if (state === "intro") {
    const nextScenario = SCENARIOS[(attemptCount) % SCENARIOS.length];
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📞</div>
            <h1 className="text-2xl font-bold text-[#0D3D34] mb-2">Simulace hovoru</h1>
            <p className="text-[#0D3D34]/55 text-sm leading-relaxed">
              Procvičte si reálné prodejní situace. Každý pokus generuje jiný scénář s jinou námitkou a zákazníkem.
            </p>
          </div>

          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-6 mb-4">
            <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3">Jak to funguje</div>
            <div className="space-y-2.5">
              {[
                "Hovor začíná od úplného začátku – otevření, nahrávání, data, úspora, námitka, CTA, závěr",
                "Na každém kroku vybíráš z 3 možností odpovědi",
                "Po výběru dostaneš okamžitou zpětnou vazbu",
                "Na konci vidíš hodnocení ve 4 kategoriích – stejný systém jako certifikace",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#0D3D34]/70">
                  <span className="w-5 h-5 rounded-full bg-[#EBF7F1] text-[#1A6B5A] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EBF7F1] border border-[#B8E8D0] rounded-xl px-4 py-3 mb-4 flex items-start gap-3">
            <svg className="text-[#1A6B5A] flex-shrink-0 mt-0.5" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" strokeLinecap="round" /></svg>
            <div>
              <div className="text-xs font-semibold text-[#1A6B5A] mb-0.5">Výběr tématu není zatím k dispozici</div>
              <div className="text-[10px] text-[#0D3D34]/50">Scénáře se střídají automaticky. Každý pokus přinese jiný případ.</div>
            </div>
          </div>

          {attemptCount > 0 && (
            <div className="bg-white border border-[#D1DFD8] rounded-xl px-4 py-3 mb-4">
              <div className="text-[10px] text-[#0D3D34]/40 mb-1">Další scénář</div>
              <div className="text-sm font-semibold text-[#0D3D34]">{nextScenario.clientName} — <span className="font-normal text-[#0D3D34]/60">{nextScenario.mainObjection}</span></div>
            </div>
          )}

          <button onClick={startSim} className="w-full bg-[#0D3D34] text-[#D7FF00] py-4 rounded-2xl text-base font-bold hover:opacity-90 transition-opacity">
            {attemptCount === 0 ? "Spustit simulaci" : "Spustit další simulaci"}
          </button>
          {attemptCount > 0 && <p className="text-center text-xs text-[#0D3D34]/30 mt-2">Pokus #{attemptCount + 1}</p>}
        </div>
      </div>
    );
  }

  if (state === "results") {
    const maxPerStep = 2;
    const totalMax = totalSteps * maxPerStep;
    const totalScore = answers.reduce((s, ansIdx, i) => s + (scenario.steps[i].options[ansIdx]?.score ?? 0), 0);
    const totalPct = Math.round((totalScore / totalMax) * 100);
    const passed = totalPct >= 70;

    const catScores: Record<StepCategory, { score: number; max: number }> = {
      struktura: { score: 0, max: 0 },
      spravnost: { score: 0, max: 0 },
      namitka: { score: 0, max: 0 },
      cta: { score: 0, max: 0 },
      uzavreni: { score: 0, max: 0 },
    };
    scenario.steps.forEach((step, i) => {
      catScores[step.category].score += answers[i] !== undefined ? (step.options[answers[i]]?.score ?? 0) : 0;
      catScores[step.category].max += maxPerStep;
    });

    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className={`rounded-2xl p-6 text-center mb-6 ${passed ? "bg-[#D7FF00]" : "bg-red-50 border border-red-200"}`}>
          <div className="text-4xl mb-2">{passed ? "🎉" : "📚"}</div>
          <div className={`text-3xl font-bold mb-1 ${passed ? "text-[#0D3D34]" : "text-red-700"}`}>{totalPct} %</div>
          <div className={`text-sm font-semibold mb-1 ${passed ? "text-[#0D3D34]/70" : "text-red-600"}`}>{totalScore} / {totalMax} bodů</div>
          <div className={`text-xs ${passed ? "text-[#0D3D34]/60" : "text-red-500"}`}>
            {passed ? "Prošel/a! Hovor byl zvládnut nad standardní úroveň." : "Nesplněno (min. 70 %). Zkus to znovu s jiným scénářem."}
          </div>
          <div className="text-[10px] text-[#0D3D34]/40 mt-2">Scénář: {scenario.clientName} – {scenario.mainObjection}</div>
        </div>

        <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5 mb-6">
          <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-4">Hodnocení po kategoriích</div>
          <div className="space-y-3">
            {CAT_ORDER.filter(c => catScores[c].max > 0).map((cat) => {
              const { score, max } = catScores[cat];
              const pct = Math.round((score / max) * 100);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[#0D3D34]">{CAT_LABEL[cat]}</span>
                    <span className={`font-bold ${pct >= 70 ? "text-[#1A6B5A]" : "text-red-600"}`}>{pct} %</span>
                  </div>
                  <div className="h-2 bg-[#EBF7F1] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct >= 70 ? "#D7FF00" : "#FCA5A5" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3">Přehled kroků</div>
          <div className="space-y-2">
            {scenario.steps.map((step, i) => {
              const chosen = answers[i] ?? 0;
              const opt = step.options[chosen];
              const isGood = opt?.score === 2;
              const isPartial = opt?.score === 1;
              return (
                <div key={i} className={`rounded-xl p-3 border ${isGood ? "bg-[#EBF7F1] border-[#B8E8D0]" : isPartial ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"}`}>
                  <div className="flex items-start gap-2">
                    <span className={`text-sm flex-shrink-0 mt-0.5 font-bold ${isGood ? "text-[#1A6B5A]" : isPartial ? "text-yellow-700" : "text-red-600"}`}>{isGood ? "✓" : isPartial ? "~" : "✗"}</span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-wide mb-0.5">{CAT_LABEL[step.category]} · Krok {i + 1}</p>
                      <p className="text-xs text-[#0D3D34]/60 leading-snug mb-1">{step.situation}</p>
                      <p className="text-xs font-semibold text-[#0D3D34] leading-snug mb-1">Vaše odpověď: {opt?.text}</p>
                      <p className={`text-[10px] leading-relaxed ${isGood ? "text-[#1A6B5A]" : isPartial ? "text-yellow-700" : "text-red-700"}`}>{opt?.feedback}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={handleRetry} className="w-full bg-[#0D3D34] text-[#D7FF00] py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity">
          Zkusit další scénář →
        </button>
      </div>
    );
  }

  // sim state
  const optLabels = ["A", "B", "C"];
  const pct = Math.round((stepIdx / totalSteps) * 100);
  const chosen = currentAnswer !== null ? currentStep.options[currentAnswer] : null;

  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      <div className="bg-white border-b border-[#D1DFD8] px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#EBF7F1] flex items-center justify-center text-xs">📞</div>
            <div>
              <div className="text-xs font-semibold text-[#0D3D34]">{scenario.clientName}</div>
              <div className="text-[10px] text-[#0D3D34]/40">{scenario.context}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#0D3D34]/50">Krok {stepIdx + 1} / {totalSteps}</span>
            {/* Timer */}
            {!confirmed && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${timeLeft <= 5 ? "bg-red-100 text-red-600" : timeLeft <= 10 ? "bg-orange-100 text-orange-600" : "bg-[#EBF7F1] text-[#1A6B5A]"}`}>
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" /></svg>
                {timeLeft}s
              </div>
            )}
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-2.5 space-y-1">
          <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
            <div className="h-full bg-[#D7FF00] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
          {/* Timer bar */}
          {!confirmed && (
            <div className="h-1 bg-[#D1DFD8] rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 5 ? "bg-red-500" : timeLeft <= 10 ? "bg-orange-400" : "bg-[#1A6B5A]"}`}
                style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }} />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-6">
        {/* Big timer above modal */}
        {!confirmed && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#0D3D34]/40">Odpovězte do:</span>
              <span className={`text-2xl font-black tabular-nums ${timeLeft <= 4 ? "text-red-600" : timeLeft <= 8 ? "text-orange-500" : "text-[#0D3D34]"}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="h-2 bg-[#D1DFD8] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 4 ? "bg-red-500" : timeLeft <= 8 ? "bg-orange-400" : "bg-[#1A6B5A]"}`}
                style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Timeout alert */}
        {timedOut && confirmed && (
          <div className="mb-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <svg className="text-red-500 flex-shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <p className="text-xs text-red-700 font-semibold">Čas vypršel! Zobrazujeme správnou odpověď.</p>
          </div>
        )}

        <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white mr-2 ${ currentStep.category === "namitka" ? "bg-orange-500" : currentStep.category === "cta" ? "bg-[#1A6B5A]" : currentStep.category === "uzavreni" ? "bg-[#0D3D34]" : "bg-[#0D3D34]/50" }`}>
              {CAT_LABEL[currentStep.category]}
            </span>
          </div>

          <div className="p-5">
            <div className="bg-[#F4F7F6] rounded-xl p-4 mb-5">
              <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-1">Situace</div>
              <p className="text-sm text-[#0D3D34]/80 leading-snug">{currentStep.situation}</p>
            </div>

            <div className="text-xs font-semibold text-[#0D3D34]/50 mb-2">Jak odpovíte?</div>
            <div className="space-y-2">
              {currentStep.options.map((opt, i) => {
                const isSel = currentAnswer === i;
                const isCorrect = i === currentStep.options.findIndex(o => o.score === 2);
                let cls = "border-[#D1DFD8] hover:border-[#0D3D34]/30 bg-white text-[#0D3D34]";
                if (confirmed) {
                  // on timeout highlight correct answer
                  if (timedOut && isCorrect) cls = "border-[#1A6B5A] bg-[#EBF7F1] text-[#1A6B5A] font-semibold";
                  else if (!timedOut && isSel && opt.score === 2) cls = "border-[#1A6B5A] bg-[#EBF7F1] text-[#1A6B5A] font-semibold";
                  else if (!timedOut && isSel && opt.score === 1) cls = "border-yellow-400 bg-yellow-50 text-yellow-800 font-semibold";
                  else if (!timedOut && isSel && opt.score === 0) cls = "border-red-400 bg-red-50 text-red-700 font-semibold";
                  else cls = "border-[#D1DFD8] bg-[#F7FAF9] text-[#0D3D34]/40";
                }
                return (
                  <button key={i} onClick={() => handleSelect(i)} disabled={confirmed}
                    className={`w-full text-left text-xs px-3 py-3 rounded-xl border transition-all flex items-start gap-3 ${cls}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${confirmed && (timedOut ? isCorrect : isSel && opt.score === 2) ? "bg-[#1A6B5A] text-white" : confirmed && !timedOut && isSel && opt.score === 0 ? "bg-red-500 text-white" : "bg-[#EBF7F1] text-[#0D3D34]/50"}`}>
                      {optLabels[i]}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {confirmed && !timedOut && chosen && (
              <div className={`mt-4 rounded-xl p-3 ${chosen.score === 2 ? "bg-[#EBF7F1]" : chosen.score === 1 ? "bg-yellow-50" : "bg-red-50"}`}>
                <p className={`text-xs font-bold mb-1 ${chosen.score === 2 ? "text-[#1A6B5A]" : chosen.score === 1 ? "text-yellow-700" : "text-red-700"}`}>
                  {chosen.score === 2 ? "✓ Správně!" : chosen.score === 1 ? "~ Částečně správně" : "✗ Špatně"}
                </p>
                <p className="text-xs text-[#0D3D34]/60 leading-relaxed">{chosen.feedback}</p>
              </div>
            )}

            {confirmed && timedOut && (
              <div className="mt-4 rounded-xl p-3 bg-[#EBF7F1]">
                <p className="text-xs font-bold text-[#1A6B5A] mb-1">Správná odpověď:</p>
                <p className="text-xs text-[#0D3D34]/60 leading-relaxed">
                  {currentStep.options.find(o => o.score === 2)?.feedback}
                </p>
              </div>
            )}

            {confirmed && (
              <button onClick={handleNext} className="mt-4 w-full bg-[#0D3D34] text-[#D7FF00] py-2.5 rounded-xl text-sm font-bold hover:opacity-90">
                {stepIdx + 1 < totalSteps ? "Další krok →" : "Zobrazit výsledky"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
