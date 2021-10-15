export interface Book<T> {
    id: string,
    name: string,
    color: string,
    author: string,
    createdAt?: string,
    isSaved?: boolean,
    lastUpdatedAt: string,
    chapters: T[]
}
