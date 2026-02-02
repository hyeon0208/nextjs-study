import type { Metadata, Viewport } from "next";
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
  // 이 주소가 sitemap.ts에서 사용할 baseUrl과 일치해야 함.
  metadataBase: new URL("https://www.mysite.com"), // 모든 하위 레이아웃의 메타데이터 URL이 이 주소를 시작하도록 만듬.
  title: {
    default: "최강블로그 - 최고의 경험을 제공합니다",
    template: "%s - 최강블로그",
  },
  alternates: { // 공통 표준 URL 설정
    canonical: "/", // 메인 페이지의 원본은 ttps://www.mysite.com 임을 명시
  },
  description: "Next.js로 만든 초고속 블로그입니다. 여기서 다양한 정보를 확인하세요.",
  robots: { // 검색 엔진 수집 제어
    index: true,
    follow: true,
    googleBot: { // 구글 검색 엔진에게 더 구체적인 가이드 제공
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large', // 글 검색 결과에 내 글의 썸네일이 크게 나오도록 유도
      'max-snippet': -1,
    },
  },
  openGraph: { // 소셜 미디어 공유 (Open Graph)
    title: "최강블로그",
    description: "나만의 기록, 최강블로그",
    url: "https://www.mysite.com",
    siteName: "최강블로그",
    images: [
      {
        url: "https://www.mysite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "내 서비스 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website", // 검색 엔진이 이 페이지를 어떤 성격의 콘텐츠로 분류해 인식할지를 알려줌 (메인 레이아웃은 website, 포스트 상세는 article로 설정)
  },
  twitter: { // 커뮤니티(X/Twitter) 공유 최적화
    card: "summary_large_image", // 큰 이미지가 포함된 카드 형태
    title: "최강블로그",
    description: "나만의 기록, 최강블로그",
    images: ["/og-image.png"],
  },
  verification: { // 내가 이 사이트의 진짜 주인이라는 인증
    // 서치 콘솔에서 실제 발급받은 코드를 넣어야함
    google: "google-site-verification-code",
    other: {
      "naver-site-verification": ["naver-site-verification-code"],
    },
  },
};

export const viewport: Viewport = { // 기기 화면 크기에 맞춰 사이트를 어떻게 보여줄지 결정 (현재는 화면 너비를 기기 너비에 맞추고, 처음에 100% 크기)
  width: 'device-width',
  initialScale: 1,
  themeColor: "#ffffff",
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
