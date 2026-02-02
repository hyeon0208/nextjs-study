// global-error.tsx는 앱 전체가 뻗었을 때 에러 페이지
// error.tsx 처럼 계층형으로 사용하는 것이 아닌 최종으로 사용되는 에러 페이지
// global-error.tsx는 루트 레이아웃(layout.tsx)을 완전히 대체. 즉, 에러가 나면 기존 레이아웃이 사라지기 때문에 새롭게 <html>과 <body>를 정의해줘야 화면이 깨지지 않음.
// https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error

'use client'

import { useEffect } from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Critical Global Error:', error)
    }, [error])

    return (

        <html lang="ko">
            <body className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="p-8 bg-white shadow-2xl rounded-2xl text-center max-w-lg">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                        시스템 전체 오류
                    </h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        죄송합니다. 앱의 핵심 설정을 불러오는 중 치명적인 오류가 발생했습니다.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => reset()}
                            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            앱 다시 시작하기
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full py-3 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            홈으로 이동
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}