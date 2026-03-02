import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { Task, TaskInput } from "../types/task";
import * as tasksApi from "../services/tasksApi";

type TasksState = {
  items: Task[];
  selectedTask: Task | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: TasksState = {
  items: [],
  selectedTask: null,
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await tasksApi.listTasks();
});

export const fetchTaskById = createAsyncThunk("tasks/fetchTaskById", async (id: string) => {
  return await tasksApi.getTask(id);
});

export const createTaskThunk = createAsyncThunk("tasks/createTask", async (payload: TaskInput) => {
  return await tasksApi.createTask(payload);
});

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, payload }: { id: string; payload: TaskInput }) => {
    return await tasksApi.updateTask(id, payload);
  }
);

export const deleteTaskThunk = createAsyncThunk("tasks/deleteTask", async (id: string) => {
  await tasksApi.deleteTask(id);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load tasks";
      })

      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      })

      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.items = state.items.map((t) => (t.id === action.payload.id ? action.payload : t));
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })

      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
        if (state.selectedTask?.id === action.payload) {
          state.selectedTask = null;
        }
      });
  },
});

export default tasksSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectSelectedTask = (state: RootState) => state.tasks.selectedTask;
export const selectTasksStatus = (state: RootState) => state.tasks.status;
export const selectTasksError = (state: RootState) => state.tasks.error;
