# Skill Bridge Backend

Skill Bridge is a Tutor Booking Platform backend API built with Node.js, Express, TypeScript, Prisma, and PostgreSQL. JWT is used for authentication.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken + bcryptjs)

---

## Project Structure

```
skill-bridge-backend/
├── prisma/
│   ├── schema/
│   │   ├── schema.prisma
│   │   ├── users.prisma
│   │   ├── tutorProfiles.prisma
│   │   ├── tutorSubjects.prisma
│   │   ├── availability.prisma
│   │   ├── bookings.prisma
│   │   ├── reviews.prisma
│   │   └── categories.prisma
│   └── migrations/
├── generated/                    # Prisma generated client
├── dist/                         # Compiled JS output
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── lib/
│   │   ├── auth.ts               # JWT sign/verify utility
│   │   ├── prisma.ts             # Prisma client
│   │   └── middlewares/
│   │       ├── auth.ts           # JWT auth middleware
│   │       ├── globalErrorHandeler.ts
│   │       └── notFound.ts
│   ├── modules/
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── tutor/
│   │   ├── tutors/
│   │   ├── tutorSubject/
│   │   ├── availability/
│   │   ├── booking/
│   │   ├── review/
│   │   ├── category/
│   │   └── student profile/
│   ├── helpers/
│   └── scripts/
├── .env
├── .gitignore
├── .babelrc
├── babel.config.ts
├── prisma.config.ts
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd skill-bridge-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
APP_URL=http://localhost:3000
PORT=5000
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5. Start the server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## Authentication

This project uses JWT (JSON Web Token) for authentication.

### How it works

1. User registers or logs in and receives a **JWT token**
2. Every protected request must include the token in the header:

```
Authorization: Bearer <token>
```

### User Roles

| Role | Description |
|------|-------------|
| `STUDENT` | Can browse tutors and make bookings |
| `TUTOR` | Can manage profile, availability, and sessions |
| `ADMIN` | Can manage all users, bookings, and categories |

---

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and receive token | ❌ |
| GET | `/api/auth/me` | Get current user info | ✅ |

#### Register Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "phone": "01700000000",
  "role": "STUDENT",
  "image": "https://example.com/image.jpg"
}
```

#### Login Request Body
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login Response
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "STUDENT",
      "status": "ACTIVE",
      "image": null,
      "phone": null
    }
  }
}
```

---

### Admin — `/admin`

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/admin/users` | Get all users | ADMIN |
| PATCH | `/admin/user/:id/status` | Ban or activate a user | ADMIN |
| GET | `/admin/bookings` | Get all bookings | ADMIN |
| GET | `/admin/categories` | Get all categories | ADMIN |
| POST | `/admin/category` | Create a new category | ADMIN |
| DELETE | `/admin/category/:id` | Delete a category | ADMIN |

---

### Tutor — `/tutor`

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/tutor/profile` | Create or update tutor profile | TUTOR |
| POST | `/tutor/availability` | Add availability slot | TUTOR |
| GET | `/tutor/sessions` | Get own sessions | TUTOR |
| GET | `/tutor/tutor/:tutorId/category/:categoryId/reviews` | Get reviews by category | TUTOR |

---

### All Tutors — `/allTutors` (Public)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/allTutors` | Get all tutors with filters | ❌ |
| GET | `/allTutors/:id` | Get a single tutor profile | ❌ |
| GET | `/allTutors/featured/tutor` | Get featured tutors | ❌ |

#### Query Parameters (GET `/allTutors`)
```
?categoryId=xxx
?minRating=4
?maxRate=500
```

---

### Tutor Subject — `/tutorSubject`

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/tutorSubject/subjects` | Add subjects to tutor | TUTOR |
| GET | `/tutorSubject/tutor/:userId/subjects` | Get tutor subjects | TUTOR |

---

### Availability — `/slot`

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/slot/availability` | Create availability slot | TUTOR |
| GET | `/slot/availability` | Get availability slots | TUTOR |

---

### Booking — `/booking`

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/booking` | Create a booking | STUDENT |
| GET | `/booking/my-booking` | Get own bookings | ALL |
| GET | `/booking/student` | Get student bookings | ALL |
| GET | `/booking/tutor` | Get tutor bookings | ALL |
| PATCH | `/booking/status` | Update booking status | ALL |
| PATCH | `/booking/attend/:bookingId` | Mark session as attended | STUDENT |

---

### Review — `/review`

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/review` | Submit a review | STUDENT |
| PATCH | `/review/:reviewId` | Update a review | STUDENT |
| GET | `/review/tutor/:tutorId/:categoryId/reviews` | Get reviews by category | TUTOR |
| GET | `/review/tutor/:tutorId` | Get all tutor reviews | ❌ |
| GET | `/review/student-review` | Get student reviews | ❌ |
| GET | `/review/:id` | Get a single review | ❌ |

---

### Category — `/category`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/category` | Get all categories | ❌ |

---

## Response Format

#### Success
```json
{
  "success": true,
  "data": {}
}
```

#### Error
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Database Models

| Model | Description |
|-------|-------------|
| `User` | All users (STUDENT, TUTOR, ADMIN) |
| `TutorProfile` | Detailed tutor profile info |
| `TutorSubject` | Subjects a tutor teaches |
| `Availability` | Tutor available time slots |
| `Booking` | Student bookings |
| `Review` | Student reviews |
| `Category` | Subject categories |