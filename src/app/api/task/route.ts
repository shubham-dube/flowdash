import { NextResponse } from 'next/server';
import { createTask, getTask, updateTask, deleteTask, getTasksByQuery } from '@/services/taskServices';
import { FilterQuery } from 'mongoose';
import { ITask } from '@/types/models';

// POST: Create a task
export async function POST(request: Request) {
    const data: Partial<ITask> = await request.json();

    if (!data.projectId || !data.assignedTo || !data.createdBy) {
        return NextResponse.json(
            { message: 'Project ID, Creator id and Assigned Person ID are required', isError: true, task: null },
            { status: 400 }
        );
    }

    const result = await createTask(data);
    const statusCode = result.isError ? 500 : 201;
    return NextResponse.json(result, { status: statusCode });
}

// GET: Get all tasks or a single task by query
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dbQuery: FilterQuery<ITask> = {};

    if(searchParams.has('getOneTask')){
        const taskId = searchParams.get('getOneTask');
        const result = await getTask({_id: taskId});
        return NextResponse.json(result, { status: 200 });
    }

    if(searchParams.has('search')) {
        const search = searchParams.get('search');
        dbQuery.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }
    
    // Filters
    if (searchParams.has('projectId')) {
        const projectIds = searchParams.get('projectId');
        if (projectIds) {
            dbQuery.projectId = { $in: projectIds.split(',') }; 
        }
    }
    if (searchParams.has('assignedBy')) {
        dbQuery.assignedBy = searchParams.get('assignedBy');
    }
    if (searchParams.has('assignedTo')) {
        const assignedToValues = searchParams.get('assignedTo');
        if (assignedToValues) {
            dbQuery.assignedTo = { $in: assignedToValues.split(',') }; 
        }
    }
    if (searchParams.has('reviewedBy')) {
        const reviewedByValues = searchParams.get('reviewedBy');
        if (reviewedByValues) {
            dbQuery.reviewedBy = { $in: reviewedByValues.split(',') }; 
        }
    }
    if (searchParams.has('createdBy')) {
        const createdByValues = searchParams.get('createdBy');
        if (createdByValues) {
            dbQuery.createdBy = { $in: createdByValues.split(',') }; 
        }
    }
    if (searchParams.has('status')) {
        const statusValues = searchParams.get('status');
        if (statusValues) {
            dbQuery.status = { $in: statusValues.split(',') }; 
        }
    }
    if (searchParams.has('priority')) {
        const priorityValues = searchParams.get('priority');
        if (priorityValues) {
            dbQuery.priority = { $in: priorityValues.split(',') };
        }
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

    const result = await getTasksByQuery(dbQuery,false, limit, skip);
    const statusCode = result.isError ? 500 : 200;

    return NextResponse.json(result, { status: statusCode } );
}

// PUT: Update a task
export async function PUT(request: Request) {
    const { _id, ...updateData } = await request.json();

    if (!_id) {
        return NextResponse.json(
            { message: 'Task ID is required', isError: true, task: null },
            { status: 400 }
        );
    }

    const result = await updateTask({ _id: _id }, updateData);
    const statusCode = result.isError ? (result.message.includes('not found') ? 404 : 500) : 200;
    return NextResponse.json(result, { status: statusCode });
}

// DELETE: Delete a task
export async function DELETE(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json(
            { message: 'Task ID is required', isError: true },
            { status: 400 }
        );
    }

    const result = await deleteTask({ _id: id });
    const statusCode = result.isError ? (result.message.includes('not found') ? 404 : 500) : 200;
    return NextResponse.json(result, { status: statusCode });
}
