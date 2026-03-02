import type { Task, TaskInput } from "../types/task";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

function authHeaders() {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function listTasks(): Promise<Task[]> {
  return request<Task[]>(`${API_BASE}/tasks`);
}

export async function getTask(id: string): Promise<Task> {
  return request<Task>(`${API_BASE}/tasks/${id}`);
}

export async function createTask(payload: TaskInput): Promise<Task> {
  return request<Task>(`${API_BASE}/tasks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTask(id: string, payload: TaskInput): Promise<Task> {
  return request<Task>(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteTask(id: string): Promise<void> {
  return request<void>(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
}
