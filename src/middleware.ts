import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.headers.get("Authorization")) {
    return NextResponse.json(
      { data: null, message: "Unauthorized" },
      { status: 401 }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/posts/:path*"],
};
