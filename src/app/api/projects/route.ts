import { NextRequest, NextResponse } from "next/server";
import { CreateProjectPayload, Project } from "@share/model/project";
import { createId, projects } from "@share/api/mock-db";
import { ApiResponse } from "@share/types/api";

export async function GET(): Promise<NextResponse<ApiResponse<Project[]>>> {
  return NextResponse.json({ data: projects, message: "Проекты загружены" });
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Project>>> {
  const payload = (await request.json()) as CreateProjectPayload;
  const project: Project = {
    id: createId("project"),
    ...payload
  };
  projects.unshift(project);

  return NextResponse.json({ data: project, message: "Проект создан" }, { status: 201 });
}
