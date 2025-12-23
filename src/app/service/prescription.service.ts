import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Prescription } from '../model/prescription.model';

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private apiUrl = `${environment.apiUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.apiUrl);
  }

  getById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${id}`);
  }

  create(payload: { medicine: string; dosage: string; appointmentId: number }): Observable<Prescription> {
    return this.http.post<Prescription>(this.apiUrl, payload);
  }

  update(id: number, payload: Partial<{ medicine: string; dosage: string; appointmentId: number }>): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
