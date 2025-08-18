import { baseApi } from "@/redux/api/baseApi";

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    
  })
});

export const {
useUploadMutation

} = uploadApi;
