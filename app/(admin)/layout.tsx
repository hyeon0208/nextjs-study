export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <aside className="w-64 bg-gray-800 p-6 border-r border-gray-700">
                <h2 className="text-xl font-bold mb-4">관리자 모드</h2>
                <ul>
                    <li>통계 확인</li>
                    <li>사용자 관리</li>
                    <li>상품 등록</li>
                </ul>
            </aside>
            <main className="flex-1 p-10 bg-gray-900">{children}</main>
        </div>
    );
}