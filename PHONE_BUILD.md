# Build the APK using only an Android phone

This project is configured for an Expo EAS cloud APK build.

## Phone-only route
1. Create/sign in to a GitHub account.
2. Create a new GitHub repository.
3. Upload all files from this project ZIP into the repository (not the ZIP file itself).
4. Open the repository in GitHub Codespaces in Chrome.
5. Open the terminal in Codespaces.
6. Run:
   npm install
   npx eas-cli@latest login
   npx eas-cli@latest build -p android --profile preview
7. When Expo asks, sign in/create an Expo account and allow the build.
8. Wait for the cloud build to finish.
9. Open the build page/link and download the APK to the Android phone.
10. Tap the downloaded APK and install it.

The preview profile is configured with android.buildType=apk, so the result is an installable Android APK.

Important:
- This is a prototype app. It still uses demo/local data.
- Do not publish it for real member registration until the secure backend, authentication, Technical Director approval, database, and production ID-card generation are implemented.
- Never put passwords, API keys, or private credentials into the repository.
