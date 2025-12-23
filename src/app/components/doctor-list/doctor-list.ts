import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../service/doctor.service';
import { Doctor } from '../../model/doctor.model';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-list.html',
  styleUrls: ['./doctor-list.css']
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  loading = false;
  error: string | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.error = null;

    this.doctorService.getAll().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'Failed to load doctors';
      }
    });
  }

  remove(id: number): void {
    const ok = window.confirm('Are you sure you want to delete this doctor?');
    if (!ok) return;
  
    this.loading = true;
    this.error = null;
  
    this.doctorService.delete(id).subscribe({
      next: () => {
        alert('Deleted successfully ✅');
        this.loadDoctors();
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed ❌');
        this.loading = false;
      }
    });
  }
  
}
