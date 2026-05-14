# 💼 Daily Wage Tracker

### *Daily Earnings Record — Built for Daily Wage Workers*

A full-stack web application that helps daily wage workers track their daily earnings, manage work history, monitor payment status, and generate income certificates for loan applications — backed by a persistent MongoDB database.

🌐 **Live Demo:** https://daily-wage-tracker-1.onrender.com

---

# 📸 Screenshots

## 🔐 Login / Register
![Login](login.png)

## 🏠 Dashboard
![Dashboard](DashBoard.png)

## ➕ Add Work Entry
![Data Entry 1](Data_Entry1.png)
![Data Entry 2](Data_Entry2.png)

## 📋 Work History
![Edit History](Edit_History.png)

## 📊 Earnings Report
![Track Report](Track_Report.png)

## 🏦 Loan Letter Generator
![Loan](Loan.png)
![Loan Application](Loan_Application.png)

---

# ✨ Features

- 🔐 Secure Login & Registration using JWT Authentication
- 💾 Persistent MongoDB Storage
- ➕ Add Daily Work Entries
- 💰 Payment Status Tracking (Paid / Pending / Partial)
- ⚡ Quick Daily Entry Actions
- 📋 Searchable & Editable Work History
- 📊 Monthly & Yearly Earnings Reports
- 🏦 Auto-Generated Loan Income Certificates
- 👤 Worker Profile Management
- 📱 Mobile Friendly Responsive Design

---

# 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Backend | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| Frontend | HTML, CSS, JavaScript |
| Hosting | Render |

---

# 📁 Project Structure

```bash
Daily_Wage_Tracker/
├── server.js
├── package.json
├── models/
│   ├── User.js
│   └── Entry.js
├── routes/
│   ├── auth.js
│   └── entries.js
├── middleware/
│   └── auth.js
├── public/
│   └── index.html
└── .env
