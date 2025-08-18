import { baseApi } from "@/redux/api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    createProduct: builder.mutation({
      query: (credentials) => ({
        url: "/product",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateProduct: builder.mutation({
      query: ({id,data}) => ({
        url: `/product/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    
  })
});

export const {
   useGetProductQuery,
   useCreateProductMutation,
   useDeleteProductMutation,   
   useUpdateProductMutation

} = productApi;
