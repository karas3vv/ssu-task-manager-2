import { NextRequest, NextResponse } from "next/server";
import { AuthResult, RegisterPayload } from "@entities/user/model";
import { ApiResponse } from "@shared/types/api";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<AuthResult>>> {
  const payload = (await request.json()) as RegisterPayload;
  const token = "demo-session";
  const result: AuthResult = {
    token,
    user: {
      id: "user-new",
      name: payload.name,
      email: payload.email,
      role: "owner",
      avatarColor: "#206a5d",
      position: "Владелец пространства",
      workspaceName: "TaskFlow Space",
      notifications: {
        deadlineReminders: true,
        reviewUpdates: true,
        dailyDigest: false
      }
    }
  };

  const response = NextResponse.json({
    data: result,
    message: "Registered"
  });
  response.cookies.set("task-manager-session", token, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
  });

  return response;
}
