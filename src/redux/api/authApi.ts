import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    socialAuth: builder.mutation({
      query: (credentials) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSocialAuthMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateUserMutation,
} = authApi;
