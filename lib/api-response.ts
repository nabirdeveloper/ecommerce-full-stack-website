import { NextResponse } from 'next/server'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  )
}

export function errorResponse(
  error: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  )
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): NextResponse<ApiResponse<T[]>> {
  const totalPages = Math.ceil(total / limit)
  
  return NextResponse.json({
    success: true,
    data,
    message,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  })
}

export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Unauthorized',
    },
    { status: 401 }
  )
}

export function forbiddenResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Forbidden',
    },
    { status: 403 }
  )
}

export function notFoundResponse(resource: string = 'Resource'): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
    },
    { status: 404 }
  )
}

export function validationErrorResponse(errors: Record<string, string[]>): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      data: errors,
    },
    { status: 422 }
  )
}