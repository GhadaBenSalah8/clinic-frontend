import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PatientListComponent } from './components/patient-list/patient-list';
import { PatientFormComponent } from './components/patient-form/patient-form';
import { DoctorListComponent } from './components/doctor-list/doctor-list';
import { DoctorFormComponent } from './components/doctor-form/doctor-form';
import { AppointmentListComponent } from './components/appointment-list/appointment-list';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form';
import { PrescriptionListComponent } from './components/prescription-list/prescription-list';
import { PrescriptionFormComponent } from './components/prescription-form/prescription-form';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // next: patients, doctors, appointments, prescriptions
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/new', component: PatientFormComponent },
  { path: 'patients/:id/edit', component: PatientFormComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/new', component: DoctorFormComponent },
  { path: 'doctors/:id/edit', component: DoctorFormComponent },
  { path: 'appointments', component: AppointmentListComponent },
{ path: 'appointments/new', component: AppointmentFormComponent },
{ path: 'appointments/:id/edit', component: AppointmentFormComponent },
{ path: 'prescriptions', component: PrescriptionListComponent },
{ path: 'prescriptions/new', component: PrescriptionFormComponent },
{ path: 'prescriptions/:id/edit', component: PrescriptionFormComponent },


];
