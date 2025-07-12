import type { IBook, IResponse } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type BookQueryParams = {
    filter?: IBook["genre"];
    limit?: number;
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

                const { filter, limit, sort, sortBy } = params;

                const queryObject: Record<string, string> = {};

                if (filter) queryObject.filter = filter;
                if (limit) queryObject.limit = limit.toString();
                if (sortBy) queryObject.sortBy = sortBy;
                if (sort) queryObject.sort = sort;

                const queryString = new URLSearchParams(queryObject).toString();

                return `/books${queryString ? `?${queryString}` : ''}`;
            }
        })
    })
})

export const { useGetAllBooksQuery } = booksApi

export default booksApi