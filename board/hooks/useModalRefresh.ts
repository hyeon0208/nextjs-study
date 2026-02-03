'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useModalRefresh() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsOpen(true);
  
  // 1. 그냥 닫기 (실패했을 때 사용)
  const closeModal = () => setIsOpen(false); 

  // 2. 닫고 새로고침 (성공했을 때 사용)
  const closeAndRefresh = () => {
    setIsOpen(false);
    router.refresh();
  };

  // closeModal도 같이 내보내줍니다.
  return { isOpen, openModal, closeModal, closeAndRefresh };
}