import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

// GET /recruiter-start
// Server-side redirect to recruiter login with secret key from env.
export async function GET(request: NextRequest) {
  const key = process.env['RECRUITER_ACCESS_KEY'];
  if (!key) {
    return NextResponse.json(
      { success: false, message: "Recruiter access is not configured." },
      { status: 501 }
    );
  }
  const url = new URL(request.url);
  const redirectUrl = new URL("/recruiter", url.origin);
  redirectUrl.searchParams.set("key", key);
  return NextResponse.redirect(redirectUrl);
}
