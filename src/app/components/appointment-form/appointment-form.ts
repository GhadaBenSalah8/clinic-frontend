import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AppointmentService } from '../../service/appointment.service';
import { PatientService } from '../../service/patient.service';
import { DoctorService } from '../../service/doctor.service';
import { AppointmentStatus } from '../../model/appointment.model';

/* ✅ Custom validator */
function notInPast(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  if (!v) return null;

  const selected = new Date(v).getTime();
  const now = Date.now();

  return selected < now ? { pastDate: true } : null;
}

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.html',
  styleUrls: ['./appointment-form.css']
})
export class AppointmentFormComponent implements OnInit {
  loading = false;
  error: string | null = null;

  id: number | null = null;
  isEdit = false;

  patients: any[] = [];
  doctors: any[] = [];

  statuses: AppointmentStatus[] = ['SCHEDULED', 'COMPLETED', 'CANCELLED'];

  form;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      patientId: [null, [Validators.required]],
      doctorId: [null, [Validators.required]],
      dateTime: ['', [Validators.required, notInPast]], // ✅ validator applied
      reason: ['', [Validators.required, Validators.minLength(2)]],
      status: ['SCHEDULED' as AppointmentStatus, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
    }

    forkJoin({
      patients: this.patientService.getAll(),
      doctors: this.doctorService.getAll()
    }).subscribe({
      next: ({ patients, doctors }) => {
        this.patients = patients;
        this.doctors = doctors;

        if (this.isEdit && this.id) {
          this.loadAppointmentAndPatch(this.id);
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load patients/doctors';
      }
    });
  }

  private loadAppointmentAndPatch(id: number): void {
    this.appointmentService.getById(id).subscribe({
      next: (a) => {
        const dtLocal = (a.dateTime ?? '').slice(0, 16);

        this.form.patchValue({
          patientId: a.patientId ?? null,
          doctorId: a.doctorId ?? null,
          dateTime: dtLocal,
          reason: a.reason,
          status: a.status
        });
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load appointment';
      }
    });
  }

  private toJavaLocalDateTime(datetimeLocal: string): string {
    if (!datetimeLocal) return datetimeLocal;
    return datetimeLocal.length === 16 ? `${datetimeLocal}:00` : datetimeLocal;
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
      patientId: Number(v.patientId),
      doctorId: Number(v.doctorId),
      dateTime: this.toJavaLocalDateTime(String(v.dateTime)),
      reason: String(v.reason),
      status: v.status as AppointmentStatus
    };

    const request$ = this.isEdit && this.id
      ? this.appointmentService.update(this.id, payload)
      : this.appointmentService.create(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = this.isEdit
          ? 'Failed to update appointment'
          : 'Failed to create appointment';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/appointments']);
  }
}
