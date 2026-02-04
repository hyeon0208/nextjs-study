import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),  // NextAuth는 기본값으로 JWT 사용한다고함, 세션 방식 사용하고 싶다면 이 방법. 
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };