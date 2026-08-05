# AtlasMedica - Site Web Commercial

## Formulaire de contact (WhatsApp)

Le formulaire « Contactez-nous » construit un message pré-rempli et l'ouvre
dans WhatsApp vers le numéro de l'équipe (`00213 770 871 850`).
Aucune clé API requise : fonctionne sur n'importe quel hébergement statique
(GitHub Pages, etc.).

Le numéro WhatsApp est configurable dans `script.js` (constante `WHATSAPP_NUMBER`).

## Déploiement GitHub Pages

### 1. Créer un compte GitHub
- Va sur https://github.com/signup
- Choisis un pseudo (ex: `atlasmedica` ou ton nom)
- Confirme l'email

### 2. Créer le dépôt
- Clique sur le `+` en haut à droite → **New repository**
- Nom du repo : **`atlasmedica.github.io`** (obligatoire pour le site user)
  *(ou un autre nom pour un site projet)*
- Mets en **Public**
- Laisse tout par défaut → **Create repository**

### 3. Uploader les fichiers
- Sur la page du repo, clique **Add file** → **Upload files**
- Ouvre le dossier `C:\Users\Mustapha\Desktop\ATLASMEDvs\Site web`
- Sélectionne **tous les fichiers et dossiers** (assets/, index.html, style.css, script.js, etude-technique.html)
- Glisse-les dans GitHub
- En bas, clique **Commit changes**

### 4. Activer GitHub Pages
- Va dans **Settings** → **Pages**
- Source : **Deploy from a branch**
- Branch : **main** → **/ (root)**
- **Save**

Le site sera en ligne dans 1-2 minutes sur `https://tonpseudo.github.io`
