import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export const config = {
    matcher: [
        '/((?!protected||signin|signup|api/user/signup|api/user/signin).*)',
        '/api/user', 
        '/api/project/:function*', 
        '/api/task/:function*', 
    ],
};

async function authMiddleware(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'Unauthorized: Missing or invalid token' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        const res = await jose.jwtVerify(token, secretKey);
        const payload = res.payload as unknown as JWTPayload;

        const modifiedRequest = new Request(req, {
            headers: new Headers(req.headers),
            method: req.method,
            body: req.body
        });

        if (payload.email) modifiedRequest.headers.set('x-user-email', payload.email);
        if (payload.displayName) modifiedRequest.headers.set('x-user-name', payload.displayName);

        return NextResponse.next(modifiedRequest);
    } catch (error) {
        console.error('JWT verification error:', error);
        return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }
}

export default authMiddleware;
