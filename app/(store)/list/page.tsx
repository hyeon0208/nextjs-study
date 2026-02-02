import ProductList from "./ProductList";

export default function List() {
  // 서버에서 가져온 데이터 (DB 호출 결과라고 가정)
  // 초기 상품은 SSR로 HTML에 포함됨
  const 상품데이터 = [
    { id: 0, name: '토마토', img: '/next.svg' },
    { id: 1, name: '파스타', img: '/next.svg' },
    { id: 2, name: '코코넛', img: '/next.svg' }
  ];

  return (
    <div>
      <h4 className="title">상품 목록</h4>
      {/* 데이터를 클라이언트 컴포넌트로 전달 */}
      <ProductList initialProducts={상품데이터} />
    </div>
  );
}
