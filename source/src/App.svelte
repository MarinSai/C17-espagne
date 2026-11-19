<script>
  import POS from "./seats.json";
  // ── Données : projection en sièges Cluster 17 (enquête du 10 au 13 novembre 2026) ──
  // Ordre gauche → droite de l'hémicycle (les partis régionalistes occupent le « quesito » central)
  const BLOCS = [
    { id: "gauche", name: "Gauche", parties: [
      { id: "fa", name: "Frente Amplio – Compromís", seats: 9, color: "#EF4B91" },
      { id: "psoe", name: "PSOE", seats: 120, color: "#EF1C27" } ] },
    { id: "reg", name: "Partis régionalistes et indépendantistes", parties: [
      { id: "erc", name: "ERC", seats: 10, color: "#FFB232" },
      { id: "bildu", name: "EH Bildu", seats: 8, color: "#B5CF18" },
      { id: "bng", name: "BNG", seats: 3, color: "#ADCFEF" },
      { id: "junts", name: "Junts", seats: 6, color: "#00C7AE" },
      { id: "pnv", name: "PNV", seats: 3, color: "#4AAE4A" },
      { id: "cc", name: "Coalición Canaria", seats: 1, color: "#FFD700" } ] },
    { id: "droite", name: "Droite", parties: [
      { id: "pp", name: "PP", seats: 125, color: "#1D84CE" },
      { id: "vox", name: "Vox", seats: 65, color: "#63BE21" } ] }
  ];
  const PARTIES = BLOCS.flatMap((b) => b.parties.map((p) => ({ ...p, bloc: b.id })));
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const TOTAL = sum(PARTIES, (p) => p.seats), MAJ = 176;
  // Scénarios évoqués dans la campagne et dans l'enquête Cluster 17
  const PRESETS = [
    ["PP + Vox", ["pp", "vox"]],
    ["PP seul", ["pp"]],
    ["Bloc d'investiture de Sánchez (2023)", ["fa", "psoe", "erc", "bildu", "bng", "junts", "pnv", "cc"]],
    ["PSOE, Frente Amplio, ERC, Bildu, BNG", ["fa", "psoe", "erc", "bildu", "bng"]],
    ["Grande coalition PP-PSOE", ["pp", "psoe"]],
    ["Tout effacer", []]
  ];

  // ── Géométrie : positions réelles des 350 sièges de l'hémicycle (d'après le schéma de Wikipédia,
  //    sièges de la Mesa retirés), remplies par angle depuis le bas du fer à cheval, de gauche à droite ──
  const CX = 766, CY = 1165;
  const seats = POS.map(([x, y]) => ({ x, y, a: Math.atan2(CY - y, x - CX), d: Math.hypot(x - CX, y - CY) }));
  seats.sort((p, q) => q.a - p.a || q.d - p.d);
  let k = 0;
  PARTIES.forEach((p) => { for (let i = 0; i < p.seats; i++) seats[k++].party = p; });
  const seatR = 15.8;

  // ── État ──
  let selected = $state(new Set(PRESETS[0][1]));
  let hover = $state(null);
  let tip = $state(null);
  let chart;

  const sel = $derived(PARTIES.filter((p) => selected.has(p.id)));
  const n = $derived(sum(sel, (p) => p.seats));

  function toggle(id) {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    selected = s;
  }
  function opacity(d) {
    if (hover) return d.party === hover ? 1 : selected.has(d.party.id) ? 0.55 : 0.12;
    return selected.size === 0 || selected.has(d.party.id) ? 1 : 0.15;
  }
  function enter(e, d) {
    hover = d.party;
    const b = chart.getBoundingClientRect(), s = e.target.getBoundingClientRect();
    tip = { text: `${d.party.name} · ${d.party.seats} siège${d.party.seats > 1 ? "s" : ""}`, x: s.left + s.width / 2 - b.left, y: s.top - b.top };
  }
  function leave() { hover = null; tip = null; }

  // Hauteur envoyée à la page parente (option « Auto-resize » du bloc iFrame)
  $effect(() => {
    const sendH = () => {
      if (parent === window) return;
      const height = Math.ceil(document.documentElement.getBoundingClientRect().height);
      [{ "datawrapper-height": { "congreso.html": height } }, { type: "gc-embed-height", id: "congreso-2026", height },
        { type: "resize", height }, { height }, { frameHeight: height }].forEach((m) => parent.postMessage(m, "*"));
      parent.postMessage(JSON.stringify({ height }), "*");
    };
    const ro = new ResizeObserver(sendH);
    ro.observe(document.documentElement);
    addEventListener("load", sendH); setTimeout(sendH, 500); setTimeout(sendH, 1500);
    return () => ro.disconnect();
  });
</script>

<div class="wrap" data-iframe-size data-iframe-height>
  <h1>Le PP et Vox obtiendraient la majorité absolue</h1>
  <p class="dek">Projection de la répartition des 350 sièges du Congrès des députés, d'après l'enquête Cluster 17 réalisée du 10 au 13 novembre 2026.</p>

  <div class="chart" bind:this={chart}>
    <svg viewBox="15 25 1503 1150" role="img" aria-label="Hémicycle du Congrès des députés, 350 sièges">
      {#each seats as d}
        <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
        <circle class="seat" cx={d.x} cy={d.y} r={seatR} fill={d.party.color} opacity={opacity(d)}
          onpointerenter={(e) => enter(e, d)} onpointerleave={leave} onclick={() => toggle(d.party.id)} />
      {/each}
      <text class="n" x={CX} y="1010" text-anchor="middle">{n}</text>
    </svg>
    {#if tip}<div class="tip" style="left:{tip.x}px;top:{tip.y}px">{tip.text}</div>{/if}
  </div>

  <p class="status">
    {#if selected.size === 0}Sélectionnez des partis ou un scénario
    {:else if n >= MAJ}<b>Majorité absolue atteinte</b> ({n - MAJ} siège{n - MAJ > 1 ? "s" : ""} de marge)
    {:else}Il manque <b>{MAJ - n}</b> siège{MAJ - n > 1 ? "s" : ""} pour la majorité absolue{/if}
  </p>
  <div class="bar">
    <div class="fill" style="width:{(n / TOTAL) * 100}%">
      {#each sel as p (p.id)}<span style="background:{p.color};width:{n ? (p.seats / n) * 100 : 0}%"></span>{/each}
    </div>
    <div class="maj" style="left:{(MAJ / TOTAL) * 100}%"></div>
    <div class="majl" style="left:{(MAJ / TOTAL) * 100}%">Majorité absolue : {MAJ}</div>
  </div>

  <div class="presets">
    <span class="lab">Scénarios</span>
    {#each PRESETS as [label, ids]}
      <button type="button" onclick={() => (selected = new Set(ids))}>{label}</button>
    {/each}
  </div>

  <div class="blocs">
    {#each BLOCS as b}
      <div class="bloc">
        <h2>{b.name}<span>{sum(b.parties, (p) => p.seats)} sièges</span></h2>
        <div class="chips">
          {#each b.parties as p}
            <button type="button" class="chip" aria-pressed={selected.has(p.id)} onclick={() => toggle(p.id)}>
              <span class="dot" style="background:{p.color}"></span>{p.name}<span class="k">{p.seats}</span>
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <p class="note">Podemos n'obtiendrait aucun siège. Enquête en ligne auprès de 1 525 personnes. Source : Cluster 17 · Graphique : Le Grand Continent</p>
</div>

<style>
  :global(:root) {
    --bg: #ffffff; --fg: #1d1f24; --muted: #6b6f78; --rule: #e2e3e6; --empty: #e9eaed;
    --chip: #ffffff; color-scheme: light; --focus: #2b5c8a;
    --font-display: "GC Sanomat", "Sanomat", Georgia, "Times New Roman", serif;
    --font-body: "GC National", "National", system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  :global(body) {
    background: #fff; color: var(--fg); font-family: var(--font-body); margin: 0;
    padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 8px 16px;
  }
  .wrap { max-width: 680px; margin: 0 auto; display: grid; gap: 18px; }
  h1 { font-family: var(--font-display); font-weight: 600; font-size: clamp(24px, 4.4vw, 32px); line-height: 1.15; margin: 0; text-wrap: balance; }
  .dek { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.5; max-width: 62ch; }
  .chart { position: relative; max-width: 520px; width: 100%; margin: 0 auto; }
  svg { display: block; width: 100%; height: auto; overflow: visible; }
  .seat { transition: opacity 0.25s; cursor: pointer; }
  .n { font-family: var(--font-display); font-weight: 600; font-size: 170px; fill: var(--fg); font-variant-numeric: tabular-nums; pointer-events: none; }
  .status { text-align: center; font-size: 14px; color: var(--muted); margin: -6px 0 6px; }
  .status b { color: var(--fg); }
  .bar { position: relative; height: 10px; margin-top: 18px; background: var(--empty); border-radius: 2px; }
  .bar .fill { position: absolute; inset: 0 auto 0 0; display: flex; height: 100%; transition: width 0.3s; }
  .bar .fill span { height: 100%; border-right: 1px solid var(--bg); }
  .bar .maj { position: absolute; top: -6px; bottom: -6px; border-left: 1.5px dashed var(--fg); }
  .bar .majl { position: absolute; top: -24px; transform: translateX(-50%); font-size: 12px; color: var(--muted); white-space: nowrap; }
  .presets { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-size: 13px; }
  .presets .lab { color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px; font-weight: 600; margin-right: 4px; }
  button { font: inherit; cursor: pointer; color: var(--fg); background: var(--chip); border: 1px solid var(--rule); border-radius: 999px; padding: 5px 12px; }
  button:hover { border-color: var(--muted); }
  button:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
  .blocs { display: grid; gap: 14px; }
  .bloc h2 { font-size: 13px; font-weight: 600; margin: 0 0 8px; display: flex; justify-content: space-between; gap: 8px; }
  .bloc h2 span { color: var(--muted); font-weight: 500; font-variant-numeric: tabular-nums; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip { display: flex; align-items: center; gap: 7px; border-radius: 4px; padding: 5px 9px; font-size: 13.5px; }
  .chip .dot { width: 11px; height: 11px; border-radius: 50%; flex: none; }
  .chip .k { font-variant-numeric: tabular-nums; color: var(--muted); }
  .chip[aria-pressed="false"] { opacity: 0.5; }
  .chip[aria-pressed="false"] .dot { background: transparent !important; box-shadow: inset 0 0 0 1.5px var(--muted); }
  .note { font-size: 12.5px; color: var(--muted); line-height: 1.5; border-top: 1px solid var(--rule); padding-top: 12px; margin: 0; }
  .tip { position: absolute; pointer-events: none; background: var(--fg); color: var(--bg); font-size: 12.5px; padding: 4px 8px; border-radius: 3px; white-space: nowrap; transform: translate(-50%, -130%); }
  @media (prefers-reduced-motion: reduce) { .seat, .bar .fill { transition: none; } }
</style>
