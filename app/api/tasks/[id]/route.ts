import { NextRequest, NextResponse } from "next/server";
import { CreateTaskPayload, Task, UpdateTaskPayload } from "@entities/task/model";
import { tasks } from "@shared/api/mock-db";
import { ApiResponse } from "@shared/types/api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function findTaskIndex(taskId: string): number {
  return tasks.findIndex((task) => task.id === taskId);
}

function notFoundResponse(): NextResponse<ApiResponse<null>> {
  return NextResponse.json({ data: null, message: "Task not found" }, { status: 404 });
}

export async function PUT(request: NextRequest, context: RouteContext): Promise<NextResponse<ApiResponse<Task | null>>> {
  const { id } = await context.params;
  const index = findTaskIndex(id);
  if (index < 0) {
    return notFoundResponse();
  }

  const payload = (await request.json()) as CreateTaskPayload;
  const task: Task = { id, ...payload };
  tasks[index] = task;

  return NextResponse.json({ data: task, message: "Task replaced" });
}

export async function PATCH(request: NextRequest, context: RouteContext): Promise<NextResponse<ApiResponse<Task | null>>> {
  const { id } = await context.params;
  const index = findTaskIndex(id);
  if (index < 0) {
    return notFoundResponse();
  }

  const payload = (await request.json()) as UpdateTaskPayload;
  const task: Task = { ...tasks[index], ...payload };
  tasks[index] = task;

  return NextResponse.json({ data: task, message: "Task updated" });
}

export async function DELETE(_request: NextRequest, context: RouteContext): Promise<NextResponse<ApiResponse<string | null>>> {
  const { id } = await context.params;
  const index = findTaskIndex(id);
  if (index < 0) {
    return notFoundResponse();
  }

  const [deletedTask] = tasks.splice(index, 1);
  return NextResponse.json({ data: deletedTask.id, message: "Task deleted" });
}
