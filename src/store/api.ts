import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseQuery = async (args: any, api: any, extraOptions: any) => {
 const baseUrl =
   "https://novaflowdocumentservice-axhseggmeeffgjc2.centralindia-01.azurewebsites.net/api/";
 const request =
 typeof args === "string" ? { url: args } : { ...args, url: args.url };
const isFormData = request.body instanceof FormData;
  const headers: Record<string, string> =
    request.headers instanceof Headers
      ? Object.fromEntries(request.headers.entries())
      : (request.headers as Record<string, string>) || {};

   if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  console.log('headers', headers);
const fetchArgs: RequestInit = {
    method: request.method || "GET",
    headers,
    body:
      request.method && request.method !== "GET"
        ? isFormData
          ? request.body
          : JSON.stringify(request.body)
        : undefined,
  };

  try {
 const response = await fetch(`${baseUrl}${request.url}`, fetchArgs);
 const contentType = response.headers.get("content-type") || "";
let data;
    if (contentType.includes("application/pdf")) {
         data = await response.blob();
    }
else if (contentType.includes("application/json")) {
 data = await response.json();
 } else {
 data = await response.text();
 }
 if (!response.ok) {
return {
 error: {
status: response.status,
data,
},};}
return { data, meta: { response } };
} catch (error: any) {
 return {
 error: {
 status: "FETCH_ERROR",
data: error?.message || "Network error",
  }, };}};

export const api = createApi({
  reducerPath: "api",
  baseQuery: apiBaseQuery,
  tagTypes: ["CRUD"],
  endpoints: (builder) => ({
    getItems: builder.query<any, string>({
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
    getOCRValues: builder.query<any, string>({
      query: (id) => `OpentextSource/GetOCRValues?id=${id}`,
      providesTags: [],
    }),
    getTMinValues: builder.query<any, string>({
      query: (id) => `TminCalculation/GetTMinInput?eslId=${id}`,
      providesTags: [],
    }),
  }),
})

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetOCRValuesQuery,
  useGetTMinValuesQuery,
} = api;
