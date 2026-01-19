export interface Lote {
  id: string;
  fk_vacunas: string;
  codigo_lote: string;
  fecha_vencimiento: string;
  cantidad_total: number;
  stock_actual: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateLoteDTO {
  fk_vacunas: string;
  codigo_lote: string;
  fecha_vencimiento: string;
  cantidad_total: number;
  stock_actual: number;
}

export interface UpdateLoteDTO {
  fk_vacunas?: string;
  codigo_lote?: string;
  fecha_vencimiento?: string;
  cantidad_total?: number;
  stock_actual?: number;
}
