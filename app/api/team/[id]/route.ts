import { NextRequest, NextResponse } from "next/server";
import { UpdateTeamMemberPayload, UserProfile } from "@entities/user/model";
import { users } from "@shared/api/mock-db";
import { ApiResponse } from "@shared/types/api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function findMemberIndex(memberId: string): number {
  return users.findIndex((member) => member.id === memberId);
}

function notFoundResponse(): NextResponse<ApiResponse<null>> {
  return NextResponse.json({ data: null, message: "Участник команды не найден" }, { status: 404 });
}

export async function PATCH(request: NextRequest, context: RouteContext): Promise<NextResponse<ApiResponse<UserProfile | null>>> {
  const { id } = await context.params;
  const index = findMemberIndex(id);

  if (index < 0) {
    return notFoundResponse();
  }

  const payload = (await request.json()) as UpdateTeamMemberPayload;
  const member: UserProfile = {
    ...users[index],
    ...payload
  };

  users[index] = member;

  return NextResponse.json({
    data: member,
    message: "Участник команды обновлен"
  });
}

export async function DELETE(_request: NextRequest, context: RouteContext): Promise<NextResponse<ApiResponse<string | null>>> {
  const { id } = await context.params;
  const index = findMemberIndex(id);

  if (index < 0) {
    return notFoundResponse();
  }

  if (users[index].role === "owner") {
    return NextResponse.json({ data: null, message: "Владельца нельзя удалить" }, { status: 403 });
  }

  const [deletedMember] = users.splice(index, 1);

  return NextResponse.json({
    data: deletedMember.id,
    message: "Участник команды удален"
  });
}
