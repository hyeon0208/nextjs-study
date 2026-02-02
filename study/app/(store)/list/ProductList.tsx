'use client'

import { useState } from "react";

interface Product {
    id: number;
    name: string;
    img: string;
}

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {

    const [products, setProducts] = useState(
        initialProducts.map(p => ({ ...p, count: 0 }))
    );

    const calculate = (index: number, 숫자: number) => {
        // 중요한건 state 변경 함수를 사용할 때 기존 state와 같을 경우(참조 주소가 같은 경우) react가 상태 변경을 해주지 않음
        // 방법은 서로 다른 참조 주소를 갖도록 해야함
        const copy = [...products]; // 기존 배열을 복사해서 겉 포장지 object 객체만 다른 참조주소를 갖도록함 (Deep Copy 아님, 얕은 복사)
        if (copy[index].count + 숫자 >= 0) {
            copy[index].count += 숫자;
            setProducts(copy);
        }
    };

    return (
        <>
            {products.map((item, i) => (
                <div className="food" key={item.id}>
                    {/* /로 시작하는 경로는 무조건 public 폴더를 루트로 간주함, 스프링으로 치면 resources폴더가 루트가 되는 것 같은 */}
                    {/* 위 이미지 태그는 이미지 파일을 있는 그대로 보여주지만 Next의 Image 컴포넌트를 사용하면 모바일, 데스크탑에 따라 크기 조절 및 레이지 로딩 적용해줌 */}
                    {/* <Image src={foodImg} alt="음식 사진" /> */}
                    {/* 주의할점은 외부 이미지를 가져와서 경로를 입력할 때는 실제 크기를 알 수 없어서 idth와 height를 반드시 명시해야 함 + next.config.js도 추가 세팅 필요 */}
                    {/* <Image src="/https://s3.amazonaws.com/my-bucket/image.png" width={500} height={500} /> */}
                    <img src={item.img} className="food-img" alt={item.name} />
                    <h4>{item.name}</h4>
                    <span> 수량 : {item.count} </span>

                    <button onClick={() => calculate(i, 1)}> + </button>
                    <button onClick={() => calculate(i, -1)}> - </button>
                </div>
            ))}
        </>
    );
}