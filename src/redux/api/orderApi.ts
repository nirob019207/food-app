import { baseApi } from "@/redux/api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getOrder: builder.query({
      query: ({ page = 1, limit = 10, status }) => ({
        url: "/order",
        method: "GET",
        params: { page, limit, status },
      }),
      providesTags: (result, error, { status }) =>
        result
          ? [
              ...result.data.map(({ id }: { id: number }) => ({ type: "Order", id })),
              { type: "Order", id: "LIST" },
              { type: "Order", id: status || "ALL" }, // Tag for specific status
            ]
          : [{ type: "Order", id: "LIST" }, { type: "Order", id: status || "ALL" }],
    }),
    createOrder: builder.mutation({
      query: (credentials) => ({
        url: "/order",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: (result, error, credentials) => [
        { type: "Order", id: "LIST" },
        { type: "Order", id: credentials.status || "PENDING" }, // Invalidate the status of the new order
      ],
    }),
    myOrder: builder.query({
      query: () => ({
        url: `/order/my-orders`, // Include userId in the URL
        method: "GET", // Changed from DELETE to GET
      }),
        providesTags: ["Order","User",'Product'],
    }),
    revenue: builder.query({
      query: () => ({
        url: `/order/revenue`,
        method: "GET",
      }),
        providesTags: ["Order","User",'Product'],
    }),
    dailyCount: builder.query({
      query: () => ({
        url: `/order/daily-count`,
        method: "GET",
      }),
        providesTags: ["Order","User",'Product'],
    }),
     updateOrderStatus: builder.mutation({
      query: ({ orderId, status }: { orderId: number; status: string }) => ({
        url: "/order/status",
        method: "PATCH",
        body: { orderId, status },
      }),
     invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
        { type: "Order", id: "LIST" },
      ],
    }),
    getOrderDetails: builder.query({
  query: (orderId) => ({
    url: `/order/${orderId}`,
    method: 'GET',
  }),
        providesTags: ["Order","User",'Product'],

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
  useGetOrderDetailsQuery,
} = orderApi;