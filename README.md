# 🎂 CakeBites — Project Structure

```
cakebites-react/
├── cakebites-react/     ← ✅ React Frontend (Vite) — Deploy to VERCEL
│   ├── src/
│   │   ├── main.jsx         (main app component)
│   │   ├── styles.css       (all styles)
│   │   ├── catalogData.js   (product data)
│   │   └── [pages & components]
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json          (Vercel deployment config)
│   ├── .env.example         (copy to .env)
│   └── package.json
│
├── backend/             ← ✅ Express API + MySQL — Deploy to HOSTINGER
│   ├── index.js             (main server file)
│   ├── db.js                (MySQL connection)
│   ├── schema.sql           (database setup)
│   ├── .env.example         (copy to .env)
│   ├── .gitignore
│   └── package.json
│
└── server/              ← ⚠️ OLD folder (ignore/delete when ready)
```

---

## 🚀 Local Development

### Backend (Terminal 1)
```bash
cd backend
cp .env.example .env   # fill in your DB details
npm run dev
# Runs on http://localhost:5000
```

### Frontend (Terminal 2)
```bash
cd cakebites-react
npm run dev
# Runs on http://localhost:5173
```

---

## 🌐 Deployment Guide

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Set **Root Directory** to: `cakebites-react`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-hostinger-backend-url.com`
5. Click Deploy ✅

### Backend → Hostinger (Node.js Hosting)

1. Upload the `backend/` folder to Hostinger
2. In Hostinger cPanel → Node.js → Create Application
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

Or upload `backend/schema.sql` via phpMyAdmin → Import

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
