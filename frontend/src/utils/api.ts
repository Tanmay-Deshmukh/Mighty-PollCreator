const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function apiFetch(
  path: string,
  options?: RequestInit
): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  return response;
}