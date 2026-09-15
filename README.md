# FitCircle — Fitness Community Platform

## Stack
- Frontend: React + Vite + React Router + Axios + Bootstrap
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT + bcryptjs

## Features
- Member, trainer and admin role model
- Registration/login
- Category-based community feed
- Create and like posts
- Comments API
- Workout CRUD
- Member and trainer management APIs
- Notifications for post interactions
- Protected REST APIs

## Requirements
- Node.js 18+
- MongoDB Community Server or MongoDB Atlas
- VS Code

## Run
### 1. Backend
```bash
cd server
npm install
copy .env.example .env
# Edit .env and set MONGO_URI and JWT_SECRET
npm run dev
```

### 2. Frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown in the terminal, normally http://localhost:5173.

## Important
The public registration flow creates only member or trainer accounts. An admin should be created manually in MongoDB by changing a trusted user's `role` to `admin` for demonstration.

## Suggested demo sequence
1. Register a member.
2. Register a trainer in a second browser/account.
3. Add a workout.
4. Create posts in different categories.
5. Filter the feed by category.
6. Like a post and show the notification API.
7. Show member/trainer pages.
8. Demonstrate login failure with an incorrect password.
