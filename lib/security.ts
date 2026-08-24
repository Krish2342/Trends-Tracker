import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// ============================================
// Rate Limiter (In-Memory, per-IP)
// ============================================
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30 // max 30 requests per minute per IP

/**
 * Check if a request exceeds the rate limit.
 * Returns null if allowed, or a NextResponse 429 if rate-limited.
 */
export function checkRateLimit(request: Request): NextResponse | null {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"

  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return null
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(entry.resetAt),
        },
      }
    )
  }

  entry.count++
  return null
}

// Periodically clean up stale entries to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip)
    }
  }
}, 5 * 60 * 1000) // Clean every 5 minutes

// ============================================
// Auth Verification (Supabase JWT)
// ============================================

/**
 * Verify the Supabase auth token from the request.
 * Returns the user object if valid, null if not.
 */
export async function verifyAuth(request: Request): Promise<{ id: string; email?: string } | null> {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) return null

    const token = authHeader.substring(7)
    if (!token) return null

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // If service role key is not configured, fall back to anon key
    const supabaseKey = supabaseServiceKey && supabaseServiceKey !== "your-service-role-key-here"
      ? supabaseServiceKey
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) return null

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) return null

    return { id: user.id, email: user.email }
  } catch {
    return null
  }
}

/**
 * Returns a 401 Unauthorized response
 */
export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { error: "Unauthorized. Please log in to access this resource." },
    { status: 401 }
  )
}

// ============================================
// Input Sanitization
// ============================================

/**
 * Sanitize a string to prevent XSS / HTML injection.
 * Escapes HTML special characters.
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Limit string length to prevent oversized payloads
 */
export function limitLength(input: string, maxLength: number = 1000): string {
  return input.slice(0, maxLength)
}
