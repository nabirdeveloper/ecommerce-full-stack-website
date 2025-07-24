import { z } from 'zod'

// User validation schemas
export const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
})

// Product validation schemas
export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  comparePrice: z.number().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  inventory: z.object({
    quantity: z.number().min(0, 'Quantity must be non-negative'),
    trackQuantity: z.boolean().default(true),
    allowBackorder: z.boolean().default(false),
  }),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
  featured: z.boolean().default(false),
})

// Category validation schemas
export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  parent: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
})

// Order validation schemas
export const orderSchema = z.object({
  items: z.array(z.object({
    product: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0),
  })).min(1, 'At least one item is required'),
  shippingAddress: z.object({
    name: z.string().min(1, 'Name is required'),
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().optional(),
  }),
  paymentMethod: z.enum(['card', 'paypal', 'bank_transfer']),
})

export type UserRegistration = z.infer<typeof userRegistrationSchema>
export type UserLogin = z.infer<typeof userLoginSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type Product = z.infer<typeof productSchema>
export type Category = z.infer<typeof categorySchema>
export type Order = z.infer<typeof orderSchema>