// The frontend runs in the browser, so it needs to call the backend
// through the host machine's port mapping, not Docker internal network.
// In development: backend is exposed on localhost:3000
// In production: set VITE_API_BASE_URL during build
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export { API_BASE_URL };