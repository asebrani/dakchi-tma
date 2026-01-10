import { API_BASE_URL } from "../config/env";

console.log("[httpClient] API_BASE_URL:", API_BASE_URL);

async function get<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  console.log("[httpClient] GET", url);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Use 'cors' mode for cross-origin requests
    mode: "cors",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${url} failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${url} failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

export const httpClient = {
  get,
  post,
};