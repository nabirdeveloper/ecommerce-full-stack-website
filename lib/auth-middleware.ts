import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth'
import { USER_ROLES } from './constants'
import { UnauthorizedError, ForbiddenError } from './error-handler'

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    throw new UnauthorizedError('Authentication required')
  }
  
  return session
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth()
  
  if (!allowedRoles.includes(session.user.role)) {
    throw new ForbiddenError('Insufficient permissions')
  }
  
  return session
}

export async function requireAdmin() {
  return requireRole([
    USER_ROLES.EDITOR,
    USER_ROLES.MANAGER,
    USER_ROLES.SUPER_ADMIN
  ])
}

export async function requireManager() {
  return requireRole([
    USER_ROLES.MANAGER,
    USER_ROLES.SUPER_ADMIN
  ])
}

export async function requireSuperAdmin() {
  return requireRole([USER_ROLES.SUPER_ADMIN])
}

export function hasPermission(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole)
}

export function isAdmin(userRole: string): boolean {
  return hasPermission(userRole, [
    USER_ROLES.EDITOR,
    USER_ROLES.MANAGER,
    USER_ROLES.SUPER_ADMIN
  ])
}

export function isManager(userRole: string): boolean {
  return hasPermission(userRole, [
    USER_ROLES.MANAGER,
    USER_ROLES.SUPER_ADMIN
  ])
}

export function isSuperAdmin(userRole: string): boolean {
  return userRole === USER_ROLES.SUPER_ADMIN
}