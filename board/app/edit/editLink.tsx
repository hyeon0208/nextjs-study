'use client'

import { useRouter } from 'next/navigation'

// 일반적으로 함수에 파라미터를 넘기는건 데이터 전달용, Props를 넘기고 받는건 렌더링을 위한 리액트 전용 파라미터
export default function EditLink({ id }: { id: string }) {
    const router = useRouter()

    return (
        <button onClick={() => {
            router.push(`/edit/${id}`)
        }}>수정하기 버튼</button>
    )
}