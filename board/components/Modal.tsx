'use client'

interface ModalProps {
    isOpen: boolean;          // 모달이 열려있는지 여부
    title: string;            // 모달 제목
    content: string;          // 모달 내용
    onClose: () => void;      // 닫기 버튼(혹은 확인) 눌렀을 때 실행할 함수
}

export default function Modal({ isOpen, title, content, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center w-64">
                <h4 className="text-lg font-bold mb-4">{title}</h4>
                <p className="mb-4 text-gray-600">{content}</p>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    확인
                </button>
            </div>
        </div>
    );
}