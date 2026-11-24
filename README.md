# Compteur Jeux - Application de comptage de points

Une application web pour compter les points de différents jeux de société (Yam's, 5000, etc.).

## 🚀 Fonctionnalités

- **Page d'accueil** avec design orbital et sélection des jeux
- **Yam's** : Feuilles de score complètes avec gestion des joueurs
- **5000** : Page en développement
- **QR Code** pour accès mobile facile
- **Sauvegarde locale** dans le navigateur
- **Design responsive** pour mobile et desktop
- **Thème sombre** avec palette de couleurs orbitale

## 📱 Accès

Scannez le QR code affiché sur la page d'accueil pour accéder à l'application depuis votre mobile.

## 🛠 Technologie

- React 18
- Vite
- Tailwind CSS
- React Router
- QRCode.react

## 📦 Installation

```bash
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 🎯 Utilisation

1. **Accueil** : Sélectionnez le jeu souhaité
2. **Yam's** : 
   - Ajoutez des joueurs
   - Cliquez sur une case de score pour la remplir
   - Utilisez le slide-in pour sélectionner les points
   - Les scores sont automatiquement sauvegardés
3. **Nouvelle partie** : Réinitialisez tous les scores

## 💾 Sauvegarde

Les données sont automatiquement sauvegardées dans le localStorage du navigateur.
