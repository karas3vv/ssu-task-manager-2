import { NextResponse } from "next/server";
import { tasks, projects, users } from "@share/api/mock-db";
import { DashboardStats } from "@share/api/task-manager-api";
import { ApiResponse } from "@share/types/api";

export async function GET(): Promise<NextResponse<ApiResponse<DashboardStats>>> {
  const data: DashboardStats = {
    activeTasks: tasks.filter((task) => task.status !== "done").length,
    completedTasks: tasks.filter((task) => task.status === "done").length,
    activeProjects: projects.filter((project) => project.status === "active").length,
    teamMembers: users.length
  };

  return NextResponse.json({ data, message: "Статистика загружена" });
}
