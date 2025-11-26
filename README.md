# TGlobal Patient Management API

A comprehensive NestJS backend API for managing patients and their consultation notes, built with Prisma ORM and PostgreSQL.

## Features

- **Full CRUD Operations** for Patients and Consultation Notes
- **PostgreSQL Database** with Prisma ORM
- **Comprehensive Swagger Documentation** at `/api`
- **Input Validation** using class-validator
- **RESTful API Design**
- **Cascade Deletion** - Deleting a patient removes all their consultation notes

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure your database:
   - Update the `DATABASE_URL` in `.env` file with your PostgreSQL connection string
   - Default: `postgresql://postgres:password@localhost:5432/tglobal?schema=public`

3. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

4. (Optional) Generate Prisma Client:
```bash
npx prisma generate
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Documentation

Once the application is running, access the Swagger documentation at:
```
http://localhost:3000/api
```

## API Endpoints

### Patients

- `POST /patients` - Create a new patient
- `GET /patients` - Get all patients (optional query: `?status=all|pending|past`)
- `GET /patients/:id` - Get a specific patient by ID
- `PATCH /patients/:id` - Update a patient
- `DELETE /patients/:id` - Delete a patient (cascades to consultation notes)

### Consultation Notes

- `POST /consultation-notes` - Create a new consultation note
- `GET /consultation-notes` - Get all consultation notes (optional query: `?patientId=uuid`)
- `GET /consultation-notes/patient/:patientId` - Get all notes for a specific patient
- `GET /consultation-notes/:id` - Get a specific consultation note by ID
- `PATCH /consultation-notes/:id` - Update a consultation note
- `DELETE /consultation-notes/:id` - Delete a consultation note

## Database Schema

### Patient
- id (UUID)
- name (String)
- gender (String)
- age (Integer)
- avatar (String - URL)
- status (String - all|pending|past)
- phone (String)
- email (String - unique)
- lastAppointment (String)
- upcomingAppointment (String)
- consultationNotes (Relation)

### ConsultationNote
- id (UUID)
- title (String)
- description (Text)
- date (String)
- patientId (UUID - Foreign Key)
- patient (Relation)

## Project Structure

```
src/
├── main.ts                          # Application entry point
├── app.module.ts                    # Root module
├── prisma/                          # Prisma service
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── patients/                        # Patients module
│   ├── patients.module.ts
│   ├── patients.controller.ts
│   ├── patients.service.ts
│   └── dto/
│       ├── create-patient.dto.ts
│       └── update-patient.dto.ts
└── consultation-notes/              # Consultation Notes module
    ├── consultation-notes.module.ts
    ├── consultation-notes.controller.ts
    ├── consultation-notes.service.ts
    └── dto/
        ├── create-consultation-note.dto.ts
        └── update-consultation-note.dto.ts
```

## Development Commands

```bash
# Run in development mode with hot reload
npm run start:dev

# Build for production
npm run build

# Run tests
npm run test

# Format code
npm run format

# Lint code
npm run lint

# Prisma Studio (Database GUI)
npx prisma studio
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tglobal?schema=public"
PORT=3000
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **Swagger/OpenAPI** - API documentation
- **class-validator** - DTO validation
- **TypeScript** - Type-safe development

## License

UNLICENSED
