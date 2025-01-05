import { NextRequest, NextResponse } from 'next/server';
import {  getUser  } from '../../../../services/userServices';
import { IUser } from '../../../../types/models';
import jwt from 'jsonwebtoken';
import { FilterQuery } from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRATION = '30d'; 

export async function POST(request: NextRequest) {
    const data: Partial<IUser > = await request.json();
    const dbQuery: FilterQuery<IUser> = {};

    if (!data.email ) {
        return NextResponse.json(
            { message: 'Email is required', isError: true, user: null },
            { status: 400 } 
        );
    }
    dbQuery.email = data.email;
    const result = await getUser(dbQuery);
    const statusCode = result.isError ? 404 : 200;
    
    if (result.isError) {
        return NextResponse.json({token: null, ...result}, { status: statusCode });
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

    return NextResponse.json({token, ...result}, { status: statusCode }); 
}