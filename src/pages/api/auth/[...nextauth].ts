import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers:[
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const {username, password} = credentials as {
          username: string;
          password: string;
        };
        if(username !== "sittipol" && password !== "1234"){
          throw new Error('invalid cre')
        }
        return {id: '123', name: 'sittipol'}
      },
    })
  ],
  pages: {
    signIn: '/login/',
    error: '/login/',
  }
}

export default NextAuth(authOptions)