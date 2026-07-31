// firebase-config.js
// Fill in with your Firebase project's config values.
// Firebase Console -> Project Settings -> General -> "Your apps" -> SDK setup and config
export const firebaseConfig = {
  apiKey: "AIzaSyDvpaxAQSghnm5elzMRFmDbLwqDNsdpsxs",
  authDomain: "tripcrafter-9882c.firebaseapp.com",
  projectId: "tripcrafter-9882c",
  storageBucket: "tripcrafter-9882c.firebasestorage.app",
  messagingSenderId: "377670502361",
  appId: "1:377670502361:web:4b1ab8b05c420fcd7a3bc8"
};

// Your Cloudflare Worker URL (used for sending invite emails via Resend)
export const WORKER_URL = "https://tripcrafted.matt-zmud.workers.dev/";

// Trip theme palettes — used on trip creation and later on trip.html
export const TRIP_THEMES = {
  default:  { label: "Default",  primary: "#4CAF50", secondary: "#7C3AED", bg: "#F8F6F0", accent: "#E5E0D8" },
  summer:   { label: "Summer",   primary: "#1CA9C9", secondary: "#FFC93C", bg: "#F4FBFD", accent: "#BFEAF5" },
  fall:     { label: "Fall",     primary: "#B5482A", secondary: "#7A4B2A", bg: "#FBF3EC", accent: "#E8C9A8" },
  winter:   { label: "Winter",   primary: "#3E6B8A", secondary: "#8FA9BE", bg: "#F2F6F8", accent: "#D6E4EC" },
  tropical: { label: "Tropical", primary: "#0E8C7F", secondary: "#FF6F59", bg: "#F2FAF7", accent: "#C7E8D8" },
  mountain: { label: "Mountain", primary: "#3B6B45", secondary: "#5C5346", bg: "#F5F4EE", accent: "#D8DCC9" }
};
