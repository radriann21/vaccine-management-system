export interface Ambulatory {
  id: string;
  nombre: string;
  ubicacion: string;
  responsable?: string;
  telefono?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateAmbulatoryDTO {
  nombre: string;
  ubicacion: string;
  responsable?: string;
  telefono?: string;
}

export interface UpdateAmbulatoryDTO {
  nombre?: string;
  ubicacion?: string;
  responsable?: string;
  telefono?: string;
}
