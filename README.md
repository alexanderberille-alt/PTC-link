# PTC-link

PTC-link est un projet d’application iPhone pour jouer en 5G aux jeux d’un PC Windows 11 connecté en Ethernet. Le PC fera tourner le jeu et transmettra l’image et le son à l’iPhone.

## Essayer l’interface

Télécharger `index.html` et l’ouvrir dans un navigateur. Ce fichier autonome contient le renderer React et ses feuilles de style.

- **Mes PC** affiche un PC Windows 11 de démonstration et ouvre l’écran de session.
- **Bibliothèque** permet de rechercher un titre, de consulter sa fiche et de simuler son lancement.
- **Paramètres → Diffusion** règle le débit affiché dans la session de démonstration.

## Base Greenlight

Le code provient de `packages/desktop/renderer` dans l’archive fournie `greenlight-main-v2.zip`, dont le paquet desktop est en version 2.4.2. Les composants `Card`, `Button`, `Label` et `BreadcrumbBar`, ainsi que leurs styles, sont repris du projet sous licence MIT. [Greenlight](https://github.com/unknownskl/greenlight) · [Licence d’origine](LICENSE.greenlight)

Dans `renderer/`, la navigation, la page des appareils, la bibliothèque, les paramètres et l’écran de session sont adaptés aux PC. Pour l’aperçu autonome, un routage local remplace les liens Next.js et les données de démonstration remplacent les appels aux services Xbox. La disposition s’adapte à la largeur de l’iPhone. L’intégration du streaming via Moonlight et Tailscale viendra après validation de l’interface.

## Modifier l’aperçu

Depuis la racine du dépôt avec Node.js 22 ou ultérieur et npm, installer les dépendances puis régénérer `index.html` après une modification du renderer.

```sh
npm ci
npm run build
```
