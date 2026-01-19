export interface Vaccine {
  id: string;
  nombre: string;
  tipo: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateVaccineDTO {
  nombre: string;
  tipo: string;
}

export interface UpdateVaccineDTO {
  nombre?: string;
  tipo?: string;
}
