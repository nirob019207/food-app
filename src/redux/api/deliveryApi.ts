/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const deliveryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDelivery: builder.query({
      query: () => '/deliveries',
      providesTags: ["Delivery"],
    }),
    getGetDeliveryCharge: builder.query<any, number>({
      query: (totalAmount) => `/deliveries/get-charge?totalAmount=${totalAmount}`,
      providesTags: ["Delivery"],
    }),

    createDelivery: builder.mutation({
      query: (data) => ({
        url: '/deliveries',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Delivery"],
    }),

    updateDelivery: builder.mutation({
      query: ({ id, data }) => ({
        url: `/deliveries/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ["Delivery"],
    }),

    deleteDelivery: builder.mutation({
      query: (id) => ({
        url: `/deliveries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Delivery"],
    }),
  }),
});

export const { 
  useGetDeliveryQuery, 
  useCreateDeliveryMutation, 
  useUpdateDeliveryMutation, 
  useDeleteDeliveryMutation,
  useLazyGetGetDeliveryChargeQuery
} = deliveryApi;
