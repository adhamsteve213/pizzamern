// Centralized API base URL for backend (configurable via Vercel env var)
export const API_BASE = process.env.REACT_APP_API_BASE || 'https://mern-vercel-netlify-imhj-nlqtorgdf-adhamsteve213s-projects.vercel.app/';

// Helper to build URLs consistently
export const apiUrl = (path = '') => `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
