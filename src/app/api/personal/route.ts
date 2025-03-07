import { NextResponse } from 'next/server';
import { IContact } from '../../../types/models';
import { AddContactUser, deleteMessage, getAllContacts } from '@/services/personalService';

export async function POST(request: Request) {
    let data: Partial<IContact>;

    try {
        data = await request.json();
    } catch (error) {
        return NextResponse.json(
            { message: 'Invalid JSON format', isError: true, data: null },
            { status: 400 }
        );
    }

    if (!data.name) {
        return NextResponse.json(
            { message: 'Name is required', isError: true, data: null },
            { status: 400 }
        );
    }

    const result = await AddContactUser (data);
    const statusCode = result.isError ? 500 : 200;
    return NextResponse.json(result, { status: statusCode });
}
    
export async function GET(request: Request) {
    const result = await getAllContacts(); 
    const statusCode = result.isError ? 500 : 200;
    return NextResponse.json(result, { status: statusCode });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json(
            { message: 'Contact ID is required', isError: true },
            { status: 400 }
        );
    }

    const result = await deleteMessage({ _id: id });
    const statusCode = result.isError ? (result.message.includes('not found') ? 404 : 500) : 200;
    return NextResponse.json(result, { status: statusCode });
}