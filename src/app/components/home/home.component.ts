import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import { DoctorService } from '../../service/doctor.service';
import { PatientService } from '../../service/patient.service';
import { AppointmentService } from '../../service/appointment.service';

type TabKey = 'overview' | 'branches';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  clinicName = 'Northstar Clinic';
  roleLabel = 'Admin';

  activeTab: TabKey = 'overview';

  loading = false;
  error: string | null = null;

  doctorsCount = 0;
  patientsCount = 0;
  appointmentsCount = 0;

  // Branches list for the "Branches" tab
  branches = [
    { name: 'General Medicine', desc: 'Primary care for adults and children.' },
    { name: 'Pediatrics', desc: 'Healthcare for infants, children, and adolescents.' },
    { name: 'Cardiology', desc: 'Heart and vascular health.' },
    { name: 'Dermatology', desc: 'Skin, hair, and nail care.' },
    { name: 'Orthopedics', desc: 'Bones, joints, and muscles.' },
    { name: 'Gynecology & Obstetrics', desc: 'Women’s health and pregnancy care.' },
    { name: 'Neurology', desc: 'Brain, nerve, and spinal health.' },
    { name: 'ENT (Ear, Nose, Throat)', desc: 'Specialized care for ENT issues.' },
    { name: 'Ophthalmology', desc: 'Eye health and vision care.' },
    { name: 'Dental', desc: 'Oral health and dental treatments.' },
    { name: 'Radiology', desc: 'Imaging services like X-rays, CT scans, and ultrasounds.' },
    { name: 'Laboratory', desc: 'Blood tests, urine tests, and other diagnostics.' },
    { name: 'Physiotherapy', desc: 'Rehabilitation and physical therapy.' },
  ];

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      doctors: this.doctorService.getAll(),
      patients: this.patientService.getAll(),
      appointments: this.appointmentService.getAll(),
    }).subscribe({
      next: ({ doctors, patients, appointments }) => {
        this.doctorsCount = (doctors ?? []).length;
        this.patientsCount = (patients ?? []).length;
        this.appointmentsCount = (appointments ?? []).length;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'Failed to load dashboard data';
      },
    });
  }

  setTab(tab: TabKey) {
    this.activeTab = tab;
  }
}
