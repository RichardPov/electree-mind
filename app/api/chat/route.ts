import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `Jsi interní AI asistent pro operátorky call centra energetické společnosti Electree.
Pomáháš jim během živého hovoru se zákazníkem – rychle, stručně, prakticky.
Odpovídej vždy v češtině.

PRODUKTY A CENÍK (aktuální):

=== ELEKTŘINA – DODÁVKA ===
• Electree SPOT – cena elektrické energie kopíruje burzové hodinové ceny (OTE).
  Distribuce: fix podle pásma (NN do 3x63A). Vhodné pro flexibilní zákazníky s chytrou zásuvkou.
• Electree FIX 12 – fixní cena komodity na 12 měsíců: 3,20 Kč/kWh (NN).
  Jistota ceny, bez překvapení. Doporučeno pro domácnosti.
• Electree FIX 24 – fixní cena na 24 měsíců: 3,45 Kč/kWh (NN).
  Dlouhodobá jistota, mírně vyšší cena za ochranu před výkyvy.
• Electree ZELENÁ – 100 % elektřina z OZE (certifikát RECS). Příplatek +0,15 Kč/kWh oproti FIX 12.
  Ideální pro zákazníky citlivé na ekologii.

=== PLYN – DODÁVKA ===
• Electree PLYN FIX 12 – fixní cena plynu na 12 měsíců: 1,85 Kč/kWh. Měsíční poplatek 89 Kč.
• Electree PLYN FIX 24 – fixní cena plynu na 24 měsíců: 1,95 Kč/kWh. Měsíční poplatek 89 Kč.
• Electree PLYN SPOT – cena podle denního spotu EEX. Pro zkušené zákazníky.

=== VÝKUP ELEKTRICKÉ ENERGIE (FVE, malé zdroje) ===
• Výkup SPOT – výkupní cena = hodinový SPOT OTE mínus marže 0,05 Kč/kWh.
• Výkup FIX – garantovaná výkupní cena na 12 měsíců: aktuálně 2,10 Kč/kWh.
• Komunitní energie – zákazník může sdílet přebytky se sousedy přes virtuální batch.
• Podmínky výkupu: licence ERÚ, smlouva o připojení, smart meter (AMM).

=== ČASTÉ SITUACE ===
• Zákazník chce jistotu → doporuč FIX 24 (elektřina i plyn).
• Zákazník je ekologicky uvědomělý → Electree ZELENÁ.
• Zákazník má FVE a ptá se na výkup → vysvětli rozdíl SPOT vs FIX výkup, zeptej se na výkon FVE.
• Zákazník si stěžuje na vysoký účet → zkontroluj, zda je na SPOTu v drahém období, nabídni přechod na FIX.
• Zákazník chce zrušit smlouvu → výpovědní lhůta 30 dní, bez poplatku pokud je na konci vázanosti.
• Zákazník se opožďuje s platbou → splátkový plán, max 3 splátky, min 500 Kč/splátka.`;

// Mock responses for demo mode (no API key)
function getMockResponse(message: string): string {
  const m = message.toLowerCase();

  if ((m.includes("fix 12") && m.includes("fix 24")) || (m.includes("rozdíl") && m.includes("fix")) || (m.includes("rozdil") && m.includes("fix"))) {
    return `FIX 12 vs FIX 24 – hlavní rozdíly:

• FIX 12 – 3,20 Kč/kWh, vázanost 12 měsíců. Vhodné pokud zákazník chce flexibilitu a předpokládá pokles cen.
• FIX 24 – 3,45 Kč/kWh, vázanost 24 měsíců. O 0,25 Kč dražší, ale garantuje jistotu na 2 roky.

👉 Doporučení: Pokud zákazník mluví o jistotě a nechce překvapení – nabídni FIX 24. Pokud váhá, zeptej se: "Plánujete se stěhovat nebo měnit dodavatele v příštích 2 letech?"`;
  }

  if (m.includes("fve") || m.includes("fotovolta") || m.includes("výkup") || m.includes("vykup") || m.includes("solar")) {
    return `Zákazník s FVE – výkup elektrické energie:

Máme 2 možnosti:
• Výkup FIX – garantovaná cena 2,10 Kč/kWh na 12 měsíců. Jistota, doporučeno pro většinu.
• Výkup SPOT – hodinová burzová cena mínus 0,05 Kč/kWh. Může být výhodnější u větších zdrojů.

⚠️ Před podpisem ověřit:
1. Má zákazník licenci ERÚ?
2. Smlouvu o připojení s distributorem?
3. Nainstalovaný smart meter (AMM)?

👉 Zeptej se na výkon FVE v kWp – pod 10 kWp doporučuji FIX, nad 10 kWp může být SPOT zajímavý.`;
  }

  if (m.includes("jistot") || m.includes("jistý") || m.includes("garantovan") || m.includes("fixn")) {
    return `Zákazník chce jistotu ceny – ideální kandidát na FIX 24.

👉 Doporučuji: Electree FIX 24
• Cena: 3,45 Kč/kWh (NN)
• Vázanost: 24 měsíců
• Žádná překvapení z burzových výkyvů

Pokud má i plyn: PLYN FIX 24 = 1,95 Kč/kWh + 89 Kč/měsíc paušál.

Formulace pro zákazníka: "Tato tarifa vám zajistí stejnou cenu po celé 2 roky, bez ohledu na to, co se děje na trhu."`;
  }

  if (m.includes("účet") || m.includes("ucet") || m.includes("drahé") || m.includes("drahe") || m.includes("vysoký") || m.includes("vysok")) {
    return `Zákazník si stěžuje na vysoký účet – postup:

1. Zjisti jaký produkt má: pokud je na SPOTu, mohl platit tržní špičky (např. zima 2024 = až 8 Kč/kWh v některých hodinách).
2. Zkontroluj jeho spotřebu v zákaznické kartě – je vyšší než loni?
3. Nabídni přechod na FIX 12 (3,20 Kč/kWh) nebo FIX 24 (3,45 Kč/kWh).

👉 Formulace: "Rozumím, na SPOTu se cena může lišit hodinu od hodiny. Můžeme vás přesunout na fixní tarifu, kde budete znát přesnou cenu předem. Chcete to zvážit?"`;
  }

  if (m.includes("zrušit") || m.includes("zrusit") || m.includes("výpověď") || m.includes("vypoved") || m.includes("odejít") || m.includes("odejit")) {
    return `Zákazník chce zrušit smlouvu:

• Výpovědní lhůta: 30 dní od doručení výpovědi
• Poplatek: žádný, pokud je smlouva po skončení vázanosti
• Pokud je v období vázanosti: upozorni na případný poplatek za předčasné ukončení (ověř ve smlouvě)

👉 Retenční skript: "Dřív než to zprocesujeme, mohu se zeptat co vás k tomu vede? Možná dokážeme najít řešení – například lepší produkt nebo splátkový plán."

Pokud zákazník trvá na zrušení: zapiš důvod do CRM a spusť retenční workflow.`;
  }

  if (m.includes("platb") || m.includes("splátk") || m.includes("platba") || m.includes("dluh") || m.includes("nezaplat")) {
    return `Zákazník se opožďuje s platbou – postup:

Splátkový plán:
• Max 3 splátky
• Minimální splátka: 500 Kč
• První splátka ihned při dohodnutí plánu

👉 Formulace: "Dokážeme vám rozdělit dlužnou částku na 3 splátky. Co by bylo pro vás reálně zvladatelné hned teď?"

⚠️ Upozornění: pokud zákazník má již aktivní upomínky, ověř v systému před nabídkou plánu. Předej případ nadřízené pokud částka přesahuje 5 000 Kč.`;
  }

  if (m.includes("zelená") || m.includes("zelena") || m.includes("ekolog") || m.includes("oze") || m.includes("obnovitel")) {
    return `Zákazník se zajímá o ekologii – Electree ZELENÁ:

• 100 % elektřina z obnovitelných zdrojů (certifikát RECS)
• Cena: 3,35 Kč/kWh (FIX 12 + příplatek 0,15 Kč)
• Vázanost: 12 měsíců

👉 Klíčový argument: "Každá kWh, kterou spotřebujete, je pokryta certifikátem původu z OZE – větrné, solární nebo vodní elektrárny."

Vhodné pro zákazníky, kteří řeší uhlíkovou stopu, ale nemají vlastní FVE.`;
  }

  if (m.includes("plyn") || m.includes("gas")) {
    return `Plyn – přehled produktů:

• PLYN FIX 12 – 1,85 Kč/kWh + 89 Kč/měsíc. Doporučeno pro většinu domácností.
• PLYN FIX 24 – 1,95 Kč/kWh + 89 Kč/měsíc. Dlouhodobá jistota, o 0,10 Kč dražší.
• PLYN SPOT – denní burzová cena EEX. Pro zkušenější zákazníky, kteří sledují trh.

👉 Tip: Pokud zákazník odebírá i elektřinu, nabídni kombinaci FIX 24 elektřina + FIX 24 plyn = jednoduchá smlouva, jedna platba, jistota na 2 roky.`;
  }

  if (m.includes("spot") || m.includes("burzov") || m.includes("hodinov")) {
    return `SPOT produkt – elektřina za burzovou cenu:

• Cena se mění každou hodinu podle OTE burzy
• Distribuce zůstává fixní (podle distribučního pásma)
• Potřeba: smart meter (AMM) pro hodinové měření

Kdy je SPOT výhodný:
✅ Zákazník má flexibilní spotřebu (nabíjí auto v noci, pračka přes den)
✅ Má domácí FVE nebo baterii
❌ Nevhodné pro zákazníky, kteří chtějí předvídatelný účet

👉 Pokud zákazník váhá: "Na SPOTu můžete ušetřit, ale vyžaduje sledování cen. Chcete se tomu věnovat, nebo raději jistotu FIXu?"`;
  }

  // Generic fallback
  return `Na základě vaší otázky – zde je můj pohled:

Electree nabízí produkty pro různé typy zákazníků:
• Chce jistotu → FIX 24 (elektřina 3,45 Kč/kWh, plyn 1,95 Kč/kWh)
• Chce flexibilitu → SPOT (hodinové burzové ceny)
• Má FVE → Výkup FIX 2,10 Kč/kWh nebo Výkup SPOT
• Ekologicky smýšlející → Electree ZELENÁ (3,35 Kč/kWh)

Můžete mi dát více kontextu o situaci zákazníka? Rád poradím konkrétněji.`;
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
