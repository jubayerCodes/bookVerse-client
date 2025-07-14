import type { IBook, IBorrow, IResponse } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type BookQueryParams = {
    filter?: IBook["genre"] | null;
    limit?: string;
    sortBy?: string;
    sort?: 'asc' | 'desc';
};

export const booksApi = createApi({
    reducerPath: 'booksApi',
    tagTypes: ['books'],
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API }),
    endpoints: (builder) => ({
        getAllBooks: builder.query<IResponse, BookQueryParams | void>({
            query: (params) => {
                if (!params) return '/books';

                console.log(params);
                const { filter, limit, sort, sortBy } = params;

                const queryObject: Record<string, string> = {};

                if (filter) queryObject.filter = filter;
                if (limit) queryObject.limit = limit.toString();
                if (sortBy) queryObject.sortBy = sortBy;
                if (sort) queryObject.sort = sort;

                const queryString = new URLSearchParams(queryObject).toString();

                return `/books${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ["books"]
        }),
        postBorrow: builder.mutation<IResponse, Omit<IBorrow, "_id">>({
            query: (borrow) => ({
                url: "/borrow",
                method: "POST",
                body: borrow
            }),
            invalidatesTags: ['books'],
        }),
        updateBook: builder.mutation<IResponse, Omit<IBook, "createdAt" | "updatedAt" | "available">>({
            query: (updatedBook) => ({
                url: `/books/${updatedBook._id}`,
                method: "PUT",
                body: updatedBook
            }),
            invalidatesTags: ["books"]
        }),
        deleteBook: builder.mutation({
            query: (bookId) => ({
                url: `/books/${bookId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["books"]
        })
    })
})

export const { useGetAllBooksQuery, usePostBorrowMutation, useUpdateBookMutation, useDeleteBookMutation } = booksApi

export default booksApi