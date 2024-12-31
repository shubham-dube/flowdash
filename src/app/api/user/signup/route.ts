import { NextRequest, NextResponse } from 'next/server';
import { createUser  } from '@/services/userServices';
import { IUser } from '@/types/models';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRATION = '30d'; 

export async function POST(request: NextRequest) {
    const data: Partial<IUser > = await request.json();

    if (!data.email || !data.firebaseId || !data.displayName) {
        return NextResponse.json(
            { message: 'Email, Firebase ID and Display Name are required', isError: true, user: null },
            { status: 400 } 
        );
    }

    const result = await createUser(data);
    
    if (result.isError) {
        if (result.message.includes('already exists')) {
            return NextResponse.json(result, { status: 409 }); 
        }
        return NextResponse.json(result, { status: 500 });
    }

    const token = jwt.sign(
        { 
            _id: result.user._id, 
            email: result.user.email,
            displayName: result.user.displayName
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );

    return NextResponse.json({ ...result, token }, { status: 201 }); 
}