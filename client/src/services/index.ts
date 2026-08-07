const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.message || `API Error: ${res.status} ${res.statusText}`;
    const error = new Error(message) as Error & { status: number; errorCode?: string };
    error.status = res.status;
    error.errorCode = body?.errorCode;
    throw error;
  }

  return res.json();
}

export async function submitFormData<T>(endpoint: string, formData: FormData): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.message || `API Error: ${res.status} ${res.statusText}`;
    const error = new Error(message) as Error & { status: number; errorCode?: string };
    error.status = res.status;
    error.errorCode = body?.errorCode;
    throw error;
  }

  return res.json();
}
