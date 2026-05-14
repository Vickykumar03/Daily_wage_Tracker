# 💼 Daily Wage Tracker
### *Daily Earnings Record — Built for Daily Wage Workers*

A full-stack web application that helps daily wage workers track their earnings, work history, payment status, and generate income certificates for loan applications.

---

## 📸 Screenshots

### 🔐 Login / Register
![Login](login.png)

### 🏠 Dashboard
![Dashboard](DashBoard.png)

### ➕ Add Work Entry
![Data Entry 1](Data_Entry1.png)
![Data Entry 2](Data_Entry2.png)

### 📋 Work History
![Edit History](Edit_History.png)

### 📊 Earnings Report
![Track Report](Track_Report.png)

### 🏦 Loan Letter Generator
![Loan](Loan.png)
![Loan Application](Loan_Application.png)

---

## ✨ Features

- 🔐 **User Authentication** — Register & login with phone number and password
- ➕ **Add Work Entries** — Log date, work type, wage earned, hours worked, employer/job site, and payment status
- ⚡ **Quick Actions** — One-click buttons to mark Full Day, Half Day, or Absent for today
- 📋 **Work History** — View all past entries with search and filter by month, work type, and payment status; edit or delete any record
- 📊 **Earnings Report** — Monthly summary with total earned, work days, total hours, and paid vs. pending breakdown
- 🏦 **Loan Letter Generator** — Auto-generate a formal Income Certificate / Self-Declaration letter from your wage data for bank submissions
- 👤 **User Profile** — Manage personal details for better letter generation

---

## 🛠️ Tech Stack

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

**Frontend**
- Vanilla HTML, CSS, JavaScript
- Single-page application (`public/index.html`)

---

## 📁 Project Structure

```
Daily_Wage_Tracker/
├── server.js               # Entry point
├── package.json
├── .gitignore
├── middleware/
│   └── auth.js             # JWT auth middleware
├── models/
│   ├── User.js             # User schema
│   └── Entry.js            # Work entry schema
├── routes/
│   ├── auth.js             # Register / Login routes
│   └── entries.js          # CRUD routes for work entries
└── public/
    └── index.html          # Frontend SPA
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Daily_Wage_Tracker.git
cd Daily_Wage_Tracker

# 2. Install dependencies
npm install

# 3. Create a .env file in the root directory
touch .env
```

### Environment Variables

Add the following to your `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wage_tracker
JWT_SECRET=your_super_secret_key_here
```

### Run the App

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Open your browser and go to: **http://localhost:3000**

---

## 📱 How to Use

1. **Register** — Create an account with your full name, phone number, and password
2. **Add Entry** — Go to *Add Entry* and fill in your daily work details
3. **Dashboard** — See your current month's earnings and recent work entries at a glance
4. **History** — Browse all past entries; use filters to find specific records; edit or delete as needed
5. **Report** — Select a year and month to see a complete earnings breakdown
6. **Loan Letter** — Enter bank name, loan purpose, and amount → generate a printable income certificate

---

## 🏦 Loan Letter Feature

The **Income Certificate / Self-Declaration** letter is auto-filled with:

- Your name and recorded work data
- Income summary for the selected period (Last 1 / 3 / 6 Months)
- Total days worked, total earnings, and employer details

You can **Print / Save as PDF** or **Copy Text** to submit directly to your bank or lender.

---

## 🔒 Security

- Passwords are hashed using **bcrypt** before storage
- All protected routes require a valid **JWT token**
- Tokens are stored client-side and sent via `Authorization` headers

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create a new branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "Add: your feature description"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Vicky Kumar**  
- GitHub: [@your-username](https://github.com/your-username)

---

> 💡 *Built to empower daily wage workers with a simple tool to record their earnings and prove their income when it matters most.*
