'use client'

import DetailLink from "../detail/[id]/DetailLink";
import EditLink from "../edit/editLink";
import Modal from "@/components/Modal";
import { useModalRefresh } from "@/hooks/useModalRefresh";
import { Post } from "@/types/post";
import { useState } from "react";

interface ListItemProps { // Props는 "객체"여야 하므로 인터페이스로 감싸야함
  result: Post[];
}

export default function ListItem({ result }: ListItemProps) {
  const { isOpen, openModal, closeAndRefresh } = useModalRefresh(); // use...로 시작하는 훅(Hook)들은 반드시 컴포넌트 함수 내부의 최상단에서 무조건 실행되야함
  const [isSuccess, setIsSuccess] = useState(true);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    const listItem = (e.currentTarget).closest('.list-item') as HTMLElement;

    if (listItem) {
      // 삭제 요청 전/후에 애니메이션 적용
      listItem.style.transition = 'opacity 0.5s';
      listItem.style.opacity = '0';
    }

    fetch('/api/post', { method: 'DELETE', body: id })
      .then((r) => {
        if (r.status === 200) {
          setTimeout(() => {
            if (listItem) listItem.style.display = 'none';
          }, 500);
        }
      });
  };

  return (
    <div className="list-bg">
      {result.map((post, i) => (
        <div className="list-item" key={i}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>

          <DetailLink id={post._id} />
          <EditLink id={post._id} />

          <span
            onClick={(e) => handleDelete(post._id, e)}
            className="cursor-pointer ml-3 text-red-500 hover:font-bold"
          >
            🗑️ 삭제
          </span>
        </div>
      ))}

      <Modal
        isOpen={isOpen}
        title={isSuccess ? "삭제 완료" : "삭제 실패"}
        content={isSuccess ? "게시물이 삭제되었습니다." : "오류가 발생했습니다."}
        onClose={closeAndRefresh}
      />
    </div>
  );
}