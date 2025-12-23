import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PrescriptionService } from '../../service/prescription.service';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-prescription-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prescription-list.html',
  styleUrls: ['./prescription-list.css'],
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: any[] = [];
  loading = false;
  error: string | null = null;

  // appointmentId -> label
  appointmentsMap: Record<number, string> = {};

  constructor(
    private prescriptionService: PrescriptionService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadAppointmentsLookup();
    this.load();
  }

  private loadAppointmentsLookup(): void {
    this.appointmentService.getAll().subscribe({
      next: (apps: any[]) => {
        this.appointmentsMap = Object.fromEntries(
          apps.map(a => [
            a.id,
            `${(a.dateTime ?? '').slice(0, 16).replace('T', ' ')} - ${a.reason ?? ''}`.trim()
          ])
        );
      },
      error: (err) => console.error(err),
    });
  }

  appointmentLabel(id: number | null | undefined): string {
    if (!id) return '-';
    return this.appointmentsMap[id] ?? `#${id}`;
  }

  load(): void {
    this.loading = true;
    this.error = null;

    this.prescriptionService.getAll().subscribe({
      next: (data) => {
        this.prescriptions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'Failed to load prescriptions';
      },
    });
  }

  remove(id: number): void {
    const ok = window.confirm('Are you sure you want to delete this prescription?');
    if (!ok) return;
  
    this.loading = true;
    this.error = null;
  
    this.prescriptionService.delete(id).subscribe({
      next: () => {
        alert('Deleted successfully ✅');
        this.load();
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed ❌');
        this.loading = false;
      }
    });
  }
  
}
