/**
 * API client for making requests to backend services
 */

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  headers?: Record<string, string>
  body?: any
  cache?: RequestCache
}

/**
 * Base API client for making HTTP requests
 */
export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", headers = {}, body, cache = "default" } = options

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache,
  }

  if (body) {
    requestOptions.body = JSON.stringify(body)
  }

  const response = await fetch(endpoint, requestOptions)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API error: ${response.status}`)
  }

  return response.json()
}

/**
 * API client for dashboard-related endpoints
 */
export const dashboardApi = {
  getMetrics: () => fetchApi<any>("/api/dashboard/metrics"),
  getRecentActivity: () => fetchApi<any>("/api/dashboard/activity"),
}

/**
 * API client for user-related endpoints
 */
export const userApi = {
  getCurrentUser: () => fetchApi<any>("/api/user"),
  updateProfile: (data: any) =>
    fetchApi<any>("/api/user", {
      method: "PUT",
      body: data,
    }),
}
