# 🛍️ ShopNest — Full-Stack E-Commerce Application

A complete, production-style e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). Features full authentication, product management, cart & wishlist, checkout with real payment integration, order tracking, and an admin dashboard.

🔗 **Live Demo:** https://shopnest-sandy.vercel.app/

🔗 **Backend API:** [https://shopnest-backendnode-server-js.onrender.com](https://shopnest-backendnode-server-js.onrender.com)

---

## ✨ Features

### User Features
- User registration & login with JWT authentication
- Browse products with category filters and search
- Product detail pages with reviews & ratings
- Shopping cart with quantity management
- Wishlist
- Checkout with shipping address
- Razorpay payment integration
- Order history / order tracking

## 🧰 Tools & Platforms Used

- **Code Editor:** VS Code
- **API Testing:** Postman
- **Database Hosting:** MongoDB Atlas
- **Version Control:** Git & GitHub
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Payment Gateway:** Razorpay

### Admin Features
- Admin-only product management (add / edit / delete)
- Order management with status updates (Pending → Processing → Shipped → Delivered)
- Role-based access control

---

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS, Axios, Context API  
**Backend:** Node.js, Express.js, JWT, bcrypt.js  
**Database:** MongoDB Atlas, Mongoose  
**Payments:** Razorpay  
**Deployment:** Vercel (frontend), Render (backend)

---

## 📁 Project Structure

shopnest/
├── frontend/ # React + Tailwind CSS
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ └── services/
│
├── backend/ # Node.js + Express
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js


---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Razorpay account (test mode)

### Backend Setup
```bash
cd backend
npm install
# create a .env file with MONGO_URI, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, PORT
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Key Learnings

Building ShopNest involved implementing a complete authentication flow with JWT and bcrypt, designing RESTful APIs following the MVC pattern, managing global state with React Context API, integrating a real payment gateway, and deploying a full-stack application to production.

---

## 👩‍💻 Author

Built by Priya
