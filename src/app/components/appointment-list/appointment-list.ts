import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AppointmentService } from '../../service/appointment.service';
import { PatientService } from '../../service/patient.service';
import { DoctorService } from '../../service/doctor.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  loading = false;
  error: string | null = null;

  patientsMap: Record<number, string> = {};
  doctorsMap: Record<number, string> = {};

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.loadLookups();
    this.loadAppointments();
  }

  private loadLookups(): void {
    this.patientService.getAll().subscribe({
      next: (ps: any[]) => {
        this.patientsMap = Object.fromEntries(
          ps.map((p) => [p.id, `${p.firstName} ${p.lastName}`])
        );
      },
      error: (err) => console.error('Failed to load patients lookup', err)
    });

    this.doctorService.getAll().subscribe({
      next: (ds: any[]) => {
        this.doctorsMap = Object.fromEntries(
          ds.map((d) => [d.id, `${d.firstName} ${d.lastName}`])
        );
      },
      error: (err) => console.error('Failed to load doctors lookup', err)
    });
  }

  loadAppointments(): void {
    this.loading = true;
    this.error = null;

    this.appointmentService.getAll().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'Failed to load appointments';
      }
    });
  }

  remove(id: number): void {
    const ok = window.confirm('Are you sure you want to delete this appointment?');
    if (!ok) return;
  
    this.loading = true;
    this.error = null;
  
    this.appointmentService.delete(id).subscribe({
      next: () => {
        alert('Deleted successfully ✅');
        this.loadAppointments();
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed ❌');
        this.loading = false;
      }
    });
  }  

  formatDateTime(value: string): string {
    return value?.replace('T', ' ')?.slice(0, 16) ?? '';
  }

  patientName(id: number | null | undefined): string {
    if (!id) return '-';
    return this.patientsMap[id] ?? `#${id}`;
  }

  doctorName(id: number | null | undefined): string {
    if (!id) return '-';
    return this.doctorsMap[id] ?? `#${id}`;
  }
}
