/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    // Altre variabili d'ambiente...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }