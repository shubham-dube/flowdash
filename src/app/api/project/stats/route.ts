import {  getProjectsByQuery } from "../../../../services/projectServices";
import { IProject } from "../../../../types/models";
import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dbQuery: FilterQuery<IProject> = {};
    
    // Filters
    if (searchParams.has('createdBy')) {
        dbQuery.createdBy = searchParams.get('createdBy');
    }
    if (searchParams.has('teamMember')) {
        const membersValues = searchParams.get('teamMember');
        if (membersValues) {
            dbQuery.teamMembers = { $in: membersValues.split(',') }; 
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

    const result = await getProjectsByQuery(dbQuery, true);
    const jsonResponse = {
        projectsCount: result.count,
        completed: 0,
        archieved: 0,
        active:0
    }
    dbQuery.status = 'completed';
    jsonResponse.completed = (await getProjectsByQuery(dbQuery, true)).count as number;
    dbQuery.status = 'archived';
    jsonResponse.archieved = (await getProjectsByQuery(dbQuery, true)).count as number;
    dbQuery.status = 'active';
    jsonResponse.archieved = (await getProjectsByQuery(dbQuery, true)).count as number;
    const statusCode = result.isError ? 500 : 200;

    return NextResponse.json(jsonResponse, { status: statusCode });
}