import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    try {
        return NextResponse.redirect(new URL("/login", request.url));
    } catch (e) {
        console.log("catch")
        console.log(new URL("/", request.url));
        return NextResponse.json({ message: new URL("/", request.url), err: e }, { status: 500 });
    }
}

export const config = {
    matcher: "/"
}