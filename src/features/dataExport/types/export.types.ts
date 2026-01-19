export interface LoteExportData extends Record<string, unknown> {
  codigo_lote: string;
  vacuna: string;
  fecha_vencimiento: string;
  cantidad_total: number;
  stock_actual: number;
  fecha_registro: string;
}

export interface TransferExportData extends Record<string, unknown> {
  codigo_lote: string;
  origen: string;
  destino: string;
  cantidad: number;
  fecha_traslado: string;
  fecha_registro: string;
}

export interface AmbulatorioExportData extends Record<string, unknown> {
  nombre: string;
  direccion: string;
  telefono: string;
  fecha_registro: string;
}

export type ExportType = "lotes" | "traslados" | "ambulatorios";
