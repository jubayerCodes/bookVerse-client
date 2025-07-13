export const GenreEnum = {
    FICTION: "FICTION",
    NON_FICTION: "NON_FICTION",
    SCIENCE: "SCIENCE",
    HISTORY: "HISTORY",
    BIOGRAPHY: "BIOGRAPHY",
    FANTASY: "FANTASY",
} as const;

export type GenreType = typeof GenreEnum[keyof typeof GenreEnum];

export const genreOptions: GenreType[] = Object.values(GenreEnum);

export interface IBook {
    _id: string,
    title: string,
    author: string,
    genre: GenreType,
    isbn: string,
    description?: string,
    copies: number,
    available: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export interface IResponse {
    success: boolean,
    message: string,
    data?: any,
    error?: any
}

export interface IBorrow {
    _id: string,
    book: string,
    quantity: number,
    dueDate: Date
}

export interface IError {
    success: boolean,
    message: string,
    error: any
}