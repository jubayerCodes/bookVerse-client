export interface IBook {
    _id: string,
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
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