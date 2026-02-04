import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * NextAuth 세션 및 JWT 타입 확장
 */
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      error?: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    user?: any;
    error?: string;
  }
}

/**
 * [ 데이터 취득 방식 및 API 구성 가이드 ]
 * ---------------------------------------------------------------------------------------
 * 구분              | 데이터 위치        | Next.js 사용법           | Spring 비유
 * ---------------------------------------------------------------------------------------
 * URL 파라미터       | URL Path (/123)   | context.params          | @PathVariable
 * JSON/텍스트 데이터 | HTTP Body         | req.json() / req.text() | @RequestBody
 * 폼(Form) 데이터    | HTTP Body (Form)  | req.formData()          | @ModelAttribute
 * 유저 인증 정보     | Session/Cookie    | session (withAuth 주입) | @AuthenticationPrincipal
 * ---------------------------------------------------------------------------------------
 */

/**
 * Next.js 15+ 에서는 params가 Promise로 제공
 */
export interface RouteContext<T = Record<string, string>> {
  params: Promise<T>;
}

/**
 * 인증된 핸들러 타입 정의
 */
type AuthHandler<T> = (
  req: Request,
  session: Session,
  context: RouteContext<T>
) => Promise<Response>;

/**
 * Spring의 ArgumentResolver와 유사하게 인증을 처리하고 세션을 주입하는 고차 함수
 */
export function withAuth<T = Record<string, string>>(handler: AuthHandler<T>) {
  return async (req: Request, context: RouteContext<T>) => {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // 인증된 세션을 핸들러의 두 번째 인자로 주입
    // Next.js 15+ 규격에 따라 context(params 포함)를 그대로 전달
    return handler(req, session, context);
  };
}