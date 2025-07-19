/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

const baseQueryWithAuth: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions
) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    api.dispatch(logout());
    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

//* for refresh token use this following setup of base api
//* Change the refresh api url (if needed)
//* change the error structure (if needed)
//* change the token name if you are not getting token as a accessToken named then change it according to your data.
//* if you want you can handle other status code (if needed), currently only 401 handled.

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// if (!baseUrl) {
//   throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
// }

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const state = getState() as RootState;
//     const token = state?.auth?.token || null;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });
// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   const state = api.getState() as RootState;
//   const refresh = state?.auth?.refresh_token || null;
//   if (result.error) {
//     const errorData = result.error;
//     result.error = {
//       status: (errorData as any)?.status || 500,
//       data: (errorData as any)?.data?.detail || "something was wrong",
//     };
//   }

//   if (result.error && result.error.status == 401) {
//     const refreshResult = await baseQuery(
//       {
//         url: "auth/token/refresh/",
//         method: "POST",
//         body: { refresh },
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       const newToken = (refreshResult.data as { access: string }).access;
//       api.dispatch(setUser({ token: newToken }));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   endpoints: () => ({}),
//   tagTypes: ["User"],
// });
