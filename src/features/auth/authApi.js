import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', headers: { 'content-type':'application/json' } }),
  endpoints: (b) => ({
    login: b.mutation({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
