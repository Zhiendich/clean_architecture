class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static unauthorize(message?: string) {
    return new ApiError(401, message || "Failed to authorize");
  }
  static notFound(message?: string) {
    return new ApiError(404, message || "Not found");
  }

  static badRequest(message?: string) {
    return new ApiError(400, message || "Bad request");
  }

  static internal(message?: string) {
    return new ApiError(500, message || "Unknow error");
  }

  static forbidden(message?: string) {
    return new ApiError(403, message || "Forbidden");
  }
}

export default ApiError;
