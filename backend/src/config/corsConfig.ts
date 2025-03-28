import { CorsOptions } from 'cors';

// Configura CORS con l'origini del frontend
const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173', // Consenti richieste solo dal frontend Vue
  methods: ['GET', 'POST'], // Specifica i metodi consentiti
  allowedHeaders: ['Content-Type', 'Authorization'], // Aggiungi gli header consentiti, se necessario
};

export default corsOptions;
