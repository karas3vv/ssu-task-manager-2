import { NextResponse } from "next/server";
import { ApiResponse } from "@shared/types/api";

export async function POST(): Promise<NextResponse<ApiResponse<boolean>>> {
  const response = NextResponse.json({
    data: true,
    message: "Logged out"
  });
  response.cookies.delete("task-manager-session");
  return response;
}
