export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Failed to fetch",
    }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function get<T>(url: string): Promise<T> {
  return fetcher<T>(url, { method: "GET" });
}

export async function patch<T>(url: string, data?: unknown): Promise<T> {
  return fetcher<T>(url, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}
