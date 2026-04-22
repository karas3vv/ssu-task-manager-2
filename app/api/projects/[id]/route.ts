import { NextRequest, NextResponse } from "next/server";
import { CreateProjectPayload, Project, UpdateProjectPayload } from "@entities/project/model";
import { projects } from "@shared/api/mock-db";
import { ApiResponse } from "@shared/types/api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function findProjectIndex(projectId: string): number {
  return projects.findIndex((project) => project.id === projectId);
}

function notFoundResponse(): NextResponse<ApiResponse<null>> {
  return NextResponse.json({ data: null, message: "Проект не найден" }, { status: 404 });
}

export async function PUT(request: NextRequest, context: RouteContext): Promise<NextResponse<ApiResponse<Project | null>>> {
  const { id } = await context.params;
  const index = findProjectIndex(id);
  if (index < 0) {
    return notFoundResponse();
  }

  const payload = (await request.json()) as CreateProjectPayload;
  const project: Project = { id, ...payload };
  projects[index] = project;

  return NextResponse.json({ data: project, message: "Проект заменен" });
}

export async function PATCH(request: NextRequest, context: RouteContext): Promise<NextResponse<ApiResponse<Project | null>>> {
  const { id } = await context.params;
  const index = findProjectIndex(id);
  if (index < 0) {
    return notFoundResponse();
  }

  const payload = (await request.json()) as UpdateProjectPayload;
  const project: Project = { ...projects[index], ...payload };
  projects[index] = project;

  return NextResponse.json({ data: project, message: "Проект обновлен" });
}

export async function DELETE(_request: NextRequest, context: RouteContext): Promise<NextResponse<ApiResponse<string | null>>> {
  const { id } = await context.params;
  const index = findProjectIndex(id);
  if (index < 0) {
    return notFoundResponse();
  }

  const [deletedProject] = projects.splice(index, 1);
  return NextResponse.json({ data: deletedProject.id, message: "Проект удален" });
}
