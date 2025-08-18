import { baseApi } from "@/redux/api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    createOrder: builder.mutation({
      query: (credentials) => ({
        url: "/order",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    myOrder: builder.query({
      query: () => ({
        url: `/order/my-orders`, // Include userId in the URL
        method: "GET", // Changed from DELETE to GET
      }),
      providesTags: ["User"],
    }),
    revenue: builder.query({
      query: () => ({
        url: `/order/revenue`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    dailyCount: builder.query({
      query: () => ({
        url: `/order/daily-count`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    orderStatus: builder.mutation({
      query: (data) => ({
        url: `/order/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useMyOrderQuery,
  useRevenueQuery,
  useDailyCountQuery,
  useOrderStatusMutation,
} = orderApi;