import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginBtn from '@/components/loginBtn';
import { getServerSession, Session } from "next-auth";
import { LogOutBtn } from "@/components/logOutBtn";
import { authOptions } from "./api/auth/[...nextauth]/route";
import DarkMode from "./darkMode";
import { cookies } from "next/headers";

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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions)

    // useState는 새로고침 시 초기화됨. 
    // 다크모드는 설정한 이후 계속 유지됨 -> 브라우저 내에 저장
    // localStorage는 브라우저 내에 저장 (사용자가 정리하지 않는한 5MB까지 유지 가능)
    // cookie는 서버와 브라우저가 공유 (사용자가 정리하지 않는한 4KB까지 유지 가능)
    // 다크모드를 localStorage 사용했을 때 단점 ??
    // -> 서버와 브라우저가 공유하지 않음 -> 서버는 다크모드인지 몰라서 HTML 먼저 보내준후 브라우저가 마지막에 localStorage 확인하고 부랴부랴 다크모드 적용 -> 살짝 깜빡임
    const cookieStore = await cookies()
    const cookie = cookieStore.get('mode')

    return (
        <html lang="ko">
            <body className={
                cookie != undefined && cookie.value == 'dark'
                    ? 'dark-mode'
                    : ''
            }>
                <div className="navbar">
                    <Link href="/" className="logo">Appleforum</Link>
                    <Link href="/list">List</Link>
                    {
                        session
                            ? <span>{session.user?.name} <LogOutBtn /> </span>
                            : <LoginBtn></LoginBtn>
                    }
                    <DarkMode />
                </div>
                {children}
            </body>
        </html>
    );
}
