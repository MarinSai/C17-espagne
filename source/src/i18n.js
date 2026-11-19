// Textes du graphique en français, espagnol et italien (langue choisie au build : LANG=fr|es|it)
const fr = {
  lang: "fr",
  title: "Le PP et Vox obtiendraient ensemble la majorité absolue",
  dek: "Projection de la répartition des 350 sièges du Congrès des députés, d'après l'enquête Cluster 17 réalisée du 10 au 13 novembre 2026.",
  aria: "Hémicycle du Congrès des députés, 350 sièges",
  blocs: { gauche: "Gauche", reg: "Partis régionalistes et indépendantistes", droite: "Droite" },
  fa: "Frente Amplio et Compromís",
  presets: ["PP + Vox", "PP seul", "Bloc d'investiture de Sánchez (2023)", "PSOE, gauche, ERC, EH Bildu, BNG", "Grande coalition PP-PSOE", "Tout effacer"],
  scenarios: "Scénarios",
  seats: (k) => `${k} siège${k > 1 ? "s" : ""}`,
  select: "Sélectionnez des partis ou un scénario",
  reached: (m) => `<b>Majorité absolue atteinte</b> (${m} siège${m > 1 ? "s" : ""} de marge)`,
  missing: (m) => `Il manque <b>${m}</b> siège${m > 1 ? "s" : ""} pour la majorité absolue`,
  maj: (k) => `Majorité absolue : ${k}`,
  note: "Les sièges de Frente Amplio et de Compromís sont additionnés. Au second vote d'investiture, la majorité simple suffit. Enquête en ligne réalisée du 10 au 13 novembre 2026 auprès de 1&nbsp;525 personnes.<br>Source : Cluster 17 · Graphique : Le Grand Continent"
};
const es = {
  lang: "es",
  title: "El PP y Vox obtendrían juntos la mayoría absoluta",
  dek: "Proyección del reparto de los 350 escaños del Congreso de los Diputados, según la encuesta de Cluster 17 realizada del 10 al 13 de noviembre de 2026.",
  aria: "Hemiciclo del Congreso de los Diputados, 350 escaños",
  blocs: { gauche: "Izquierda", reg: "Partidos regionalistas e independentistas", droite: "Derecha" },
  fa: "Frente Amplio y Compromís",
  presets: ["PP + Vox", "PP en solitario", "Bloque de investidura de Sánchez (2023)", "PSOE, izquierda, ERC, EH Bildu, BNG", "Gran coalición PP-PSOE", "Borrar todo"],
  scenarios: "Escenarios",
  seats: (k) => `${k} escaño${k > 1 ? "s" : ""}`,
  select: "Seleccione partidos o un escenario",
  reached: (m) => `<b>Mayoría absoluta alcanzada</b> (${m} escaño${m > 1 ? "s" : ""} de margen)`,
  missing: (m) => `${m > 1 ? "Faltan" : "Falta"} <b>${m}</b> escaño${m > 1 ? "s" : ""} para la mayoría absoluta`,
  maj: (k) => `Mayoría absoluta: ${k}`,
  note: "Los escaños de Frente Amplio y Compromís se suman. En la segunda votación de investidura basta la mayoría simple. Encuesta en línea realizada del 10 al 13 de noviembre de 2026 a 1.525 personas.<br>Fuente: Cluster 17 · Gráfico: El Grand Continent"
};
const it = {
  lang: "it",
  title: "PP e Vox otterrebbero insieme la maggioranza assoluta",
  dek: "Proiezione della ripartizione dei 350 seggi del Congresso dei Deputati, secondo il sondaggio Cluster 17 realizzato dal 10 al 13 novembre 2026.",
  aria: "Emiciclo del Congresso dei Deputati, 350 seggi",
  blocs: { gauche: "Sinistra", reg: "Partiti regionalisti e indipendentisti", droite: "Destra" },
  fa: "Frente Amplio e Compromís",
  presets: ["PP + Vox", "PP da solo", "Blocco dell'investitura di Sánchez (2023)", "PSOE, sinistra, ERC, EH Bildu, BNG", "Grande coalizione PP-PSOE", "Cancella tutto"],
  scenarios: "Scenari",
  seats: (k) => `${k} segg${k > 1 ? "i" : "io"}`,
  select: "Seleziona dei partiti o uno scenario",
  reached: (m) => `<b>Maggioranza assoluta raggiunta</b> (${m} segg${m > 1 ? "i" : "io"} di margine)`,
  missing: (m) => `${m > 1 ? "Mancano" : "Manca"} <b>${m}</b> segg${m > 1 ? "i" : "io"} alla maggioranza assoluta`,
  maj: (k) => `Maggioranza assoluta: ${k}`,
  note: "I seggi di Frente Amplio e Compromís sono sommati. Alla seconda votazione di investitura basta la maggioranza semplice. Sondaggio online realizzato dal 10 al 13 novembre 2026 su 1.525 persone.<br>Fonte: Cluster 17 · Grafico: Il Grand Continent"
};
export default { fr, es, it }[__LANG__] ?? fr;
