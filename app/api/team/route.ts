import { NextRequest, NextResponse } from "next/server";
import { CreateTeamMemberPayload, UserProfile } from "@entities/user/model";
import { createId, demoUser, users } from "@shared/api/mock-db";
import { ApiResponse } from "@shared/types/api";

export async function GET(): Promise<NextResponse<ApiResponse<UserProfile[]>>> {
  return NextResponse.json({
    data: users,
    message: "Команда загружена"
  });
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<UserProfile>>> {
  const payload = (await request.json()) as CreateTeamMemberPayload;
  const member: UserProfile = {
    id: createId("user"),
    ...payload,
    workspaceName: demoUser.workspaceName,
    notifications: {
      deadlineReminders: true,
      reviewUpdates: true,
      dailyDigest: false
    }
  };

  users.push(member);

  return NextResponse.json({
    data: member,
    message: "Участник команды создан"
  }, { status: 201 });
}
