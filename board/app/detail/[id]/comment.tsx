'use client'

import { useEffect, useState } from "react"

interface CommentData {
  _id: string;
  content: string;
  authorName: string;
  date: string;
}

export default function Comment({ id }: { id: string }) {
  const [comment, setComment] = useState('') // 키보드로 타이핑 중인 "글자"를 기억
  const [data, setData] = useState<CommentData[]>([]) // 서버에서 받아온 "댓글들의 리스트"를 저장

  useEffect(() => { // client component 로드시 서버에 데이터를 요청해서 받아오고 싶을 떄 사용
    fetch('/api/comment?id=' + id) // 화면이 로드될 때 서버에서 데이터를 가져오는 동작을 수행
      .then(r => r.json())
      .then((result) => {
        setData(result)
      })
  }, [id])

  const submitComment = () => {
    if (!comment.trim()) return;

    fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment: comment, _id: id })
    })
      .then((r) => {
        if (r.status === 401) {
          alert('로그인이 필요합니다.');
          window.location.href = '/api/auth/signin';
          return;
        }
        return r.json();
      })
      .then((result) => {
        if (!result) return;
        setComment('')
        // 댓글 작성 후 목록 갱신
        return fetch('/api/comment?id=' + id);
      })
      .then(r => r ? r.json() : null)
      .then(result => {
        if (result) setData(result)
      })
      .catch(err => {
        console.error('댓글 전송 실패:', err)
      })
  }

  return (
    <div className="mt-8 border-t pt-4">
      <div className="font-bold mb-4">댓글목록</div>
      {
        data.length > 0 ?
          data.map((a, i) =>
            <div key={i} className="mb-2 p-2 bg-gray-50 rounded">
              <div className="text-sm font-semibold">{a.authorName}</div>
              <p>{a.content}</p>
            </div>
          )
          : <div className="text-gray-400 mb-4">댓글이 없습니다. 첫 댓글을 작성해보세요!</div>
      }
      <div className="flex gap-2 mt-4">
        <input
          className="border p-2 flex-1 rounded"
          value={comment}
          onChange={(e) => { setComment(e.target.value) }}
          placeholder="댓글을 입력하세요"
        />
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={submitComment}
        >
          댓글전송
        </button>
      </div>
    </div>
  )
}