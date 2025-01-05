import { NextResponse } from 'next/server';
import { createUser, getUser, getUsersByQuery, updateUser, deleteUser, getAllUsers } from '../../../services/userServices';
import { IUser } from '../../../types/models';
import { FilterQuery } from 'mongoose';

// POST: Create a user
export async function POST(request: Request) {
    const data: Partial<IUser> = await request.json();

    if (!data.email || !data.firebaseId || !data.displayName) {
        return NextResponse.json(
            { message: 'Email, Firebase ID and Display Name are required', isError: true, user:null },
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

    return NextResponse.json(result, { status: 201 }); 
}

// GET: Get all users or a single user by query
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    if(searchParams.get('getOneUser')){
        const dbQuery: FilterQuery<IUser> = {};
        
        const email = searchParams.get('email');
        const id = searchParams.get('id');
        const firebaseId = searchParams.get('firebaseId');

        if (email) dbQuery.email = email;
        if (id) dbQuery._id = id;
        if (firebaseId) dbQuery.firebaseId = firebaseId;

        console.log(dbQuery);

        const result = await getUser(dbQuery);
        const statusCode = result.isError ? 404 : 200;
        return NextResponse.json(result, { status: statusCode });

    } else if(searchParams.get('getAllUsers')){
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
        const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!) : 0;
        const result = await getAllUsers(limit, skip);
        const statusCode = result.isError ? 500 : 200;
        return NextResponse.json(result, { status: statusCode });

    } else {
        const dbQuery: FilterQuery<IUser > = {};
        const query = searchParams.get('query');

        if (query) {
            dbQuery.$or = [
                { displayName: { $regex: query, $options: 'i' } }, 
                { email: { $regex: query, $options: 'i' } }
            ];
        }

        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
        const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!) : 0;
        const result = await getUsersByQuery(dbQuery, limit, skip);
        const statusCode = result.isError ? 500 : 200;
        return NextResponse.json(result, { status: statusCode });
    }
}

// PUT: Update a user
export async function PUT(request: Request) {
    const { id, ...updateData } = await request.json();

    if (!id) {
        return NextResponse.json(
            { message: 'User ID is required', isError: true, user:null },
            { status: 400 }
        );
    }

    const result = await updateUser({ _id: id }, updateData);
    const statusCode = result.isError ? (result.message.includes('not found') ? 404 : 500) : 200;
    return NextResponse.json(result, { status: statusCode });
}

// DELETE: Delete a user
export async function DELETE(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json(
            { message: 'User ID is required', isError: true },
            { status: 400 }
        );
    }

    const result = await deleteUser({ _id: id });
    const statusCode = result.isError ? (result.message.includes('not found') ? 404 : 500) : 200;
    return NextResponse.json(result, { status: statusCode });
}