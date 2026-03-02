import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createTaskThunk,
  fetchTaskById,
  selectSelectedTask,
  updateTaskThunk,
} from "../../store/tasksSlice";
import type { TaskInput } from "../../types/task";
import { useToast } from "../../components/ui/ToastProvider";

export default function TaskFormPage() {
  const { taskId } = useParams();
  const isEdit = Boolean(taskId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedTask = useAppSelector(selectSelectedTask);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskInput>({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (isEdit && taskId) {
      dispatch(fetchTaskById(taskId));
    }
  }, [dispatch, isEdit, taskId]);

  useEffect(() => {
    if (isEdit && selectedTask) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description ?? "",
        status: selectedTask.status,
        dueDate: selectedTask.dueDate ?? "",
      });
    }
  }, [isEdit, reset, selectedTask]);

  const onSubmit = async (values: TaskInput) => {
    try {
      if (isEdit && taskId) {
        await dispatch(updateTaskThunk({ id: taskId, payload: values })).unwrap();
        showToast("Task updated successfully.", "success");
        navigate(`/tasks/${taskId}`);
        return;
      }

      const created = await dispatch(createTaskThunk(values)).unwrap();
      showToast("Task created successfully.", "success");
      navigate(`/tasks/${created.id}`);
    } catch {
      showToast("Unable to save task. Please try again.", "error");
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">{isEdit ? "Edit Task" : "New Task"}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-xl border bg-white p-4 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Task title"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full rounded-lg border px-3 py-2"
            rows={4}
            placeholder="Task description"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              {...register("status")}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="todo">To do</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Due date</label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Create Task"}
        </button>
      </form>
    </section>
  );
}
