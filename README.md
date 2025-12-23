Clinic Management Frontend
1. Project Overview

This Angular application is the frontend part of the Clinic Management System developed during DS2 Web Development (Frontend Angular).

It communicates with the Spring Boot backend (DS1) via REST APIs and allows a clinic administrator to manage all clinic operations through an intuitive user interface.

Features

View, add, update, and delete Patients

View, add, update, and delete Doctors

Schedule and manage Appointments

Manage Prescriptions linked to completed appointments

Dashboard with statistics (Doctors / Patients / Appointments)

Navigation between views using Angular Router

Form validation and error handling

Responsive and styled UI

* Technologies Used
Technology	Description
Angular	Frontend framework
TypeScript	Programming language
HTML / CSS	UI structure and styling
Angular Router	Navigation & routing
HttpClient	Front–Back communication
Reactive Forms	Form handling & validation
 3. Project Structure 
src/app/
├── components/
│   ├── home/
│   ├── patient-list/
│   ├── patient-form/
│   ├── doctor-list/
│   ├── doctor-form/
│   ├── appointment-list/
│   ├── appointment-form/
│   ├── prescription-list/
│   └── prescription-form/
│
├── model/
│   ├── patient.model.ts
│   ├── doctor.model.ts
│   ├── appointment.model.ts
│   └── prescription.model.ts
│
├── service/
│   ├── patient.service.ts
│   ├── doctor.service.ts
│   ├── appointment.service.ts
│   └── prescription.service.ts
│
├── app.routes.ts
└── app.component.*


this structure strictly follows DS2 requirements

 4. Routing & Navigation
Route	Description
/	Home dashboard
/patients	List patients
/patients/new	Add patient
/patients/:id/edit	Edit patient
/doctors	List doctors
/appointments	List appointments
/prescriptions	List prescriptions

Navigation is handled using Angular Router.

 5. Front–Back Connection

The frontend communicates with the Spring Boot backend using HttpClient.

Backend base URL configuration:

//in src/environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:8081/api'
};


Each entity has its own Angular service implementing full CRUD operations.

Author
Ghada Ben Salah
Student | Full-Stack Developer
