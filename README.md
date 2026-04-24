# 🏥 Clinic Management System — Frontend

An **Angular** frontend application for managing clinic operations, built as part of the **DS2 Web Development** course. It connects to a Spring Boot backend via REST APIs and provides a full-featured admin interface for managing patients, doctors, appointments, and prescriptions.

> 👩‍💻 Developed by **Ghada Ben Salah**  
> 🏫 ESB School of Business — Business Computing

---

## 📋 About the Project

Managing a clinic manually is inefficient and error-prone. This application provides a clean, responsive admin interface that allows clinic staff to handle all operations in one place — from scheduling appointments to managing prescriptions — all connected to a live Spring Boot backend.

This project is the **frontend part** of a full-stack clinic management system:
- 🖥️ **This repo** — Angular Frontend (DS2)
- ⚙️ **Backend** — Spring Boot REST API (DS1)

---

## ✨ Features

- 👤 **Patient Management** — View, add, update, and delete patient records
- 🩺 **Doctor Management** — View, add, update, and delete doctor profiles
- 📅 **Appointment Scheduling** — Create and manage appointments between patients and doctors
- 💊 **Prescription Management** — Manage prescriptions linked to completed appointments
- 📊 **Dashboard** — Overview with statistics on doctors, patients, and appointments
- 🔀 **Routing** — Smooth navigation between views using Angular Router
- ✅ **Form Validation** — Reactive forms with error handling
- 📱 **Responsive UI** — Styled and adapted for different screen sizes

---

## 🛠️ Tech Stack

| Technology | Description |
|---|---|
| Angular | Frontend framework |
| TypeScript | Programming language |
| HTML / CSS | UI structure and styling |
| Angular Router | Navigation & routing |
| HttpClient | Frontend–Backend communication |
| Reactive Forms | Form handling & validation |

---

## 🗂️ Project Structure

```
src/app/
│
├── components/
│   ├── home/                   # Dashboard with statistics
│   ├── patient-list/           # Display all patients
│   ├── patient-form/           # Add / edit patient
│   ├── doctor-list/            # Display all doctors
│   ├── doctor-form/            # Add / edit doctor
│   ├── appointment-list/       # Display all appointments
│   ├── appointment-form/       # Schedule / edit appointment
│   ├── prescription-list/      # Display all prescriptions
│   └── prescription-form/      # Add / edit prescription
│
├── model/
│   ├── patient.model.ts        # Patient data interface
│   ├── doctor.model.ts         # Doctor data interface
│   ├── appointment.model.ts    # Appointment data interface
│   └── prescription.model.ts   # Prescription data interface
│
├── service/
│   ├── patient.service.ts      # Patient CRUD API calls
│   ├── doctor.service.ts       # Doctor CRUD API calls
│   ├── appointment.service.ts  # Appointment CRUD API calls
│   └── prescription.service.ts # Prescription CRUD API calls
│
├── app.routes.ts               # All route definitions
└── app.component.*             # Root component
```

> Structure strictly follows DS2 course requirements.

---

## 🔀 Routing & Navigation

| Route | Description |
|---|---|
| `/` | Home dashboard with statistics |
| `/patients` | List all patients |
| `/patients/new` | Add a new patient |
| `/patients/:id/edit` | Edit an existing patient |
| `/doctors` | List all doctors |
| `/doctors/new` | Add a new doctor |
| `/appointments` | List all appointments |
| `/appointments/new` | Schedule a new appointment |
| `/prescriptions` | List all prescriptions |
| `/prescriptions/new` | Add a new prescription |

Navigation is handled entirely using **Angular Router**.

---

## 🔗 Frontend–Backend Connection

The frontend communicates with the **Spring Boot backend** using Angular's `HttpClient`. Each entity (Patient, Doctor, Appointment, Prescription) has its own dedicated service implementing full **CRUD operations**.

Backend base URL is configured in the environment file:

```typescript
// src/environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:8081/api'
};
```

Make sure the backend is running on port `8081` before launching the frontend.

---

## 🚀 How to Run

### Prerequisites
- **Node.js** (v16 or higher)
- **Angular CLI** installed globally:
  ```bash
  npm install -g @angular/cli
  ```
- The **Spring Boot backend** running on `http://localhost:8081`

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/GhadaBenSalah8/clinic-management-frontend.git

# 2. Navigate into the project
cd clinic-management-frontend

# 3. Install dependencies
npm install

# 4. Start the development server
ng serve
```

Then open your browser at **http://localhost:4200**

---

## 🔮 Possible Future Improvements

- 🔐 Add authentication and role-based access (admin vs. doctor vs. patient)
- 🌙 Dark mode support
- 📤 Export reports to PDF
- 🔔 Real-time notifications for upcoming appointments
- 🧪 Add unit tests with Jasmine & Karma

---

## 👩‍💻 Author

| Name | GitHub | LinkedIn |
|---|---|---|
| Ghada Ben Salah | [@GhadaBenSalah8](https://github.com/GhadaBenSalah8) | [in/ghada-ben-salah](https://www.linkedin.com/in/ghada-ben-salah/) |
