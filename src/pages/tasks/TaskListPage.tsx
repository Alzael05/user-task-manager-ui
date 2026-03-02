import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchTasks,
  selectTasks,
  selectTasksStatus,
  selectTasksError,
} from "../../store/tasksSlice";
import LoadingState from "../../components/ui/LoadingState";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

export default function TaskListPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const status = useAppSelector(selectTasksStatus);
  const error = useAppSelector(selectTasksError);

  useEffect(() => {
    if (status === "idle") dispatch(fetchTasks());
  }, [dispatch, status]);

  const reload = () => dispatch(fetchTasks());

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <Link
          to="/tasks/new"
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
        >
          New Task
        </Link>
      </div>

      {status === "loading" && <LoadingState title="Loading tasks" />}
      {error && <ErrorState message={error} onRetry={reload} />}

      {status !== "loading" && !error && tasks.length === 0 && (
        <EmptyState
          title="No tasks yet"
          subtitle="Create your first task to get started."
          actionLabel="Create Task"
          actionTo="/tasks/new"
        />
      )}

      <ul className="grid gap-3">
        {tasks.map((task) => (
          <li key={task.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link to={`/tasks/${task.id}`} className="font-semibold hover:underline">
                  {task.title}
                </Link>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {task.description || "No description"}
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {task.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
