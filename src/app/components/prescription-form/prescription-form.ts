import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin, of } from 'rxjs';

import { PrescriptionService } from '../../service/prescription.service';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-prescription-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prescription-form.html',
  styleUrls: ['./prescription-form.css'],
})
export class PrescriptionFormComponent implements OnInit {
  loading = false;
  error: string | null = null;

  id: number | null = null;
  isEdit = false;

  appointments: any[] = [];

  form;

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      appointmentId: [null as any, [Validators.required]],
      medicine: ['', [Validators.required, Validators.minLength(2)]],
      dosage: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
    }

    this.loading = true;
    this.error = null;

    // If create: just load completed appointments
    if (!this.isEdit || !this.id) {
      this.loadCompletedAppointments();
      return;
    }

    // If edit: load completed appointments + prescription
    forkJoin({
      apps: this.appointmentService.getCompletedForPrescriptions(),
      pres: this.prescriptionService.getById(this.id),
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: ({ apps, pres }) => {
          this.appointments = this.sortAppointments(apps ?? []);

          const selectedId = pres.appointmentId ?? null;

          // Patch form
          this.form.patchValue({
            appointmentId: selectedId,
            medicine: pres.medicine ?? '',
            dosage: pres.dosage ?? '',
          });

          // If the selected appointment is NOT in completed list, add it (edge case)
          if (selectedId && !this.appointments.some(a => a.id === selectedId)) {
            this.appointmentService.getById(Number(selectedId)).subscribe({
              next: (a) => {
                this.appointments = this.sortAppointments([a, ...this.appointments]);
              },
              error: () => {
                // ignore, but the select might remain empty
              }
            });
          }
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load prescription or appointments';
        },
      });
  }

  private loadCompletedAppointments(): void {
    this.appointmentService
      .getCompletedForPrescriptions()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (apps) => {
          this.appointments = this.sortAppointments(apps ?? []);
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load completed appointments';
        },
      });
  }

  private sortAppointments(apps: any[]): any[] {
    return (apps ?? []).sort((a: any, b: any) => {
      const da = new Date(a.dateTime ?? 0).getTime();
      const db = new Date(b.dateTime ?? 0).getTime();
      return db - da;
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const v = this.form.value;

    const payload = {
      appointmentId: Number(v.appointmentId),
      medicine: String(v.medicine),
      dosage: String(v.dosage),
    };

    const req$ =
      this.isEdit && this.id
        ? this.prescriptionService.update(this.id, payload)
        : this.prescriptionService.create(payload);

    req$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.router.navigate(['/prescriptions']),
        error: (err) => {
          console.error(err);

          // If backend rejects because appointment is not COMPLETED
          if (err?.status === 400) {
            this.error = typeof err?.error === 'string'
              ? err.error
              : 'Only COMPLETED appointments can have prescriptions';
            return;
          }

          this.error = this.isEdit
            ? 'Failed to update prescription'
            : 'Failed to create prescription';
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/prescriptions']);
  }

  formatDateTime(dt: string): string {
    if (!dt) return '';
    return dt.slice(0, 16).replace('T', ' ');
  }

  appointmentLabel(a: any): string {
    const date = this.formatDateTime(a?.dateTime ?? '');
    const reason = a?.reason ?? '';
    return `#${a?.id ?? ''} — ${date}${reason ? ' — ' + reason : ''}`.trim();
  }
}
