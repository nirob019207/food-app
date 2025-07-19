import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const secret = process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET || "";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string) || "",
      clientSecret:
        (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string) || "",
    }),
    FacebookProvider({
      clientId: (process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string) || "",
      clientSecret:
        (process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET as string) || "",
    }),
  ],
  secret: secret,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
