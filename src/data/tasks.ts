export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
};

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design login screen",
    description: "Create UI and validation flow for login",
    status: "in-progress",
    dueDate: "2026-02-28",
  },
  {
    id: "2",
    title: "Build task list",
    description: "Show all tasks in cards with filters",
    status: "todo",
    dueDate: "2026-03-03",
  },
  {
    id: "3",
    title: "Hook up API",
    description: "Connect list/create/update endpoints",
    status: "done",
    dueDate: "2026-02-20",
  },
];
