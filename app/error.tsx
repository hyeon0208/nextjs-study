// not-found.tsx는 예약된 에러 페이지 파일이며, 그외 에러는 error.tsx를 사용해서 계층적 구조로 에러 페이지를 처리할 수 있음.
// app / dashboard / error.tsx에 두면 대시보드 안에서 터진 에러만 잡습니다.
// app / error.tsx에 두면 서비스 전체의 에러를 잡는 공통 에러 페이지가 됩니다.
// error.tsx는 레이아웃을 살린 에러 페이지라면, global-error.tsx는 앱 전체가 뻗었을 때 에러 페이지

'use client' // 에러 핸들링은 클라이언트 측에서 이루어져야 함. (클라이언트 측에서 재시도하는 등의 작업이 이뤄질 수 있기 때문)

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void // 페이지 전체를 새로고침하지 않고, 에러가 난 컴포넌트 트리만 다시 그려보려고 시도
}) {
    useEffect(() => { // 이벤트가 발생 됐을 때 딱 한번 실행되는 훅, 기본 코드는 렌더링될 때마다 매번 실행되지만, useEffect는 내가 원하는 조건(의존성 배열 ex: [error])이 충족될 때만 실행된다
        // Sentry나 로그 수집 서버로 에러를 보낼 때
        console.error('Captured Error:', error)
    }, [error])

    // 특정 에러 메시지나 조건에 따른 분기 처리
    if (error.message === 'AUTH_REQUIRED') {
        return (
            <div className="flex flex-col items-center p-10">
                <h1 className="text-2xl font-bold text-orange-500">로그인이 필요합니다.</h1>
                <a href="/login" className="mt-4 text-blue-500 underline">로그인 페이지로 이동</a>
            </div>
        )
    }

    // 런타임 에러(500) 처리
    return (
        <div className="flex flex-col items-center p-10 border-2 border-red-200 rounded-xl bg-red-50">
            <h1 className="text-2xl font-bold text-red-600">시스템 오류가 발생했습니다.</h1>
            <p className="text-gray-600 mt-2">잠시 후 다시 시도해 주세요.</p>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => reset()} // 에러가 발생한 부분만 다시 렌더링 시도
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    다시 시도하기
                </button>
                <button
                    onClick={() => window.location.reload()} // 아예 새로고침
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                    페이지 새로고침
                </button>
            </div>
        </div>
    )
}