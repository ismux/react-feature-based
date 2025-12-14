export type User =  {
  usuarioId: string | null;
  extension: string | null;
  agenteId: string | null;
  roles: string[];
  token: string | null;
  refreshToken: string | null;
  numPC: string | null;
  capacidad: string | null;
  nombre: string | null;
  email: string | null;
  sustituciones: string | null;
  otp: string | null;
  sam: string | null;
  loading?: boolean;
}

export type TokensResponse = Required<Omit<User, 'loading'>> & {
  usuarioId: string;
  extension: string;
  agenteId: string;
  token: string;
  refreshToken: string;
  numPC: string;
  capacidad: string;
  nombre: string;
  email: string;
  sustituciones: string;
  otp: string;
  sam: string;
}

export const UserEmptyState: User = {
  usuarioId: null,
  extension: null,
  agenteId: null,
  roles: [],
  token: null,
  refreshToken: null,
  numPC: null,
  capacidad: null,
  nombre: null,
  email: null,
  sustituciones: null,
  otp: null,
  sam: null,
  loading: false
}

export type TokenStorage = {
  token: string | null;
  refreshToken: string | null;
  usuarioId: string | null;
}