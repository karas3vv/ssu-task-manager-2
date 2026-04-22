import { NextRequest, NextResponse } from "next/server";
import { UpdateProfilePayload, UserProfile } from "@entities/user/model";
import { demoUser } from "@shared/api/mock-db";
import { ApiResponse } from "@shared/types/api";

export async function GET(): Promise<NextResponse<ApiResponse<UserProfile>>> {
  return NextResponse.json({
    data: demoUser,
    message: "Профиль загружен"
  });
}

export async function PATCH(request: NextRequest): Promise<NextResponse<ApiResponse<UserProfile>>> {
  const payload = (await request.json()) as UpdateProfilePayload;

  demoUser.name = payload.name;
  demoUser.email = payload.email;
  demoUser.role = payload.role;
  demoUser.avatarColor = payload.avatarColor;
  demoUser.position = payload.position;
  demoUser.workspaceName = payload.workspaceName;
  demoUser.notifications = payload.notifications;

  return NextResponse.json({
    data: demoUser,
    message: "Профиль обновлен"
  });
}
