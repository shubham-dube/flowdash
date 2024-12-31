

interface JWTPayload {
    _id: string;
    email: string;
    displayName: string;
}

interface StatusCount {
    "to-do": number;
    "in-progress": number;
    "completed": number;
    "blocked": number;
    "in-review": number;
}