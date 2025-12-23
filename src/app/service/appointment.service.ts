import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AppointmentPayload } from '../model/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/appointments`;
  private prescriptionsUrl = `${environment.apiUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ NEW: only COMPLETED appointments (for prescription dropdown)
  getCompletedForPrescriptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.prescriptionsUrl}/completed-appointments`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(payload: AppointmentPayload): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  update(id: number, payload: Partial<AppointmentPayload>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
