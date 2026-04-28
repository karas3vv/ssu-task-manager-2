import { NextRequest, NextResponse } from "next/server";
import { LoginPayload } from "@share/model/user";
import { demoUser } from "@share/api/mock-db";
import { ApiResponse } from "@share/types/api";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ user: typeof demoUser; token: string }>>> {
  const payload = (await request.json()) as LoginPayload;
  const token = "demo-session";

  const response = NextResponse.json({
    data: { user: demoUser, token },
    message: `Выполнен вход: ${payload.email}`
  });
  response.cookies.set("task-manager-session", token, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
  });

  return response;
}
