export interface SearchOptions {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  status?: string
  featured?: boolean
}

export function buildSearchQuery(options: SearchOptions) {
  const query: Record<string, unknown> = {}

  // Text search
  if (options.query) {
    query.$or = [
      { title: { $regex: options.query, $options: 'i' } },
      { description: { $regex: options.query, $options: 'i' } },
      { tags: { $in: [new RegExp(options.query, 'i')] } },
    ]
  }

  // Category filter
  if (options.category) {
    query.category = options.category
  }

  // Price range filter
  if (options.minPrice !== undefined || options.maxPrice !== undefined) {
    const priceQuery: Record<string, number> = {}
    if (options.minPrice !== undefined) {
      priceQuery.$gte = options.minPrice
    }
    if (options.maxPrice !== undefined) {
      priceQuery.$lte = options.maxPrice
    }
    query.price = priceQuery
  }

  // Status filter
  if (options.status) {
    query.status = options.status
  }

  // Featured filter
  if (options.featured !== undefined) {
    query.featured = options.featured
  }

  return query
}

export function buildSortQuery(sortBy?: string) {
  const sort: Record<string, number> = {}

  switch (sortBy) {
    case 'price_low':
      sort.price = 1
      break
    case 'price_high':
      sort.price = -1
      break
    case 'name_asc':
      sort.title = 1
      break
    case 'name_desc':
      sort.title = -1
      break
    case 'oldest':
      sort.createdAt = 1
      break
    case 'newest':
    default:
      sort.createdAt = -1
      break
  }

  return sort
}

export function parseSearchParams(searchParams: URLSearchParams): SearchOptions {
  return {
    query: searchParams.get('q') || undefined,
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
    maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    status: searchParams.get('status') || undefined,
    featured: searchParams.get('featured') ? searchParams.get('featured') === 'true' : undefined,
  }
}