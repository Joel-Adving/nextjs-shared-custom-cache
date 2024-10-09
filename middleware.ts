import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const headers = new Headers()
  headers.set('x-service-instance', process.env.INSTANCE_NAME)
  return NextResponse.next({ headers })
}

export const config = {
  matcher: '/:path*'
}
