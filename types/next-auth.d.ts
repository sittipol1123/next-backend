import NextAuth, { Account, DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      fname: string;
      lname: string;
      username: string;
      password: string;
      email: string;
      avatar: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      fname: string;
      lname: string;
      username: string;
      password: string;
      email: string;
      avatar: string;
    }
  }
}

declare module "next-auth" {
  interface User {
    id: number;
    fname: string;
    lname: string;
    username: string;
    password: string;
    email: string;
    avatar: string;
  }
}

// declare module "next-auth/jwt" {
//   interface User {
//     user: {
//       id: number;
//       fname: string;
//       lname: string;
//       username: string;
//       password: string;
//       email: string;
//       avatar: string;
//     };
//   }
// }

declare module "next-auth" {
  interface Session {
    accessToken?: Account.accessToken;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: Account.accessToken;
  }
}
