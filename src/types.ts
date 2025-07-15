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

export const bookKeys = [
    "title",
    "author",
    "isbn",
    "copies",
    "available",
    "createdAt",
    "updatedAt",
]

export interface IMeta {
    total: number;
    page: number;
    pages: number;
    limit: number;
}

export interface IResponse {
    success: boolean,
    message: string,
    data?: any,
    error?: any,
    meta?: IMeta
}

export interface IBorrow {
    _id: string,
    book: string,
    quantity: number,
    dueDate: Date
}

export interface ISummedBorrow {
    _id: string,
    book: {
        title: string,
        isbn: string,
    }
    totalQuantity: number
}

export interface IError {
    success: boolean,
    message: string,
    error: any
}