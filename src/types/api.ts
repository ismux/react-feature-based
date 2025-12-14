export type ApiResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  json?: boolean;
  error?: string;
}

export type FetchHeaders = {
  [key: string]: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";

export type HttpServiceResponse<T = unknown> =
  | ApiResponse<T>  // Respuesta estructurada de API
  | T               // Respuesta directa (datos sin wrapper)
  | ArrayBuffer     // Contenido binario (archivos, etc.)

export const HttpClientType = {
  FETCH: 'fetch',
  AXIOS: 'axios'
} as const;