import { baseApi } from "@/redux/api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (credentials) => ({
        url: "/product",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({id,data}) => ({
        url: `/product/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    
  })
});

export const {
   useGetProductQuery,
   useCreateProductMutation,
   useDeleteProductMutation,   
   useUpdateProductMutation

} = productApi;
