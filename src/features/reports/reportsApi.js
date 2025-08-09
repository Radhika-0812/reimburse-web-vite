import { baseApi } from '../../app/baseApi.js';

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getMyReports: b.query({
      query: ({ status, page = 0, size = 10 } = {}) =>
        `/reports?mine=true${status ? `&status=${status}` : ''}&page=${page}&size=${size}`,
      providesTags: [{ type: 'Reports', id: 'LIST' }],
    }),
    getReport: b.query({
      query: (id) => `/reports/${id}`,
      providesTags: (res, err, id) => [{ type: 'Report', id }],
    }),
    createReport: b.mutation({
      query: (payload) => ({ url: '/reports', method: 'POST', body: payload }),
      invalidatesTags: [{ type: 'Reports', id: 'LIST' }],
    }),
    addItem: b.mutation({
      query: ({ reportId, item }) => ({ url: `/reports/${reportId}/items`, method: 'POST', body: item }),
      invalidatesTags: (res, err, { reportId }) => [{ type: 'Report', id: reportId }],
    }),
    submitReport: b.mutation({
      query: (reportId) => ({ url: `/reports/${reportId}/submit`, method: 'POST' }),
      invalidatesTags: [{ type: 'Reports', id: 'LIST' }],
    }),
    presignReceipt: b.mutation({
      query: ({ reportId, filename }) => ({ url: `/reports/${reportId}/receipts/presign?filename=${encodeURIComponent(filename)}`, method: 'POST' })
    }),
  }),
});

export const {
  useGetMyReportsQuery,
  useGetReportQuery,
  useCreateReportMutation,
  useAddItemMutation,
  useSubmitReportMutation,
  usePresignReceiptMutation
} = reportsApi;
