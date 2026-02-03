'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditFormProps {
  id: string;
  defaultTitle: string;
  defaultContent: string;
}

export default function EditForm({ id, defaultTitle, defaultContent }: EditFormProps) {
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 1. 폼의 기본 전송 기능(새로고침) 막기

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/post/edit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        alert("수정 실패: 서버 오류");
      }
    } catch (error) {
      console.error(error);
      alert("네트워크 오류 발생");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" defaultValue={defaultTitle} className="block border p-2 mb-2" />
        <input name="content" defaultValue={defaultContent} className="block border p-2 mb-2" />
        <input type="hidden" name="_id" defaultValue={id} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">전송</button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h4 className="mb-4 text-lg font-bold">수정 완료!</h4>
            <p className="mb-4">게시물이 성공적으로 수정되었습니다.</p>
            <button
              onClick={() => {
                setShowModal(false);
                router.back(); // 확인 누르면 이전 페이지로 이동
                // router.push('/list'); // 목록으로 보내고 싶으면 이걸
                router.refresh(); // 데이터 갱신을 위해 새로고침 효과
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}