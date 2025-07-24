import { DEFAULT_PAGINATION } from './constants'

export interface PaginationOptions {
  page?: number
  limit?: number
}

export interface PaginationResult {
  page: number
  limit: number
  skip: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export function getPaginationParams(options: PaginationOptions = {}) {
  const page = Math.max(1, options.page || DEFAULT_PAGINATION.PAGE)
  const limit = Math.min(100, Math.max(1, options.limit || DEFAULT_PAGINATION.LIMIT))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export function createPaginationResult(
  page: number,
  limit: number,
  total: number
): PaginationResult {
  const totalPages = Math.ceil(total / limit)
  const hasNext = page < totalPages
  const hasPrev = page > 1
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip,
    total,
    totalPages,
    hasNext,
    hasPrev,
  }
}

export function getPaginationQuery(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || DEFAULT_PAGINATION.LIMIT.toString())
  
  return getPaginationParams({ page, limit })
}