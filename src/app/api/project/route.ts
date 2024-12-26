import { NextResponse } from 'next/server';
import { createProject, getProject, updateProject, deleteProject, getProjectsByQuery } from '@/services/projectServices';
import { FilterQuery } from 'mongoose';
import { IProject } from '@/types/models';

// POST: Create a project
export async function POST(request: Request) {
    const data: Partial<IProject> = await request.json();

    if (!data.title || !data.description || !data.createdBy || !data.teamMembers) {
        return NextResponse.json(
            { message: 'Title, description, creator ID, and team members are required', isError: true, project: null },
            { status: 400 }
        );
    }

    const result = await createProject(data);
    const statusCode = result.isError ? 500 : 201;
    return NextResponse.json(result, { status: statusCode });
}

// GET: Get all projects or a single project by query
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dbQuery: FilterQuery<IProject> = {};

    if (searchParams.has('getOneProject')) {
        const projectId = searchParams.get('getOneProject');
        const result = await getProject({ _id: projectId });
        const statusCode = result.isError ? (result.message.includes('not found') ? 404 : 500) : 200;
        return NextResponse.json(result, { status: statusCode });
    }

    // Filters
    if (searchParams.has('createdBy')) {
        dbQuery.createdBy = searchParams.get('createdBy');
    }
    if (searchParams.has('status')) {
        dbQuery.status = searchParams.get('status');
    }
    if (searchParams.has('deadlineBefore')) {
        dbQuery.deadline = { $lte: new Date(searchParams.get('deadlineBefore')!) };
    }
    if (searchParams.has('deadlineAfter')) {
        dbQuery.deadline = { ...(dbQuery.deadline || {}), $gte: new Date(searchParams.get('deadlineAfter')!) };
    }
    if (searchParams.has('lastUpdatedBefore')) {
        dbQuery.lastUpdated = { $lte: new Date(searchParams.get('lastUpdatedBefore')!) };
    }
    if (searchParams.has('lastUpdatedAfter')) {
        dbQuery.lastUpdated = { ...(dbQuery.lastUpdated || {}), $gte: new Date(searchParams.get('lastUpdatedAfter')!) };
    }

    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const skip = searchParams.has('skip') ? parseInt(searchParams.get('skip')!) : 0;

    const result = await getProjectsByQuery(dbQuery, limit, skip);
    const statusCode = result.isError ? 500 : 200;

    return NextResponse.json(result, { status: statusCode });
}

// PUT: Update a project
export async function PUT(request: Request) {
    const { id, ...updateData } = await request.json();

    if (!id) {
        return NextResponse.json(
            { message: 'Project ID is required', isError: true, project: null },
            { status: 400 }
        );
    }

    const result = await updateProject({ _id: id }, updateData);
    const statusCode = result.isError ? (result.message.includes('not found') ? 404 : 500) : 200;
    return NextResponse.json(result, { status: statusCode });
}

// DELETE: Delete a project
export async function DELETE(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json(
            { message: 'Project ID is required', isError: true },
            { status: 400 }
        );
    }

    const result = await deleteProject({ _id: id });
    const statusCode = result.isError ? (result.message.includes('not found') ? 404 : 500) : 200;
    return NextResponse.json(result, { status: statusCode });
}
