export interface Transfer {
  id: string;
  fk_lote: string;
  fk_origen: string;
  fk_destino: string;
  cantidad: number;
  fecha_traslado: string;
  created_at?: string;
  updated_at?: string;
}

export interface TransferWithDetails extends Transfer {
  lote?: {
    codigo_lote: string;
  };
  origen?: {
    nombre: string;
  };
  destino?: {
    nombre: string;
  };
}

export interface CreateTransferDTO {
  fk_lote: string;
  fk_origen: string;
  fk_destino: string;
  cantidad: number;
  fecha_traslado: string;
}

export interface UpdateTransferDTO {
  fk_lote?: string;
  fk_origen?: string;
  fk_destino?: string;
  cantidad?: number;
  fecha_traslado?: string;
}
