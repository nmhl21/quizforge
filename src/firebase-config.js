// Firebase config for Briefly.
//
// HOW TO FILL THIS IN (no real credentials are committed here):
//   1. Go to https://console.firebase.google.com and create a project.
//   2. In the project, open "AI Logic" (Build > AI Logic) > Get started.
//   3. Choose the Gemini Developer API backend.
//   4. In Project settings > General, copy your web app's config values
//      below (or set them as VITE_FIREBASE_* env vars at build time,
//      see README.md — env vars take precedence over the values here).
//   5. For local dev, App Check uses the debug provider: run the app once,
//      copy the debug token printed in the browser console, and register it
//      in Firebase console > App Check > Apps > Manage debug tokens.
//
// The placeholder values below ("YOUR_...") mean "not configured": the app
// detects this and shows a friendly setup guide instead of calling Firebase.
//
// CONFIGURED 23 Nov 2026: real Firebase project "briefly" (Spark, free),
// AI Logic + Gemini Developer API enabled. The values below are the web
// app's public client identifiers — Firebase web apiKeys are public by
// design and are meant to be embedded in client code (API restrictions
// are enforced server-side in Google Cloud, not by hiding the key).

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCkleH4UNWTBRwRb6zKLwpleK205HCtCxI",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "briefly-aa68d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "briefly-aa68d",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "briefly-aa68d.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "387585752591",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:387585752591:web:e0767723bc09469e9cad7a",
};

/** True when a real (non-placeholder) Firebase config is present. */
export function isFirebaseConfigured() {
  return (
    typeof firebaseConfig.apiKey === "string" &&
    firebaseConfig.apiKey.length > 0 &&
    !firebaseConfig.apiKey.startsWith("YOUR_")
  );
}
