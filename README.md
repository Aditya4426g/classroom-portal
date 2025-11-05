# Classroom Portal

A full-stack classroom management system built with React and Node.js.

## 🚀 Live Demo

**[View Live Application](https://profound-fox-28e1a3.netlify.app/login)**

- **Frontend:** https://profound-fox-28e1a3.netlify.app
- **Backend API:** https://classroom-portal-9g8k.onrender.com

## Features

- User authentication (Students, Teachers, Admins)
- Class management
- Assignment creation and submission
- File uploads
- Analytics dashboard
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- MongoDB connection string

### Setup

1. Clone the repository:

```bash
git clone https://github.com/Aditya4426g/classroom-portal.git
cd classroom-portal
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies:

```bash
cd ../client
npm install
```

4. Create environment file:

```bash
cd ../server
cp .env.example .env
```

5. Update `.env` with your MongoDB connection string and JWT secret.

6. Start the development servers:

**Terminal 1 (Server):**

```bash
cd server
npm start
```

**Terminal 2 (Client):**

```bash
cd client
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## License

MIT License
