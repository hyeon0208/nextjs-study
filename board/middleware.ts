import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    console.log(`🛡️ [Middleware] 경로 접속 시도: ${pathname}`);
    
    if (token?.error === "RefreshAccessTokenError") {
      console.warn("⚠️ [Middleware] 토큰 갱신 실패 감지 - 로그인 페이지로 리다이렉트함.");
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      /**
       * 접속을 허용할지 말지 결정함. false면 로그인 페이지로 튕겨버림.
       */
      authorized: ({ token, req }) => {
        // 1. 토큰이 아예 없으면 컷
        if (!token) return false;
        
        // 2. 토큰은 있는데 갱신에 실패한 에러가 담겨있으면 컷
        if (token.error === "RefreshAccessTokenError") return false;
        
        // 그 외에는 통과임
        return true;
      },
    },
  }
);

/**
 * 이 미들웨어가 작동할 경로들을 설정함.
 * 게시글 작성, 수정, 목록 페이지 등을 보호함.
 */
export const config = {
  matcher: ["/write/:path*", "/edit/:path*", "/list/:path*"],
};
