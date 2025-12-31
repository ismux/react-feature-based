import type { TokenStorage } from "@/features/auth/types/user";

export const getTokenFromStorage = (): TokenStorage => {
  return {
    token: sessionStorage.getItem("snet.auth.token"),
    refreshToken: sessionStorage.getItem("snet.auth.refresh"),
    usuarioId: sessionStorage.getItem("snet.auth.usuarioId")
  };
};

export const setStorageToken = (token : string, refreshToken: string, usuarioId: string | null) => {
  if (!token || !refreshToken) {
    return;
  }
  sessionStorage.setItem("snet.auth.token", token);
  sessionStorage.setItem("snet.auth.refresh", refreshToken);
  if (usuarioId !== null) {
    sessionStorage.setItem("snet.auth.usuarioId", usuarioId);
  }
};

export const removeStorage = () => {
  sessionStorage.clear();
};