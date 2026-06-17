# Khyee

Khyee est une application mobile de mise en relation entre clients et coiffeurs : recherche d'un coiffeur, prise de rendez-vous et suivi, avec un espace dédié pour les coiffeurs (tableau de bord, gestion des rendez-vous).

Construite avec [Expo](https://expo.dev) / React Native, TypeScript, NativeWind (Tailwind CSS) et React Navigation.

> Ce projet a été développé avec l'aide de [Claude Code](https://claude.com/claude-code), l'agent de codage en ligne de commande d'Anthropic.

## Fonctionnalités

- **Côté client** : recherche de coiffeurs, accueil, prise et suivi de rendez-vous (RDV), profil utilisateur.
- **Côté coiffeur** : tableau de bord pour gérer son activité et ses rendez-vous.
- **Authentification** : écran de connexion.
- Interface sombre, animations et composants réutilisables (cartes, boutons, en-têtes) stylés avec NativeWind/Tailwind.

## Stack technique

- [Expo](https://docs.expo.dev/versions/v56.0.0/) SDK 56 (React Native 0.85)
- TypeScript
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS pour React Native)
- [React Navigation](https://reactnavigation.org/) (stack + bottom tabs)
- Polices : Expo Google Fonts (Aoboshi One)

## Structure du projet

```
khyee/
├── App.tsx                 # Point d'entrée de l'application
├── navigation/              # Configuration de la navigation (stack/tabs)
├── screens/
│   ├── auth/                 # Écran de connexion
│   ├── client/                # Écrans côté client (accueil, recherche, RDV, profil)
│   └── coiffeur/               # Écran côté coiffeur (tableau de bord)
├── components/               # Composants UI réutilisables
├── theme/                     # Thème / styles partagés
└── assets/                     # Icônes, images, splash screen
```

## Démarrage en local

Prérequis : [Node.js](https://nodejs.org/) (LTS) et npm.

```bash
npm install
npm start          # démarre le serveur Expo (Metro)
npm run android    # lance sur émulateur/appareil Android
npm run ios        # lance sur simulateur/appareil iOS
npm run web        # lance la version web
```

L'application s'ouvre via l'app **Expo Go** en scannant le QR code, ou sur un émulateur/simulateur déjà configuré.

## Build Android (APK)

Une GitHub Action ([`.github/workflows/build-apk.yml`](.github/workflows/build-apk.yml)) génère automatiquement un APK Android à chaque push sur `main` :

1. Installation des dépendances
2. Génération du projet natif Android (`expo prebuild`)
3. Build de l'APK (`gradlew assembleRelease`)
4. L'APK est publié comme artefact du workflow et attaché à une [Release GitHub](../../releases)

Pour générer l'APK manuellement en local :

```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
# APK généré dans android/app/build/outputs/apk/release/app-release.apk
```

## Licence

MIT — voir [LICENSE](LICENSE).
