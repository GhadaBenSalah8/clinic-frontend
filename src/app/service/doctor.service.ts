import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Doctor } from '../model/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  create(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, doctor);
  }

  update(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
