import { EUserType } from '@/types'
import { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.type = user.type
        token.id = Number(user.id)
        token.lastnames = user.lastnames
        token.names = user.names
        token.username = user.username
      }
      return token
    },
    async session ({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.names = token.names as string
        session.user.lastnames = token.lastnames as string
        session.user.username = token.username as string
        session.user.type = token.type as EUserType
      }

      return session
    },
    authorized ({ auth, request }) {
      const VIEWS_ADMIN = ['/panel/users', '/panel/categories', '/panel/locations', '/panel/suppliers']
      const user = auth?.user
      const isUserAdmin = user?.type === EUserType.admin || user?.type === EUserType.superadmin
      const isOnAdminView = VIEWS_ADMIN.includes(request.nextUrl?.pathname)
      const isOnPanel = request.nextUrl?.pathname.startsWith('/panel')
      const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login')

      if (isOnAdminView && !isUserAdmin) return Response.redirect(new URL('/panel', request.nextUrl))
      if (isOnPanel && !user) return false
      if (isOnLoginPage && user) return Response.redirect(new URL('/panel', request.nextUrl))
      return true
    }
  },
  providers: []
}
