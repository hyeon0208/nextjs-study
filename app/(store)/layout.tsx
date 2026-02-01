// 패키지명을 () 소괄호로 감싸면 라우트 그룹을 사용하는 것임
// 라우트 그룹은 URL 주소창에는 아무런 영향을 주지 않으면서, 폴더 구조만 깔끔하게 정리하고 싶을 때 사용하는 기능
// => URL은 건드리지 않으면서, 특정 페이지들만 묶어서 옷(레이아웃)을 갈아입힐 수 있음.
// (auth) 폴더 안에 login/page.tsx를 만들어도 주소는 /auth/login이 아니라 /login이 됨.
// 그룹별로 서로 다른 layout.tsx를 사용할 수 있음.
// 주의할점
    // (groupA)/about/page.tsx와 (groupB)/about/page.tsx를 동시에 만들면 안 됨. Next.js 입장에서는 둘 다 주소가 /about이라서 어디로 가야 할지 몰라 에러 발생
    // 최상위 그룹에 layout.tsx가 반드시 존재해야함 (모든 그룹의 공통 뼈대)
// https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

import Link from "next/link";

// ex
    // 모든 페이지는 최상위의 layout.tsx를 사용하지만, (auth) 그룹은 auth-layout.tsx를 사용함.
    // 즉, 로그인 페이지면 헤더 감추기 같은 기능을 구현할 수 있음.

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-yellow-50 min-h-screen">
            <header className="p-4 bg-white shadow-md flex justify-between">
                <strong className="text-orange-500">My Super Store 🛒</strong>
                <nav><Link href="/list">상품목록</Link> | <Link href="/cart">장바구니</Link></nav>
            </header>
            <main className="p-8">{children}</main>
        </div>
    );
}