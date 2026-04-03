# 🚀 ProductHub — Product Management System

A full-stack **Product Management System** built with modern technologies. Features JWT-based authentication, full CRUD operations on products scoped per user, and a polished responsive UI.


![image alt](https://github.com/RagulGopal/Product-Management-System/blob/main/Screenshot%202026-04-03%20093427.png?raw=true)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [License](#license)

---

## 🛠️ Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Frontend   | React (Vite), React Router DOM, Axios   |
| Styling    | TailwindCSS v4                          |
| Backend    | Node.js, Express.js                     |
| Database   | PostgreSQL                              |
| ORM        | Prisma ORM                              |
| Auth       | JWT (jsonwebtoken) + bcrypt             |
| Env Config | dotenv                                  |

---

## 📁 Folder Structure

```
Product Management System/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── product.controller.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── product.routes.js
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SkeletonCard.jsx
│   │   │   ├── Spinner.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AddProductPage.jsx
│   │   │   ├── EditProductPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProductDashboard.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

---

## ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** v18+ → [Download](https://nodejs.org/)
- **PostgreSQL** v14+ → [Download](https://www.postgresql.org/download/)
- **npm** v9+ (comes with Node.js)
- **Prisma CLI** (installed as dev dependency)

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Product Management System"
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Configure Backend Environment

Create or edit `backend/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/productdb"
JWT_SECRET="your_super_secret_key"
PORT=5000
```

> ⚠️ Replace `user`, `password`, and `productdb` with your actual PostgreSQL credentials and database name.

### 4. Create Database & Run Migrations

```bash
# Make sure PostgreSQL is running, then:
npx prisma migrate dev --name init
```

### 5. Start Backend Server

```bash
npm run dev
```

The backend will run on **http://localhost:5000**.

### 6. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

### 7. Configure Frontend Environment

Create or edit `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 8. Start Frontend Dev Server

```bash
npm run dev
```

The frontend will run on **http://localhost:5173**.

---

## 📡 API Documentation

### Auth Routes

| Method | Endpoint             | Auth | Body                              | Response                          |
| ------ | -------------------- | ---- | --------------------------------- | --------------------------------- |
| POST   | `/api/auth/register` | ❌   | `{ name, email, password }`       | `201` — Success message           |
| POST   | `/api/auth/login`    | ❌   | `{ email, password }`             | `200` — `{ token, user }`         |

### Product Routes (Protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint              | Auth | Body                                    | Response                              |
| ------ | --------------------- | ---- | --------------------------------------- | ------------------------------------- |
| GET    | `/api/products`       | ✅   | —                                       | `200` — Array of user's products      |
| POST   | `/api/products`       | ✅   | `{ name, description, price, stock }`   | `201` — Created product               |
| GET    | `/api/products/:id`   | ✅   | —                                       | `200` — Single product                |
| PUT    | `/api/products/:id`   | ✅   | `{ name, description, price, stock }`   | `200` — Updated product               |
| DELETE | `/api/products/:id`   | ✅   | —                                       | `200` — Success message               |

### Error Response Format

All errors return structured JSON:

```json
{
  "message": "Descriptive error message"
}
```

### HTTP Status Codes

| Code | Meaning             |
| ---- | ------------------- |
| 200  | OK                  |
| 201  | Created             |
| 400  | Bad Request         |
| 401  | Unauthorized        |
| 403  | Forbidden           |
| 404  | Not Found           |
| 500  | Internal Server Error |

---

## 📸 Screenshots

> Screenshots will be added here after the application is running.

| Page              | Preview |
| ----------------- | ------- |
| Login Page        | —       |
| Register Page     | —       |
| Product Dashboard | —       |
| Add Product       | —       |
| Edit Product      | —       |

---

**Built with ❤️ using React, Express, Prisma, and PostgreSQL.**
