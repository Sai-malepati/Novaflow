import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }), // change later
  tagTypes: ["CRUD"],
  endpoints: (builder) => ({
    getItems: builder.query<any[], string>({
      query: (endpoint) => endpoint,
      providesTags: ["CRUD"],
    }),
    createItem: builder.mutation<any, { endpoint: string; body: any }>({
      query: ({ endpoint, body }) => ({
        url: endpoint,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CRUD"],
    }),
    updateItem: builder.mutation<any, { endpoint: string; id: string; body: any }>({
      query: ({ endpoint, id, body }) => ({
        url: `${endpoint}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CRUD"],
    }),
    deleteItem: builder.mutation<any, { endpoint: string; id: string }>({
      query: ({ endpoint, id }) => ({
        url: `${endpoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CRUD"],
    }),
  }),
})

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = api;
