import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../service/doctor.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-form.html',
  styleUrls: ['./doctor-form.css']
})
export class DoctorFormComponent implements OnInit {
  loading = false;
  error: string | null = null;

  id: number | null = null;
  isEdit = false;

  form;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      specialty: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;

      this.doctorService.getById(this.id).subscribe({
        next: (d) => this.form.patchValue(d),
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load doctor';
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
      ? this.doctorService.update(this.id, payload)
      : this.doctorService.create(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/doctors']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = this.isEdit ? 'Failed to update doctor' : 'Failed to create doctor';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/doctors']);
  }
}
