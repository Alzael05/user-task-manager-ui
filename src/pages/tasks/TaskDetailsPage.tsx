import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  deleteTaskThunk,
  fetchTaskById,
  selectSelectedTask,
  selectTasksStatus,
} from "../../store/tasksSlice";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { useToast } from "../../components/ui/ToastProvider";

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const task = useAppSelector(selectSelectedTask);
  const status = useAppSelector(selectTasksStatus);
  const error = useAppSelector(selectTasksError);
  const { showToast } = useToast();

  useEffect(() => {
    if (taskId) dispatch(fetchTaskById(taskId));
  }, [dispatch, taskId]);

  const onDelete = async () => {
    if (!taskId) return;
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    try {
      await dispatch(deleteTaskThunk(taskId)).unwrap();
      showToast("Task deleted.", "success");
      navigate("/tasks");
    } catch {
      showToast("Unable to delete task. Please try again.", "error");
    }
  };

  if (status === "loading") return <LoadingState title="Loading task" />;
  if (error)
    return (
      <ErrorState
        message={error}
        onRetry={() => taskId && dispatch(fetchTaskById(taskId))}
      />
    );
  if (!task)
    return (
      <ErrorState title="Task not found" message="This task may have been removed." />
    );

  return (
    <section className="space-y-4 rounded-xl border bg-white p-4 shadow-sm">
      <h1 className="text-xl font-semibold">{task.title}</h1>
      <p className="text-gray-700">{task.description || "No description."}</p>
      <p className="text-sm text-gray-600">Status: {task.status}</p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          to={`/tasks/${task.id}/edit`}
          className="rounded-lg bg-amber-500 px-3 py-2 text-center text-white"
        >
          Edit
        </Link>
        <button onClick={onDelete} className="rounded-lg bg-red-600 px-3 py-2 text-white">
          Delete
        </button>
      </div>
    </section>
  );
}
