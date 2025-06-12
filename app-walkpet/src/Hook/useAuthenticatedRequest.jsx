import { useUser } from "../context/UserContext";

export const useAuthenticatedRequest = () => {
  const { logout } = useUser();

  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem("authToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    // Verificar se o token expirou
    if (tokenExpiry && new Date() > new Date(tokenExpiry)) {
      logout();
      throw new Error("Sessão expirada");
    }

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      logout();
      throw new Error("Não autorizado");
    }

    return response;
  };

  return { makeAuthenticatedRequest };
};
