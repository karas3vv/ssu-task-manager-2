import { NextResponse } from "next/server";
import { ApiResponse } from "@share/types/api";

export async function POST(): Promise<NextResponse<ApiResponse<boolean>>> {
  const response = NextResponse.json({
    data: true,
    message: "Выход выполнен"
  });
  response.cookies.delete("task-manager-session");
  return response;
}
