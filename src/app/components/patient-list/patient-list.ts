import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../model/patient.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  loading = false;
  error: string | null = null;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    this.error = null;

    this.patientService.getAll().subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load patients';
        console.error(err);
      }
    });
  }

  remove(id: number): void {
    const ok = window.confirm('Are you sure you want to delete this patient?');
    if (!ok) return;

    this.loading = true;
    this.error = null;

    this.patientService.delete(id).subscribe({
      next: () => {
        alert('Deleted successfully ✅');
        this.loadPatients(); // reload list
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed ❌');
        this.loading = false;
      }
    });
  }
}
