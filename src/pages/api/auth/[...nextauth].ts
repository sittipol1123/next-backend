import NextAuth, { NextAuthOptions, Account } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        // if(username !== "sittipol" && password !== "1234"){
        //   throw new Error('invalid cre')
        // }
        const arr = { username: username, password: password };
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify(arr),
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (json.status == "ok") {
          return json.user;
        }
        return null;
      },
    }),
  ],
  secret: "secret",
  callbacks: {
    async jwt({token, user, account}) {
      if (user) {
        // token.accessToken = account.access_token;
        token.accessToken = user?.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login/",
    error: "/login/",
  },
};

export default NextAuth(authOptions);
