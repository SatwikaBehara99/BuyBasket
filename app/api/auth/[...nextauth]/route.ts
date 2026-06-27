export const runtime = "nodejs";

import NextAuth, {
  NextAuthOptions,
} from "next-auth";

import CredentialsProvider
from "next-auth/providers/credentials";

import { prisma }
from "@/lib/prisma";

import bcrypt from "bcrypt";

export const authOptions:
NextAuthOptions = {

  providers: [

    // ================= USER LOGIN =================
    CredentialsProvider({

      id: "user-login",

      name: "User Login",

      credentials: {

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {

        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        // ===== CHECK ADMIN FIRST =====

        const admin =
          await prisma.admin.findUnique({
            where: {
              email: credentials.email,
            },
          });

        if (admin) {

          const valid =
            await bcrypt.compare(
              credentials.password,
              admin.password
            );

          if (!valid) {
            return null;
          }

          return {
            id: admin.id,
            email: admin.email,
            role: "admin",
          };
        }

        // ===== CHECK USER =====

        const user =
          await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

        if (!user) {
          return null;
        }

        const valid =
          await bcrypt.compare(
            credentials.password,
            user.password
          );

        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: "user",
        };
      },
    }),

    // ================= ADMIN LOGIN =================
    CredentialsProvider({

      id: "admin-login",

      name: "Admin Login",

      credentials: {

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {

        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const admin =
          await prisma.admin.findUnique({
            where: {
              email: credentials.email,
            },
          });

        if (!admin) {
          return null;
        }

        const valid =
          await bcrypt.compare(
            credentials.password,
            admin.password
          );

        if (!valid) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          role: "admin",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",

    maxAge: 60 * 60, // 1 hour
  },

  jwt: {
    maxAge: 60 * 60,
  },

  callbacks: {

    async jwt({ token, user }) {

  const now = Date.now();

  if (user) {

    token.id = user.id;

    token.role =
      (user as any).role;

    token.loginTime = now;
  }

  token.lastActivity = now;

  if (
    token.email &&
    token.role === "user"
  ) {

    const dbUser =
      await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

    if (dbUser) {

      token.name =
        dbUser.name;

      token.phone =
        dbUser.phone;
    }
  }

  return token;
},



    async session({
  session,
  token,
}) {

  if (session.user) {

    (session.user as any).id =
      token.id;

    (session.user as any).role =
      token.role;

    session.user.name =
      token.name as string;

    session.user.email =
      token.email as string;

    (session.user as any).phone =
      token.phone;
  }

  return session;
},
  },

  pages: {
    signIn: "/login",
  },

  secret:
    process.env.NEXTAUTH_SECRET,
};

const handler =
  NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};