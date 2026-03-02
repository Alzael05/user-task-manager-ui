import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TaskListPage from "./pages/tasks/TaskListPage";
import TaskDetailsPage from "./pages/tasks/TaskDetailsPage";
import TaskFormPage from "./pages/tasks/TaskFormPage";
import RequireAuth from "./components/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/tasks" replace /> },
      { path: "tasks", element: <TaskListPage /> },
      { path: "tasks/new", element: <TaskFormPage /> },
      { path: "tasks/:taskId", element: <TaskDetailsPage /> },
      { path: "tasks/:taskId/edit", element: <TaskFormPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
