export class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default class BaseController {
  success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  notFound(res, resource = 'Resource') {
    return this.error(res, `${resource} not found`, 404);
  }

  validateId(value) {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) {
      throw new ClientError('Invalid ID provided', 400);
    }
    return id;
  }

  validateName(name) {
    if (!name || typeof name !== 'string' || !name.trim()) {
      throw new ClientError('Name is required', 400);
    }
    return name.trim();
  }
}
