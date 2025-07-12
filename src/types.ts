export interface IBook {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description?: string,
    copies: number,
    available: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IResponse {
    success: boolean,
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any
}