import { NextResponse } from 'next/server';
import * as jose from 'jose';

export const config = {
    matcher: ['/api/:function*'], 
};

const authKeyResolver = async (header: jose.JWK['KeyLike'] | jose.JWK['KeyObject']) => {
    const jwksUri = `https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com`;
    const jwks = jose.createRemoteJWKSet(new URL(jwksUri));
    return jwks(header);
};

async function authMiddleware(req: Request) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'Unauthorized: Missing or invalid token' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    try {
        const { payload } = await jose.jwtVerify(token, authKeyResolver, {
            audience: process.env.NEXT_PUBLIC_PROJECT_ID,
            issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        });

        const modifiedRequest = new Request(req, {
            headers: req.headers,
            method: req.method,
            body: req.body
        });

        modifiedRequest.headers.set('x-user-email', payload.email);
        modifiedRequest.headers.set('x-user-name', payload.name);
        
        return NextResponse.next(modifiedRequest);
    } catch (error) {
        console.error('JWT verification error:', error);
        return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }
}

export default authMiddleware;
