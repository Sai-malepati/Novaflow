import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  tagTypes: ["CRUD"],
  endpoints: (builder) => ({
    getItems: builder.query<any[], string>({
      query: (endpoint) => endpoint,
      providesTags: ["CRUD"],
    }),
    createItem: builder.mutation<any, { endpoint: string; method?: string; body: any }>({
      query: ({ endpoint, method, body }) => ({
        url: endpoint,
        method: method || "POST",
        body,
      }),
      invalidatesTags: ["CRUD"],
    }),
    updateItem: builder.mutation<any, { endpoint: string; id: string; method?: string; body: any }>(
      {
        query: ({ endpoint, id, method, body }) => ({
          url: `${endpoint}/${id}`,
          method: method || "PUT",
          body,
        }),
        invalidatesTags: ["CRUD"],
      },
    ),
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
