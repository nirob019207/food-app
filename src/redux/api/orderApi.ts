import { baseApi } from "@/redux/api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getOrder: builder.query({
      query: ({ page = 1, limit = 10, status }) => ({
        url: "/order",
        method: "GET",
        params: { page, limit, status },
      }),
      providesTags: ["Order"],
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
     updateOrderStatus: builder.mutation({
      query: ({ orderId, status }: { orderId: number; status: string }) => ({
        url: "/order/status",
        method: "PATCH",
        body: { orderId, status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useMyOrderQuery,
  useRevenueQuery,
  useDailyCountQuery,
  useUpdateOrderStatusMutation,
} = orderApi;