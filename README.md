Clinic Management System – Frontend (Angular)
* Project Overview

This project is the frontend part of the Clinic Management System developed during DS2 – Web Development (Frontend Angular).

It is built with Angular and consumes the Spring Boot REST API developed in DS1.
The application allows clinic administrators to manage:

Patients

Doctors

Appointments

Prescriptions

through a modern, intuitive dashboard.

 * Technologies Used

Angular

TypeScript

HTML / CSS

Angular Router

HttpClient

Reactive Forms
Routing & Navigation

The application uses Angular Router to navigate between views:

Route	Description
/	Home dashboard
/patients	List patients
/patients/new	Add patient
/patients/:id/edit	Edit patient
/doctors	List doctors
/appointments	List appointments
/prescriptions	List prescriptions
Backend Connection

The frontend communicates with the Spring Boot backend via REST APIs.

API base URL is configured in:

src/environments/environment.ts

export const environment = {
  apiUrl: 'http://localhost:8081/api'
};


Each entity has its own Angular service using HttpClient to perform CRUD operations.
