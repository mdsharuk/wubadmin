import api from "@/app/api";

export { default as apiClient } from "@/app/api";

export const getRequest = <T>(url: string, params?: Record<string, unknown>) =>
  api.get<unknown, T>(url, { params });

export const postRequest = <T>(url: string, data?: unknown) =>
  api.post<unknown, T>(url, data);

export const putRequest = <T>(url: string, data?: unknown) =>
  api.put<unknown, T>(url, data);

export const patchRequest = <T>(url: string, data?: unknown) =>
  api.patch<unknown, T>(url, data);

export const deleteRequest = <T>(url: string) => api.delete<unknown, T>(url);

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: string }).message);
  }
  return "Something went wrong";
};

export default api;
