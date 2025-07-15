import type { IBook, IBorrow, IResponse } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type BookQueryParams = {
    filter?: IBook["genre"] | null;
    limit?: string;
    sortBy?: string;
    sort?: 'asc' | 'desc';
    page?: number
};

type BorrowQueryParams = {
    limit?: string;
    page?: number
};

export const booksApi = createApi({
    reducerPath: 'booksApi',
    tagTypes: ['books', "borrows"],
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API }),
    endpoints: (builder) => ({
        getAllBooks: builder.query<IResponse, BookQueryParams | void>({
            query: (params) => {
                if (!params) return '/books';

                const { filter, limit, sort, sortBy, page } = params;

                const queryObject: Record<string, string> = {};

                if (filter) queryObject.filter = filter;
                if (page) queryObject.page = page.toString();
                if (limit) queryObject.limit = limit.toString();
                if (sortBy) queryObject.sortBy = sortBy;
                if (sort) queryObject.sort = sort;

                const queryString = new URLSearchParams(queryObject).toString();

                return `/books${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ["books"]
        }),
        postBook: builder.mutation<IResponse, Omit<IBook, "_id" | "createdAt" | "updatedAt">>({
            query: (book) => ({
                url: '/books',
                method: "POST",
                body: book
            }),
            invalidatesTags: ["books"]
        }),
        postBorrow: builder.mutation<IResponse, Omit<IBorrow, "_id">>({
            query: (borrow) => ({
                url: "/borrow",
                method: "POST",
                body: borrow
            }),
            invalidatesTags: ["books", "borrows"]
        }),
        updateBook: builder.mutation<IResponse, Omit<IBook, "createdAt" | "updatedAt" | "available">>({
            query: (updatedBook) => ({
                url: `/books/${updatedBook._id}`,
                method: "PUT",
                body: updatedBook
            }),
            invalidatesTags: ["books", "borrows"]
        }),
        deleteBook: builder.mutation<IResponse, string>({
            query: (bookId) => ({
                url: `/books/${bookId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["books", "borrows"]
        }),
        getBorrowSummary: builder.query<IResponse, BorrowQueryParams>({
            query: (params) => {

                if (!params) return '/borrow';

                const { limit, page } = params;

                const queryObject: Record<string, string> = {};

                if (page) queryObject.page = page.toString();
                if (limit) queryObject.limit = limit.toString();

                const queryString = new URLSearchParams(queryObject).toString();

                return `/borrow${queryString ? `?${queryString}` : ''}`
            },
            providesTags: ["borrows"]
        })
    })
})

export const { useGetAllBooksQuery, usePostBorrowMutation, useUpdateBookMutation, useDeleteBookMutation, useGetBorrowSummaryQuery, usePostBookMutation } = booksApi

export default booksApi