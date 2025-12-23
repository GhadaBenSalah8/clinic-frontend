export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface AppointmentPayload {
  dateTime: string;     // "YYYY-MM-DDTHH:mm:ss"
  reason: string;
  doctorId: number;
  patientId: number;
  status?: AppointmentStatus; // only needed on update
}
