import NextAuth, { NextAuthOptions, Account } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type Myuser = {
  id: number;
  fname: string;
  lname: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
}

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
        const res = await fetch("https://www.melivecode.com/api/login", {
          method: "POST",
          body: JSON.stringify(arr),
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        // console.log(json);
        if (json.status == "ok") {
          return json.user;
        }
        return null;
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({token, user, account}) {
      // console.log(user);
      if (account) {
        token.accessToken = account.access_token;
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
