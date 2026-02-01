import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// 최상위 폴더에 있는 layout.tsx는 공통 UI를 정의하는 역할. 모든 페이지에 적용됨.
// 차상위 폴더의 하위 폴더에 있는 layout.tsx는 그 폴더와 하위 페이지에 자동 적용되며 상위에 있는 layout도 포함함ㅁ

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// HTML의 <head>라는 구역 안에 숨겨져 있는 메타데이터를 정의하는 부분
// 일반 사용자의 눈에는 보이지 않지만, 컴퓨터(구글 로봇 등)는 이걸 읽고 페이지를 분류.
// 페이지마다 다르게하는게 핵심이라고 함 -> 모든 페이지의 메타데이터가 같다면 검색 엔진은 이를 '중복 콘텐츠'로 간주해 무시할 수 있음.
export const metadata: Metadata = {
  title: {
    template: "%s | NextJS 앱", // 하위 페이지들의 제목을 감싸는 공통 틀, (하위 페이지에서 title: "내 정보"라고 설정했다면, 실제 브라우저 탭에는 "내 정보 | NextJS 앱"이라고 표시)
    default: "로딩중...", // 하위 페이지에서 별도의 제목을 정의하지 않았을 때 보여줄 기본값
  },
  // title: "킹왕짱 NextJS 앱",
  description: "최고의 NextJS 앱 입니다. 최고를 경험하세요.", // 검색 결과(구글, 네이버 등)에서 제목 아래에 나오는 설명 문구
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="navbar">
          {/* cmd + . 사용하면 import 창 나옴 */}
          <Link href="/">Home</Link>
          <Link href="/list">List</Link>
          <Link href="/cart">Cart</Link>
        </div>

        {children}
      </body>
    </html>
  );
}
