import { NextResponse } from 'next/server';
import {  getTasksByQuery } from '@/services/taskServices';
import { FilterQuery } from 'mongoose';
import { ITask } from '@/types/models';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dbQuery: FilterQuery<ITask> = {};
    
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

    const statuses=[ 'to-do' , 'in-progress' , 'completed' , 'blocked' , 'in-review' ]
    const priorities = ['very-low' , 'low' , 'medium' , 'high' , 'very-high' ]

    const jsonResponse = {
        isError: false,
        tasksCount: 0,
        statusCount: {
            "to-do": 0,
            "in-progress": 0,
            "completed": 0,
            "blocked": 0,
            "in-review": 0
        },
        priorityCount: {
            "very-low": 0,
            "low": 0,
            "medium": 0,
            "high": 0,
            "very-high": 0
        }
    }

    for (const status of statuses) {
        const response = await getTasksByQuery({ ...dbQuery, status }, true);
        jsonResponse.statusCount[status as keyof typeof jsonResponse.statusCount] = response.count as number;
    }

    for (const priority of priorities) {
        const response = await getTasksByQuery({ ...dbQuery, priority }, true);
        jsonResponse.priorityCount[priority as keyof typeof jsonResponse.priorityCount] = response.count as number;
    }

    const result = await getTasksByQuery(dbQuery, true);
    jsonResponse.tasksCount = result.count as number;
    const statusCode = result.isError ? 500 : 200;

    return NextResponse.json(jsonResponse, { status: statusCode } );
}