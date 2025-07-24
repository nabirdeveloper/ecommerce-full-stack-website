import { ZodError } from 'zod'
import { errorResponse, validationErrorResponse } from './api-response'

export function handleApiError(error: unknown) {
  console.error('API Error:', error)

  if (error instanceof ZodError) {
    const validationErrors: Record<string, string[]> = {}
    error.issues.forEach((err) => {
      const path = err.path.join('.')
      if (!validationErrors[path]) {
        validationErrors[path] = []
      }
      validationErrors[path].push(err.message)
    })
    return validationErrorResponse(validationErrors)
  }

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('duplicate key')) {
      return errorResponse('Resource already exists', 409)
    }
    
    if (error.message.includes('Cast to ObjectId failed')) {
      return errorResponse('Invalid ID format', 400)
    }

    if (error.message.includes('ValidationError')) {
      return errorResponse('Validation failed', 400)
    }

    return errorResponse(error.message, 500)
  }

  return errorResponse('Internal server error', 500)
}

export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403)
  }
}