import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `Jsi interní AI asistent pro operátorky call centra Tramaco Energy.
Pomáháš jim během živého hovoru se zákazníkem – rychle, stručně, prakticky.
Odpovídej vždy v češtině. Buď konkrétní, uváděj přesné ceny.

PRODUKTY A CENÍK (platné od 22. 4. 2026):

=== ELEKTŘINA – DODÁVKA (ceny s DPH) ===
• HOME FIX 12 – 3 084,29 Kč/MWh (2 549,00 bez DPH), paušál 156,09 Kč/měs.
• HOME FIX 24 – 2 842,29 Kč/MWh (2 349,00 bez DPH), paušál 180,29 Kč/měs. ⭐ DOPORUČENO
• HOME FIX 36 – 2 781,79 Kč/MWh (2 299,00 bez DPH), paušál 180,29 Kč/měs.
• EXPERT FIX 12 – 3 205,29 Kč/MWh, paušál 156,09 Kč/měs.
• EXPERT FIX 24 – 2 963,29 Kč/MWh, paušál 180,29 Kč/měs.
• EXPERT FIX 36 – 2 902,79 Kč/MWh, paušál 180,29 Kč/měs.
• SPOT – hodinová burzová cena OTE. Vyžaduje smart metr AMM. Vhodné jen pro flexibilní spotřebu.

=== PLYN – DODÁVKA (ceny s DPH) ===
• HOME FIX 12 – 1 632,29 Kč/MWh, paušál 108,89 Kč/měs.
• HOME FIX 24 – 1 571,79 Kč/MWh, paušál 108,89 Kč/měs.
• HOME FIX 36 – 1 571,79 Kč/MWh, paušál 108,89 Kč/měs.

=== VÝKUP FVE (elektřina zpět do sítě) ===
• Home Solar FIX MINI – 1 000 Kč/MWh, paušál 39 Kč/měs. (do 5 MWh/rok)
• Home Solar FIX – 500 Kč/MWh, paušál 59 Kč/měs. (do 10 MWh/rok)
• Home Solar FIX MAXI – 400 Kč/MWh, paušál 99 Kč/měs. (nad 10 MWh/rok)

=== ČASTÉ SITUACE ===
• Zákazník chce jistotu → HOME FIX 24 (nejlepší poměr cena/jistota).
• Zákazník má FVE → zeptej se na výkon (kWp) a roční výrobu. Do 5 MWh → FIX MINI, 5-10 MWh → FIX, nad 10 MWh → FIX MAXI.
• Zákazník si stěžuje na vysoký účet → ověř, zda je na SPOT tarifu. Zimní špičky mohou být 2-3× dražší.
• Zákazník chce zrušit smlouvu → nejprve zjisti důvod. Do 14 dní od podpisu u nové firmy může od ní odstoupit.
• SPOT vs FIX → SPOT vyžaduje AMM metr a flexibilní spotřebu. Pro jistotu vždy FIX.
• Retence → nikdy nesnižuj cenu bez souhlasu vedoucího. Nabídni jinou dobu fixace nebo kombinaci elektřina+plyn.`;

// Mock responses for demo mode (no API key)
function getMockResponse(message: string): string {
  const m = message.toLowerCase();

  if ((m.includes("fix 12") && m.includes("fix 24")) || (m.includes("rozdíl") && m.includes("fix")) || (m.includes("rozdil") && m.includes("fix"))) {
    return `HOME FIX 12 vs HOME FIX 24 – hlavní rozdíly:

• HOME FIX 12 – 3 084,29 Kč/MWh s DPH, paušál 156,09 Kč/měs. Kratší vázanost.
• HOME FIX 24 – 2 842,29 Kč/MWh s DPH, paušál 180,29 Kč/měs. Úspora ~242 Kč/MWh oproti FIX 12. ⭐

👉 Pro většinu zákazníků doporučuji HOME FIX 24 – nižší cena za komoditu, jistota na 2 roky.
Zeptej se: „Plánujete se stěhovat nebo měnit dodavatele v příštích 2 letech?"`;
  }

  if (m.includes("fve") || m.includes("fotovolta") || m.includes("výkup") || m.includes("vykup") || m.includes("solar")) {
    return `Zákazník s FVE – výkupní produkty Tramaco Energy:

• Home Solar FIX MINI – 1 000 Kč/MWh, paušál 39 Kč/měs. (do 5 MWh/rok)
• Home Solar FIX – 500 Kč/MWh, paušál 59 Kč/měs. (do 10 MWh/rok)
• Home Solar FIX MAXI – 400 Kč/MWh, paušál 99 Kč/měs. (nad 10 MWh/rok)

⚠️ Před uzavřením výkupní smlouvy zjistit:
1. Výkon FVE v kWp a odhadovaná roční výroba v MWh
2. EAN kód výrobny (z přípojky distributora)
3. Doklad vlastnictví nemovitosti

👉 Zeptej se na výkon a roční výrobu – to určí správný produkt.`;
  }

  if (m.includes("jistot") || m.includes("jistý") || m.includes("garantovan") || m.includes("fixn")) {
    return `Zákazník chce jistotu ceny – ideální kandidát na HOME FIX 24.

👉 Doporučuji: HOME FIX 24
• Cena: 2 842,29 Kč/MWh s DPH (2 349,00 bez DPH)
• Paušál: 180,29 Kč/měsíc
• Vázanost: 24 měsíců – pevná cena bez překvapení

Pokud odebírá i plyn: HOME FIX 24 plyn = 1 571,79 Kč/MWh + paušál 108,89 Kč/měsíc.

Formulace: „Tato cena platí po celé 2 roky – bez ohledu na to, co se děje na burze."`;
  }

  if (m.includes("účet") || m.includes("ucet") || m.includes("drahé") || m.includes("drahe") || m.includes("vysoký") || m.includes("vysok")) {
    return `Zákazník si stěžuje na vysoký účet – postup:

1. Zjisti, zda je na SPOT tarifu – zimní špičky mohou být 2–3× dražší než FIX.
2. Zkontroluj spotřebu v zákaznické kartě EIS – je vyšší než loni?
3. Nabídni přechod na HOME FIX 24: 2 842,29 Kč/MWh s DPH – pevná cena na 2 roky.

👉 Formulace: „Na SPOTu se cena mění každou hodinu. Na HOME FIX 24 zaplatíte vždy stejně – mohu vás přepsat hned."`;
  }

  if (m.includes("zrušit") || m.includes("zrusit") || m.includes("výpověď") || m.includes("vypoved") || m.includes("odejít") || m.includes("odejit")) {
    return `Zákazník chce zrušit smlouvu – retenční postup:

1. Zjisti důvod: cena? špatná zkušenost? konkurenční nabídka?
2. Připomeň: do 14 dní od podpisu u jiné firmy může od nové smlouvy odstoupit.
3. Nabídni alternativu: jiná délka fixace, kombinace elektřina+plyn.

👉 Formulace: „Dřív než to zprocesujeme – co vás k tomu vede? Možná mám pro vás lepší řešení."

Pokud zákazník trvá: zapiš důvod do EIS a eskaluj na vedoucího týmu.`;
  }

  if (m.includes("platb") || m.includes("splátk") || m.includes("platba") || m.includes("dluh") || m.includes("nezaplat")) {
    return `Zákazník se opožďuje s platbou – postup:

Splátkový plán:
• Max 3 splátky
• Minimální splátka: 500 Kč
• První splátka ihned při dohodnutí plánu

👉 Formulace: „Dokážeme rozdělit částku na 3 splátky. Co by pro vás bylo zvladatelné hned teď?"

⚠️ Při aktivních upomínkách ověřit v EIS. Pokud dluh > 5 000 Kč → předat vedoucímu.`;
  }

  if (m.includes("plyn") || m.includes("gas")) {
    return `Plyn – HOME FIX produkty Tramaco Energy (s DPH):

• HOME FIX 12 – 1 632,29 Kč/MWh, paušál 108,89 Kč/měs.
• HOME FIX 24 – 1 571,79 Kč/MWh, paušál 108,89 Kč/měs. ⭐ DOPORUČENO
• HOME FIX 36 – 1 571,79 Kč/MWh, paušál 108,89 Kč/měs. (stejná cena jako 24)

👉 Tip: Zálohy vždy nastavit na zimní spotřebu! V létě zákazník přeplatí, v zimě nedoplatí.
Kombinace elektřina HOME FIX 24 + plyn HOME FIX 24 = jeden dodavatel, jednoduchá správa.`;
  }

  if (m.includes("spot") || m.includes("burzov") || m.includes("hodinov")) {
    return `SPOT tarif – elektřina za burzovou cenu:

• Cena se mění každou hodinu podle OTE burzy
• Vyžaduje smart metr AMM (bez něj nelze aktivovat)
• Vhodné jen pro zákazníky s flexibilní spotřebou

Kdy je SPOT výhodný:
✅ Nabíjení auta v noci (levné hodiny)
✅ Pračka/myčka přes den
✅ Vlastní FVE nebo baterie
❌ Pro jistotu a předvídatelný účet → HOME FIX 24

👉 „Na SPOTu můžete ušetřit, ale vyžaduje sledování. Máte AMM metr a flexibilní spotřebu?"`;
  }

  // Generic fallback
  return `Tramaco Energy – přehled produktů (platné od 22. 4. 2026):

ELEKTŘINA (s DPH):
• HOME FIX 12: 3 084,29 Kč/MWh | HOME FIX 24: 2 842,29 Kč/MWh ⭐ | HOME FIX 36: 2 781,79 Kč/MWh

PLYN (s DPH):
• HOME FIX 24/36: 1 571,79 Kč/MWh + paušál 108,89 Kč/měs.

FVE VÝKUP:
• FIX MINI: 1 000 Kč/MWh | FIX: 500 Kč/MWh | FIX MAXI: 400 Kč/MWh

Dejte mi více kontextu o zákazníkovi – rád poradím konkrétně.`;
}

export async function POST(req: Request) {
  const { message, history } = await req.json();

  // Use real Claude API if key is available
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const messages = [
        ...(history || []),
        { role: "user" as const, content: message },
      ];
      const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      });
      const text = response.content[0].type === "text" ? response.content[0].text : "";
      return Response.json({ reply: text });
    } catch (err) {
      console.error(err);
    }
  }

  // Demo mode: simulate network delay + return mock response
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
  return Response.json({ reply: getMockResponse(message) });
}
