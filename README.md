# Congrès des députés — projection Cluster 17 (élections du 29 novembre 2026)

Simulateur de coalitions sur l'hémicycle du Congrès des députés, à intégrer en iframe.

- `index.html` (français), `es/index.html` (espagnol), `it/index.html` (italien) : pages autonomes (polices embarquées), prêtes à être intégrées.
- `source/` : code Svelte, textes dans `src/i18n.js`. `npm install`, puis `LANG_GC=fr npx vite build` (ou `es`, `it`) ; le résultat est dans `dist/<langue>/index.html`.

Source des données : projection en sièges Cluster 17 (enquête en ligne du 10 au 13 novembre 2026, 1 525 personnes).
Positions des sièges : schéma de l'hémicycle de Wikipédia (sièges de la Mesa retirés).
