export interface PageStatus {
    id: string;
    title: string;
    content: string;
}

export interface PageDto {
    id: string;
    title: string;

    link: string;
    content: string;
    isActive: boolean;
    isArchived: boolean;
}
