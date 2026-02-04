import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginBtn from '@/components/loginBtn';
import { getServerSession, Session } from "next-auth";
import { LogOutBtn } from "@/components/logOutBtn";
import { authOptions } from "./api/auth/[...nextauth]/route";

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

    return (
        <html lang="ko">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="navbar">
                    <Link href="/" className="logo">Appleforum</Link>
                    <Link href="/list">List</Link>
                    {
                        session
                            ? <span>{session.user?.name} <LogOutBtn /> </span>
                            : <LoginBtn></LoginBtn>
                    }
                </div>
                {children}
            </body>
        </html>
    );
}
