import { Project, CreateProjectPayload, UpdateProjectPayload } from "@share/model/project";
import { CreateTaskPayload, Task, UpdateTaskPayload } from "@share/model/task";
import { AuthResult, CreateTeamMemberPayload, LoginPayload, RegisterPayload, UpdateProfilePayload, UpdateTeamMemberPayload, UserProfile } from "@share/model/user";
import { ApiResponse } from "@share/types/api";
import { httpClient } from "./http";

export const taskManagerApi = {
  async login(payload: LoginPayload): Promise<AuthResult> {
    const response = await httpClient.post<ApiResponse<AuthResult>>("/api/auth/login", payload);
    return response.data.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResult> {
    const response = await httpClient.post<ApiResponse<AuthResult>>("/api/auth/register", payload);
    return response.data.data;
  },

  async logout(): Promise<boolean> {
    const response = await httpClient.post<ApiResponse<boolean>>("/api/auth/logout");
    return response.data.data;
  },

  async getProfile(): Promise<UserProfile> {
    const response = await httpClient.get<ApiResponse<UserProfile>>("/api/profile");
    return response.data.data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    const response = await httpClient.patch<ApiResponse<UserProfile>>("/api/profile", payload);
    return response.data.data;
  },

  async getTeam(): Promise<UserProfile[]> {
    const response = await httpClient.get<ApiResponse<UserProfile[]>>("/api/team");
    return response.data.data;
  },

  async createTeamMember(payload: CreateTeamMemberPayload): Promise<UserProfile> {
    const response = await httpClient.post<ApiResponse<UserProfile>>("/api/team", payload);
    return response.data.data;
  },

  async updateTeamMember(memberId: string, payload: UpdateTeamMemberPayload): Promise<UserProfile> {
    const response = await httpClient.patch<ApiResponse<UserProfile>>(`/api/team/${memberId}`, payload);
    return response.data.data;
  },

  async deleteTeamMember(memberId: string): Promise<string> {
    const response = await httpClient.delete<ApiResponse<string>>(`/api/team/${memberId}`);
    return response.data.data;
  },

  async getTasks(): Promise<Task[]> {
    const response = await httpClient.get<ApiResponse<Task[]>>("/api/tasks");
    return response.data.data;
  },

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    const response = await httpClient.post<ApiResponse<Task>>("/api/tasks", payload);
    return response.data.data;
  },

  async replaceTask(taskId: string, payload: CreateTaskPayload): Promise<Task> {
    const response = await httpClient.put<ApiResponse<Task>>(`/api/tasks/${taskId}`, payload);
    return response.data.data;
  },

  async updateTask(taskId: string, payload: UpdateTaskPayload): Promise<Task> {
    const response = await httpClient.patch<ApiResponse<Task>>(`/api/tasks/${taskId}`, payload);
    return response.data.data;
  },

  async deleteTask(taskId: string): Promise<string> {
    const response = await httpClient.delete<ApiResponse<string>>(`/api/tasks/${taskId}`);
    return response.data.data;
  },

  async getProjects(): Promise<Project[]> {
    const response = await httpClient.get<ApiResponse<Project[]>>("/api/projects");
    return response.data.data;
  },

  async createProject(payload: CreateProjectPayload): Promise<Project> {
    const response = await httpClient.post<ApiResponse<Project>>("/api/projects", payload);
    return response.data.data;
  },

  async replaceProject(projectId: string, payload: CreateProjectPayload): Promise<Project> {
    const response = await httpClient.put<ApiResponse<Project>>(`/api/projects/${projectId}`, payload);
    return response.data.data;
  },

  async updateProject(projectId: string, payload: UpdateProjectPayload): Promise<Project> {
    const response = await httpClient.patch<ApiResponse<Project>>(`/api/projects/${projectId}`, payload);
    return response.data.data;
  },

  async deleteProject(projectId: string): Promise<string> {
    const response = await httpClient.delete<ApiResponse<string>>(`/api/projects/${projectId}`);
    return response.data.data;
  }
};
