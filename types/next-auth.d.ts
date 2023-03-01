import NextAuth, { Account, DefaultSession, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

interface Users {
  id: number;
  fname: string;
  lname: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
};

interface RootObject {
  status: string;
  message: string;
  accessToken: string;
  expiresIn: number;
  user: Users;
}

declare module "next-auth" {
  interface Session {
    user: {
      uuid: string;
      name: string;
      email: string;
      username: string;
      role: string;
      token: string;
      createdAt: Date;
      updatedAt: Date;
    } | undefined
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      uuid: string;
      name: string;
      email: string;
      username: string;
      role: string;
      token: string;
      createdAt: Date;
      updatedAt: Date;
    } | undefined
  }
}

// declare module "next-auth" {
//   interface Session {
//     user: RootObject | AdapterUser | undefined;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     user: RootObject | AdapterUser | undefined;
//   }
// }

declare module "next-auth" {
  interface User {
    uuid: string;
    name: string;
    email: string;
    username: string;
    role: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

// declare module "next-auth" {
//   interface User {
//     id: number;
//     fname: string;
//     lname: string;
//     username: string;
//     password: string;
//     email: string;
//     avatar: string;
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
