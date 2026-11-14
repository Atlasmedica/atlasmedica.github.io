# AtlasMedica — site public 2.0

Site statique de présentation d'ATLASMEDICA 2.0 (GitHub Pages) :
<https://atlasmedica.github.io/>

## Contenu

| Fichier | Rôle |
| --- | --- |
| `index.html` | Page d'accueil : hero, galerie « Du démarrage à l'ordonnance », modules, nouveautés 2.0, éditions, tarifs, FAQ, contact |
| `style.css` | Thème sombre bleu/cyan aligné sur l'application (tokens, composants, responsive) |
| `script.js` | Navigation, apparitions au défilement, compteurs, visionneuse d'images, WhatsApp, formulaire FormSubmit |
| `promo.html` | Présentation animée (capture OBS) |
| `poster.html` | Affiche verticale |
| `assets/screenshots/` | Captures réelles de l'application 2.0, de `splash.jpg` à `ordonnance.jpg` |

## Captures d'écran

Les dix images de `assets/screenshots/` proviennent de l'application réelle
(rendu 1600×1000, splash 1280×800). La galerie de la page d'accueil en affiche
huit (grille de 2 colonnes) ; `consultations.jpg` reste disponible dans le
dossier et `mode-clair.jpg` illustre la section « Mode clair ». Elles suivent
le parcours d'une consultation :

1. `splash.jpg` — démarrage
2. `connexion.jpg` — connexion
3. `tableau-de-bord.jpg` — tableau de bord
4. `patients.jpg` — liste des patients et QR
5. `dossier-patient.jpg` — fiche synthétique
6. `rendez-vous.jpg` — planning du jour
7. `consultations.jpg` — historique
8. `consultation.jpg` — dossier clinique
9. `ordonnance.jpg` — prescriptions
10. `mode-clair.jpg` — tableau de bord en thème clair (section « Mode clair »)

Pour les remplacer : capturer la fenêtre de l'application, redimensionner en
1600×1000 (JPEG qualité ~92) et conserver les mêmes noms de fichiers.

## Formulaire de contact

Le formulaire `#contactForm` envoie ses données à **FormSubmit**
(`https://formsubmit.co/ajax/atlasmedica.group@gmail.com`), un relais de
formulaire statique qui accepte les requêtes cross-origin (CORS) : il
fonctionne donc sur GitHub Pages comme sur n'importe quel hébergeur `.dz` ou
`.com`, sans backend.

- La première soumission déclenche un email d'activation à
  `atlasmedica.group@gmail.com` : cliquer sur « Activate Form » une seule fois.
- L'adresse et l'endpoint sont définis par la constante `FORM_ENDPOINT` en
  haut de `script.js`.
- Un champ piège `_honey` et `_captcha: false` limitent le spam.
- Sans JavaScript, le formulaire retombe sur un POST classique vers
  `https://formsubmit.co/atlasmedica.group@gmail.com` (attribut `action`).

Pour repasser plus tard sur un script maison (PHP sur un hébergement `.dz`/`.com`,
API), remplacer `FORM_ENDPOINT` par son URL et supprimer l'attribut `action` :
le reste du code ne change pas.

Le lien WhatsApp est construit dans `script.js` (`initWhatsapp`, numéro
`213770871850`) et sert aussi de secours si l'envoi échoue.

## Déploiement

Le dépôt est publié par GitHub Pages depuis la branche `main`, à la racine.

```powershell
git add -A
git commit -m "Site : mise à jour"
git push origin main
```

Le site est actualisé une à une deux minutes après le push.
