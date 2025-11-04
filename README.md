# Classroom Portal

A full-stack classroom management system built with React and Node.js.

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

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. Deploy!

### Deploy to Netlify + Railway

**Frontend (Netlify):**
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to Netlify

**Backend (Railway):**
1. Connect your GitHub repo to Railway
2. Set environment variables
3. Deploy the server folder

## Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=production
```

## License

MIT License