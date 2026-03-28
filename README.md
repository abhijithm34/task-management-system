## TaskFlow - MERN Task Management System

TaskFlow is a full-stack task management system built with the MERN stack. It provides JWT-based authentication, per-user task boards, and a clean SaaS-style dashboard UI.

### Tech stack

- MongoDB
- Express.js
- React.js
- Node.js
- JWT for authentication
- bcrypt for password hashing
- Axios for API calls
- React Router for navigation
- Tailwind CSS for styling

### Project structure

- `backend/` – Express API, MongoDB models, auth, and task routes
- `frontend/` – React + Vite + Tailwind SPA

### Backend setup

1. In `backend/`, create a `.env` file:

   ```bash
   MONGO_URI=mongodb://localhost:27017/taskflow
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

2. Install dependencies and start the API:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   The API will run on `http://localhost:5000`.

### Frontend setup

1. Install dependencies and start the dev server:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. By default the frontend points to `http://localhost:5000/api`. To change this, update `VITE_API_BASE_URL` in a `.env` file in `frontend/`:

   ```bash
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

#### Core features

- User registration and login with JWT
- Protected task routes (users can only access their own tasks)
- Create, view, update, and delete tasks
- Update task status (Pending, In Progress, Completed)
- Filter and sort tasks by status, priority, and deadline
- Dashboard with summary cards and a kanban-style layout

