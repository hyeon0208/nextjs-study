// 컴포넌트는 서버(SSR), 클라이언트(CSR) 컴포넌트 2가지 존재 (기본은 SSR)
// 클라이언트 컴포넌트는 파일 상단에 'use client' 작성하면됨
// 서버 컴포넌트는 단점이 return문 안에 스크립트 코드 추가 못함 (OnClick 같은 기능 사용 X)
// 보통 큰 페이지는 SSR, JS 기능 필요한 작은 컴포넌트는 CSR로 뺴서 사용

import data from './data'

export default async function Cart() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const cartData: [string, number][] = [
        ['Tomatoes', 40],
        ['Pasta', 25],
        ['Coconut', 15]
    ];
    return (
        <div>
            <h4 className="title">Cart</h4>
            {cartData.map((item, index) => {
                return (
                    <CartItem
                        name={item[0]}  // 배열의 첫 번째 값 (상품명)
                        price={item[1]} // 배열의 두 번째 값 (가격)
                        key={index}
                    />
                )
            })}
        </div>
    )
}

// 아래 처럼 재사용하는걸 컴포넌트 문법이라고 함.
function CartItem(props: { name: string, price: number }) {

    return (
        <div className="cart-item">
            <p>상품명: {props.name}</p>
            <p>{props.price}</p>
            <p>1개</p>
        </div>
    )
}