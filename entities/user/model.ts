export type UserRole = "owner" | "manager" | "member";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarColor: string;
};

export type NotificationSettings = {
  deadlineReminders: boolean;
  reviewUpdates: boolean;
  dailyDigest: boolean;
};

export type UserProfile = User & {
  position: string;
  workspaceName: string;
  notifications: NotificationSettings;
};

export type UpdateProfilePayload = {
  name: string;
  email: string;
  role: UserRole;
  avatarColor: string;
  position: string;
  workspaceName: string;
  notifications: NotificationSettings;
};

export type CreateTeamMemberPayload = {
  name: string;
  email: string;
  role: Exclude<UserRole, "owner">;
  avatarColor: string;
  position: string;
};

export type UpdateTeamMemberPayload = Partial<CreateTeamMemberPayload>;

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
};

export type AuthResult = {
  user: UserProfile;
  token: string;
};
