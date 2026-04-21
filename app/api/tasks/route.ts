import { NextRequest, NextResponse } from "next/server";
import { CreateTaskPayload, Task } from "@entities/task/model";
import { createId, tasks } from "@shared/api/mock-db";
import { ApiResponse } from "@shared/types/api";

export async function GET(): Promise<NextResponse<ApiResponse<Task[]>>> {
  return NextResponse.json({ data: tasks, message: "Tasks loaded" });
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Task>>> {
  const payload = (await request.json()) as CreateTaskPayload;
  const task: Task = {
    id: createId("task"),
    ...payload
  };
  tasks.unshift(task);

  return NextResponse.json({ data: task, message: "Task created" }, { status: 201 });
}
