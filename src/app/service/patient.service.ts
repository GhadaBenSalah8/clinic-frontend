import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../model/patient.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }
  create(patient: Patient) {
    return this.http.post<Patient>(this.apiUrl, patient);
  }
  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  update(id: number, patient: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, patient);
  }
      
}
