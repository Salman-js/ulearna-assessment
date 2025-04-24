import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Explicitly declare Edge runtime
export const runtime = 'experimental-edge';

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

// Specify which routes to apply the middleware to
export const config = {
  matcher: ['/api/orders/:path*', '/api/products/:path*'],
};

export default async function middleware(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  try {
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    // Add rate limit headers to the response
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', limit.toString());
    headers.set('X-RateLimit-Remaining', remaining.toString());
    headers.set('X-RateLimit-Reset', reset.toString());

    // If the rate limit is exceeded, return a 429 response
    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers,
      });
    }

    // If the rate limit is not exceeded, continue with the request
    const response = NextResponse.next();

    // Add the rate limit headers to the response
    headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error('Rate limiter error:', error);
    return NextResponse.next();
  }
}
