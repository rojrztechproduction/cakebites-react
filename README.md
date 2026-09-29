# 🎂 CakeBites — Project Structure

```
cakebites-react/
├── frontend/            ← ✅ React Frontend (Vite) — Deploy to VERCEL
│   ├── src/
│   │   ├── main.jsx         (main app component)
│   │   ├── styles.css       (all styles)
│   │   ├── catalogData.js   (product data)
│   │   └── [pages & components]
│   ├── public/              (images, assets, textures)
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json          (Vercel SPA routing config)
│   ├── .env.example         (copy to .env)
│   └── package.json
│
├── backend/             ← ✅ Express API + MySQL — Deploy to HOSTINGER
│   ├── index.js             (main server file)
│   ├── db.js                (MySQL pool connection)
│   ├── schema.sql           (database setup)
│   ├── .env.example         (copy to .env)
│   ├── .gitignore
│   └── package.json
│
├── .gitignore           (protects .env and node_modules)
├── package.json         (root convenience scripts)
└── README.md
```

---

## 🚀 Local Development

You can run directly from the root folder:

```bash
# Start frontend dev server (runs on http://localhost:5173)
npm run dev

# Or start specific parts:
npm run dev:frontend
npm run dev:backend

# Build frontend:
npm run build
```

Or run directly from their folders:

### Backend (Terminal 1)
```bash
cd backend
copy .env.example .env   # fill in your DB details
npm run dev
# Runs on http://localhost:5000
```

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

---

## 🌐 Deployment Guide

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Set **Root Directory** to: `frontend`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-hostinger-backend-url.com`
5. Click **Deploy** ✅

### Backend → Hostinger (Node.js Hosting)

1. Upload the `backend/` folder to Hostinger
2. In Hostinger cPanel / hPanel → **Node.js** → **Create Application**
   - **Entry point:** `index.js`
   - **Node version:** 18+
3. Add environment variables in Hostinger:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=cakebite_react
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
4. Run `npm install` in Hostinger terminal
5. Start the app ✅

---

## 🗄️ Database Setup (MySQL)

Import the schema file in phpMyAdmin or MySQL terminal:

```sql
-- First create the database
CREATE DATABASE `cakebite_react` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Then import schema
source backend/schema.sql;
```

Or upload [schema.sql](file:///c:/Users/DEV/Desktop/umar/cakebites-react/backend/schema.sql) via phpMyAdmin → Import.

---

## 📡 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/health` | Server + DB status |
| GET | `/api/categories` | All categories |
| GET | `/api/products` | All products |
| GET | `/api/sections` | Products grouped by category |
| GET | `/api/areas` | Delivery areas |
| POST | `/api/orders` | Place new order |
| GET | `/api/orders` | All orders |
| POST | `/api/products` | Add product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
