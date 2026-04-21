export type ApiResponse<TData> = {
  data: TData;
  message: string;
};

export type ApiError = {
  message: string;
  status: number;
};

export type RequestStatus = "idle" | "loading" | "success" | "error";
