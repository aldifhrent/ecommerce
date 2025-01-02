/** @format */

import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3, // 3 jam
  },
  providers: [
    // Provider Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Provider Credentials
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `https://ecommerce-kappa-two-78.vercel.app:5000/users?email=${credentials?.email}&password=${credentials?.password}`,
            {
              method: "GET",
              next: {
                revalidate: 0,
              },
            }
          );

          const data = (await response.json()) as User[];
          if (!data.length) throw new Error("User not found");
          const user = data[0];
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Menambahkan data user dari Google
      if (account?.provider === "google" && user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      // Menambahkan data user dari Credentials
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      return token;
    },

    async session({ session, token }) {
      // Menambahkan token ke session
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
});
