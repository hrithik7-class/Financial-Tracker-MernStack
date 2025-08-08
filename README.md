# Finance Tracker

A full-stack finance tracking application built with React, Redux, Vite (frontend) and Express, MongoDB (backend).

## Features
- User authentication (signup, login, protected routes)
- Add, view, and manage financial transactions
- Analytics dashboard with Transactions (income/expense by month)
- Responsive UI with Tailwind CSS
- JWT-based authentication

## Project Structure

```
financetracker/
├── backend/
│   ├── controllers/        # Express route controllers
│   ├── db/                # Database connection
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose models
│   ├── router/            # Express routers
│   └── index.js           # Main server file
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── feature/       # Redux slices & APIs
│   │   ├── lib/           # Axios config
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   └── App.jsx        # Main app
│   ├── index.html         # App entry
│   └── package.json       # Frontend dependencies
├── package.json           # Project root
```

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to `backend` folder:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```
4. Start the backend server:
   ```powershell
   npm start
   ```

### Frontend Setup
1. Navigate to `frontend` folder:
   ```powershell
   cd ../frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend dev server:
   ```powershell
   npm run dev
   ```

## Usage
- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Register a new account, login, and start tracking your finances!

## Technologies Used
- **Frontend:** React, Redux Toolkit, Vite, Tailwind CSS, Axios, Recharts
- **Backend:** Express, MongoDB, Mongoose, JWT, dotenv, cookie-parser, cors

## License
MIT

---
Feel free to contribute or raise issues!
