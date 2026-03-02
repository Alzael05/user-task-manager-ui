export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TaskInput = {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
};
