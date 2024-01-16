export interface Schedule {
    id: number;
    startTime: Date;
    endTime: Date;
    userId: number;
    firstName: string;
    lastName: string;
    jobId: number;
    jobTitle: string;
    isApproved: boolean;
}