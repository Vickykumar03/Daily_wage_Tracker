# 💼 Daily Wage Tracker — Full Stack (MongoDB + Node.js)

A complete wage tracking app for daily-wage workers with **Login/Register**, persistent **MongoDB storage**, and a **Loan Income Certificate** generator.

---

## 📁 Project Structure

```
wage-tracker/
├── server.js              ← Express server (entry point)
├── .env                   ← Environment variables (create this)
├── .env.example           ← Template for .env
├── package.json
├── models/
│   ├── User.js            ← User schema (auth + profile)
│   └── Entry.js           ← Work entry schema
├── routes/
│   ├── auth.js            ← Register, Login, Profile APIs
│   └── entries.js         ← CRUD APIs for work entries
├── middleware/
│   └── auth.js            ← JWT verification middleware
└── public/
    └── index.html         ← Full frontend (HTML + CSS + JS)
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- **Node.js** v16+ → https://nodejs.org
- **MongoDB** (local or Atlas)
  - **Local:** Install from https://www.mongodb.com/try/download/community
  - **Atlas (free cloud):** https://www.mongodb.com/atlas/database

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` file
```bash
cp .env.example .env
```
Edit `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wage_tracker
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=7d
```

> For MongoDB Atlas replace `MONGODB_URI` with your Atlas connection string:
> `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/wage_tracker`

### 4. Start MongoDB (if local)
```bash
# macOS/Linux
mongod --dbpath /data/db

# Windows
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
```

### 5. Run the App
```bash
npm start
```
Open: **http://localhost:3000**

---

## 🔌 API Endpoints

### Auth
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET  | `/api/auth/me` | Get current user |
| PUT  | `/api/auth/profile` | Update profile |

### Entries (all require Bearer token)
| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/api/entries` | List all entries (with filters) |
| POST   | `/api/entries` | Create new entry |
| PUT    | `/api/entries/:id` | Update entry |
| DELETE | `/api/entries/:id` | Delete entry |
| GET    | `/api/entries/stats` | Summary statistics |
| GET    | `/api/entries/report/:year` | Monthly breakdown |

---

## ✨ Features

- 🔐 **Login / Register** with phone number + password (JWT)
- 💾 **All data stored in MongoDB** — never lost
- 📅 **Add work entries**: Full Day, Half Day, Overtime, Holiday, Absent
- 💰 **Track wages** with payment status (Paid / Pending / Partial)
- 📊 **Reports** with monthly bar charts
- 🏦 **Loan Income Certificate** generator (print/copy)
- 👤 **Worker Profile** (Name, Aadhaar, Occupation, Daily Rate, Address)
- 🔍 **Search & Filter** history by month, type, payment

---

## 🚀 Deploy to Production

### Render.com (free tier)
1. Push to GitHub
2. Create Web Service on Render
3. Set environment variables in Render dashboard
4. Use MongoDB Atlas for database

### Railway.app
1. `railway init` → `railway up`
2. Add MongoDB plugin or set Atlas URI

---

## 🔒 Security Notes
- Passwords are hashed with **bcryptjs** (salt 12)
- JWTs expire in 7 days
- Each user can only access their own entries
- Change `JWT_SECRET` to a long random string in production
