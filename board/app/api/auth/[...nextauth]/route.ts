import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

/**
 * 소셜 서버(GitHub 등)에 리프레시 토큰을 보내서 새 엑세스 토큰을 받아오는 함수임.
 */
async function refreshAccessToken(token: any) {
  try {
    console.log("🔄 [Auth] 토큰 갱신 시도 중...");
    
    // GitHub은 기본적으로 리프레시 토큰을 주지 않는 경우가 많음. 
    // 설정에 따라 다르므로 실제 운영 시에는 해당 제공자 설정을 확인해야 함.
    const url = "https://github.com/login/oauth/access_token";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_ID!,
        client_secret: process.env.GITHUB_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    console.log("✅ [Auth] 토큰 갱신 성공!");
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      // 새 만료 시간 계산 (현재 시간 + 제공자가 준 수명)
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // 새 리프레시 토큰이 오면 교체, 아니면 기존 것 유지함.
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("❌ [Auth] 토큰 갱신 실패:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXTAUTH_MAX_AGE) || 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // 처음 로그인할 때만 실행됨. 소셜 정보를 토큰에 박제함.
      if (account && user) {
        console.log("🆕 [Auth] 신규 로그인 - 토큰 생성");
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000,
          user,
        };
      }

      // 유효기간 체크: 아직 시간이 남았으면 그대로 반환함.
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // 시간이 다 됐으면 재발급 함수를 호출함.
      return await refreshAccessToken(token);
    },

    /**                                                        
     * 클라이언트나 서버 컴포넌트에서 세션을 확인할 때 실행됨. 
     */                                                        
    async session({ session, token }) { // 토큰 속에 저장해뒀던 정보를 실제 세션 객체로 옮겨줌. 그래야 컴포넌트에서 꺼내 쓸 수 있음.   
      if (session.user) {
        session.user.id = token.user?.id;
        session.user.accessToken = token.accessToken;
        session.user.error = token.error; 
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// // Next.js App Router 규격에 맞게 GET/POST 요청을 처리하는 핸들러를 내보냄. 
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };