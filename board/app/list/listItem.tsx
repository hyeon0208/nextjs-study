'use client'

import DetailLink from "../detail/[id]/DetailLink";
import EditLink from "../edit/editLink";
import Modal from "@/components/Modal";
import { useModalRefresh } from "@/hooks/useModalRefresh";
import { Post } from "@/types/post";
import { useState } from "react";

interface ListItemProps {
  result: Post[];
}

export default function ListItem({ result }: ListItemProps) {
  const { isOpen, openModal, closeAndRefresh } = useModalRefresh();
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    const listItem = (e.currentTarget).closest('.list-item') as HTMLElement;

    // 1. 애니메이션 시작 (투명하게)
    if (listItem) {
      listItem.style.transition = 'opacity 0.5s';
      listItem.style.opacity = '0.3'; // 완전히 사라지게 하지 않고 흐리게 해서 진행 중임을 표시
    }

    fetch('/api/post', { method: 'DELETE', body: id })
      .then(async (r) => {
        const data = await r.json();

        if (r.status === 200) {
          if (listItem) {
            listItem.style.opacity = '0';
            setTimeout(() => {
              listItem.style.display = 'none';
            }, 500);
          }
        } else {
          if (listItem) {
            listItem.style.opacity = '1';
          }
          setIsSuccess(false);
          setModalMessage(data.error || "삭제에 실패했습니다.");
          openModal();
        }
      })
      .catch(() => {
        if (listItem) listItem.style.opacity = '1';
        alert("서버 통신 오류가 발생했습니다.");
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
        content={isSuccess ? "게시물이 삭제되었습니다." : modalMessage}
        onClose={isSuccess ? closeAndRefresh : () => { location.reload(); }} // 실패 시엔 그냥 닫기 (새로고침 없이)
      />
    </div>
  );
}
