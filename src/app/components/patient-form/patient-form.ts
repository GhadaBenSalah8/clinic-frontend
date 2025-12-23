import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrls: ['./patient-form.css']
})
export class PatientFormComponent implements OnInit {

  loading = false;
  error: string | null = null;
  form;

  id: number | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;

      this.patientService.getById(this.id).subscribe({
        next: (p) => this.form.patchValue(p),
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load patient';
        }
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const payload = this.form.value as any;

    const request$ = this.isEdit && this.id
      ? this.patientService.update(this.id, payload)
      : this.patientService.create(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/patients']);
      },
      error: (err) => {
        this.loading = false;
        this.error = this.isEdit ? 'Failed to update patient' : 'Failed to create patient';
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/patients']);
  }
}
