import { NextRequest, NextResponse } from "next/server";
import { CreateProjectPayload, Project } from "@entities/project/model";
import { createId, projects } from "@shared/api/mock-db";
import { ApiResponse } from "@shared/types/api";

export async function GET(): Promise<NextResponse<ApiResponse<Project[]>>> {
  return NextResponse.json({ data: projects, message: "Projects loaded" });
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Project>>> {
  const payload = (await request.json()) as CreateProjectPayload;
  const project: Project = {
    id: createId("project"),
    ...payload
  };
  projects.unshift(project);

  return NextResponse.json({ data: project, message: "Project created" }, { status: 201 });
}
