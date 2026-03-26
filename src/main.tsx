/**
 * main.tsx — React entry point
 *
 * Mounts the App component into the #root div defined in index.html.
 * StrictMode enables extra runtime checks in development (double-renders,
 * deprecated API warnings) — has no effect in production builds.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
