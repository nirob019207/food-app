import { baseApi } from "@/redux/api/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (credentials) => ({
        url: "/category",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({id,data}) => ({
        url: `/category/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    
  })
});

export const {
   useGetCategoryQuery,
   useCreateCategoryMutation,
   useDeleteCategoryMutation,   
   useUpdateCategoryMutation

} = categoryApi;
