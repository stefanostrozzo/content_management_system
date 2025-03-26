# Specifiche Tecniche - Blog Platform con OAuth 2.0

## 📌 Stack Tecnologico

### 🔹 Backend (Node.js + Express.js)
**Librerie Principali**:
- `express`: Framework API REST
- `mongoose`: ODM per MongoDB
- `jsonwebtoken`: Autenticazione JWT (integrato con OAuth)
- `bcryptjs`: Hashing password
- `passport` + strategie OAuth: Autenticazione con Google/Facebook/GitHub
- `nodemailer`: Invio email
- `multer`: Upload immagini
- `helmet` + `rate-limiter`: Sicurezza
- `swagger-ui-express`: Documentazione API

### 🔹 Frontend (Vue 3 + TypeScript)
**Librerie Principali**:
- `vue-router`: Navigazione
- `pinia`: Stato globale
- `axios`: Chiamate API
- `vee-validate`: Validazione form
- `quill`: Editor WYSIWYG
- `tailwindcss`: Stili UI
- Componenti OAuth

## 🗄️ Modelli Database (MongoDB)

**User**:

```javascript
{
  username: String,
  email: String,
  password: String,
  role: String, // 'admin', 'author', 'user'
  oauthProvider: String, // 'google', 'facebook', 'github', 'local'
  oauthId: String,
  emailVerified: Boolean
}
```

**Article**:

```javascript
Copy
{
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [String],
  featuredImage: String
}
```

### 🌐 Endpoint API Principali

Autenticazione

```javascript
POST /auth/register - Registrazione tradizionale

POST /auth/login - Login tradizionale

GET /auth/google - Autenticazione Google

GET /auth/facebook - Autenticazione Facebook

GET /auth/github - Autenticazione GitHub
```

Articoli
```javascript
GET /articles - Lista articoli

POST /articles - Crea articolo

GET /articles/:id - Dettaglio articolo
```

⏳ Roadmap di Sviluppo
```javascript
Fase 1: Setup & Autenticazione (2 settimane)
Configurazione backend

Sistemi di autenticazione (JWT + OAuth)

Pagine login/registrazione frontend

Fase 2: Gestione Articoli (2 settimane)
CRUD articoli

Editor WYSIWYG

Gestione immagini

Fase 3: Commenti & Ricerca (1 settimana)
Sistema commenti

Ricerca full-text

Fase 4: Admin Panel (1 settimana)
Dashboard amministrativa

Moderazione contenuti
```

🔐 Variabili d'Ambiente

```javascript
Copy
DB_URI=mongodb_connection_string
JWT_SECRET=jwt_secret_key
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
OAUTH_CALLBACK_URL=your_callback_url
```
